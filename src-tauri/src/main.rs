use std::process::Child;
use tauri::{Manager, App, WindowEvent};
use tauri::api::process::{Command, CommandEvent};

fn main() {
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
                    let (mut rx, child) = Command::new("./backend")
                        .spawn()
                        .expect("failed to setup `backend` process");
                }
                Ok(())
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
