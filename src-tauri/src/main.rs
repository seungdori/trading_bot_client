use std::sync::{Arc, Mutex};
use std::process::Child;
use tauri::{Manager, App, WindowEvent};
use tauri::api::process::{Command, CommandEvent};

fn main() {
    #[cfg(not(debug_assertions))] // only include this code on release builds
        let app_child_process = Arc::new(Mutex::new(None));

    tauri::Builder::default()
        .setup({
            move |app| {
                #[cfg(debug_assertions)] // only include this code on debug builds
                {
                    let main_window = app.get_window("main").unwrap();
                    main_window.open_devtools();
                    main_window.close_devtools();
                }

                #[cfg(not(debug_assertions))] // only include this code on release builds
                {
                    let main_window = app.get_window("main").unwrap();
                    // Spawn the external process
                    let setup_child_process = app_child_process.clone();
                    let (mut rx, child) = Command::new_sidecar("backend")
                        .expect("failed to setup `backend` sidecar")
                        .spawn()
                        .expect("Failed to spawn backend process");

                    // Store the child process handle
                    *setup_child_process.lock().unwrap() = Some(child);

                    tauri::async_runtime::spawn(async move {
                        while let Some(event) = rx.recv().await {
                            if let CommandEvent::Stdout(line) = event {
                                main_window
                                    .emit("backend-message", &line)
                                    .expect("failed to emit backend message event");
                            }
                        }
                    });
                }
                Ok(())
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
