const { app, BrowserWindow, Menu, shell } = require("electron");

const WEB_URL = process.env.CLONEFORGE_WEB_URL || "http://localhost:3001";
const ADMIN_URL = process.env.CLONEFORGE_ADMIN_URL || "http://localhost:3002";

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 940,
    minWidth: 1080,
    minHeight: 720,
    title: "CloneForge AI",
    backgroundColor: "#f7f4ee",
    webPreferences: {
      preload: `${__dirname}/preload.js`,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  mainWindow.loadURL(WEB_URL);

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }
}

function buildMenu() {
  return Menu.buildFromTemplate([
    {
      label: "CloneForge AI",
      submenu: [
        { label: "Open App", click: () => mainWindow?.loadURL(WEB_URL) },
        { label: "Open Admin", click: () => mainWindow?.loadURL(ADMIN_URL) },
        { type: "separator" },
        { label: "Reload", role: "reload" },
        { label: "Quit", role: "quit" }
      ]
    },
    {
      label: "View",
      submenu: [
        { role: "toggleDevTools" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { role: "togglefullscreen" }
      ]
    }
  ]);
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(buildMenu());
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
