const request = require('supertest');
const app = require('../app');
const Product = require('../models/Product');
require('../models')

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

test("POST /api/v1/cart should create one favorite", async()=>{
    const product = await Product.create({
        tittle: "Sony Experia 1 IV",
        description: "Fotografía profesional en tu bolsillo. Descubre infinitas posibilidades para tus fotos con las 4 cámaras principales de tu equipo. Pon a prueba tu creatividad y juega con la iluminación, diferentes planos y efectos para obtener grandes resultados.",
        price: "5499900"
    })
    const cart = {
        quantity: 5,
        productId: product.id
    }
    const res = await request(app)
    .post('/api/v1/cart')
    .send(cart)
    .set('Authorization', `Bearer ${token}`)
    await product.destroy()
    expect(res.status).toBe(201)
    expect(res.body.quantity).toBe(cart.quantity)
})

test("GET /api/v1/cart should return all favorites", async()=>{
    const res = await request(app)
    .get('/api/v1/cart')
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1)
})

test("PUT /api/v1/cart/:id should update one user", async()=>{
    const body = {
        quantity: 2
    }
    const res = await request(app)
    .put(`/api/v1/cart/${userId}`)
    .send(body)
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(body.quantity)
})

test("DELETE /api/v1/cart/:id should delete one user", async()=>{
    const res = await request(app)
    .delete(`/api/v1/cart/${userId}`)
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204)
})