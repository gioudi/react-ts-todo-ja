import React, { useState, useEffect } from 'react';
import { Task } from '../redux/types';
import { useDispatch } from 'react-redux';
import { handleDeleteTask, handleUpdateTask } from '../redux/tasksSlice';
import { AppDispatch } from '../../../store/store';

interface TaskEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

const TaskEditModal: React.FC<TaskEditModalProps> = ({
  isOpen,
  onClose,
  task,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [name, setName] = useState(task?.name || '');
  const [status, setStatus] = useState(task?.status || 'Por hacer');
  const [priority, setPriority] = useState(task?.priority || 'Baja');
  const [image, setImage] = useState(task?.image || '');
  const [due_date, setdue_date] = useState(task?.due_date || '');
  const [description, setDescription] = useState(task?.description || '');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const currentDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    setStatus(task?.status || 'Por hacer');
    setPriority(task?.priority || 'Baja');
  }, [task]);

  if (!isOpen) return null;

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    const trimmedName = name.trim();
    if (!name) {
      errors.name = 'El nombre de la tarea es obligatorio.';
    } else if (name.length < 3 || name.length > 50) {
      errors.name = 'El nombre debe tener entre 3 y 50 caracteres.';
    } else if (
      trimmedName.startsWith('_') ||
      trimmedName.endsWith('_') ||
      trimmedName.startsWith(' ') ||
      trimmedName.endsWith(' ')
    ) {
      errors.name =
        'El nombre no puede comenzar o terminar con "_" o con espacios.';
    }

    if (!due_date) {
      errors.due_date = 'La fecha de entrega es obligatoria.';
    } else if (due_date < currentDate) {
      errors.due_date =
        'La fecha de entrega no puede ser menor a la fecha de hoy.';
    }

    if (image && !/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(image)) {
      errors.image = 'La URL de la imagen no es válida.';
    }

    if (description && description.length > 120) {
      errors.description =
        'La descripción no puede tener más de 120 caracteres.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdate = () => {
    if (validateForm()) {
      if (task) {
        dispatch(
          handleUpdateTask({
            ...task,
            name: name.trim(),
            status,
            priority,
            image,
            due_date,
            description,
          })
        );
        onClose();
      }
    }
  };

  const handleDelete = () => {
    if (task) {
      dispatch(handleDeleteTask(String(task.id)));
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <h3 className="text-xl font-semibold mb-4">Editar Tarea</h3>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`p-2 border rounded-lg w-full ${formErrors.name ? 'border-red-500' : ''}`}
          />
          {formErrors.name && (
            <p className="text-red-500 text-sm">{formErrors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Estado</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={`p-2 border rounded-lg w-full ${formErrors.status ? 'border-red-500' : ''}`}
          >
            <option value="Por hacer">Por hacer</option>
            <option value="En progreso">En progreso</option>
            <option value="Completado">Completado</option>
          </select>
          {formErrors.status && (
            <p className="text-red-500 text-sm">{formErrors.status}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Prioridad</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className={`p-2 border rounded-lg w-full ${formErrors.priority ? 'border-red-500' : ''}`}
          >
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
          {formErrors.priority && (
            <p className="text-red-500 text-sm">{formErrors.priority}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Imagen</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className={`p-2 border rounded-lg w-full ${formErrors.image ? 'border-red-500' : ''}`}
          />
          {formErrors.image && (
            <p className="text-red-500 text-sm">{formErrors.image}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">
            Fecha de Entrega
          </label>
          <input
            type="date"
            value={due_date}
            onChange={(e) => setdue_date(e.target.value)}
            className={`p-2 border rounded-lg w-full ${formErrors.due_date ? 'border-red-500' : ''}`}
          />
          {formErrors.due_date && (
            <p className="text-red-500 text-sm">{formErrors.due_date}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`p-2 border rounded-lg w-full ${formErrors.description ? 'border-red-500' : ''}`}
          />
          {formErrors.description && (
            <p className="text-red-500 text-sm">{formErrors.description}</p>
          )}
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Actualizar
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Eliminar
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-secondary text-white rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskEditModal;
