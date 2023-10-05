import React from "react"
import "./DayInfoTask.scss"
import { FaCheckSquare } from "react-icons/fa"
import classNames from "classnames"

type TypeTaskObj = {
	name: string
	isCompleted: boolean
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

interface ActiveDayState {
	id: number
	tasksToComplete: TypeTaskToCompleteObj[]
	day: moment.Moment
}

type TypeToggleIsCompletedFunction = (calendarDay: TypeCalendarDay, name: string) => void

type TypeDayInfoTaskProps = {
	activeDay: ActiveDayState
	taskObj: TypeTaskObj
	onComplete: TypeToggleIsCompletedFunction
}

export default function DayInfoTask({ activeDay, taskObj, onComplete }: TypeDayInfoTaskProps) {
	const completedTaskBtnClassName = classNames({
		task__tickBtn: true,
		completed: taskObj.isCompleted,
	})

	return (
		<div className="dayInfo__task">
			<h3 className="task__name">{taskObj.name}</h3>
			<FaCheckSquare
				className={completedTaskBtnClassName}
				onClick={() => onComplete(activeDay, taskObj.name)}
			/>
		</div>
	)
}
