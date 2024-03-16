use std::sync::{Arc, Mutex};
use std::process::Child; // Corrected import for Child
use tauri::{Manager, App, WindowEvent};
use tauri::api::process::{Command, CommandEvent};

fn main() {
    let app_child_process = Arc::new(Mutex::new(None));

    tauri::Builder::default()
        .setup({
            let setup_child_process = app_child_process.clone();
            move |app| {
                // Spawn the external process
                let (mut rx, child) = Command::new_sidecar("backend")
                    .expect("failed to setup `backend` sidecar")
                    .spawn()
                    .expect("Failed to spawn backend process");

                // Store the child process handle
                *setup_child_process.lock().unwrap() = Some(child);

                let main_window = app.get_window("main").unwrap();
                tauri::async_runtime::spawn(async move {
                    while let Some(event) = rx.recv().await {
                        if let CommandEvent::Stdout(line) = event {
                            main_window
                                .emit("backend-message", &line)
                                .expect("failed to emit backend message event");
                        }
                    }
                });

                Ok(())
            }
        })
        .on_window_event({
            let window_child_process = app_child_process.clone();
            move |event| {
                // Check if the main window is being closed
                if let WindowEvent::CloseRequested { api, .. } = event.event() {
                    // Prevent the window from closing immediately
                    api.prevent_close();

                    // Kill the child process
                    if let Some(child) = window_child_process.lock().unwrap().take() {
                        let _ = child.kill();
                    }

                    // Close the window after the child process has been handled
                    std::thread::spawn(move || {
                        std::thread::sleep(std::time::Duration::from_millis(500)); // Wait for the process to exit
                        event.window().close().expect("failed to close window");
                    });
                }
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
