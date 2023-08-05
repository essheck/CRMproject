const express = require('express');
const router = new express.Router();
const User = require('../models/user')
const Customer =require('../models/customer')
const History = require('../models/history')
const {sendEmail}= require('../email/sendemail')


router.get('/addcustomer' , async function(req , res) {
    try{
        const users = await User.find({});
        // console.log(users);
    res.render("addcustomer.hbs" , { msg: "true" , userData:users , username : req.session.username})
    }catch(e){
        throw err;
    }    
})

router.post('/addcustomer' , async function(req , res) {
    // console.log(req.body);
    const customer = new Customer(req.body);
    try {
        let newCustomer;
        newCustomer = await customer.save();
        
            const history = new History({
                subject: "Added Customer",
                desc: "New Lead was added",
                time: Date.now(),
                customer: newCustomer._id,
                user: req.session.user
            })
            await history.save()
            res.redirect('/addcustomer');
        
    }catch(err){
        
        res.redirect('/addcustomer');

    }
})

router.get("/details/:id" , async function(req , res) {
    try{
        const customer = await Customer.findOne({_id: req.params.id}).populate("owner" , '-password');
        res.render("customerdetails.hbs" , { customer: customer , username : req.session.username})   
    }catch(e){
        throw(e)
    }
})

router.post("/update/:id" , async function(req , res) {
    
    
    const updateData = {stage: req.body.stage , desc : req.body.desc};
    if(req.body.stage == 2){
        updateData.estimatedsales = req.body.amt;
    }
    else if(req.body.stage == 3){
        updateData.sales = req.body.amt
    }else {
        error = "Update Stage not valid";
        throw error;
    }
    

    try {
        let updatedCustomer;
        updatedCustomer = await Customer.findOneAndUpdate({_id: req.params.id} , updateData , {new: true});

        const history = new History({
            subject: "Updated Customer" ,
            desc: "Customer was updated to Stage " + updatedCustomer.stage + "Comment: "+ updateData.desc,
            time: Date.now(),
            customer: updatedCustomer._id,
            user: req.session.user
        })
        await history.save()
        res.redirect(`/details/${updatedCustomer._id}`);

    }catch(e){
        throw(e);
    }

})

router.get("/edit/:id" , async function(req , res) {
    try {
        const customer = await Customer.findOne({_id : req.params.id});
        const userData = await User.find({});
        res.render("editcustomer.hbs" , {customer: customer , userData: userData , username : req.session.username});
    }catch(e){
        throw(E)
    }
})

router.post("/edit/:id" , async function(req , res) {
    try {
        let editedCustomer;
        const update = req.body;
        editedCustomer = await Customer.findOneAndUpdate({_id : req.params.id} , update , {new : true});
        res.redirect(`/details/${editedCustomer._id}`);
    }catch(e){
        throw(e);
    }
})

router.get("/email/:id" , async function(req , res) {
    try {
        const customer = await Customer.findById(req.params.id).populate("owner" ,  '-password');
        res.render("email.hbs" , {title: "Email" , customer: customer});
    }catch(e){
        throw(e);
    }
})

router.post("/email/:id" , async function(req , res) {
    try{
        const info = await sendEmail({email: req.body.email , subject: req.body.subject , body: req.body.emailbody })
        console.log(info);
        res.redirect(`/details/${req.params.id}`);
    }catch(e){
        throw(e);
    }
})
module.exports = router;




