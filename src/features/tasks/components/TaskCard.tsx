import React from 'react';
import { Task } from '../../tasks/redux/types';

interface TaskCardProps {
  task: Task;
  grouping: 'estatus' | 'prioridad' | 'fechaFinal';
  onEdit: ()=> {}
}

const TaskCard: React.FC<TaskCardProps> = ({ task, grouping, onEdit }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg mb-4 transition-transform hover:scale-105 hover:shadow-lg h-[350px]">
      <h2 className="text-xl font-bold mb-6 overflow-x-hidden">{task.name}</h2>
      {task.image ? (
        <img
          src={task.image}
          alt={task.name}
          className="w-full  h-[150px] object-cover rounded-md mb-2"
        />
      ): <div
          className="w-full bg-gray-600 shadows-sm h-[150px] object-cover rounded-md mb-2"
        /> }


      <p className="text-sm text-gray-600 mb-6">
        {grouping === 'estatus' && (
          <>
            <span>Prioridad: {task.priority}</span>
            <br />
            <span>
              Fecha de entrega: {new Date(task.due_date).toLocaleDateString()}
            </span>
          </>
        )}
        {grouping === 'prioridad' && (
          <>
            <span>Estado: {task.status}</span>
            <br />
            <span>
              Fecha de entrega: {new Date(task.due_date).toLocaleDateString()}
            </span>
          </>
        )}
        {grouping === 'fechaFinal' && (
          <>
            <span>Estado: {task.status}</span>
            <br />
            <span>Prioridad: {task.priority}</span>
          </>
        )}
      </p>

      <button
        onClick={onEdit}
        className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg  text-center transition"
      >
        Editar Tarea
      </button>
    </div>
  );
};

export default TaskCard;
