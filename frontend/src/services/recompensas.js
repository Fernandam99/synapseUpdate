import ApiService from './api';

export const recompensasService = {
  async obtenerRecompensas(tipo = null) {
    const params = tipo ? `?tipo=${tipo}` : '';
    const res = await ApiService.get(`/recompensa${params}`);
    return res.data;
  },

  async obtenerMisRecompensas() {
    const res = await ApiService.get('/recompensa/mis-recompensas');
    return res.data;
  },

  async obtenerDisponibles() {
    const res = await ApiService.get('/recompensa/disponibles');
    return res.data;
  },

  async otorgar(recompensaId) {
    const res = await ApiService.post('/recompensa/otorgar', {
      recompensa_id: recompensaId
    });
    return res.data;
  },

  async verificarAutomaticas() {
    const res = await ApiService.post('/gamificacion/recompensa/verificar-automaticas');
    return res.data;
  },

  async obtenerEstadisticas() {
    const res = await ApiService.get('/gamificacion/recompensa/usuario/estadisticas');
    return res.data;
  },

  async obtenerNiveles() {
    const res = await ApiService.get('/gamificacion/recompensa/niveles');
    return res.data;
  },

  async crearRecompensa(data) {
    const res = await ApiService.post('/recompensa', data);
    return res.data;
  },

  async actualizarRecompensa(recompensaId, data) {
    const res = await ApiService.put(`/recompensa/${recompensaId}`, data);
    return res.data;
  },

  async eliminarRecompensa(recompensaId) {
    const res = await ApiService.delete(`/recompensa/${recompensaId}`);
    return res.data;
  },

  async consumirRecompensa(recompensaId) {
    const res = await ApiService.post('/recompensa/consumir', {
      recompensa_id: recompensaId
    });
    return res.data;
  },

  async consumirRecompensaPatch(recompensaUsuarioId) {
    const res = await ApiService.patch(`/recompensa/consumir/${recompensaUsuarioId}`);
    return res.data;
  },

  async obtenerRecompensaPorId(recompensaId) {
    const res = await ApiService.get(`/recompensa/${recompensaId}`);
    return res.data;
  }
};
