const db = require("../models");
var express = require("express");
var router = express.Router();


router.post("/api/signup", function(req, res) {
    db.User.create({
        email: req.body.email,
        password: req.body.password,
        userName: req.body.userName,
        firstName: req.body.firstname,
        lastName: req.body.lastName,
        isTeacher: req.body.isTeacher
    })
        .then(function() {
        res.redirect(307, "/api/login");
        })
        .catch(function(err) {
        res.status(401).json(err);
        });
    });

router.post("/api/newclass", function(req,res) {
    db.Class.create({
        title: req.body.title,
        weight: req.body.weight,
        ClassId: req.body.classId
    })
})

router.post("/api/newassignment", function(req,res) {
    db.Class.create({
        title: req.body.title,
        UserId: req.user.id
    })
})


module.exports=router;