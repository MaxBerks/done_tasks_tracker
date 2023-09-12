import mongoose from "mongoose"

const Task = new mongoose.Schema({
	name: { type: String, required: true },
	isEnabled: { type: Boolean, required: true },
})

export default mongoose.model("Task", Task)
