/** This is a sample code for your bot**/
function MessageHandler(context, event) {
   
   var general_problems = ["wrong product","pricing issue","refund issue"]; 
    if(event.message.toLowerCase() == "hi"){
        context.simplehttp.makeGet("https://grow-scale.herokuapp.com/getAllTopProblems");
    }
    else if(general_problems.indexOf(event.message)!=-1){
        var i = general_problems.indexOf(event.message);
        var prob = general_problems[i].replace(" ","_");
        context.simplehttp.makeGet("https://grow-scale.herokuapp.com/userProblem/true/"+prob);
    }
    else{
        var prob = event.message;
        context.simplehttp.makeGet("https://grow-scale.herokuapp.com/userProblem/false/"+prob);
    }
}
/** Functions declared below are required **/
function EventHandler(context, event) {
    
}

function HttpResponseHandler(context, event) {
   
   if(event.getresp.includes("problem_0")){

       var response = JSON.parse(event.getresp);
        var comp0 = response.problem_0;
        var comp1 = response.problem_1;
        var comp2 = response.problem_2;
        var comp0 = comp0.replace("_"," ");
        var comp1 = comp1.replace("_"," ");
        var comp2 = comp2.replace("_"," ");
    
        var question = {
                       "type": "survey",
                         "question": "please select your problem from the options given below.\nIf the problem you you are facing is not one of the options, Then please describe your problem in about 100 words.\nThank You",
                         "msgid": "3er45",
                         "options": [
                                 comp0,
                                 comp1,
                                 comp2
                               ]
                       }; 
       context.sendResponse(JSON.stringify(question)); 
   }
  else if(event.getresp.includes("Updated Successfully")){
       context.sendResponse("Thank You . We have successfully noted down your problem");
  }else if(event.getresp.includes("could not identify the problem")){
       context.sendResponse("sorry, I "+event.getresp+".\nCan you please specify more about your problem.\nThank you.");
  }else if(event.getresp.includes("Successfully notted down the problem")){
      context.sendResponse("We Have Successfully notted down the problem.\nThank You sir/madam, we would definetly look into this issue and check that you does not face this issue further..")
  }

}

function DbGetHandler(context, event) {
   
}

function DbPutHandler(context, event) {
   
}
