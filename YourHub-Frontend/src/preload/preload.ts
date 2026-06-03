import { User } from '../shared/types';
import { contextBridge, ipcRenderer } from 'electron';

// Pamiętaj, aby nie zostawiać tego pliku pustego. To jedyny bezpieczny sposób
// komunikacji między Reactem (który wyświetla strony) a Node.js (który ma dostęp do bazy i systemu).
contextBridge.exposeInMainWorld('electron', {
  checkAuth: () => ipcRenderer.invoke('auth:check'),
  loginUser: (credentials: User) => ipcRenderer.invoke('auth:login', credentials),
  createSession: (user: User) => ipcRenderer.invoke('auth:createSession', user),
  createUser: (user: User) => ipcRenderer.invoke('auth:createUser', user),
  onNavigate: (callback: (path: string) => void) => {
    ipcRenderer.on('auth:navigate', (_event, value) => callback(value));
  }
});