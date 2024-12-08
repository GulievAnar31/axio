import React, { useState } from "react";
import { createTask } from "../../../shared/api/api";
import { TextField, Button, Box, FormHelperText, FormControl } from "@mui/material";
import { useDispatch } from "react-redux";
import { addTask } from "../../TasksList/model/tasksSlice";
import { addTaskToCalendar } from "../../Calendar/model/calendarSlice";
import { validateDate, validateTitle } from "../../../shared/lib/validation/taskValidation";

export const TaskForm: React.FC = () => {
	const [title, setTitle] = useState("");
	const [date, setDate] = useState("");
	const [titleError, setTitleError] = useState<string | null>(null);
	const [dateError, setDateError] = useState<string | null>(null);
	const dispatch = useDispatch();

	const handleSubmit = async () => {
		const titleValidation = validateTitle(title);
		const dateValidation = validateDate(date);

		if (titleValidation || dateValidation) {
			setTitleError(titleValidation);
			setDateError(dateValidation);
			return;
		}

		const newTask = await createTask({ title, date });

		dispatch(addTask({ ...newTask.data, completed: false }));

		dispatch(addTaskToCalendar({ date }));

		setTitle("");
		setDate("");
		setTitleError(null);
		setDateError(null);
	};

	return (
		<Box>
			<FormControl fullWidth error={!!titleError} sx={{ mb: 2 }}>
				<TextField
					label="Название задачи"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				{titleError && <FormHelperText>{titleError}</FormHelperText>}
			</FormControl>

			<FormControl fullWidth error={!!dateError} sx={{ mb: 2 }}>
				<TextField
					label="Дата выполнения"
					type="date"
					value={date}
					onChange={(e) => setDate(e.target.value)}
					slotProps={{
						inputLabel: {
							shrink: true,
						},
					}}
				/>
				{dateError && <FormHelperText>{dateError}</FormHelperText>}
			</FormControl>

			<Button onClick={handleSubmit} sx={{ mt: 1 }}>
				Добавить
			</Button>
		</Box>
	);
};