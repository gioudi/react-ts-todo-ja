export type Status = 'Por hacer' | 'En progreso' | 'Completado';
export type Priority = 'Baja' | 'Media' | 'Alta';
export interface Task {
  id: number;
  name: string;
  status: Status;
  priority: Priority;
  image?: string;
  due_date: string;
  description?: string;
}

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error?: string;
  success?: string;
}
