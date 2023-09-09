	import React from "react"
import "./DayInfo.scss"
import DayInfoTask from "../DayInfoTask/DayInfoTask"
import classNames from "classnames"

export default function DayInfo({ isActive, activeDay, onComplete }) {
	const dayInfoWrapperClassName = classNames({ 'dayInfo__wrapper': true, "open": isActive })

	return (
		<div className="dayInfo">
			<div className={dayInfoWrapperClassName}>
				<div className="dayInfo__header">
					<h3 className="dayInfo__title">Day info</h3>
					<h2 className="dayInfo__date">
						{activeDay.day.format("Do [of] MMMM")}
					</h2>
				</div>
				<div className="dayInfo__tasksToCompleteWrapper">
					{activeDay.tasksToComplete.map((task, i) => (
						<DayInfoTask key={i} activeDay={activeDay} taskObj={task} onComplete={onComplete} />
					))}
				</div>
			</div>
		</div>
	)
}
