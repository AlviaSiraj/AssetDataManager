const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  checkFileExistence: (filePath) =>
    ipcRenderer.invoke("check-file-existence", filePath),
  saveData: (fileName, data, fileDate) =>
    ipcRenderer.invoke("save-data", fileName, data, fileDate),
  getData: () => ipcRenderer.invoke("get-data"),
  deleteData: (fileName) => ipcRenderer.invoke("delete-data", fileName),
  clearData: () => ipcRenderer.invoke("clear-data"),
});
