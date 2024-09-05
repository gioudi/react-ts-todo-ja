import { createSlice } from '@reduxjs/toolkit';
import { TasksState } from './types';

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
});

export default tasksSlice.reducer;
