import { BrowserRouter, Routes, Route } from "react-router-dom";

import Reception from "./pages/Reception";
import WaitingRoom from "./pages/WaitingRoom";
import Patient from "./pages/Patient";


function App(){

return (

<BrowserRouter>

<Routes>

<Route path="/" element={<Reception/>}/>

<Route path="/reception" element={<Reception/>}/>

<Route path="/patient" element={<Patient/>}/>

<Route path="/waitingroom" element={<WaitingRoom/>}/>

</Routes>

</BrowserRouter>

);

}


export default App;