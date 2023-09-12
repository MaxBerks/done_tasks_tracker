import { Router } from "express"
import TaskController from "./controllers/TaskController.js"

const router = new Router()

router.get("/tasks", TaskController.getAll)

export default router
