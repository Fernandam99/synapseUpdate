import ApiService from './api';

export const progresoService = {
  async obtenerProgresoHoy() {
    const res = await ApiService.get('/progreso/hoy');
    return res.data;
  },

  async obtenerProgresoSemana() {
    const res = await ApiService.get('/progreso/semana');
    return res.data;
  },

  async obtenerProgresoMes(año = null, mes = null) {
    const params = new URLSearchParams();
    if (año) params.append('año', año);
    if (mes) params.append('mes', mes);

    const res = await ApiService.get(`/progreso/mes${params.toString() ? `?${params}` : ''}`);
    return res.data;
  },

  async actualizarProgreso() {
    const res = await ApiService.post('/progreso/actualizar');
    return res.data;
  },

  async obtenerEstadisticasGenerales() {
    const res = await ApiService.get('/progreso/estadisticas-generales');
    return res.data;
  },

  async obtenerProgresoFiltrado(fechaInicio, fechaFin) {
    const params = new URLSearchParams();
    if (fechaInicio) params.append('fecha_inicio', fechaInicio);
    if (fechaFin) params.append('fecha_fin', fechaFin);

    const res = await ApiService.get(`/progreso${params.toString() ? `?${params}` : ''}`);
    return res.data;
  }
};
