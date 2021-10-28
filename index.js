/*
https://bookseats.herokuapp.com/
*/


const express = require('express');
const path =require('path');
const mongoose = require('mongoose');
const data = require('./models/data')

var app = express();

require("dotenv").config();

console.log(data);

var bodyParser = require('body-parser');


var engine = require('consolidate');
const { json } = require('body-parser');


const uri =process.env.Mongo_url;
// mongoose.connect(uri)

mongoose.connect(uri, {

    useNewUrlParser: true, 
    
    useUnifiedTopology: true 
    
    }, err => {
    if(err) throw err;
    console.log('Connected to MongoDB!!!')
    });

var db=mongoose.connection;

/*
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/

app.set('views', __dirname + '/public');
app.engine('html', engine.mustache);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static('public'));


app.get('/',function(req,res){
    res.render('index.html');
});

app.post('/getData',async (req,res) => {
    var seatsNeeded =req.body.finput;
    var name = req.body.username;
     var ts = 80;
    var oc = 10;
    var rem =  parseInt(ts) -  (parseInt(oc) + parseInt(seatsNeeded));
    var d = {
    
        totalSeats: ts,
        occupied:oc,
        need: seatsNeeded,
        remain :rem,
        user : name
    }
se = await data.create({seatsNeeded})
    db.collection('dataModel').insertOne(d,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
            
    });

  

    res.render('booked.ejs',{
        occ:  seatsNeeded
    });

})


const port =  process.env.PORT || 4000;
app.listen(port,function(){
    console.log(`server running on ${port}`);
})

