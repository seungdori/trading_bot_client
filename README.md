# Trading Bot Client

This project is a desktop application for trading automation, built with Tauri, a framework for building tiny, highly performant applications using web technologies. The client interfaces with a Python FastAPI backend, bundled as a binary using PyInstaller, to execute trading strategies efficiently and securely on your desktop.

## Features

- Cross-platform Support: Works on Windows and macOS, ensuring a wide range of compatibility.
- Secure Execution: The trading bot's backend is packaged as a binary, making deployment easy and execution secure.
- Modern UI: Built with modern web technologies, offering a responsive and intuitive user interface.
- Custom Trading Strategies: Supports custom trading strategies tailored to your trading preferences and risk profile.

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- Rust (latest stable version)
- Python (for development and building the backend binary)

### Installation

Clone this repository:

```shell
git clone https://yourrepo/trading_bot_client.git
```

Install JavaScript dependencies:

```shell
npm install -g pnpm # If you don't have pnpm installed
pnpm install
```

Build the Tauri application:

```shell
pnpm tauri build
```

### Running the Application

After installation, you can start the application by executing the built binary located in the src-tauri/target/release or src-tauri/target/debug directory, depending on your build configuration.

## Project Structure

The project is structured as follows:

- dist: Contains the web assets that Tauri uses to render the UI.
- external/backend: Contains the Python FastAPI backend, packaged as a binary. This binary is executed by the Tauri app at startup.
- src: Contains the source code for the frontend, built with modern web technologies.
- src-tauri: Contains the Rust source code for the Tauri application.

## How It Works

When the Tauri application starts, it automatically executes the FastAPI backend binary located in external/backend. This provides a secure, efficient way to interface with the trading functionality.

---
