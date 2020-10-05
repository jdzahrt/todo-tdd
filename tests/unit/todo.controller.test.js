const toDoController = require("../../controllers/todo.controller");
const toDoModel = require('../../model/todo.model');
const httpMocks = require('node-mocks-http');
const newToDo = require('../mock-data/new-todo.json');
const allToDos = require('../mock-data/all-todos.json');

jest.mock('../../model/todo.model');

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('toDoController.getToDos', () => {
    it('should have a getToDo function', () => {
        expect(typeof toDoController.getToDos).toBe("function");
    });

    it('should call toDoModel.find({})', async () => {
        await toDoController.getToDos(req, res, next);
        expect(toDoModel.find).toHaveBeenCalledWith({});
    });

    it('should return a 200 response code', async () => {
        await toDoController.getToDos(req,res,next);
        expect(res.statusCode).toStrictEqual(200);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return json body in response', async () => {
        toDoModel.find.mockReturnValue(allToDos)

        await toDoController.getToDos(req, res, next);

        expect(res._getJSONData()).toStrictEqual(allToDos)
    });

    it('should handle error correctly', async () => {
        const errorMessage = {message: "missing"};
        const rejectedPromise = Promise.reject(errorMessage);

        toDoModel.find.mockReturnValue(rejectedPromise)

        await toDoController.getToDos(req, res, next);

        expect(next).toBeCalledWith(errorMessage)
    });
});

describe("toDoController.createToDo", () => {
    beforeEach(() => {
        req.body = newToDo;
    });
    it('should have a createTodo function', () => {
        expect(typeof toDoController.createToDo).toBe("function");
    });

    it('should call toDoModel.create', () => {
        toDoController.createToDo(req, res, next);
        expect(toDoModel.create).toBeCalledWith(newToDo);
    });

    it('should return 201 response code', async () => {
        await toDoController.createToDo(req, res, next);
        expect(res.statusCode).toStrictEqual(201)
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return json body in response', async () => {
        toDoModel.create.mockReturnValue(newToDo)

        await toDoController.createToDo(req, res, next);

        expect(res._getJSONData()).toStrictEqual(newToDo)
    });

    it('should handle errors', async () => {
        const errorMessage = {message: "missing"};
        const rejectedPromise = Promise.reject(errorMessage);
        toDoModel.create.mockReturnValue(rejectedPromise);
        await toDoController.createToDo(req, res, next);

        expect(next).toBeCalledWith(errorMessage);
    });
})

describe('toDoController.getToDoById', () => {
    it('should have a getToDoById', () => {
        expect(typeof toDoController.getToDoById).toBe('function');
    });

    it('should call find with the expectedId', async () => {
        const expectedToDoId = '5f7b1a96fef705ab8ae2eead';
        req.params.toDoId = expectedToDoId;

        toDoModel.findById.mockReturnValue(newToDo);

        await toDoController.getToDoById(req, res, next);

        expect(toDoModel.findById).toHaveBeenCalledTimes(1);
        expect(toDoModel.findById).toHaveBeenCalledWith(expectedToDoId);
    });

    it('should return with response 204 and the expectedToDo', async () => {
        toDoModel.findById.mockReturnValue(newToDo);

        await toDoController.getToDoById(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newToDo);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should handle errors', async () => {
        const errorMessage = {message: "missing"};
        const rejectedPromise = Promise.reject(errorMessage);

        toDoModel.findById.mockReturnValue(rejectedPromise)

        await toDoController.getToDoById(req, res, next);

        expect(next).toBeCalledWith(errorMessage)
    });

    it('should return 404 when item does not exist', async () => {
        toDoModel.findById.mockReturnValue(null);
        await toDoController.getToDoById(req, res, next);

        expect(res.statusCode).toBe(404)
    });
});

describe('toDoController.updateToDo', () => {
    it('should have a updateToDo', () => {
        expect(typeof toDoController.updateToDo).toBe('function');
    });

    it('should call findByIdAndUpdate with the expectedId', async () => {
        const expectedToDoId = '5f7b1a96fef705ab8ae2eead';
        req.params.toDoId = expectedToDoId;
        req.body = newToDo;

        await toDoController.updateToDo(req, res, next);

        expect(toDoModel.findByIdAndUpdate).toHaveBeenCalledWith(expectedToDoId, newToDo,
            {
                new: true,
                useFindAndModify: false
            });
    });

    it('should return with response 204 and the expectedToDo', async () => {
        toDoModel.findByIdAndUpdate.mockReturnValue(newToDo);

        await toDoController.updateToDo(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newToDo);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should handle errors', async () => {
        const errorMessage = {message: "missing"};
        const rejectedPromise = Promise.reject(errorMessage);

        toDoModel.findByIdAndUpdate.mockReturnValue(rejectedPromise)

        await toDoController.updateToDo(req, res, next);

        expect(next).toBeCalledWith(errorMessage)
    });

    it('should return 404 when item does not exist', async () => {
        toDoModel.findByIdAndUpdate.mockReturnValue(null);
        await toDoController.updateToDo(req, res, next);

        expect(res.statusCode).toBe(404)
    });
});

describe('toDoController.deleteToDo', () => {
    it('should have a deleteToDo', () => {
        expect(typeof toDoController.deleteToDo).toBe('function');
    });

    it('should call findByIdAndDelete with the expectedId', async () => {
        const expectedToDoId = '5f7b1a96fef705ab8ae2eead';
        req.params.toDoId = expectedToDoId;

        await toDoController.deleteToDo(req, res, next);

        expect(toDoModel.findByIdAndDelete).toHaveBeenCalledWith(expectedToDoId);
    });

    it('should return with response 204 and the expectedToDo', async () => {
        toDoModel.findByIdAndDelete.mockReturnValue(newToDo);

        await toDoController.deleteToDo(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newToDo);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should handle errors', async () => {
        const errorMessage = {message: "missing"};
        const rejectedPromise = Promise.reject(errorMessage);

        toDoModel.findByIdAndDelete.mockReturnValue(rejectedPromise)

        await toDoController.deleteToDo(req, res, next);

        expect(next).toBeCalledWith(errorMessage)
    });

    it('should return 404 when item does not exist', async () => {
        toDoModel.findByIdAndDelete.mockReturnValue(null);
        await toDoController.deleteToDo(req, res, next);

        expect(res.statusCode).toBe(404)
    });
});
