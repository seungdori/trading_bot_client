use std::borrow::BorrowMut;
use std::process::{Child, Command};
use command_group::{CommandGroup, GroupChild};
use tauri::api::process::Command as TCommand;

pub struct APIManager {
    cmd: Command,
    child: Option<Child>,
    api_process: Option<GroupChild>,
}

impl APIManager {
    pub fn new() -> APIManager {
        let t = TCommand::new_sidecar("backend").expect("backend sidecar failed to start");
        let cmd_from_sidecar: Command = t.into();
        APIManager {
            cmd: cmd_from_sidecar,
            child: None,
            api_process: None,
        }
    }

    pub fn start_backend(&mut self) -> Result<String, String> {
        match self.child.borrow_mut() {
            Some(_) => {
                let info = "backend already started, no need to start again";
                println!("{}", &info);
                Ok(info.into())
            }
            None => {
                let child = self.cmd.spawn();
                // let child = Command::from(self.cmd.borrow()).group_spawn().expect("backend failed to start");
                match child {
                    Ok(v) => {
                        self.child = Some(v);
                        // self.api_process = Some(v);
                        let info = "backend started successfully";
                        println!("{}", &info);
                        Ok(info.into())
                    }
                    Err(_) => {
                        let info = "backend failed to start, please check the log for more information";
                        println!("{}", &info);
                        Err(info.into())
                    }
                }
            }
        }
    }

    pub fn terminate_backend(&mut self) -> Result<String, String> {
        match self.child.borrow_mut() {
            Some(child) => {
                // child.wait().expect("Some error happened when killing child process");
                child
                    .kill()
                    .expect("Some error happened when killing child process");
                self.child = None;
                let info = "Kill already existed child process then set it to None";
                println!("{}", &info);
                Ok(info.into())
            }
            _ => {
                let info = "backend not started, no need to terminate it";
                println!("{}", &info);
                Ok(info.into())
            }
        }
    }

    pub fn restart_backend(&mut self) -> Result<String, String> {
        let terminate_result = self.terminate_backend();
        match terminate_result {
            Ok(_) => {
                println!("backend terminated successfully, now start it again");
                match self.start_backend() {
                    Ok(_) => {
                        let info = "backend restarted successfully";
                        println!("{}", &info);
                        Ok(info.into())
                    }
                    Err(e) => {
                        println!("{}", &e);
                        return Err(e.into());
                    }
                }
            }
            Err(e) => {
                println!("{}", &e);
                return Err(e);
            }
        }
    }
}
