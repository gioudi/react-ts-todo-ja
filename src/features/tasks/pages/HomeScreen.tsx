import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../../store/store';
import { handleFetchTasks } from '../redux/tasksSlice';
import AlertComponent from '../../../components/Alerts/AlertComponent';
import TaskCard from '../components/TaskCard';
import TaskEditModal from '../components/TaskEditModal';
import { Task } from '../redux/types';
import TaskCreateModal from '../components/TaskCreateModal';
import SpinnerComponent from '../../../components/Spinner/SpinnerComponent';

const HomeScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    tasks,
    error: gettingError,
    success,
    loading
  } = useSelector((state: AppState) => state.tasks);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );
  const [priorityFilter, setPriorityFilter] = useState<string | undefined>(
    undefined
  );
  const [due_dateFilter, setdue_dateFilter] = useState<string | undefined>(
    undefined
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const itemsPerPage = 3;

  useEffect(() => {
    dispatch(handleFetchTasks());
  }, [dispatch]);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    if (gettingError) {
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 5000);
    }
  }, [gettingError]);

  useEffect(() => {
    if (success) {
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 5000);
    }
  }, [success]);

  useEffect(() => {
    let filtered = tasks;

    if (searchQuery) {
      filtered = filtered.filter((task) =>
        task.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter && statusFilter !== 'Todos') {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }

    if (priorityFilter && priorityFilter !== 'Todas') {
      filtered = filtered.filter((task) => task.priority === priorityFilter);
    }

    if (due_dateFilter) {

      const selectedDate = new Date(due_dateFilter);
      const formattedSelectedDate = selectedDate.toISOString().split('T')[0];

      filtered = filtered.filter((task) => {
        const taskDate = new Date(task.due_date);
        const formattedTaskDate = taskDate.toISOString().split('T')[0];
        return formattedTaskDate === formattedSelectedDate;
      });
    }

    setFilteredTasks(filtered);
    setCurrentPage(1);
  }, [searchQuery, statusFilter, priorityFilter, due_dateFilter, tasks]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('Todos');
    setPriorityFilter('Todas');
    setdue_dateFilter('');
  };

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTasks = filteredTasks.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleEditClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);

  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);

  };

  if (loading) {
    return <SpinnerComponent />;
  }

  return (
    <section className="container mx-auto py-8 px-6 rounded relative bg-white shadow">
      {gettingError ? (
        <AlertComponent
          kind="danger"
          message={gettingError}
          title="Error"
          visible={alertVisible}
        />
      ) : (
        <AlertComponent
          kind="success"
          message={success || 'Proceso realizado de manera satisfacoria'}
          title="Aviso"
          visible={alertVisible}
        />
      )}
      <h2 className="text-2xl lg:text-6xl font-bold mb-4 lg:mb-6 text-center">
        Lista de tareas
      </h2>
      <button
        onClick={handleOpenCreateModal}
        className="px-4 py-2 bg-primary text-white rounded mb-4"
      >
        Crear Nueva Tarea
      </button>
      <div className="flex flex-col w-full h-full mb-10">
        <div className="grid grid-cols-1 gap-4 p-4">
          <label className="block text-sm font-medium font-semibold">
            Buscar tarea
          </label>
          <input
            type="text"
            placeholder="Buscar tarea..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border rounded-lg w-full"
          />
        </div>
        <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          <div>
            <label className="block text-sm font-semibold mb-3">Estado</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 border rounded-lg w-full"
            >
              <option value="Todos">Todos</option>
              <option value="To do">Por hacer</option>
              <option value="In progress">En progreso</option>
              <option value="Completed">Completado</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-3">
              Prioridad
            </label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="p-2 border rounded-lg w-full"
            >
              <option value="Todas">Todas</option>
              <option value="Low">Baja</option>
              <option value="Medium">Media</option>
              <option value="High">Alta</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-3">
              Fecha de Entrega
            </label>
            <input
              type="date"
              value={due_dateFilter}
              onChange={(e) => setdue_dateFilter(e.target.value)}
              className="p-2 border rounded-lg w-full"
            />
          </div>
        </article>
        <button
          onClick={handleClearFilters}
          className="mt-4 p-2 bg-secondary text-white rounded"
        >
          Limpiar Filtros
        </button>
      </div>
      <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {currentTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            grouping="estatus"
            onEdit={async () => handleEditClick(task)}
          />
        ))}
      </article>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-l"
        >
          Anterior
        </button>
        <span className="px-4 py-2 bg-gray-200 text-gray-800">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-r"
        >
          Siguiente
        </button>
      </div>
      {isModalOpen && selectedTask && (
        <TaskEditModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          task={selectedTask}
        />
      )}
      {isCreateModalOpen && (
        <TaskCreateModal
          isOpen={isCreateModalOpen}
          onClose={handleCloseCreateModal}
        />
      )}
    </section>
  );
};

export default HomeScreen;
