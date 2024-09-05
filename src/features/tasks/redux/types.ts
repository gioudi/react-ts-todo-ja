export interface Task {
  id: number;
  title: string;
  priority: string;
  status: string;
  dateline: Date | string;
}

export interface TasksState {
  tasks: Task[];
}
