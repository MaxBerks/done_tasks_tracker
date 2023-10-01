import React from "react"
import "./Calendar.scss"
import CalendarDay from "../CalendarDay/CalendarDay"

type TypeTaskObj = {
	id: string
	label: string
	isEnabled: boolean
	isChoosed: boolean
}

type TypeTaskToCompleteObj = {
	id: string
	label: string
	isEnabled: boolean
	isCompleted: boolean
}

type TypeCalendarDay = {
	day: any //!!!!!!!!!!!!!!!!!!!!!!
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
// import React from "react"
// import "./Calendar.scss"
// import CalendarDay from "../CalendarDay/CalendarDay"

// export default function Calendar({ calendar, taskList, activeDay, isActive, onActive }) {
// 	return (
// 		<div className="calendar">
// 			{calendar.map((calendarDay, i) => (
// 				<CalendarDay
// 					taskList={taskList}
// 					key={i}
// 					calendarDay={calendarDay}
// 					activeDay={activeDay}
// 					isActive={isActive}
// 					onActive={onActive}
// 				/>
// 			))}
// 		</div>
// 	)
// }
