import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import Store from "electron-store";
import fs from "fs";

// Define __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const preloadPath = app.isPackaged
  ? path.join(app.getAppPath(), "preload.js")
  : path.join(__dirname, "preload.js");

console.log("Preload path:", preloadPath); // Add this log to debug the preload path

// Initialize Electron Store
const store = new Store();

// Global reference to the BrowserWindow instance
let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: preloadPath, // Specify the preload script
      nodeIntegration: false, // Disable Node integration for security
      contextIsolation: true, // Enable context isolation
    },
  });

  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:3000"); // Load React dev server
    win.webContents.openDevTools(); // Open DevTools in development
  } else {
    win.loadFile(path.join(__dirname, "build", "index.html")); // Load React build for production
  }
}

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

// App ready event
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// IPC Handlers for Electron Store and File Operations
ipcMain.handle("check-file-existence", (event, filePath) => {
  try {
    return fs.existsSync(filePath); // Check if the file exists
  } catch (error) {
    console.error("Error checking file existence:", error);
    return false;
  }
});

ipcMain.handle("save-data", (_, fileName, data, fileDate) => {
  try {
    console.log("save data");
    const currData = store.get("userData", { files: [] });
    const existingFileIndex = currData.files.findIndex(
      (file) => file.fileName === fileName
    );
    if (existingFileIndex !== -1) {
      currData.files[existingFileIndex].data = data;
      currData.files[existingFileIndex].fileDate = fileDate;
    } else {
      currData.files.push({ fileName, data, fileDate });
    }
    store.set("userData", currData);
    return { success: true, message: "Data saved successfully" };
  } catch (error) {
    console.error("Error saving data:", error);
    return { success: false, message: "Failed to save data" };
  }
});

ipcMain.handle("get-data", () => {
  try {
    return store.get("userData", { files: [] });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return { files: [] };
  }
});

ipcMain.handle("delete-data", (_, fileName) => {
  try {
    const currData = store.get("userData", { files: [] });
    currData.files = currData.files.filter(
      (file) => file.fileName !== fileName
    );
    store.set("userData", currData);
    return { success: true, message: "File deleted successfully" };
  } catch (error) {
    console.error("Error deleting data:", error);
    return { success: false, message: "Failed to delete file" };
  }
});

ipcMain.handle("clear-data", () => {
  try {
    store.clear();
    return { success: true, message: "Data cleared successfully" };
  } catch (error) {
    console.error("Error clearing data:", error);
    return { success: false, message: "Failed to clear data" };
  }
});

// Quit the app when all windows are closed, except on macOS
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
