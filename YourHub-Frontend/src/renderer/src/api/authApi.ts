import { apiClient } from './apiClient';
import { User } from '../../../shared/types';

export const authApi = {

  getCurrentUser: async () => {
    return await apiClient.get('/auth/checkToken');
  },

  logOut: async () => {
    localStorage.removeItem('token');
    return await apiClient.post('/auth/logOut');
  },
  login: async (credentials: User) => {
    return await apiClient.post('/auth/login', credentials);
  },

  register: async (userData: User) => {
    return await apiClient.post('/auth/register', userData);
  }
};
