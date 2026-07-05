const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("cloneforgeDesktop", {
  platform: process.platform,
  shell: "electron"
});
