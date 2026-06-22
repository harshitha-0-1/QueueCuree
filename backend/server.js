const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


const queueRoutes = require("./routes/queueRoutes");

app.use("/api/queue", queueRoutes);



mongoose.connect(process.env.MONGO_URI)
.then(()=>{
 console.log("MongoDB Connected");
})
.catch(err=>{
 console.log(err);
});



// Socket.IO

const server = http.createServer(app);


const { Server } = require("socket.io");


const io = new Server(server,{
 cors:{
  origin:"http://localhost:5173"
 }
});


app.set("io",io);


io.on("connection",(socket)=>{
 console.log("User Connected");
});



server.listen(5000,()=>{
 console.log("Server Started on Port 5000");
});