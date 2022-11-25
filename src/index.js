const express = require('express');
const bodyParser = require('body-parser');
const route = require('./route/route.js')
const {default:mongoose} = require('mongoose');
const multer= require('multer')
const app = express();

app.use(bodyParser.json());
app.use(multer().any())
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://Shashi_Shekhar_Singh:Shashi0708@myproject.mb3u3za.mongodb.net/Group-17_database?authSource=admin&replicaSet=atlas-lhj98j-shard-0&readPreference=primary&ssl=true",{useNewUrlParser:true})

.then(()=>console.log("MongoDB is connected"))
.catch(err=> console.log(err))

app.use('/',route);

app.listen(process.env.PORT || 3001, function(){
    console.log('Express app running on port'+ (process.env.PORT ||3001))
});
