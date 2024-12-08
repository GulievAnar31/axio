import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTasks } from "../../../shared/api/api";

export const loadTasks = createAsyncThunk("tasks/load", async (date: string) => {
	const response = await fetchTasks(date);
	return response.data;
});

const taskSlice = createSlice({
	name: "tasks",
	initialState: { data: [], status: "idle" } as {
		data: { id: number; title: string; completed: boolean }[];
		status: "idle" | "loading" | "failed";
	},
	reducers: {
		addTask: (state, action) => {
			state.data.push(action.payload);
		},
		updateTaskStatus: (state, action) => {
			const task = state.data.find((task) => task.id === action.payload.id);
			if (task) {
				task.completed = action.payload.completed;
			}
		},
		deleteTask: (state, action) => {
			state.data = state.data.filter((task) => task.id !== action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadTasks.pending, (state) => {
				state.status = "loading";
			})
			.addCase(loadTasks.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = "idle";
			})
			.addCase(loadTasks.rejected, (state) => {
				state.status = "failed";
			});
	},
});

export const { addTask, updateTaskStatus, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;