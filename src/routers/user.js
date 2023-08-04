const express = require('express');
const router = new express.Router();
const User=require('../models/user')
const Customer =require('../models/customer')
const History = require('../models/history')
const DashboardStats = require('../helpers/functions/dashboardstats')


router.get('' , (req , res ) => {
    res.render("login.hbs");
});

router.get('/register' , (req , res ) => {
    res.render("register.hbs")
})

router.post('/register' , async function(req , res) {
    console.log(req.body);
    const user = new User(req.body)
    try{
        await user.save()
        res.redirect("/");
    } catch(e){
        //Handle this error
        const error = { msg: "Something went wrong!"}
        res.render('register.hbs' , {error} )
    }
    
})

router.post('/users/login' , async function(req , res)  {
    
    try{
        const user= await User.findByCredentials(req.body.email, req.body.password)
        req.session.user = user._id;
        req.session.username = user.name;
        res.redirect("/dashboard")
    }catch(e){
        console.log(e)
        let error  = { msg: "Please enter a valid Username and Password" } 
        res.render("login.hbs" , { error })
      } 
})

router.get('/dashboard' , async function(req , res ) {
    try {
    const user = await User.findById(req.session.user);
    const customers = await Customer.find({owner: user._id});
    const dashboardData = DashboardStats(customers);
    console.log(dashboardData)
    
    res.render("dashboard.hbs" , {title: "Dashboard" , username : req.session.username , dashboardData: dashboardData})
    }catch(e){
        console.log(e)
        let error  = { msg: "Something went wrong!" } 
        res.render("login.hbs" , { error })
    }
})

router.get('/customers' , async function(req , res){
    try{
        const customers = await Customer.find({owner: req.session.user});
        res.render("customers.hbs" , {msg: "Customer Found" , customers: customers , username : req.session.username})
        
    }catch(e){
        throw(e);
    }
})

router.get('/history' , async function(req , res) {
    try {
        const userHistory = await History.find({user: req.session.user}).populate("user" , '-password').populate("customer");
        console.log(userHistory);
        res.render("history.hbs" , {userHistory: userHistory ,  username: req.session.username})
    }catch(e){
        throw(e);
    }
})

router.get('/profile' , async function(req , res){
    try{
        const user = await User.findById(req.session.user);
        res.render('profile.hbs' , {title: 'Profile' , username: req.session.username , user: user})
    }catch(e){
        throw(e);
    }
})

router.post('/profile' , async function(req , res) {
    try {
        const updatedata = {name: req.body.name , email: req.body.email}
        console.log(updatedata)
        await User.findOneAndUpdate({_id: req.session.user}, updatedata)
        res.redirect('/profile');
    }catch(e){
        throw(e)
    }
});

router.get('/settings' , async function(req , res) {
    res.render('settings.hbs' , {title: "Settings" , username : req.session.username})
})

router.get('/logout' , (req , res) => {
    req.session.destroy((err) => {
        res.redirect('/') 
      })
})
module.exports = router;