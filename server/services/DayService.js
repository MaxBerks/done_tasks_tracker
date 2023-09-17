import Day from "../models/Day.js"

class DayService {
	async updateDay(day) {
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
							name: task.label,
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
								name: task.label,
								isCompleted: task.isCompleted,
								taskId: task.id,
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

// {
//   day: 1,
//   month: 9,
//   year: 2023,
//   tasks: [
//     {
//       label: 'Reading',
//       isEnabled: true,
//       isCompleted: true,
//       id: '65016d5f6170c504517dfca7'
//     },
//     {
//       label: 'Workout',
//       isEnabled: false,
//       isCompleted: false,
//       id: '65016d686170c504517dfcab'
//     },
//     {
//       label: 'Tea',
//       isEnabled: true,
//       isCompleted: true,
//       id: '65016d6c6170c504517dfcaf'
//     }
//   ]
// }
