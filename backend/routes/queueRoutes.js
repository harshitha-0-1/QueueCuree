const express = require("express");
const router = express.Router();

const Patient = require("../models/Patient");

let currentToken = 0;


// Add patient
router.post("/add", async (req,res)=>{

try{

const {name}=req.body;

currentToken++;


const patient = await Patient.create({

tokenNo: currentToken,
name:name,
status:"waiting"

});


res.json(patient);


}catch(error){

res.status(500).json(error);

}

});



// Get queue
router.get("/", async(req,res)=>{


const patients = await Patient.find({
status:"waiting"
});


res.json({

currentToken,
patients

});


});



// Call next patient
router.put("/next", async(req,res)=>{


const patient = await Patient.findOne({

status:"waiting"

}).sort({

tokenNo:1

});



if(!patient){

return res.json({

message:"No patients waiting"

});

}



patient.status="completed";


await patient.save();



const io=req.app.get("io");


io.emit("queueUpdate",{

token:patient.tokenNo

});



res.json(patient);



});




// Clear queue
router.delete("/clear", async(req,res)=>{


try{


await Patient.deleteMany({});


currentToken=0;



const io=req.app.get("io");


io.emit("queueUpdate",{

token:0

});



res.json({

message:"Queue cleared"

});



}catch(error){


res.status(500).json(error);


}


});



module.exports = router;