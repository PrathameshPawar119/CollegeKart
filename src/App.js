import React, { useState } from 'react'
import NoteState from "./context/notes/NoteState.js";
import AuthState from './context/auth/AuthState.js';

import Navbar from "./components/Navbar.js"
import UserProfile from './components/UserProfile.js';
import Home from "./components/Home.js"
import Contact from "./components/ContactUs.js"
import Alert from './components/Alert.js';
import Login from './components/Login.js';
import SignUp from './components/SignUp.js';

import "./App.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";



function App() {

  const [alert, setAlert] = useState({msg:"", type:""});

  const showAlert = (message, type)=>{
    setAlert({msg: message,  type: type })
    setTimeout(() => {
      setAlert({ msg: "", type: "" });
    }, 2000);
  }

  return (
    <div className="App ">
      <Router>
        <NoteState showAlert={showAlert}>
        <AuthState showAlert={showAlert}>
            <Navbar />
            <div className="home_content">
              <Alert alert={alert}/>
              <Routes>
                <Route path="/userprofile" element={<UserProfile showAlert={showAlert} />} />
                <Route path="/" element={<Home showAlert={showAlert}/>} />
                <Route path="/home" element={<Home showAlert={showAlert}/>} />
                <Route path="/contactus" element={<Contact />} />
                <Route path="/login" element={<Login showAlert={showAlert}/>}  />
                <Route path='/signup' element={<SignUp showAlert={showAlert}/>} />
              </Routes>
            </div>
        </AuthState>
        </NoteState>
      </Router>
    </div>
  );
}

export default App;
