import Day from "../models/Day.js"

class DayService {
	async getAll() {
		const days = await Day.find()
		return days
	}

	async updateDay(day) {
		console.log(day)
		let isSmthCompleted = 0
		day.tasks.forEach((task) => {
			if (task.isCompleted) {
				isSmthCompleted = 1
			}
		})
		// &
		let updatedDay
		if (!isSmthCompleted) {
			updatedDay = Day.findOneAndDelete({ day: day.day, month: day.month, year: day.year })
		} else {
			updatedDay = Day.findOneAndUpdate(
				{ day: day.day, month: day.month, year: day.year },
				{
					tasks: day.tasks.map((task) => {
						return {
							name: task.name,
							isCompleted: task.isCompleted,
							taskId: task.taskId,
						}
					}),
				}
			).then((newDay) => {
				if (newDay) {
					return newDay
				} else {
					return Day.create({
						day: day.day,
						month: day.month,
						year: day.year,
						tasks: day.tasks.map((task) => {
							return {
								name: task.name,
								isCompleted: task.isCompleted,
								taskId: task.taskId,
							}
						}),
					})
				}
			})
		}
		return updatedDay
	}
}

export default new DayService()
