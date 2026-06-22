import { BrowserRouter, Routes, Route } from "react-router-dom";

import Reception from "./pages/Reception";
import WaitingRoom from "./pages/WaitingRoom";
import Patient from "./pages/Patient";


function App(){

return (

<BrowserRouter>

<Routes>

<Route path="/reception" element={<Reception/>}/>

<Route path="/waiting" element={<WaitingRoom/>}/>

<Route path="/patient" element={<Patient/>}/>

</Routes>

</BrowserRouter>

);

}


export default App;