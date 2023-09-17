import DayService from "../services/DayService.js"

class DayController {
	async getAll(req, res) {
		try {
			const days = await DayService.getAll()
			return res.json(days)
		} catch (error) {
			res.status(500).json(error.message)
		}
	}

	async updateDay(req, res) {
		try {
			const day = await DayService.updateDay(req.body)
			return res.json(day)
		} catch (error) {
			res.status(500).json(error.message)
		}
	}
}

export default new DayController()
