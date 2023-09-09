import React, { useState } from "react"
import "./TaskList.scss"
import { RiArrowLeftDoubleFill } from "react-icons/ri"
import { AiFillPlusCircle } from "react-icons/ai"
import Task from "../Task/Task"
import AddTask from "../AddTask/AddTask"
import classNames from "classnames"

export default function TaskList({ taskList, onChoose, addTask, removeTask }) {
	const [isClosed, setIsClosed] = useState(true)
	const [isActiveAddTask, setIsActiveAddTask] = useState(false)

	const taskListWrapperClassName = classNames({ taskList__wrapper: true, closed: isClosed })
	const taskListOpenBtnClassName = classNames({ taskList__openBtn: true, closed: isClosed })

	const toggleAddTask = () => {
		setIsActiveAddTask(!isActiveAddTask)
	}

	const toggleIsClosed = () => {
		setIsClosed(!isClosed)
	}

	return (
		<div className="taskList">
			<div className={taskListWrapperClassName}>
				<div className="taskList__openBtnWrapper" onClick={() => toggleIsClosed()}>
					<RiArrowLeftDoubleFill className={taskListOpenBtnClassName} />
				</div>

				<div className="taskList__content">
					<h2 className="taskList__title">Task List</h2>

					<div className="taskList__list">
						{taskList.map((task, i) => (
							<Task key={i} taskObj={task} onChoose={onChoose} removeTask={removeTask} />
						))}
					</div>

					<div className="taskList__footer">
						<AiFillPlusCircle
							style={isActiveAddTask ? { display: "none" } : {}}
							className="taskList__addBtn"
							onClick={() => toggleAddTask()}
						/>
						<AddTask
							isActive={isActiveAddTask}
							toggleIsActive={toggleAddTask}
							onAddTask={1}
							addTask={addTask}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
