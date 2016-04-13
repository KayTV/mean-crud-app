var Student = require('../students');

var data = [
  {
    firstName: 'Harry',
    lastName: 'Potter',
    year: 2001
  }
];

function runSeed(done) {
  var student = new Student(data[0]);
  student.save(function(err, res){
    done();
  })
}

module.exports = {
  runSeed: runSeed
}
