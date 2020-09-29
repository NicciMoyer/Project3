const db = require("../models");
var express = require("express");
const passport = require("../config/passport");
var router = express.Router();
const path = require("path");
const { abort } = require("process");


router.post("/api/signup", function(req, res) {
    console.log(req.body)
    console.log(req.body.email)
    db.User.create({
        email: req.body.email,
        password: req.body.password,
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isTeacher: req.body.isTeacher
    })
        .then(function() {
        res.redirect(307, "/api/login");
        console.log("signed up")
        })
        .catch(function(err) {
        res.status(401).json(err);
        });
    });

router.post("/api/login", passport.authenticate("local"), (req,res) => {
    if(res){    
        res.json({
        id: req.user.id,
        userName: req.user.userName,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        prefix: req.user.prefix,
        isTeacher: req.user.isTeacher
      })
    }
})


router.post("/api/newclass", function(req,res) {
    db.Class.create({
        title: req.body.title,
        subtitle: req.body.subtitle,
        UserId: req.user.id
    })
    .then(function(data){
        res.send(data)
    })
})

router.post("/api/newassignment", function(req,res) {
    db.Class.create({
        title: req.body.title,
        weight: req.body.weight,
        notes: req.body.notes,
        UserId: req.user.id
    })
    .then(function(data){
        res.send(data)
    })
})

router.post("/api/roster", function(req,res){
    db.ClassRoster.create({
        UserId: req.body.studentId,
        ClassId:req.body.ClassId
    })
})


//get all class IDs for classes student is in.
router.get("/api/classes/:id", function(req,res){
    db.ClassRoster.findAll({
        where: {UserId: req.params.id}
    }).then((data) => {
        res.json(data)
    });
});

//get class info by id
router.get("/api/class/:id", function(req,res){
    db.Class.findOne({
        where: {id: req.params.id}
    }).then((data) => {
        res.json(data)
    });
})

//find all classes by teacher
router.get("/api/teacherclass/:id", function(req,res){
    db.Class.findAll({
        where: {UserId: req.params.id}
    }).then((data) => {
        res.json(data)
    });
})

//find all assignments by class
router.get("/api/assignments/:id", function(req,res){
    db.Assignment.findAll({
        where: {ClassId: req.params.id}
    }).then((data) => {
        res.json(data)
    });
})

//get all students
router.get("/api/students", function(req,res){
    db.User.findAll({
        where: {isTeacher: false}
    })
    .then((data) =>{
        res.json(data)
    });
})

//get all students in class
router.get("/api/roster/:id", function(req,res){
    db.ClassRoster.findAll({
        where: {
            ClassId: req.params.id
        }
    })
    .then((data) =>{
        res.json(data)
    });
})



// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


module.exports=router;