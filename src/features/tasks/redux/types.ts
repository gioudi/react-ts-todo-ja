type Status = 'Por hacer' | 'En progreso' | 'Completado';
type Priority = 'Baja' | 'Media' | 'Alta';
export interface Task {
  id: number;
  name: string;
  status: Status;
  priority: Priority;
  image?: string;
  dueDate: string;
  description?: string;
}

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error?: string;
}
