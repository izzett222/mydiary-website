import chai from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

describe('users can signup', () => {
  it('it should not sign up new users without password input', (done) => {
    const newUser = {
      firstname: 'John',
      lastname: 'Ishimwe',
      email: 'john45@gmail.com',
    };
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.not.have.property('data');
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.a('string');
        done();
      });
  });
  it('it should not sign up new users without email', (done) => {
    const newUser = {
      firstname: 'John',
      lastname: 'Ishimwe',
      password: 'password12345',
    };
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.not.have.property('data');
        expect(res.body.message).to.be.a('string');
        done();
      });
  });
  it('it should not sign up new users without firstName', (done) => {
    const newUser = {
      lastname: 'Ishimwe',
      email: 'john45@gmail.com',
      password: 'password12345',
    };
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.not.have.property('data');
        expect(res.body.message).to.be.a('string');
        done();
      });
  });
  it('it should not sign up new users without lastName', (done) => {
    const newUser = {
      firstname: 'John',
      email: 'john45@gmail.com',
      password: 'password12345',
    };
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.not.have.property('data');
        expect(res.body.message).to.be.a('string');
        done();
      });
  });
  it('it should sign up new users(first on the server)', (done) => {
    const newUser = {
      firstname: 'John',
      lastname: 'Ishimwe',
      email: 'john45@gmail.com',
      password: 'password12345',
    };
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('user created successfully');
        expect(res.body.data).to.have.property('user');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data.token).to.be.a('string');
        expect(res.body.data.user).to.have.property('userid');
        expect(res.body.data.user).to.have.property('firstname');
        expect(res.body.data.user).to.have.property('lastname');
        expect(res.body.data.user).to.have.property('email');
        expect(res.body.data.user).to.not.have.property('password');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.user.userid).to.be.a('string');
        expect(res.body.data.user.firstname).to.be.a('string');
        expect(res.body.data.user.firstname).to.deep.equal(newUser.firstname);
        expect(res.body.data.user.lastname).to.be.a('string');
        expect(res.body.data.user.lastname).to.deep.equal(newUser.lastname);
        expect(res.body.data.user.email).to.be.a('string');
        expect(res.body.data.user.email).to.deep.equal(newUser.email);
        done();
      });
  });
  it('it should not sign up new users with an email which already exits', (done) => {
    const newUser = {
      firstname: 'Alice',
      lastname: 'Ishimwe',
      email: 'john45@gmail.com',
      password: 'password12345',
    };
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.status).to.equal(409);
        expect(res.body).to.have.property('message');
        expect(res.body.message).deep.equal('email already taken');
        done();
      });
  });
});
describe('users can signin', () => {
  it('it should signin users with correct email and password', (done) => {
    const user = {
      email: 'john45@gmail.com',
      password: 'password12345',
    };
    chai
      .request(app)
      .post('/api/v1/users/signin')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data.token).to.be.a('string');
        expect(res.body.data).to.have.property('user');
        expect(res.body.data.user).to.have.property('userid');
        expect(res.body.data.user).to.have.property('firstname');
        expect(res.body.data.user).to.have.property('lastname');
        expect(res.body.data.user).to.have.property('email');
        expect(res.body.data.user).to.not.have.property('password');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('User logged in successfully');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.user).to.be.an('object');
        expect(res.body.data.user.userid).to.be.a('string');
        expect(res.body.data.user.firstname).to.be.a('string');
        expect(res.body.data.user.lastname).to.be.a('string');
        expect(res.body.data.user.email).to.be.a('string');
        expect(res.body.data.user.email).to.deep.equal(user.email);
        done();
      });
  });
  it('it should not signin users with an incorrect email', (done) => {
    const user = {
      email: 'john4555@gmail.com',
      password: 'password12345',
    };
    chai
      .request(app)
      .post('/api/v1/users/signin')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.message).to.equal('incorrect email or password');
        done();
      });
  });
  it('it should not signin users with a wrong password', (done) => {
    const user = {
      email: 'john45@gmail.com',
      password: 'password123',
    };
    chai
      .request(app)
      .post('/api/v1/users/signin')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.message).to.equal('incorrect email or password');
        done();
      });
  });
  it('it should not signin users with a unvalidated  password', (done) => {
    const user = {
      email: 'john45@gmail.com',
      password: 3,
    };
    chai
      .request(app)
      .post('/api/v1/users/signin')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
  it('it should not signin users with a unvalidated  password', (done) => {
    const user = {
      email: 'john45',
      password: 'paswedwdw',
    };
    chai
      .request(app)
      .post('/api/v1/users/signin')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
});
