import chai from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import { doesNotReject } from 'assert';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

describe('users can signup', () => {
  it('it should not sign up new users without password input', (done) => {
    const newUser = {
      firstName: 'John',
      lastName: 'Ishimwe',
      email: 'john45@gmail.com',
    };
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('it should not sign up new users without email', (done) => {
    const newUser = {
      firstName: 'John',
      lastName: 'Ishimwe',
      password: 'password12345'
    };
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('it should not sign up new users without firstName', (done) => {
    const newUser = {
      lastName: 'Ishimwe',
      email: 'john45@gmail.com',
      password: 'password12345'
    };
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('it should not sign up new users without lastName', (done) => {
    const newUser = {
      firstName: 'John',
      email: 'john45@gmail.com',
      password: 'password12345'
    };
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('it should sign up new users(first on the server', (done) => {
    const newUser = {
      firstName: 'John',
      lastName: 'Ishimwe',
      email: 'john45@gmail.com',
      password: 'password12345'
    };
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('data');
        done();
      });
  });
  it('it should sign up new users', (done) => {
    const newUser = {
      firstName: 'Emma',
      lastName: 'Ishimwe',
      email: 'emma4@gmail.com',
      password: 'password12345'
    };
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('token');
        done();
      });
  });
  it('it should not sign up new users with an email which already exits', (done) => {
    const newUser = {
      firstName: 'Alice',
      lastName: 'Ishimwe',
      email: 'john45@gmail.com',
      password: 'password12345'
    };
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        done();
      });
  });
});
