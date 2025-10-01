import ApiService from './api';

export const tareasService = {
  async obtenerTareas(filtros = {}) {
    const params = new URLSearchParams(filtros).toString();
    const res = await ApiService.get(`/tarea${params ? `?${params}` : ''}`);
    return res.data;
  },

  async crearTarea(tarea) {
    const res = await ApiService.post('/tarea', tarea);
    return res.data;
  },

  async actualizarTarea(tareaId, datos) {
    const res = await ApiService.put(`/tarea/${tareaId}`, datos);
    return res.data;
  },

  async eliminarTarea(tareaId) {
    const res = await ApiService.delete(`/tarea/${tareaId}`);
    return res.data;
  },

  async completarTarea(tareaId) {
    const res = await ApiService.patch(`/tarea/${tareaId}/completar`);
    return res.data;
  },

  async completarTareaAnticipadamente(tareaId) {
    const res = await ApiService.patch(`/listas/todo/tarea/${tareaId}/completar-anticipadamente`);
    return res.data;
  },

  async obtenerEstadisticas() {
    const res = await ApiService.get('/tarea/estadisticas');
    return res.data;
  },

  async obtenerListas() {
    const res = await ApiService.get('/listas/todo/listas');
    return res.data;
  },

  async crearLista(nombre, descripcion, fechaLimite) {
    const res = await ApiService.post('/listas/todo/lista', {
      nombre,
      descripcion,
      fecha_limite: fechaLimite
    });
    return res.data;
  }
};
