import React, { useState, useEffect } from "react"
import "./App.scss"
import moment from "moment/moment"

import Calendar from "./components/Calendar/Calendar"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import TaskList from "./components/TaskList/TaskList"
import DayInfo from "./components/DayInfo/DayInfo"

type TypeTaskWithID = {
	isCompleted: boolean
	name: string
	taskId: string
}

type TypeDay = {
	day: number
	month: number
	year: number
	tasks: TypeTaskWithID[]
}

type TypeTask = {
	isEnabled: false
	name: "Workout"
	_id: string
}

type TypeTaskObj = {
	id: string
	label: string
	isEnabled: boolean
	isCompleted: boolean
}

interface ActiveDayState {
	id: number
	tasksToComplete: TypeTaskObj[]
	day: moment.Moment
}

type TypeTaskToCompleteObj = {
	id: string
	label: string
	isEnabled: boolean
	isCompleted: boolean
}

type TypeTaskChoose = {
	id: string
	label: string
	isEnabled: boolean
	isChoosed: boolean
}

type TypeCalendarDay = {
	day: moment.Moment
	id: number
	tasksToComplete: TypeTaskToCompleteObj[]
}

export default function App() {
	const [currentMoment, setCurrentMoment] = useState<moment.Moment>(moment())
	const [taskList, setTaskList] = useState<TypeTaskChoose[]>([])
	const [calendar, setCalendar] = useState<TypeCalendarDay[]>([])
	const [activeDay, setActiveDay] = useState<ActiveDayState>({
		id: -1,
		tasksToComplete: [],
		day: moment().clone(),
	})
	const [isActive, setIsActive] = useState<boolean>(false)

	useEffect(() => {
		updateCalendar()
		setIsActive(false)
	}, [taskList])

	useEffect(() => {
		const start = async () => {
			await createCalendar()
			updateTaskList()
		}

		start()
	}, [])

	async function updateTaskList() {
		let url = `http://localhost:5000/api/tasks`
		const response = await fetch(url)
		const data = await response.json()
		setTaskList(
			data.map((task: TypeTask) => {
				// console.log(task) //&&&&&&
				return {
					id: task._id,
					label: task.name,
					isEnabled: task.isEnabled,
					isChoosed: false,
				}
			})
		)
	}

	const updateDayData = async (day: ActiveDayState) => {
		// console.log(day) //&&&&&&
		let url = `http://localhost:5000/api/days/updateDay`
		await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				day: day.day.date(),
				month: +day.day.month() + 1,
				year: day.day.year(),
				tasks: JSON.parse(JSON.stringify(day.tasksToComplete)),
			}),
		})
	}

	const createCalendar = async () => {
		let url = `http://localhost:5000/api/days`
		const response = await fetch(url)
		const data = await response.json()
		let currentMonth = data.filter((day: TypeDay) => {
			// console.log(day) //&&&&
			return day.month === +currentMoment.get("month") + 1
		})

		let buffCalendar = []
		const startDay = currentMoment.startOf("month").clone()
		const endDay = currentMoment.endOf("month").clone()

		let day = startDay.clone()
		let i = 0
		do {
			let thisDay = currentMonth.find((item: TypeDay) => {
				// console.log(item) //&&&&
				return item.day === day.get("date")
			})
			let thisDayTasks = thisDay
				? thisDay.tasks.map((task: TypeTaskWithID) => {
						// console.log(task) //&&&&&
						return {
							label: task.name,
							isCompleted: task.isCompleted,
						}
				  })
				: taskList.map((task) => {
						// console.log(task) //&&&&
						return {
							label: task.label,
							isCompleted: false,
						}
				  })

			buffCalendar.push({
				id: i,
				tasksToComplete: [...thisDayTasks],
				day: day.clone(),
			})
			day.add(1, "d")
			i++
		} while (!day.isAfter(endDay, "day"))

		setCalendar(buffCalendar)
	}

	const isItCompleted = (taskList: TypeTaskObj[], task: TypeTaskChoose) => {
		// console.log(taskList) //&&&&
		// console.log(task) //&&&&
		for (let i = 0; i < taskList.length; i++) {
			if (taskList[i].label === task.label && taskList[i].isCompleted) {
				return true
			}
		}
		return false
	}

	const updateCalendar = () => {
		let buffCalendar: TypeCalendarDay[]
		buffCalendar = []
		calendar.forEach((calendarDay: TypeCalendarDay) => {
			buffCalendar.push({
				id: calendarDay.id,
				tasksToComplete: taskList.map((task) => {
					// console.log(task) //&&&&
					return {
						label: task.label,
						isEnabled: task.isEnabled,
						isCompleted: isItCompleted(calendarDay.tasksToComplete, task),
						id: task.id,
					}
				}),
				day: calendarDay.day,
			})
		})

		setCalendar(buffCalendar)
	}

	const addTask = async (label: string) => {
		if (label === "") return

		const formatted =
			label.slice(0, 1).toUpperCase() +
			label.slice(1, 8).toLowerCase() +
			(label.length > 8 ? "..." : "")

		let url = `http://localhost:5000/api/tasks/enableOrCreate`
		await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: formatted }),
		})
		updateTaskList()
	}

	const removeTask = async (label: string, id: string) => {
		if (label === "" || id === "") return
		let url = `http://localhost:5000/api/tasks/disable`
		await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ _id: id }),
		})
		updateTaskList()
	}

	const updateActive = (calendarDay: TypeCalendarDay) => {
		setActiveDay(calendarDay)

		const isSameDate =
			activeDay &&
			calendarDay.day.date() === activeDay.day.date() &&
			calendarDay.day.month() === activeDay.day.month() &&
			calendarDay.day.year() === activeDay.day.year()

		setIsActive(!isSameDate || !isActive)
	}

	const toggleIsCompleted = (calendarDay: TypeCalendarDay, label: string) => {
		let temp = JSON.parse(JSON.stringify(calendarDay.tasksToComplete))
		temp.map((item: TypeTaskObj) => {
			if (item.label === label) item.isCompleted = !item.isCompleted
		})
		setCalendar(
			calendar.map((item) => {
				if (item.day.date() === calendarDay.day.date()) {
					item.tasksToComplete = JSON.parse(JSON.stringify(temp))
					updateDayData(item)
				}

				return item
			})
		)
	}

	const toggleIsChoosed = (label: string) => {
		let temp = JSON.parse(JSON.stringify(taskList))
		temp.map((item: TypeTaskChoose) => {
			if (item.label === label) {
				item.isChoosed = !item.isChoosed
			}
		})
		setTaskList(temp)
	}

	const nextMonth = async () => {
		setCurrentMoment(currentMoment.add(1, "month").clone())
		await createCalendar()
		setIsActive(false)
		updateTaskList()
	}

	const prevMonth = async () => {
		setCurrentMoment(currentMoment.subtract(1, "month").clone())
		await createCalendar()
		setIsActive(false)
		updateTaskList()
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
					addTask={addTask}
					removeTask={removeTask}
				/>
			</div>
			<Footer />
		</div>
	)
}
