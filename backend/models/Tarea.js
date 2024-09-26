// models/Tarea.js
const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  fechaVencimiento: {
    type: Date,
    required: true
  },
  prioridad: {
    type: String,
    enum: ['Alta', 'Media', 'Baja'],
    required: true
  },
  creadaEn: {
    type: Date,
    default: Date.now
  },
  actualizadaEn: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: String,
    enum: ['pendiente', 'en progreso', 'retrasada', 'completada'],
    default: 'pendiente'
  }
});

module.exports = mongoose.model('Tarea', tareaSchema);
