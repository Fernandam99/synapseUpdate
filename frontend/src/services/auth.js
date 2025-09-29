import ApiService from './api';

export const authService = {
  async login(correo, password) {
    const response = await ApiService.post('/auth/login', { correo, password });
    if (response.access_token) {
      localStorage.setItem('authToken', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.usuario));
    }
    return response;
  },

  async register(userData) {
    const response = await ApiService.post('/auth/register', {
      Username: userData.username || userData.correo.split('@')[0],
      correo: userData.correo,
      password: userData.password
    });

    if (response.usuario) {
      await this.login(userData.correo, userData.password);
    }

    return response;
  },

  async getCurrentUser() {
    try {
      return await ApiService.get('/auth/me');
    } catch (error) {
      this.logout();
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/';
  },

  getStoredUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  }
};
