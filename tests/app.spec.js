var request = require("supertest");
var app = require('../app');

describe('Test the root path', () => {
  it('should respond to the GET method', async () => {
    const response = await request(app)
      .get("/");

    expect(response.statusCode).toBe(200);
    expect(response.json()).toBe('Koroibos Challenge - Fenton Taylor')
  });
});