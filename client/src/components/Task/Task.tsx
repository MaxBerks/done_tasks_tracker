import React from "react"
import "./Task.scss"
import { FaSquare } from "react-icons/fa"
import classNames from "classnames"

type TypeTaskObj = {
	id: string
	label: string
	isEnabled: boolean
	isChoosed: boolean
}

type TypeRemoveTaskFunction = (label: string, id: string) => void
type TypeOnChooseFunction = (label: string) => void

type TypeTaskProps = {
	taskObj: TypeTaskObj
	onChoose: TypeOnChooseFunction
	removeTask: TypeRemoveTaskFunction
}

const Task = ({ taskObj, onChoose, removeTask }: TypeTaskProps): JSX.Element => {
	const taskTickBtnClassName = classNames({ task__chooseBtn: true, choosed: taskObj.isChoosed })
	return (
		<div className="taskList__task">
			<h3 className="task__label" onClick={() => removeTask(taskObj.label, taskObj.id)}>
				{taskObj.label}
			</h3>
			<FaSquare className={taskTickBtnClassName} onClick={() => onChoose(taskObj.label)} />
		</div>
	)
}

export default Task

// import React from "react"
// import "./Task.scss"
// import { FaSquare } from "react-icons/fa"
// import classNames from "classnames"

// export default function Task({ taskObj, onChoose, removeTask }) {
// 	const taskTickBtnClassName = classNames({ task__chooseBtn: true, choosed: taskObj.isChoosed })
// 	return (
// 		<div className="taskList__task">
// 			<h3 className="task__label" onClick={() => removeTask(taskObj.label, taskObj.id)}>
// 				{taskObj.label}
// 			</h3>
// 			<FaSquare className={taskTickBtnClassName} onClick={() => onChoose(taskObj.label)} />
// 		</div>
// 	)
// }
