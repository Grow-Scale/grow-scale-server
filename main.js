
var mongojs = require("mongojs");
var db = mongojs("mongodb://vedha:krishna123@cluster0-shard-00-00-kbuhh.mongodb.net:27017/Hutlabs?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",["members,project_wait_list,student_wait_list,ongoing_projects"]);
var express=require("express");
var bodyParser=require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.get("/",function(req,res)
{
    // Use this route for all the front end tasks.
	res.send("Use This Route For Front End Works");
});

app.get("/",function(req,res)
{
    // Use this route for all the front end tasks.
	res.send("Use This Route For Back End Works");
});

app.listen(4000,function(){
	console.log("SERVER STARTED SUCCESSFULLY................")
})