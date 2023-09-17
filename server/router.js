import { Router } from "express"
import TaskController from "./controllers/TaskController.js"
import DayController from "./controllers/DayController.js"

const router = new Router()

router.get("/tasks", TaskController.getAll)
router.post("/tasks/disable", TaskController.disable)
router.post("/tasks/enableOrCreate", TaskController.enableOrCreate)
router.get("/days", DayController.getAll)
router.post("/days/updateDay", DayController.updateDay)

export default router
