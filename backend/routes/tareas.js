// routes/tareas.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Tarea = require('../models/Tarea');

// Crear una nueva tarea
router.post(
  '/',
  [
    body('nombre').not().isEmpty().withMessage('El nombre es requerido'),
    body('descripcion').not().isEmpty().withMessage('La descripción es requerida'),
    body('fechaVencimiento').isISO8601().withMessage('La fecha de vencimiento debe ser una fecha válida'),
    body('prioridad').isIn(['Alta', 'Media', 'Baja']).withMessage('La prioridad debe ser Alta, Media o Baja'),
    body('estado').optional().isIn(['pendiente', 'en progreso', 'retrasada', 'completada'])
      .withMessage('El estado debe ser pendiente, en progreso, retrasada o completada')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const tarea = new Tarea(req.body);
      const nuevaTarea = await tarea.save();
      res.status(201).json(nuevaTarea);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);


// Obtener todas las tareas
router.get('/', async (req, res) => {
  try {
    const tareas = await Tarea.find();
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener una tarea por ID
router.get('/:id', async (req, res) => {
  try {
    const tarea = await Tarea.findById(req.params.id);
    if (!tarea) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualizar una tarea
router.put(
  '/:id',
  [
    body('nombre').optional().not().isEmpty().withMessage('El nombre no puede estar vacío'),
    body('descripcion').optional().not().isEmpty().withMessage('La descripción no puede estar vacía'),
    body('fechaVencimiento').optional().isISO8601().withMessage('La fecha de vencimiento debe ser una fecha válida'),
    body('prioridad').optional().isIn(['Alta', 'Media', 'Baja']).withMessage('La prioridad debe ser Alta, Media o Baja'),
    body('estado').optional().isIn(['pendiente', 'en progreso', 'retrasada', 'completada'])
      .withMessage('El estado debe ser pendiente, en progreso, retrasada o completada')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const tareaActualizada = await Tarea.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!tareaActualizada) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
      }
      res.json(tareaActualizada);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);


// Eliminar una tarea
router.delete('/:id', async (req, res) => {
  try {
    const tareaEliminada = await Tarea.findByIdAndDelete(req.params.id);
    if (!tareaEliminada) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json({ message: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
