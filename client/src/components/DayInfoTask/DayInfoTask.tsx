import React from "react"
import "./DayInfoTask.scss"
import { FaCheckSquare } from "react-icons/fa"
import classNames from "classnames"

type TypeTaskObj = {
	label: string
	isCompleted: boolean
}

type TypeTaskToCompleteObj = {
	id: string
	label: string
	isEnabled: boolean
	isChoosed: boolean
}

type TypeCalendarDay = {
	day: any //!!!!!!!!!!!!!!!!!!!!!!
	id: number
	tasksToComplete: TypeTaskToCompleteObj[]
}

type TypeToggleIsCompletedFunction = (calendarDay: TypeCalendarDay, label: string) => void

type TypeDayInfoTaskProps = {
	activeDay: any //!!!!!!!!!!!!!!!!!!!!!!
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
			<h3 className="task__label">{taskObj.label}</h3>
			<FaCheckSquare
				className={completedTaskBtnClassName}
				onClick={() => onComplete(activeDay, taskObj.label)}
			/>
		</div>
	)
}
