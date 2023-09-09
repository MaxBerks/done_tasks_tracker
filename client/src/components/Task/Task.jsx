import React from "react"
import "./Task.scss"
import { FaSquare } from "react-icons/fa"
import classNames from "classnames"

export default function Task({ taskObj, onChoose, removeTask }) {
	const taskTickBtnClassName = classNames({ 'task__chooseBtn': true, 'choosed': taskObj.isChoosed })
	return (
		<div className="taskList__task">
			<h3 className="task__label" onClick={() => removeTask(taskObj.label)}>
				{taskObj.label}
			</h3>
			<FaSquare className={taskTickBtnClassName} onClick={() => onChoose(taskObj.label)} />
		</div>
	)
}
	