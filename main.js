
var mongojs = require("mongojs");
var db = mongojs("mongodb://vedha:krishna123@cluster0-shard-00-00-kbuhh.mongodb.net:27017/FBHackathon?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",["problems"]);
var express=require("express");
var bodyParser=require('body-parser');
var app = express();
const {Wit, log} = require('node-wit');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

const client = new Wit({
	accessToken: 'AS55FM2MNRFKM4TEF7WR3MYCPFPMQX2J',
	logger: new log.Logger(log.DEBUG) // optional
  });
app.get("/",function(req,res)
{
    // Use this route for the front end tasks.
	res.send("Use This Route For Front End Works");
});

app.get("/fbhackathon",function(req,res)
{
	client.message("The clothes are torn out and the quality was too bad.",{})
	.then((data)=>{
		console.log(data);
		res.send(Object.values(data.entities));
	})
});

app.listen(4000,function(){
	console.log("SERVER STARTED SUCCESSFULLY................")
})
