import React from "react"
import "./Calendar.scss"
import CalendarDay from "../CalendarDay/CalendarDay"

type TypeTaskObj = {
	id: string
	name: string
	isEnabled: boolean
	isChoosed: boolean
}

type TypeTaskToCompleteObj = {
	id: string
	name: string
	isEnabled: boolean
	isCompleted: boolean
}

type TypeCalendarDay = {
	day: moment.Moment
	id: number
	tasksToComplete: TypeTaskToCompleteObj[]
}

type TypeOnActiveFunction = (calendarDay: TypeCalendarDay) => void

type TypeCalendarProps = {
	calendar: TypeCalendarDay[]
	taskList: TypeTaskObj[]
	activeDay: TypeCalendarDay
	isActive: boolean
	onActive: TypeOnActiveFunction
}

export default function Calendar({
	calendar,
	taskList,
	activeDay,
	isActive,
	onActive,
}: TypeCalendarProps) {
	return (
		<div className="calendar">
			{calendar.map((calendarDay: TypeCalendarDay, i: number) => (
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
