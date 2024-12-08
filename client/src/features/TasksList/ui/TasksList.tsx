import React from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks";
import { loadTasks } from "../model/tasksSlice";
import { Checkbox, IconButton, List, ListItem, Typography } from "@mui/material";
import { updateTaskStatus, deleteTask } from "../model/tasksSlice";
import { fetchDeleteTask } from "../../../shared/api/api";
import { removeTaskFromCalendar } from "../../Calendar/model/calendarSlice";

export const TaskList: React.FC<{ date: string }> = ({ date }) => {
	const dispatch = useAppDispatch();
	const { data } = useAppSelector((state) => state.tasks);

	React.useEffect(() => {
		dispatch(loadTasks(date));
	}, [dispatch, date]);

	const handleCheckboxChange = async (taskId: number, completed: boolean) => {
		try {
			dispatch(updateTaskStatus({ id: taskId, completed: !completed }));
		} catch (err) {
			console.log(err);
			// sentry
		}
	};

	const handleDelete = async (taskId: number) => {
		try {
			await fetchDeleteTask(taskId);
			dispatch(deleteTask(taskId));
			dispatch(removeTaskFromCalendar({ date }));
		} catch (err) {
			console.error(err);
			// sentry
		}
	};

	return (
		<List>
			{data.map((task) => (
				<ListItem key={task.id}>
					<Checkbox
						checked={task.completed}
						onChange={() => handleCheckboxChange(task.id, task.completed)}
					/>
					<Typography variant="body1" sx={{ flex: 1 }}>
						{task.title}
					</Typography>
					<IconButton onClick={() => handleDelete(task.id)} color="error">
						X
					</IconButton>
				</ListItem>
			))}
		</List>
	);
};
