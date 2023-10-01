import React, { useRef } from "react"
import "./AddTask.scss"
import classNames from "classnames"

type TypeToggleIsActiveFunction = () => void
type TypAddTaskFunction = (label: string) => void

type TypeAddTaskProps = {
	isActive: boolean
	toggleIsActive: TypeToggleIsActiveFunction
	addTask: TypAddTaskFunction
}

export default function AddTask({ isActive, toggleIsActive, addTask }: TypeAddTaskProps) {
	const addTaskClassName = classNames({ addTask: true, addTask_active: isActive })
	const inputRef = useRef<HTMLInputElement>(null)

	return (
		<form className={addTaskClassName} name="taskForm">
			<input
				className="addTask__input"
				type="text"
				name="taskName"
				placeholder="Enter task"
				ref={inputRef}
			/>
			<button
				className="addTask__btn"
				onClick={(e) => {
					e.preventDefault()
					addTask(inputRef.current!.value)
					inputRef.current!.value = ""
					toggleIsActive()
				}}
			>
				+
			</button>
		</form>
	)
}
