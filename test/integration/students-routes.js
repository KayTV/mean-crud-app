process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../src/server/app');
var should = chai.should();
var testUtilities = require('../utilities');
var testSeed = require('../../src/server/models/seeds/test-seeds');
var Students = require('../../src/server/models/students');

chai.use(chaiHttp);


describe('student routes', function() {
  beforeEach(function(done) {
    //drop db
    testUtilities.dropDatabase();
    testSeed.runSeed(done);
  });

  afterEach(function(done) {
    //drop db
    testUtilities.dropDatabase(done);
  });

  describe('/GET students', function() {

    it('should return all students', function(done) {
      chai.request(server)
      .get('/students')
      .end(function(err, res){
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.status.should.equal('success');
        res.body.data.should.be.a('array');
        res.body.data.length.should.equal(1);
        res.body.data[0].firstName.should.equal('Harry');
        res.body.data[0].lastName.should.equal('Potter');
        res.body.data[0].year(2001);
        done();
      })
    });
  });
  describe('/POST students', function(){

    it('should add a student', function(done){
      chai.request(server)
      .post('/students')
      .send({
        firstName: 'Kay',
        lastName: 'VN',
        year: 2007
      })
      .end(function(err, res){
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        res.body.data.length.should.equal(2);
        res.body.data.firstName.should.equal('Kay');
        res.body.data.lastName.should.equal('VN');
        res.body.data.year.should.equal(2007);
        done();
      })
    })
  })
  describe('GET single student', function() {
    it('should return one student', function(done) {
        Students.findOne(function(err, student) {
            var studentID = student._id;
            chai.request(server)
            .get('/students/'+student._id)
            .end(function(err, res) {
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                res.body.should.have.property('data');
                res.body.status.should.equal('success');
                res.body.data.should.be.a('array');
                res.body.data.length.should.equal(1);
                res.body.data[0].firstName.should.equal('James');
                res.body.data[0].lastName.should.equal('Gibson');
                res.body.data[0].year.should.equal(2005);
                done();
            })
        })
    });
});
describe('Put', function() {

    it('should update a SINGLE student', function(done) {
    chai.request(server)
    .get('/students')
    .end(function(err, response){
      chai.request(server)
        .put('/students/update/')
        .send({lastName: 'Njeru'})
        .end(function(error, res){
          res.body.data.lastName.should.equal('Njeru');
          done();
        });
      });
    });
  });
  describe('DELETE from students', function() {
      it('should return all students', function(done) {
          chai.request(server)
          .delete('/students')
          .end(function(err, res) {
              res.should.have.status(200);
              res.type.should.equal('application/json');
              res.body.should.be.a('object');
              res.body.should.have.property('status');
              res.body.status.should.equal('success');
              done();
          })
      });
  });
});
