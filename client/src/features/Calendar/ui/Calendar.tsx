import React from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks";
import { loadCalendar } from "../model/calendarSlice";
import { Badge, Box, Typography } from "@mui/material";

export const Calendar: React.FC<{ onDateSelect: (date: string) => void }> = ({
	onDateSelect,
}) => {
	const dispatch = useAppDispatch();
	const { data } = useAppSelector((state) => state.calendar);

	React.useEffect(() => {
		dispatch(loadCalendar());
	}, [dispatch]);

	return (
		<Box display="flex" flexWrap="wrap" gap={2}>
			{Object.entries(data).map(([date, count]) => (
				<Box key={date}>
					<Badge
						badgeContent={count}
						color="primary"
						onClick={() => onDateSelect(date)}
						style={{ cursor: "pointer" }}
					>
						<Typography variant="body2">{date}</Typography>
					</Badge>
				</Box>
			))}
		</Box>
	);
};