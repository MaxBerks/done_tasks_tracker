import React from "react"
import "./AddTask.scss"
import classNames from "classnames"

export default function AddTask({ isActive, toggleIsActive, addTask }) {
	const addTaskClassName = classNames({ 'addTask': true, 'addTask_active': isActive })
	let inputRef
	
	return (
		<form className={addTaskClassName}>
			<input
				className="addTask__input"
				type="text"
				name="taskName"
				placeholder="Enter task"
				ref={(el) => (inputRef = el)}
			/>
			<button	
				className="addTask__btn"
				onClick={(e) => {
					e.preventDefault()
					addTask(
						inputRef.value.slice(0, 1).toUpperCase() +
							inputRef.value.slice(1, 8).toLowerCase() +
							(inputRef.value.length > 8 ? "..." : "")
					)
					inputRef.value = ""
					toggleIsActive()
				}}
			>
				+
			</button>
		</form>
	)
}
