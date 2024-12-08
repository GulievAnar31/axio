import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCalendar } from "../../../shared/api/api";

export const loadCalendar = createAsyncThunk("calendar/load", async () => {
	try {
		const response = await fetchCalendar();
		return response.data;
	} catch (err) {
		console.error(err);
		//sentry
	}
});

const calendarSlice = createSlice({
	name: "calendar",
	initialState: { data: {}, status: "idle" } as {
		data: Record<string, number>;
		status: "idle" | "loading" | "failed";
	},
	reducers: {
		addTaskToCalendar: (state, action) => {
			const { date } = action.payload;
			if (state.data[date]) {
				state.data[date] += 1;
			} else {
				state.data[date] = 1;
			}
		},
		removeTaskFromCalendar: (state, action) => {
			const { date } = action.payload;
			if (state.data[date] && state.data[date] > 0) {
				state.data[date] -= 1;

				if (state.data[date] === 0) {
					delete state.data[date];
				}
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadCalendar.pending, (state) => {
				state.status = "loading";
			})
			.addCase(loadCalendar.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = "idle";
			})
			.addCase(loadCalendar.rejected, (state) => {
				state.status = "failed";
			});
	},
});

export const { addTaskToCalendar, removeTaskFromCalendar } = calendarSlice.actions;

export default calendarSlice.reducer;