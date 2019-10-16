import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import app from '../app';
import users from '../data/userData';

const { expect } = chai;
chai.use(chaiHttp);
dotenv.config();
describe('entry endpoints testing', () => {
  describe('when the user has signed up and given a valid token', () => {
    let token;
    before((done) => {
      const loggedUser = {
        email: 'john45@gmail.com',
        password: 'password12345'
      };
      chai
        .request(app)
        .post('/api/v1/users/signin')
        .send(loggedUser)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
      const userId = users[users.length - 1].user_id;
      token = jwt.sign({ user_id: userId }, process.env.JWT_KEY);
    });
    it('it should create a entry', (done) => {
      const entry = {
        title: 'wow',
        discription: 'this is working'
      };
      chai
        .request(app)
        .post('/api/v1/entries')
        .set('token', `Bearer ${token}`)
        .send(entry)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.data).to.include({
            title: entry.title,
            discription: entry.discription
          });
          done();
        });
    });
    it('it should create another entry', (done) => {
      const entry = {
        title: 'wow again',
        discription: 'this is working again'
      };
      chai
        .request(app)
        .post('/api/v1/entries')
        .set('token', `Bearer ${token}`)
        .send(entry)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.data).to.include({
            title: entry.title,
            discription: entry.discription
          });
          expect(res.body.data.id).to.equal(2);
          done();
        });
    });

    it('it should not create a entry with invalid data', (done) => {
      const entry = {
        title: 'w',
        discription: 'this is working'
      };
      chai
        .request(app)
        .post('/api/v1/entries')
        .set('token', `Bearer ${token}`)
        .send(entry)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('it should not create a entry with invalid data', (done) => {
      const entry = {
        title: 'wdsff',
        discription: 't'
      };
      chai
        .request(app)
        .post('/api/v1/entries')
        .set('token', `Bearer ${token}`)
        .send(entry)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });
  describe('when the user is not signup or given a wrong token', () => {
    it('should not allow user without token to access entry routes', (done) => {
      const entry = {
        title: 'wow',
        discription: 'this is working'
      };
      chai
        .request(app)
        .post('/api/v1/entries')
        .send(entry)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('should not allow user with token but cant be found to access entry routes', (done) => {
      const id = 5000;
      const token = jwt.sign({ user_id: id }, process.env.JWT_KEY);
      const entry = {
        title: 'wow',
        discription: 'this is working'
      };
      chai
        .request(app)
        .post('/api/v1/entries')
        .set('token', `Bearer ${token}`)
        .send(entry)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
  });
});
