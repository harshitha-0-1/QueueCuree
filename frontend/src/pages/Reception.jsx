import { useState } from "react";


function Reception() {

  const [name,setName] = useState("");
  const [message,setMessage] = useState("");



  async function addPatient(){

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


    setMessage(
      `Patient Added. Token Number: ${data.tokenNo}`
    );


    setName("");

  }





  async function callNext(){

    const res = await fetch(
      "http://localhost:5000/api/queue/next",
      {
        method:"PUT"
      }
    );


    const data = await res.json();


    setMessage(
      `Now Calling Token: ${data.tokenNo}`
    );


  }





  async function clearQueue(){


    const res = await fetch(
      "http://localhost:5000/api/queue/clear",
      {
        method:"DELETE"
      }
    );


    const data = await res.json();


    setMessage(data.message);


  }





  return (

    <div>


      <h1>Reception Dashboard</h1>



      <input

        value={name}

        onChange={(e)=>setName(e.target.value)}

        placeholder="Enter Patient Name"

      />



      <br/><br/>



      <button onClick={addPatient}>
        Add Patient
      </button>



      <br/><br/>



      <button onClick={callNext}>
        Call Next
      </button>



      <br/><br/>



      <button onClick={clearQueue}>
        Clear Queue
      </button>



      <h3>
        {message}
      </h3>



    </div>

  );

}


export default Reception;