process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../src/server/app');
var should = chai.should();
var testUtilities = require('../utilities')

chai.use(chaiHttp);


describe('student routes', function() {
  beforeEach(function(done) {
    //drop db
    testUtilities.dropDatabase(done);
  });

  afterEach(function(done) {
    //drop db
    testUtilities.dropDatabase(done);
  });

  describe('/GET students', function() {

    it('should return all students', function(done) {
      
        done();
    });
  });

});
