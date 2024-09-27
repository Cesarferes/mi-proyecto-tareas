import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tareas = () => {
  const [tareas, setTareas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [prioridad, setPrioridad] = useState('Media');
  const [estado, setEstado] = useState('pendiente');
  const [tareaId, setTareaId] = useState(null);

  const [errores, setErrores] = useState({
    nombre: '',
    descripcion: '',
    fechaVencimiento: '',
  });

  const obtenerTareas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tareas');
      setTareas(response.data);
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
    }
  };

  useEffect(() => {
    obtenerTareas();
  }, []);

  const validarFormulario = () => {
    let valido = true;
    let nuevosErrores = { nombre: '', descripcion: '', fechaVencimiento: '' };

    if (!nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio.';
      valido = false;
    }

    if (!descripcion.trim()) {
      nuevosErrores.descripcion = 'La descripción es obligatoria.';
      valido = false;
    }

    if (!fechaVencimiento) {
      nuevosErrores.fechaVencimiento = 'La fecha de vencimiento es obligatoria.';
      valido = false;
    } else if (new Date(fechaVencimiento) < new Date()) {
      nuevosErrores.fechaVencimiento = 'La fecha de vencimiento no puede ser en el pasado.';
      valido = false;
    }

    setErrores(nuevosErrores);
    return valido;
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    const tarea = { nombre, descripcion, fechaVencimiento, prioridad, estado };

    try {
      if (tareaId) {
        await axios.put(`http://localhost:5000/api/tareas/${tareaId}`, tarea);
      } else {
        await axios.post('http://localhost:5000/api/tareas', tarea);
      }
      obtenerTareas();
      resetForm();
    } catch (error) {
      console.error('Error al guardar la tarea:', error);
    }
  };

  const eliminarTarea = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tareas/${id}`);
      obtenerTareas();
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const cargarTarea = (tarea) => {
    setTareaId(tarea._id);
    setNombre(tarea.nombre);
    setDescripcion(tarea.descripcion);
    setFechaVencimiento(tarea.fechaVencimiento);
    setPrioridad(tarea.prioridad);
    setEstado(tarea.estado);
  };

  const resetForm = () => {
    setTareaId(null);
    setNombre('');
    setDescripcion('');
    setFechaVencimiento('');
    setPrioridad('Media');
    setEstado('pendiente');
    setErrores({ nombre: '', descripcion: '', fechaVencimiento: '' });
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Gestión de Tareas</h1>

      <form onSubmit={manejarSubmit} className="mb-4">
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
          </div>

          <div className="col-md-6">
            <input
              type="text"
              className={`form-control ${errores.descripcion ? 'is-invalid' : ''}`}
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            {errores.descripcion && <div className="invalid-feedback">{errores.descripcion}</div>}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <input
              type="date"
              className={`form-control ${errores.fechaVencimiento ? 'is-invalid' : ''}`}
              placeholder="Fecha de vencimiento"
              value={fechaVencimiento}
              onChange={(e) => setFechaVencimiento(e.target.value)}
            />
            {errores.fechaVencimiento && <div className="invalid-feedback">{errores.fechaVencimiento}</div>}
          </div>

          <div className="col-md-4">
            <select
              className="form-control"
              value={prioridad}
              onChange={(e) => setPrioridad(e.target.value)}
            >
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>

          <div className="col-md-4">
            <select
              className="form-control"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="pendiente">Pendiente</option>
              <option value="en progreso">En Progreso</option>
              <option value="retrasada">Retrasada</option>
              <option value="completada">Completada</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          {tareaId ? 'Actualizar Tarea' : 'Crear Tarea'}
        </button>
      </form>

      <table className="table table-striped table-responsive">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Fecha Vencimiento</th>
            <th>Prioridad</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tareas.map((tarea) => (
            <tr key={tarea._id}>
              <td>{tarea.nombre}</td>
              <td>{tarea.descripcion}</td>
              <td>{tarea.fechaVencimiento}</td>
              <td>{tarea.prioridad}</td>
              <td>{tarea.estado}</td>
              <td>
                <div className="d-flex">
                <button
                  className="btn btn-warning btn-sm w-100 me-2"
                  onClick={() => cargarTarea(tarea)}
                >
                  Editar
                </button>
                <button
                className="btn btn-danger btn-sm w-100"
                onClick={() => eliminarTarea(tarea._id)}
                >
                 Eliminar
               </button>
            </div>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tareas;
