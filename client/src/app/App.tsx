import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { Calendar } from "../features/Calendar/ui/Calendar";
import { TaskList } from "../features/TasksList/ui/TasksList";
import { TaskForm } from "../features/TasksForm/ui/TasksForm";
import { Box, CssBaseline, Typography, Paper } from "@mui/material";

const App: React.FC = () => {
	const [selectedDate, setSelectedDate] = React.useState<string | null>(null);

	const handleDateSelect = (date: string) => {
		setSelectedDate(date);
	};

	return (
		<Provider store={store}>
			<CssBaseline />
			<Box p={4}>
				<Typography variant="h1" align="center" gutterBottom>
					ToDo Calendar
				</Typography>

				<Box mb={4}>
					<Paper elevation={3} sx={{ p: 3 }}>
						<Typography variant="h5" gutterBottom>
							Календарь
						</Typography>
						<Calendar onDateSelect={handleDateSelect} />
					</Paper>
				</Box>

				<Box mb={4}>
					<Paper elevation={3} sx={{ p: 3 }}>
						<Typography variant="h5" gutterBottom>
							Добавить задачу
						</Typography>
						<TaskForm />
					</Paper>
				</Box>

				{selectedDate && (
					<Box>
						<Typography variant="h4" gutterBottom>
							Задачи на {selectedDate}:
						</Typography>
						<Paper elevation={3} sx={{ p: 3 }}>
							<TaskList date={selectedDate} />
						</Paper>
					</Box>
				)}
			</Box>
		</Provider>
	);
};

export default App;