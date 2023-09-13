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

	async disable(req, res) {
		try {
			const task = await TaskService.disable(req.body)
			return res.json(task)
		} catch (error) {
			res.status(500).json(error.message)
		}
	}

	async enableOrCreate(req, res) {
		try {
			const newTask = await TaskService.enableOrCreate(req.body.name)
			return res.json(newTask)
		} catch (error) {
			res.status(500).json(error.message)
		}
	}
}

export default new TaskController()
