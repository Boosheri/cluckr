const express = require("express");
const router = express.Router();
const knex = require("../db/client");

function checkIfAuthenticated(req,res,next){
    if(!req.cookies.username){
    res.redirect('/')
    }
    next()
}


router.get("/", (req, res)=>{
    const username = req.cookies.username;

    console.log(username)

    res.render("clucks/new", {username});
  });  


router.get("/new", (req, res) => {
    res.render("clucks/new")
  });

router.get("/index", (request, response)=>{
    knex
    .select()
    .from("clucks")
    .orderBy("created_at", "DESC")
    .then(clucks => {
    response.render("clucks/index", { clucks });
    });
});

router.post('/index', checkIfAuthenticated, (req, res) => {
    const {cluck} = req.body;
    console.log(cluck)
    knex.insert({username:req.cookies.username, 
        content: req.body.content,
        image_url: req.body.image_url,})
    .into('clucks')
    .then((record) =>{
        res.redirect('/clucks/index');
    })
});


module.exports = router;