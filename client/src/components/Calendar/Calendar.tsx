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
		<div className="calendar__container">
			<ul className="calendar__week">
				<li className="week__item">Sun</li>
				<li className="week__item">Mon</li>
				<li className="week__item">Tue</li>
				<li className="week__item">Wed</li>
				<li className="week__item">Thu</li>
				<li className="week__item">Fri</li>
				<li className="week__item">Sat</li>
			</ul>
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
		</div>
	)
}
