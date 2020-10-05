const express = require('express');
const router = express.Router();
const toDoController = require('../controllers/todo.controller');

router.post('/', toDoController.createToDo);
router.get('/', toDoController.getToDos);
router.get('/:toDoId', toDoController.getToDoById);
router.put('/:toDoId', toDoController.updateToDo)
router.delete('/:toDoId', toDoController.deleteToDo);

module.exports = router;
