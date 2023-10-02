import React from "react"
import "./Task.scss"
import { FaSquare } from "react-icons/fa"
import classNames from "classnames"

type TypeTaskObj = {
	id: string
	name: string
	isEnabled: boolean
	isChoosed: boolean
}

type TypeRemoveTaskFunction = (name: string, id: string) => void
type TypeOnChooseFunction = (name: string) => void

type TypeTaskProps = {
	taskObj: TypeTaskObj
	onChoose: TypeOnChooseFunction
	removeTask: TypeRemoveTaskFunction
}

const Task = ({ taskObj, onChoose, removeTask }: TypeTaskProps): JSX.Element => {
	const taskTickBtnClassName = classNames({ task__chooseBtn: true, choosed: taskObj.isChoosed })
	return (
		<div className="taskList__task">
			<h3 className="task__name" onClick={() => removeTask(taskObj.name, taskObj.id)}>
				{taskObj.name}
			</h3>
			<FaSquare className={taskTickBtnClassName} onClick={() => onChoose(taskObj.name)} />
		</div>
	)
}

export default Task
