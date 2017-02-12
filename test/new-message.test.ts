import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('POST api/v1/new-message', () => {

  /*it('responds with JSON array', () => {
    let message = {
        text: 'Hello',
        chat_id: '1234'
    };
    return chai.request(app).post('/api/v1/new-message')
      .send(message)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body.message).to.equal('Success');
      });
  });

  it('request fail: no message on POST', () => {
    return chai.request(app).post('/api/v1/new-message')
      .catch(err => {
        expect(err.status).to.equal(400);
      })
      ;
  });*/

});