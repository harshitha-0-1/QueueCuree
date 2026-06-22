import { useEffect, useState } from "react";
import { io } from "socket.io-client";


function WaitingRoom(){

const [queue,setQueue] = useState([]);
const [current,setCurrent] = useState(0);



async function getQueue(){

 const res = await fetch(
  "http://localhost:5000/api/queue"
 );

 const data = await res.json();

 setQueue(data.patients);
 setCurrent(data.currentToken);

}



useEffect(()=>{


getQueue();


const socket = io("http://localhost:5000");


socket.on("connect",()=>{

 console.log("Socket Connected");

});


socket.on("queueUpdate",(data)=>{

 console.log("Update received",data);

 setCurrent(data.token);

 getQueue();

});


return ()=>{

 socket.disconnect();

};


},[]);



return(

<div>

<h1>Patient Waiting Room</h1>


<h3>
Current Token: {current}
</h3>


<h3>
Your Token: {queue.length ? queue[0].tokenNo : 0}
</h3>


<h3>
Tokens Ahead: {queue.length ? queue.length-1 : 0}
</h3>


<h3>
Estimated Wait: {queue.length * 5} mins
</h3>


</div>

)

}


export default WaitingRoom;