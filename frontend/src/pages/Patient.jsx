import {useState} from "react";


function Patient(){

const [name,setName] = useState("");
const [token,setToken] = useState(0);


async function joinQueue(){


const res = await fetch(
"http://localhost:5000/api/queue/add",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name:name
})
}
);


const data = await res.json();


localStorage.setItem(
 "myToken",
 data.tokenNo
);


setToken(data.tokenNo);

setName("");

}


return(

<div>

<h1>Patient Portal</h1>


<input

placeholder="Enter Patient Name"

value={name}

onChange={(e)=>setName(e.target.value)}

/>


<br/><br/>


<button onClick={joinQueue}>
Join Queue
</button>


<h3>
Your Token: {token}
</h3>


</div>

)

}


export default Patient;