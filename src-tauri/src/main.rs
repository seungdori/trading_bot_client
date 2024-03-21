use std::process::Command;
use std::sync::mpsc::{sync_channel, Receiver};
use std::thread;
use command_group::{CommandGroup, GroupChild};
use tauri::api::process::Command as TCommand;
use tauri::{Manager, WindowEvent};

const BACKEND_TERMINATE_SIGNAL: i32 = -1;

fn start_backend(receiver: Receiver<i32>) {
    let t = TCommand::new_sidecar("backend").expect("backend sidecar failed to start");
    let mut group = Command::from(t).group_spawn().expect("backend command group failed to start");
    thread::spawn(move || {
        loop {
            let mut s = receiver.recv();
            if s.unwrap() == BACKEND_TERMINATE_SIGNAL {
                group.kill().expect("backend kill failed");
            }
        }
    });
}


#[cfg(not(debug_assertions))] // only include this code on release builds
fn main() {
    let (tx, rx) = sync_channel(1);
    start_backend(rx);

    tauri::Builder::default()
        .on_window_event(
            move |event|
                match event.event() {
                    WindowEvent::Destroyed => {
                        println!("Window destroyed");
                        tx.send(BACKEND_TERMINATE_SIGNAL).expect("failed to send exit signal");
                        println!("backend terminate signal sent");
                    }
                    _ => {}
                }
        )
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[cfg(debug_assertions)] // only include this code on debug builds
fn main() {
    tauri::Builder::default()
        .setup({
            move |app| {
                let main_window = app.get_window("main").unwrap();
                main_window.open_devtools();
                main_window.close_devtools();
                Ok(())
            }
        })
        .on_window_event(
            move |event|
                match event.event() {
                    WindowEvent::Destroyed => {
                        println!("Window destroyed");
                    }
                    _ => {}
                }
        )
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
