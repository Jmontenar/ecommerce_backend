const app = require('../app');
const request = require('supertest');

let userId;
let token

test("POST /api/v1/users should create a new user", async()=>{
    const newUser = {
        firstname: "Jorge Eliecer",
        lastname: "Monterrosa",
        email: "jmontecab@gmail.com",
        password: "JMC0126",
        phone: "124456"
    }
    const res = await request(app).post("/api/v1/users").send(newUser);
    userId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.email).toBe(newUser.email);
})

test("POST /api/v1/users/login should do login", async()=>{
    const user = {
        email: "jmontecab@gmail.com",
        password: "JMC0126"
    }
    const res = await request(app)
    .post('/api/v1/users/login')
    .send(user)
    token = res.body.token
    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(user.email);
    expect(res.body.token).toBeDefined()
})

test("POST /api/v1/users/login with invalid credentials", async()=>{
    const user = {
        email: "jmontecab@gmail.com",
        password: "JMC0216"
    }
    const res = await request(app).post('/api/v1/users/login').send(user)
    expect(res.status).toBe(401);
})

test("GET /api/v1/users should return all users", async ()=>{
    const res = await request(app)
    .get("/api/v1/users")
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
})

test("PUT /api/v1/users/:id should update one user", async()=>{
    const body = {
        lastname: "Monterrosa Cabarcas"
    }
    const res = await request(app)
    .put(`/api/v1/users/${userId}`)
    .send(body)
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.lastname).toBe(body.lastname)
})

test("DELETE /api/v1/users/:id should delete one user", async()=>{
    const res = await request(app)
    .delete(`/api/v1/users/${userId}`)
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204)
})
