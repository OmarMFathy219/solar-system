// app-test.js

(async () => {
    const chai = await import('chai');
    const chaiHttp = await import('chai-http');
    const { expect } = chai.default;  // Import the expect function from chai
  
    const server = require('./app');  // Import your server
  
    chai.default.should();
    chai.default.use(chaiHttp.default);
  
    describe('Planets API Suite', () => {
      describe('Fetching Planet Details', () => {
        it('it should fetch a planet named Mercury', (done) => {
          let payload = { id: 1 };
          chai.default.request(server)
            .post('/planet')
            .send(payload)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('id').eql(1);
              res.body.should.have.property('name').eql('Mercury');
              done();
            });
        });
  
        // Other tests here
      });
    });
  
    describe('Testing Other Endpoints', () => {
      describe('it should fetch OS Details', () => {
        it('it should fetch OS details', (done) => {
          chai.default.request(server)
            .get('/os')
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
        });
      });
  
      describe('it should fetch Live Status', () => {
        it('it checks Liveness endpoint', (done) => {
          chai.default.request(server)
            .get('/live')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('status').eql('live');
              done();
            });
        });
      });
  
      describe('it should fetch Ready Status', () => {
        it('it checks Readiness endpoint', (done) => {
          chai.default.request(server)
            .get('/ready')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('status').eql('ready');
              done();
            });
        });
      });
    });
  })();
  