// Create DB and collection
db = new Mongo().getDB("done_tasks_tracker");
db.createCollection("tasks", { capped: false });
db.createCollection("days", { capped: false });
