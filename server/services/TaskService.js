import Task from "../models/Task.js"

class TaskService {
	async getAll() {
		const tasks = await Task.find()
		return tasks
	}

	async disable(task) {
		if (!task._id) {
			throw new Error("No ID was declared")
		}
		const disabledTask = await Task.findByIdAndUpdate(task._id, { isEnabled: false })
		return disabledTask
	}

	async enableOrCreate(name) {
		const newTask = Task.findOneAndUpdate({ name: name }, { isEnabled: true }).then((task) => {
			if (!task) {
				return Task.create({ name: name, isEnabled: true })
			} else {
				return task
			}
		})
		return newTask
	}
}

export default new TaskService()
