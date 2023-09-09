import React from "react"
import "./DayInfoTask.scss"
import { FaCheckSquare } from "react-icons/fa"
import classNames from "classnames"

export default function DayInfoCompletedTask({ activeDay, taskObj, onComplete }) {
	const completedTaskBtnClassName = classNames({ 'task__tickBtn': true, "completed": taskObj.isCompleted })
	
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
