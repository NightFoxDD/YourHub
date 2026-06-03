import { app, BrowserWindow, ipcMain } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

import { UserService } from '../src/main/database/services/UserService'
import { AuthService } from '../src/main/modules/auth_bridge/AuthService'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

async function createWindow() {
  const isHiddenLaunch = process.argv.includes('--hidden');

  win = new BrowserWindow({
    width: 800,
    height: 600,
    show: !isHiddenLaunch,
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

  // W tle badamy sesję z AuthBridge
  const isSignedIn = await AuthService.hasValidSession();
  console.log("session: " + isSignedIn);
  
  win.webContents.on('did-finish-load', () => {
    if (!isSignedIn) {
      console.log("Type: login")
      win?.webContents.send('navigate', '/login'); // Zmieniono na 'navigate', by pasowało do preload.ts
      win?.show();
    } else {
      console.log("main")
      win?.webContents.send('navigate', '/home');
      win?.show();
    }
  });

  if (!isHiddenLaunch || !isSignedIn) {
    win.webContents.openDevTools();
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(async () => {
  ipcMain.handle('db:getUsers', async () => {
    return await UserService.getAllUsers(); 
  });
  
  ipcMain.handle('auth:check', async () => { // Zmieniono na 'check-auth' w preload.ts, ale dla zgodnosci poprawie nizej
    return await AuthService.hasValidSession();
  });
  
  ipcMain.handle('login-user', async (event, credentials) => {
    return await AuthService.login(credentials);
  });

  ipcMain.handle('create-user', async (event, user) => {
    return await AuthService.createUser(user);
  });

  ipcMain.handle('create-session', async (event, user) => {
    return await AuthService.createSession(user);
  });
  
  ipcMain.handle('check-auth', async () => {
    return await AuthService.hasValidSession();
  });

  await createWindow()
})
