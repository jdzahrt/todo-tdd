const request = require("supertest");
const app = require("../../app");
const newToDo = require("../mock-data/new-todo.json");

const endpointUrl = "/todos/";
let firstToDo,
newToDoId;

describe(`endpointUrl ${endpointUrl}`, () => {
    test('GET all toDos', async () => {
        const response = await request(app).get(endpointUrl);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].done).toBeDefined();

        firstToDo = response.body[0];
    })

    it('should get toDoById', async () => {
        const response = await request(app).get(`${endpointUrl}/${firstToDo._id}`);

        expect(response.statusCode).toBe(200)
    });

    it('should return 404 if id does not exist', async () => {
        const response = await request(app).get(`${endpointUrl}/5f7b1a96fef705ab8ae2ffad`);

        expect(response.statusCode).toBe(404)
    });

    it(`should POST ${endpointUrl}`, async () => {
        const response = await request(app)
            .post(endpointUrl)
            .send(newToDo);

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newToDo.title);
        expect(response.body.done).toBe(newToDo.done);

        newToDoId = response.body._id;
    });

    it('should update a toDo using PUT', async () => {
        const updateToDo = {title: "test update", done: true}

        const res = await request(app)
            .put(`${endpointUrl}${newToDoId}`)
            .send(updateToDo);

        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe('test update');
        expect(res.body.done).toBe(true);
    });

    it('should delete a toDo using DELETE', async () => {
        const res = await request(app)
            .delete(`${endpointUrl}${newToDoId}`);

        expect(res.statusCode).toBe(200);
    });

    it('should return error 500 on malformed data with url', async () => {
        const response = await request(app)
            .post(endpointUrl)
            .send({title: "Missing done property"})

        expect(response.statusCode).toBe(500)
        expect(response.body).toStrictEqual({message: "ValidationError: ToDo validation not working"})
    });
});


