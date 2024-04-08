import express from "express"
import router from "./router.js"
import mongoose from "mongoose"
import cors from "cors"

const PORT = 5000
const DB_URL = `mongodb://mongodb:27017/done_tasks_tracker`

const corsOptions = {
	origin: "*",
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
}

const app = express()

app.use(cors(corsOptions))
app.use(express.json())
app.use("/api", router)

async function startApp() {
	try {
		await mongoose.connect(DB_URL)
		app.listen(PORT, () => console.log("SERVER STARTED ON PORT " + PORT))
	} catch (e) {
		console.log(e)
	}
}

startApp()
