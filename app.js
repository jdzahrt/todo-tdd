const express = require("express");
const toDoRoutes = require('./routers/todo.routes');
const app = express();

const mongodb = require('./mongodb/mongodb.connect');

mongodb.connect();

app.use(express.json());

app.use('/todos', toDoRoutes);
app.use('/todos:todoId', toDoRoutes);

app.use((error, req, res, next) => {
    res.status(500).json({message: "ValidationError: ToDo validation not working"})
})

app.get("/", (req, res) => {
    res.json("Hello world!")
});

module.exports= app;
