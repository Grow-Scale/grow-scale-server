
// Import Modules

var mongojs = require("mongojs");
var db = mongojs("mongodb://vedha:krishna123@cluster0-shard-00-00-kbuhh.mongodb.net:27017/FBHackathon?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",["problems"]);
var express=require("express");
var bodyParser=require('body-parser');
var app = express();
const {Wit, log} = require('node-wit');

// Initialization and setup

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

const client = new Wit({
	accessToken: 'AS55FM2MNRFKM4TEF7WR3MYCPFPMQX2J',
	logger: new log.Logger(log.DEBUG) // optional
});

// Routes

app.get("/",function(req,res)
{
    // Use this route for the front end tasks.
	res.send("Use This Route For Front End Works");
});

app.get("/getAllTopProblems",function(req,res){
	// getAllTopProblems is used to get all the problems to be displayed at the beginning of conversation
	// setting up the threshold to be 2
	db.problems.find( { "no_users": { $gt: 2 } }, function(err,data){
		if(err) throw err
		var prob=[]
		if(data.length>0){
			for(var i = 0; i<data.length;i++){
				prob.push(data[i].name);
			}
			res.send(data)
		} else {
			res.send("Happy to say that there are 0 problems less than threshold.");
		}
	})
});

app.get("/userProblem/:is_exists/:name",function(req,res){
	// userProblem is used to increment the number of users having the problem
	/* Querys
	   is_exists (boolean) : True if the user selects any button. False id the user gives his own problem discription
	   name (string) : The Problem They are facing */
	if(req.params.is_exists == "true"){
		// If the user is facing a problem from the given problems in form of buttons.
		db.problems.update({name:req.params.name},{ $inc: { no_users : 1}},function(err,data){
			if(err) throw err;
			res.send(req.params.name+" Updated Successfully");
		})
	}else{
		// wit.ai Part
		// If the user is facing a different problem other than the given problems in form of buttons.
		client.message(req.params.name,{})
		.then((data)=>{
			if(Object.values(data.entities).length>0){
				var needed_data = Object.values(data.entities)[0][0]
				// the threshold is set to 80 %
				if(needed_data.confidence>0.80){
					//res.send(needed_data.body+" with a confidence of "+needed_data.confidence);
					db.problems.insertOne( {name:needed_data.body , no_users:1}, function(err,data){
						if (err) throw err
						res.send("Successfully notted down the problem "+needed_data.body);
					})
				}else{
					res.send("could not identify the problem");
				}
			}else{
				res.send("could not identify the problem");
			}
			
		})
	}
});


app.listen(4000,function(){
	console.log("Server started at at port no. 4000")
})
