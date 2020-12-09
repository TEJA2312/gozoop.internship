var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('./models/mongoose');
var Enquiry = require('./models/enquiryDetails');


var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs");

app.get('/',(req,res)=>{
    res.render("index");
})
app.post('/enquiry',(req,res)=>{

    var name = req.body.name;
    var email = req.body.email;  
    var phone = req.body.phone;
    var country = req.body.country;


    var newEnquiry = {
       name: name,
       email: email,
       phone: phone,
       country: country
    };

    Enquiry.create(newEnquiry,(err,newCreation)=>{
        if(err){
            console.log("error:",err);
        }else{
        console.log("created:"+newCreation);
        }
    });

});
app.get('/details',(req,res)=>{
    Enquiry.find().then((docs)=>{
        res.render('details',{docs:docs});
    })
})

app.listen(process.env.PORT||3000, process.env.IP, function(){
    console.log("Gozoop SERVER HAS STARTED");
   });