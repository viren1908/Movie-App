import "./App.css";
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import Movies from "./Components/Movies";
import Wachlist from "./Components/Wachlist";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter> 
      <Navbar/> 
      <Routes>
        {/* <Route path='/' element={[<Banner  />,<Movies  />]} /> */} 
        <Route path ="/" element={[<Movies/>]} />
        <Route path='/wachlist' element={[<Wachlist/>]} />       
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
