export const validateTitle = (title: string): string | null => {
	if (!title) {
		return "Название задачи обязательно";
	}
	return null;
};

export const validateDate = (date: string): string | null => {
	const today = new Date().toISOString().split("T")[0];
	if (date === "") {
		return "Дата выполнения обязательна";
	} else if (date > today) {
		return "Дата не может быть в будущем";
	}
	return null;
};