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
    it('it should modify an entry with all data given', (done) => {
      const modify = {
        title: 'ready',
        discription: 'ohhh this is beatiful'
      };
      chai.request(app)
        .patch('/api/v1/entries/1')
        .set('token', `Bearer ${token}`)
        .send(modify)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          if (modify.title) {
            expect(res.body.data).to.include({
              title: modify.title
            });
          }
          if (modify.discription) {
            expect(res.body.data).to.include({
              discription: modify.discription
            });
          }
          done();
        });
    });
    it('it should modify an entry with partial data given(title)', (done) => {
      const modify = {
        title: 'ready'
      };
      chai.request(app)
        .patch('/api/v1/entries/1')
        .set('token', `Bearer ${token}`)
        .send(modify)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          if (modify.title) {
            expect(res.body.data).to.include({
              title: modify.title
            });
          }
          if (modify.discription) {
            expect(res.body.data).to.include({
              discription: modify.discription
            });
          }
          done();
        });
    });
    it('it should modify an entry with partial data given(discription)', (done) => {
      const modify = {
        discription: 'ohhh this is beatiful'
      };
      chai.request(app)
        .patch('/api/v1/entries/1')
        .set('token', `Bearer ${token}`)
        .send(modify)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          if (modify.title) {
            expect(res.body.data).to.include({
              title: modify.title
            });
          }
          if (modify.discription) {
            expect(res.body.data).to.include({
              discription: modify.discription
            });
          }
          done();
        });
    });
    it('it should not modify an entry with invalid request', (done) => {
      const modify = {
        title: 're',
        discription: 'ohhh this is beatif'
      };
      chai.request(app)
        .patch('/api/v1/entries/1')
        .set('token', `Bearer ${token}`)
        .send(modify)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('it should not modify an entry which does not exits', (done) => {
      const modify = {
        title: 'readyg',
        discription: 'ohhh this is beatif'
      };
      chai.request(app)
        .patch('/api/v1/entries/8000')
        .set('token', `Bearer ${token}`)
        .send(modify)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('it should delete an entry', (done) => {
      chai.request(app)
        .delete('/api/v1/entries/1')
        .set('token', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.status).to.equal(204);
          done();
        });
    });
    it('it should not delete an entry with invalid and non existant id', (done) => {
      chai.request(app)
        .delete('/api/v1/entries/10000')
        .set('token', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('it should get all entries', (done) => {
      chai.request(app)
        .get('/api/v1/entries')
        .set('token', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.length).to.equal(1);
          done();
        });
    });
    it('it should get an entry', (done) => {
      chai.request(app)
        .get('/api/v1/entries/2')
        .set('token', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('it should not get an entry with an invalid id', (done) => {
      chai.request(app)
        .get('/api/v1/entries/8000')
        .set('token', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
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