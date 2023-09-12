import Task from "../models/Task.js"

class TaskService {
	async getAll() {
		const tasks = await Task.find()
		return tasks
	}
}

export default new TaskService()
