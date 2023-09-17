import mongoose from "mongoose"

const Day = new mongoose.Schema({
	day: { type: Number, required: true },
	month: { type: Number, required: true },
	year: { type: Number, required: true },
	tasks: [
		{
			name: { type: String, required: true },
			isCompleted: { type: Boolean, required: true },
			taskId: { type: String, required: true },
		},
	],
})

export default mongoose.model("Day", Day)
