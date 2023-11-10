const request = require('supertest');
const server = require('./index.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);

describe('URL shortener API', () => {

  it('should return an error for an invalid URL', async () => {
    const response = await request(server)
      .post('/shorten')
      .send({ url: 'invalid-url' });

    expect(response.statusCode).to.equal(400);
    expect(response.body).to.equal('invalid url');
  });


  it('should return an error for an invalid short code', async () => {
    const response = await request(server).get('/r/invalid-short-code');

    expect(response.statusCode).to.equal(404);
  });
});
