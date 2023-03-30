const request = require('supertest')
const app = require('../app');
const ProductImg = require('../models/ProductImg');
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

test("POST /api/v1/product create one product", async()=>{
    const product = {
        tittle: "Sony Experia 1 IV",
        description: "Fotografía profesional en tu bolsillo. Descubre infinitas posibilidades para tus fotos con las 4 cámaras principales de tu equipo. Pon a prueba tu creatividad y juega con la iluminación, diferentes planos y efectos para obtener grandes resultados.",
        price: "6450000"
    }
    const res = await request(app).post('/api/v1/product')
    .send(product)
    .set('Authorization', `Bearer ${token}`)
    productId = res.body.id;
    expect(res.status).toBe(201)
    expect(res.body.tittle).toBe(product.tittle)
})

test("GET /api/v1/product should return all categories", async()=>{
    const res = await request(app).get('/api/v1/product');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})

test("POST /api/v1/product/:id/images should set the product images", async()=>{
    const image = await ProductImg.create({url: "img", filename: "ProducImg"})
    const res = await request(app)
    .post(`/api/v1/product/${productId}/images`)
    .send([image.id])
    .set('Authorization', `Bearer ${token}`);
    await image.destroy();
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1);

})

test("PUT /api/v1/product/:id should update one user", async()=>{
    const body = {
        tittle: "Sony Experia IV"
    }
    const res = await request(app)
    .put(`/api/v1/product/${userId}`)
    .send(body)
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.tittle).toBe(body.tittle)
})

test("DELETE /api/v1/product/:id should delete one user", async()=>{
    const res = await request(app)
    .delete(`/api/v1/product/${userId}`)
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204)
})