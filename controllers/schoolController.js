const db = require("../models");
var express = require("express");
const passport = require("../config/passport");
var router = express.Router();
const path = require("path");


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
    if(res){    res.json({
        email: req.user.email,
        id: req.user.id
      });}
    // (res.redirect("/books"))
    // .catch(err => console.log(err))
})


router.post("/api/newclass", function(req,res) {
    db.Class.create({
        title: req.body.title,
        weight: req.body.weight,
        UserId: req.user.id
    })
})

router.post("/api/newassignment", function(req,res) {
    db.Class.create({
        title: req.body.title,
        UserId: req.user.id
    })
})


// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


module.exports=router;