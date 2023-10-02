import React from "react"
import "./DayInfo.scss"
import DayInfoTask from "../DayInfoTask/DayInfoTask"
import classNames from "classnames"

type TypeTaskToCompleteObj = {
	id: string
	label: string
	isEnabled: boolean
	isCompleted: boolean
}

type TypeCalendarDay = {
	day: moment.Moment
	id: number
	tasksToComplete: TypeTaskToCompleteObj[]
}

type TypeToggleIsCompletedFunction = (calendarDay: TypeCalendarDay, label: string) => void

type TypeTaskObj = {
	id: string
	label: string
	isEnabled: boolean
	isCompleted: boolean
}

type TypeActiveDay = {
	day: moment.Moment
	id: number
	tasksToComplete: TypeTaskObj[]
}

type TypeDayInfoProps = {
	isActive: boolean
	activeDay: TypeActiveDay
	onComplete: TypeToggleIsCompletedFunction
}

export default function DayInfo({ isActive, activeDay, onComplete }: TypeDayInfoProps) {
	const dayInfoWrapperClassName = classNames({ dayInfo__wrapper: true, open: isActive })
	return (
		<div className="dayInfo">
			<div className={dayInfoWrapperClassName}>
				<div className="dayInfo__header">
					<h3 className="dayInfo__title">Day info</h3>
					<h2 className="dayInfo__date">{activeDay.day.format("Do [of] MMMM")}</h2>
				</div>
				<div className="dayInfo__tasksToCompleteWrapper">
					{activeDay.tasksToComplete
						.filter((task) => task.isEnabled)
						.map((task, i: number) => (
							<DayInfoTask key={i} activeDay={activeDay} taskObj={task} onComplete={onComplete} />
						))}
				</div>
			</div>
		</div>
	)
}
