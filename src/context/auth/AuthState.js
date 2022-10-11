import React from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext'

function AuthState(props) {

    const host = "http://localhost:5000";
    const navigate = useNavigate();
    
    const loginUser = async (email, password)=>{

        const responce = await fetch(`${host}/api/auth/loginuser`,
            {
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            }
        )
        const result = await responce.json();
        console.log(result);

        if (result.success) {
          localStorage.setItem('token', result.authtoken);
          navigate("/userprofile");
          props.showAlert("Logged in successfully !");
        }
        else{
          props.showAlert("Invalid Credentials !","error");
        }

    }

    const addUser = async (name, email, password)=>{
      const responce = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({name, email, password})
      })

      const result = await responce.json();
      console.log(result);

      localStorage.setItem('token', result.authtoken)
      navigate("/userprofile");
    }

  return (
    <AuthContext.Provider value={{ loginUser, addUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthState
