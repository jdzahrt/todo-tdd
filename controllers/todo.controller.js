const toDoModel = require('../model/todo.model')

exports.createToDo = async (req, res, next) => {
    try {
        const ok = await toDoModel.create(req.body)

        res.status(201).json(ok)
    } catch (error) {
        next(error)
    }
}

exports.getToDos = async (req, res, next) => {
    try {
        const toDos = await toDoModel.find({});

        res.status(200).json(toDos)
    } catch (e) {
        next(e)
    }
};

exports.getToDoById = async (req, res, next) => {
    try {
        const toDo = await toDoModel.findById(req.params.toDoId);

        if (toDo)
            res.status(200).json(toDo);
        else {
            res.status(404).send();
        }

    } catch (e) {
        next(e)
    }
};

exports.updateToDo = async (req, res, next) => {
    try {
        const updatedToDo = await toDoModel.findByIdAndUpdate(req.params.toDoId, req.body, {
            new: true,
            useFindAndModify: false
        });

        if (updatedToDo)
            res.status(200).json(updatedToDo);
        else {
            res.status(404).send();
        }
    } catch (e) {
        next(e)
    }
};

exports.deleteToDo = async (req, res, next) => {
    try {
        const toDo = await toDoModel.findByIdAndDelete(req.params.toDoId);

        if (toDo)
            res.status(200).json(toDo);
        else {
            res.status(404).send();
        }
    } catch (e) {
        next(e)
    }
};
