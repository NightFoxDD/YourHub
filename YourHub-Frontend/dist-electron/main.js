import { app, BrowserWindow, ipcMain } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
class UserService {
  static async getAllUsers() {
    try {
      console.log("Pobieranie użytkowników z backendu Java...");
      return [];
    } catch (error) {
      console.error("Błąd podczas pobierania użytkowników:", error);
      throw error;
    }
  }
}
class AuthService {
  static async hasValidSession() {
    try {
      console.log("Sprawdzanie sesji w backendzie Java...");
      return false;
    } catch (error) {
      console.error("Błąd podczas sprawdzania sesji:", error);
      return false;
    }
  }
  static async login(credentials) {
    try {
      console.log("Logowanie przez Java API:", credentials.email);
      if (credentials.email === "admin" && credentials.password === "1234") {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Błąd podczas logowania:", error);
      return false;
    }
  }
  static async createUser(user) {
    try {
      console.log("Rejestracja przez Java API:", user.email);
      return true;
    } catch (error) {
      console.error("Błąd podczas tworzenia użytkownika:", error);
      return false;
    }
  }
  static async createSession(user) {
    try {
      console.log("Zapisywanie sesji dla:", user.email);
      return true;
    } catch (error) {
      console.error("Błąd podczas tworzenia sesji:", error);
      return false;
    }
  }
}
createRequire(import.meta.url);
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname$1, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
async function createWindow() {
  const isHiddenLaunch = process.argv.includes("--hidden");
  win = new BrowserWindow({
    width: 800,
    height: 600,
    show: !isHiddenLaunch,
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname$1, "preload.mjs")
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
  const isSignedIn = await AuthService.hasValidSession();
  console.log("session: " + isSignedIn);
  win.webContents.on("did-finish-load", () => {
    if (!isSignedIn) {
      console.log("Type: login");
      win == null ? void 0 : win.webContents.send("navigate", "/login");
      win == null ? void 0 : win.show();
    } else {
      console.log("main");
      win == null ? void 0 : win.webContents.send("navigate", "/home");
      win == null ? void 0 : win.show();
    }
  });
  if (!isHiddenLaunch || !isSignedIn) {
    win.webContents.openDevTools();
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(async () => {
  ipcMain.handle("db:getUsers", async () => {
    return await UserService.getAllUsers();
  });
  ipcMain.handle("auth:check", async () => {
    return await AuthService.hasValidSession();
  });
  ipcMain.handle("login-user", async (event, credentials) => {
    return await AuthService.login(credentials);
  });
  ipcMain.handle("create-user", async (event, user) => {
    return await AuthService.createUser(user);
  });
  ipcMain.handle("create-session", async (event, user) => {
    return await AuthService.createSession(user);
  });
  ipcMain.handle("check-auth", async () => {
    return await AuthService.hasValidSession();
  });
  await createWindow();
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
