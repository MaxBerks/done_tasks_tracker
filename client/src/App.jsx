import React, { useState, useEffect } from "react"
import "./App.scss"
import moment from "moment/moment"

import Calendar from "./components/Calendar/Calendar"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import TaskList from "./components/TaskList/TaskList"
import DayInfo from "./components/DayInfo/DayInfo"

export default function App() {
	const [currentMoment, setCurrentMoment] = useState(moment())
	const [taskList, setTaskList] = useState([])
	const [calendar, setCalendar] = useState([])
	const [activeDay, setActiveDay] = useState({ id: -1, tasksToComplete: [], day: moment().clone() })
	const [isActive, setIsActive] = useState(false)
	const [isModalActive, setIsModalActive] = useState(false)

	useEffect(() => {
		updateCalendar()
		setIsActive(false)
	}, [taskList])

	useEffect(() => {
		createCalendar()
		async function getData() {
			let url = `http://localhost:5000/api/tasks`
			const response = await fetch(url)
			const data = await response.json()
			setTaskList(
				data.map((task) => {
					return {
						label: task.name,
						isEnabled: task.isEnabled,
						isChoosed: false,
					}
				})
			)
		}
		getData()
	}, [])

	const createCalendar = () => {
		let buffCalendar = []
		const startDay = currentMoment.startOf("month").clone()
		const endDay = currentMoment.endOf("month").clone()

		let day = startDay.clone()
		let i = 0
		do {
			buffCalendar.push({
				id: i,
				tasksToComplete: [
					...taskList.map((item) => {
						return {
							label: item.label,
							isCompleted: false,
						}
					}),
				],
				day: day.clone(),
			})
			day.add(1, "d")
			i++
		} while (!day.isAfter(endDay, "day"))

		setCalendar(buffCalendar)
	}

	const isItCompleted = (taskList, task) => {
		for (let i = 0; i < taskList.length; i++) {
			if (taskList[i].label === task.label && taskList[i].isCompleted) {
				return true
			}
		}
		return false
	}

	const updateCalendar = () => {
		let buffCalendar = []

		calendar.forEach((calendarDay) => {
			buffCalendar.push({
				id: calendarDay.id,
				tasksToComplete: taskList.map((task) => {
					return {
						label: task.label,
						isCompleted: isItCompleted(calendarDay.tasksToComplete, task),
					}
				}),
				day: calendarDay.day,
			})
		})

		setCalendar(buffCalendar)
	}

	const addTask = (label) => {
		if (label === "") return
		setTaskList([...taskList, { label: label, isCompleted: false }])
	}

	const removeTask = (label) => {
		if (label === "") return
		setTaskList([...taskList.filter((item) => item.label !== label)])
	}

	const updateActive = (calendarDay) => {
		setActiveDay(calendarDay)

		const isSameDate =
			activeDay &&
			calendarDay.day.date() === activeDay.day.date() &&
			calendarDay.day.month() === activeDay.day.month() &&
			calendarDay.day.year() === activeDay.day.year()

		setIsActive(!isSameDate || !isActive)
	}

	const toggleIsCompleted = (calendarDay, label) => {
		let temp = JSON.parse(JSON.stringify(calendarDay.tasksToComplete))
		temp.map((item) => {
			if (item.label === label) item.isCompleted = !item.isCompleted
		})
		setCalendar(
			calendar.map((item) => {
				if (item.day.date() === calendarDay.day.date()) {
					item.tasksToComplete = JSON.parse(JSON.stringify(temp))
				}
				return item
			})
		)
	}

	const toggleIsChoosed = (label) => {
		let temp = JSON.parse(JSON.stringify(taskList))
		temp.map((item) => {
			if (item.label === label) {
				item.isChoosed = !item.isChoosed
			}
		})
		setTaskList(temp)
	}

	const nextMonth = () => {
		setCurrentMoment(currentMoment.add(1, "month").clone())
		createCalendar()
		setIsActive(false)
	}

	const prevMonth = () => {
		setCurrentMoment(currentMoment.subtract(1, "month").clone())
		createCalendar()
		setIsActive(false)
	}

	return (
		<div className="App">
			<Header currentMoment={currentMoment} onNextMonth={nextMonth} onPrevMonth={prevMonth} />
			<div className="content">
				<DayInfo isActive={isActive} activeDay={activeDay} onComplete={toggleIsCompleted} />
				<Calendar
					taskList={taskList}
					activeDay={activeDay}
					isActive={isActive}
					onActive={updateActive}
					calendar={calendar}
				/>
				<TaskList
					taskList={taskList}
					onChoose={toggleIsChoosed}
					onAddTask={addTask}
					onModal={() => setIsModalActive(!isModalActive)}
					addTask={addTask}
					removeTask={removeTask}
				/>
			</div>
			<Footer />
		</div>
	)
}
