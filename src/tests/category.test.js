const app = require('../app');
const request = require('supertest');

let token;
let userId;

beforeAll(async()=>{
    const credentials = {
        email: "userX@gmail.com",
        password: "123456"
    }
    const res = await request(app).post('/api/v1/users/login').send(credentials);
    token = res.body.token
    userId = res.body.user.id
})

test("POST /api/v1/category should create one category", async()=>{
    const newCategory = {
        name: "Smart TV"
    }
    const res = await request(app).post('/api/v1/category')
    .send(newCategory)
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(newCategory.name)
})

test("GET /api/v1/category should return all categories", async()=>{
    const res = await request(app).get('/api/v1/category');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})

test("PUT /api/v1/category/:id should update one user", async()=>{
    const body = {
        name: "SmartTv"
    }
    const res = await request(app)
    .put(`/api/v1/category/${userId}`)
    .send(body)
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name)
})

test("DELETE /api/v1/category/:id should delete one user", async()=>{
    const res = await request(app)
    .delete(`/api/v1/category/${userId}`)
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204)
})