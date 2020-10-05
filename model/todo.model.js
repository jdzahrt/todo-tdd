const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        required: true
    }
});

const toDoModel  = mongoose.model("toDo", toDoSchema);

module.exports = toDoModel;
