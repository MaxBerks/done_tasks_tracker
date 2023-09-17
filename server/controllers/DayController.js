import DayService from "../services/DayService.js"

class DayController {
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
