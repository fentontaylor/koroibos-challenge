var request = require("supertest");
var app = require('../app');

describe('Test the root path', () => {
  it('should respond to the GET method', async () => {
    const response = await request(app)
      .get("/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ "message": "Koroibos Challenge - Fenton Taylor" })
  });
});