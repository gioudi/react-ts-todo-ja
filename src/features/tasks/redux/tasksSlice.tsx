import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Task, TasksState } from './types';
import { apiTaskClient } from '../../../api';

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: '',
};

export const handleFetchTasks = createAsyncThunk(
  'tasks/handleFetchTasks',
  async () => {
    const response = await apiTaskClient.get<Task[]>('/Tasks');
    return response.data;
  }
);

export const handleCreateTask = createAsyncThunk(
  'tasks/handleCreateTask',
  async (newTask: Partial<Task>) => {
    const response = await apiTaskClient.post<Task>('/tasks', newTask);
    return response.data;
  }
);

export const handleUpdateTask = createAsyncThunk(
  'tasks/handleUpdateTask',
  async (updatedTask: Task) => {
    const response = await apiTaskClient.put<Task>(
      `tasks/${updatedTask.id}`,
      updatedTask
    );
    return response.data;
  }
);

export const handleDeleteTask = createAsyncThunk(
  'tasks/handleDeleteTask',
  async (taskId: string) => {
    await apiTaskClient.delete(`tasks/${taskId}`);
    return taskId;
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleFetchTasks.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(handleFetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(handleFetchTasks.rejected, (state, action) => {
        state.error = action.error.message || 'Error fetching tasks';
        state.loading = false;
      })
      .addCase(handleCreateTask.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(handleCreateTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(handleCreateTask.rejected, (state, action) => {
        state.error = action.error.message || 'Error creating a task';
        state.loading = false;
      })
      .addCase(handleUpdateTask.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(handleUpdateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(handleUpdateTask.rejected, (state, action) => {
        state.error = action.error.message || 'Error updating a task';
        state.loading = false;
      })
      .addCase(handleDeleteTask.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(handleDeleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task) => task.id !== Number(action.payload)
        );
      })
      .addCase(handleDeleteTask.rejected, (state, action) => {
        state.error = action.error.message || 'Error removing a task';
        state.loading = false;
      });
  },
});

export default tasksSlice.reducer;
