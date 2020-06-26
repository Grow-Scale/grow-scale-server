/** This is a sample code for your bot**/
function MessageHandler(context, event) {
   //context.sendResponse("Hello");
   //context.sendResponse("Hello vk");
   var general_problems = ["wrong product","customer care","refund issue"]; 
    if(event.message.toLowerCase() == "hi" || event.message.toLowerCase() == "get started" || event.message.toLowerCase() == "hello"){
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
                         "question": "Please check whether your issue falls under any of the below problems. If not describe in not more than 75 words.\nThank You",
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
       context.sendResponse("Thank You . We have successfully noted down your problem.");
  }else{
      context.sendResponse("Thank You . We have successfully noted down your problem.");
  }

}

function DbGetHandler(context, event) {
   
}

function DbPutHandler(context, event) {
   
}
