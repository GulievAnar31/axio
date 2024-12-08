import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "../../features/Calendar/model/calendarSlice";
import taskReducer from "../../features/TasksList/model/tasksSlice";

export const store = configureStore({
	reducer: {
		calendar: calendarReducer,
		tasks: taskReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;