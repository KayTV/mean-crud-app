var express = require('express');
var router = express.Router();
var Students = require('../models/students');

//GET ALL students
router.get('/', function(req, res, next) {
  Students.find({}, function(err, students){
    if(err) {
      return next(err);
    }
    res.status(200).json({
      status: 'success',
      data: students
    });
  });
});

//ADD a student
router.post('/', function(req, res, next) {
  var student = new Student(req.body);
  student.save(function(err, student){
    res.status(200).json({
      status: 'success',
      data: student
    })
  })
})

//GET A signle student
Students.find({_id: req.params.id}, function(err, student) {
    if (err) {
        return next(err);
    }
    res.status(200).json({
        status: "success",
        data: student
    })
  })
})

//DELETE a single student
router.delete('/', function(req, res, next) {
    Students.remove({ firstName: 'James' }, function(err) {
        if (err) {
            return next(err);
        }
        res.status(200).json({
            status: "success"
        })
    });
})

module.exports = router;
