import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);
dotenv.config();
describe('entry endpoints testing', () => {
  describe('when the user has signed up and given a valid token', () => {
    let token;
    // let slug;
    let id;
    before((done) => {
      const loggedUser = {
        email: 'john45@gmail.com',
        password: 'password12345',
      };
      chai
        .request(app)
        .post('/api/v1/users/signin')
        .send(loggedUser)
        .end((err, res) => {
          token = res.body.data.token;
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('it should get entries', (done) => {
      chai.request(app)
        .get('/api/v1/entries')
        .set('token', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.deep.equal(404);
          expect(res.body.message).to.deep.equal('your diary is empty, no entries found');
          expect(res.body).to.not.have.property('data');
          done();
        });
    });
    it('it should create a entry', (done) => {
      const entry = {
        title: 'wow',
        description: 'this is working',
      };
      chai
        .request(app)
        .post('/api/v1/entries')
        .set('token', `Bearer ${token}`)
        .send(entry)
        .end((err, res) => {
          // slug = res.body.data.slug;
          id = res.body.data.id;
          expect(res.status).to.equal(201);
          expect(res.body.status).to.equal(201);
          expect(res.body.data).to.be.an('object');
          expect(res.body.message).to.deep.equal('entry successfully created');
          expect(res.body.data.id).to.be.a('string');
          expect(res.body.data.title).to.be.deep.equal(entry.title);
          expect(res.body.data.slug).to.be.a('string');
          expect(res.body.data.description).to.deep.equal(entry.description);
          expect(res.body.data).to.have.property('createdon');
          expect(res.body.data.userid).to.be.a('string');
          done();
        });
    });
    it('it should create a entry without title', (done) => {
      const entry = {
        description: 'this is working',
      };
      chai
        .request(app)
        .post('/api/v1/entries')
        .set('token', `Bearer ${token}`)
        .send(entry)
        .end((err, res) => {
          // slug = res.body.data.slug;
          expect(res.status).to.equal(201);
          expect(res.body.status).to.equal(201);
          expect(res.body.data).to.be.an('object');
          expect(res.body.message).to.deep.equal('entry successfully created');
          expect(res.body.data.id).to.be.a('string');
          expect(res.body.data.title).to.be.deep.equal('untitled');
          expect(res.body.data.slug).to.be.a('string');
          expect(res.body.data.description).to.deep.equal(entry.description);
          expect(res.body.data).to.have.property('createdon');
          expect(res.body.data.userid).to.be.a('string');
          done();
        });
    });
    it('it should not create a entry with invalid data', (done) => {
      const entry = {
        title: 'w',
        description: 'this is working',
      };
      chai
        .request(app)
        .post('/api/v1/entries')
        .set('token', `Bearer ${token}`)
        .send(entry)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.deep.equal(400);
          expect(res.body.message).to.be.a('string');
          expect(res.body).to.not.have.property('data');
          done();
        });
    });
    it('it should not create a entry with invalid data', (done) => {
      const entry = {
        title: 'wdsff',
        description: 't',
      };
      chai
        .request(app)
        .post('/api/v1/entries')
        .set('token', `Bearer ${token}`)
        .send(entry)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.deep.equal(400);
          expect(res.body.message).to.be.a('string');
          expect(res.body).to.not.have.property('data');
          done();
        });
    });
    it('it should modify an entry with all data given', (done) => {
      const modify = {
        title: 'ready',
        description: 'ohhh this is beatiful',
      };
      chai.request(app)
        .patch(`/api/v1/entries/${id}`)
        .set('token', `Bearer ${token}`)
        .send(modify)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data).to.include({
            title: modify.title,
          });
          expect(res.body.data).to.include({
            description: modify.description,
          });
          expect(res.body.status).to.deep.equal(200);
          expect(res.body.data.id).to.be.a('string');
          expect(res.body.data.userid).to.be.a('string');
          expect(res.body.data.slug).to.be.a('string');
          expect(res.body.data.createdon).to.be.a('string');
          expect(res.body.message).to.deep.equal('entry successfully edited');
          done();
        });
    });
    it('it should modify an entry with partial data given(title)', (done) => {
      const modify = {
        title: 'ready',
      };
      chai.request(app)
        .patch(`/api/v1/entries/${id}`)
        .set('token', `Bearer ${token}`)
        .send(modify)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data).to.include({
            title: modify.title,
          });
          expect(res.body.status).to.deep.equal(200);
          expect(res.body.data.id).to.be.a('string');
          expect(res.body.data.userid).to.be.a('string');
          expect(res.body.data.slug).to.be.a('string');
          expect(res.body.data.createdon).to.be.a('string');
          expect(res.body.message).to.deep.equal('entry successfully edited');
          expect(res.body.data.description).to.be.a('string');
          done();
        });
    });
    it('it should modify an entry with partial data given(description)', (done) => {
      const modify = {
        description: 'ohhh this is beatiful',
      };
      chai.request(app)
        .patch(`/api/v1/entries/${id}`)
        .set('token', `Bearer ${token}`)
        .send(modify)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data).to.include({
            description: modify.description,
          });
          expect(res.body.status).to.deep.equal(200);
          expect(res.body.data.id).to.be.a('string');
          expect(res.body.data.userid).to.be.a('string');
          expect(res.body.data.slug).to.be.a('string');
          expect(res.body.data.createdon).to.be.a('string');
          expect(res.body.message).to.deep.equal('entry successfully edited');
          expect(res.body.data.title).to.be.a('string');
          done();
        });
    });
    it('it should not modify an entry with not data given', (done) => {
      const modify = {
      };
      chai.request(app)
        .patch(`/api/v1/entries/${id}`)
        .set('token', `Bearer ${token}`)
        .send(modify)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('status');
          expect(res.body).to.not.have.property('data');
          expect(res.body.message).to.be.a('string');
          done();
        });
    });
    it('it should not modify an entry with invalid request', (done) => {
      const modify = {
        title: 're',
        description: 'ohhh this is beatif',
      };
      chai.request(app)
        .patch(`/api/v1/entries/${id}`)
        .set('token', `Bearer ${token}`)
        .send(modify)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.be.a('string');
          expect(res.body.status).to.deep.equal(400);
          done();
        });
    });
    it('it should not modify an entry which does not exits', (done) => {
      const modify = {
        title: 'readyg',
        description: 'ohhh this is beatif',
      };
      chai.request(app)
        .patch('/api/v1/entries/1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed')
        .set('token', `Bearer ${token}`)
        .send(modify)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('entry not found');
          expect(res.body.status).to.deep.equal(404);
          done();
        });
    });
    it('it should not modify an entry a valid uuid', (done) => {
      const modify = {
        title: 'readyg',
        description: 'ohhh this is beatif',
      };
      chai.request(app)
        .patch('/api/v1/entries/1b9d')
        .set('token', `Bearer ${token}`)
        .send(modify)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('the id given is not a valid UUID');
          expect(res.body.status).to.deep.equal(400);
          done();
        });
    });
    //     it('it should delete an entry', (done) => {
    //       chai.request(app)
    //         .delete('/api/v1/entries/1')
    //         .set('token', `Bearer ${token}`)
    //         .end((err, res) => {
    //           expect(res.status).to.equal(204);
    //           done();
    //         });
    //     });
    //     it('it should not delete an entry with invalid and non existant id', (done) => {
    //       chai.request(app)
    //         .delete('/api/v1/entries/10000')
    //         .set('token', `Bearer ${token}`)
    //         .end((err, res) => {
    //           expect(res.status).to.equal(404);
    //           done();
    //         });
    //     });
    it('it should get all entries', (done) => {
      chai.request(app)
        .get('/api/v1/entries')
        .set('token', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data.length).to.equal(2);
          done();
        });
    });
    it('it should get all entries on a page', (done) => {
      chai.request(app)
        .get('/api/v1/entries?p=1')
        .set('token', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data).to.be.an('object');
          expect(res.body.data.page).to.deep.equal(1);
          expect(res.body.data.numberOfPages).to.deep.equal(1);
          expect(res.body.data.entriesOnPage).to.deep.equal(2);
          expect(res.body.data.totalEntries).to.deep.equal(2);
          expect(res.body.data.entries).to.be.an('array');
          expect(res.body.data.entries.length).to.deep.equal(2);
          done();
        });
    });
    it('it should not get  entries on a non numeric page', (done) => {
      chai.request(app)
        .get('/api/v1/entries?p=d')
        .set('token', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).deep.equal(400);
          expect(res.body.message).deep.equal('a page should be a number and should be greater than 0');
          done();
        });
    });
    it('it should not get  entries on a non existant page', (done) => {
      chai.request(app)
        .get('/api/v1/entries?p=10')
        .set('token', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).deep.equal(404);
          expect(res.body.message).deep.equal('page 10 not found');
          done();
        });
    });
    //     it('it should get an entry', (done) => {
    //       chai.request(app)
    //         .get('/api/v1/entries/2')
    //         .set('token', `Bearer ${token}`)
    //         .end((err, res) => {
    //           expect(res.status).to.equal(200);
    //           done();
    //         });
    //     });
    //     it('it should not get an entry which does not exist', (done) => {
    //       chai.request(app)
    //         .get('/api/v1/entries/8000')
    //         .set('token', `Bearer ${token}`)
    //         .end((err, res) => {
    //           expect(res.status).to.equal(404);
    //           done();
    //         });
    //     });
    //     it('it should not get an entry with a non-numeric id', (done) => {
    //       chai.request(app)
    //         .get('/api/v1/entries/dd34s')
    //         .set('token', `Bearer ${token}`)
    //         .end((err, res) => {
    //           expect(res.status).to.equal(400);
    //           done();
    //         });
    //     });
    //     it('should get an entry when a title slug is given', (done) => {
    //       chai
    //         .request(app)
    //         .get(`/api/v1/entries/slug/${slug}`)
    //         .set('token', `Bearer ${token}`)
    //         .end((err, res) => {
    //           expect(res.status).to.equal(200);
    //           expect(res.body).to.have.property('data');
    //           expect(res.body.data).to.have.property('title');
    //           expect(res.body.data).to.have.property('description');
    //           expect(res.body.data).to.have.property('createdOn');
    //           expect(res.body.data).to.have.property('slug');
    //           expect(res.body.data.slug).to.equal(slug);
    //           done();
    //         });
    //     });
    //     it('should get an entry when a title slug is given', (done) => {
    //       const noSlug = 'day-dfewdes';
    //       chai
    //         .request(app)
    //         .get(`/api/v1/entries/slug/${noSlug}`)
    //         .set('token', `Bearer ${token}`)
    //         .end((err, res) => {
    //           expect(res.status).to.equal(404);
    //      expect(res.body.message).to.deep.equal(`entry with slug equal to ${noSlug}. not found`);
    //           done();
    //         });
    //     });
  });
  describe('when the user is not signup or given a wrong token', () => {
    it('should not allow user without token to access entry routes', (done) => {
      const entry = {
        title: 'wow',
        description: 'this is working',
      };
      chai
        .request(app)
        .post('/api/v1/entries')
        .send(entry)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.status).to.deep.equal(401);
          expect(res.body.message).to.deep.equal('token not found');
          expect(res.body).to.not.have.property('data');
          done();
        });
    });
    it('should not allow user with token but cant be found to access entry routes', (done) => {
      const token1 = jwt.sign({ userid: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed' }, process.env.JWT_KEY);
      const entry = {
        title: 'wow',
        description: 'this is working',
      };
      chai
        .request(app)
        .post('/api/v1/entries')
        .set('token', `Bearer ${token1}`)
        .send(entry)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.status).to.deep.equal(403);
          expect(res.body.message).to.deep.equal('the user who belong to this token does not exist');
          expect(res.body).to.not.have.property('data');
          done();
        });
    });
    it('should not allow user with token but cant be found to access entry routes', (done) => {
      const entry = {
        title: 'wow',
        description: 'this is working',
      };
      chai
        .request(app)
        .post('/api/v1/entries')
        .set('token', 'Bearer jdejdejdekds')
        .send(entry)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.deep.equal(400);
          expect(res.body.message).to.deep.equal('your token is invalid');
          expect(res.body).to.not.have.property('data');
          done();
        });
    });
  });
});
describe('u can not access a route that does not exit', () => {
  it('should return an error message', (done) => {
    chai
      .request(app)
      .get('/api/v1/entriess')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.deep.equal(404);
        expect(res.body.message).to.be.a('string');
        done();
      });
  });
});
