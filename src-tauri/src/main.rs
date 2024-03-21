pub mod api_manager;

use api_manager::APIManager;
use std::sync::Mutex;
use command_group::{CommandGroup};
use tauri::{Manager, State, WindowEvent};


struct APIManagerState {
    api_manager_mutex: Mutex<APIManager>,
}

#[tauri::command]
fn start_server(api_manager_state: State<APIManagerState>) -> Result<String, String> {
    let am = api_manager_state
        .api_manager_mutex
        .lock()
        .unwrap()
        .start_backend();
    am
}

#[tauri::command]
fn stop_server(api_manager_state: State<APIManagerState>) -> Result<String, String> {
    let am = api_manager_state
        .api_manager_mutex
        .lock()
        .unwrap()
        .terminate_backend();
    am
}

#[tauri::command]
fn restart_server(api_manager_state: State<APIManagerState>) -> Result<String, String> {
    let am = api_manager_state
        .api_manager_mutex
        .lock()
        .unwrap()
        .restart_backend();
    am
}

#[cfg(not(debug_assertions))] // only include this code on release builds
fn main() {
    let api_manager = APIManager::new();
    let ams = APIManagerState {
        api_manager_mutex: Mutex::new(api_manager),
    };

    tauri::Builder::default()
        .manage(ams)
        .setup(move |app| {
            let am: State<APIManagerState> = app.state();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            start_server,
            stop_server,
            restart_server
        ])
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
