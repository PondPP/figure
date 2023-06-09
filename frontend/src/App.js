import './App.css';
import Home from './Component/Home';
import { Login } from './Component/Login';
import Register from './Component/Register';
import Profile from './Component/Profile';
// import Update from './Component/Update';
import "./Component/style.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import data from './ContextApi';
import { useEffect, useState } from 'react';
import AddItem from './Component/AddItem';


function App() {

  const [userdata, setUserData] = useState ({})
  
  return (
    <div className="App">
    <data.Provider value={{userdata,setUserData}}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Profile" element={<Profile />}/>
          <Route path="/AddItem" element={<AddItem />} />

          <Route path="/home" element={<Home />} />
          
          

        </Routes>
      </Router>
    </data.Provider>

  </div>
  );
}

export default App;
