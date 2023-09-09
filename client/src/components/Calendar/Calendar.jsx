import React from "react"
import "./Calendar.scss"
import CalendarDay from "../CalendarDay/CalendarDay"

export default function Calendar({ calendar, taskList, activeDay, isActive, onActive }) {
	return (
		<div className="calendar">
			{calendar.map((calendarDay, i) => (
				<CalendarDay
					taskList={taskList}
					key={i}
					calendarDay={calendarDay}
					activeDay={activeDay}
					isActive={isActive}
					onActive={onActive}
				/>
			))}
		</div>
	)
}
