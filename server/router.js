import { Router } from "express"
import TaskController from "./controllers/TaskController.js"

const router = new Router()

router.get("/tasks", TaskController.getAll)
router.post("/tasks/disable", TaskController.disable)
router.post("/tasks/enableOrCreate", TaskController.enableOrCreate)

export default router
