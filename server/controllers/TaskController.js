import TaskService from "../services/TaskService.js"

class TaskController {
	async getAll(req, res) {
		try {
			const tasks = await TaskService.getAll()
			return res.json(tasks)
		} catch (error) {
			res.status(500).json(error.message)
		}
	}
}

export default new TaskController()
