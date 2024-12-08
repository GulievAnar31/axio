import axios from "axios";

export const api = axios.create({
	baseURL: "http://localhost:4000",
});

// Если бы запросов было больше можно было бы все вынести в Redux Query

export const fetchCalendar = () => api.get("/calendar");
export const fetchTasks = (date: string) => api.get(`/tasks?date=${date}`);
export const createTask = (task: { title: string; date: string }) =>
	api.post("/tasks", task);
export const fetchDeleteTask = (taskId: number) => api.delete(`/tasks/${taskId}`);