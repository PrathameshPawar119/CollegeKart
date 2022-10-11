import React, { useContext, useState } from 'react'
import AuthContext from '../context/auth/AuthContext'
import { Link } from "react-router-dom";

function Login(props) {

    const context = useContext(AuthContext);
    const { loginUser } = context;

    const [user, setUser] = useState({email: "", password:""});

    const handleOnchange = (e)=>{
        setUser({...user, [e.target.name]: e.target.value})
    }

    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        await loginUser(user.email, user.password);
        setUser({ email: "", password: "" }); // to clear form after submit
    }
  return (
    <div className='loginContainer container'>
        <div className="container my-3">
            <h1>Login to Your Account</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={handleOnchange} value={user.email} minLength={6} id="email" name='email' aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={handleOnchange} value={user.password} minLength={6} id="password" name='password' required />
                </div>

                <button type="submit" disabled={user.email.length < 6 || user.password.length <6} style={{width:"98%"}} className="Btn" ><b>Submit</b> </button>
                <div className="my-3">&nbsp;</div>
                <h3 className='text-center my-3'>Are you New to bazar??</h3>
                <h3 className='text-center'>&#8659;</h3>
                <Link to={"/signup"} className='Btn' style={{ textDecoration:"none", display:"flex", justifyContent:"center"}}><b>Register</b></Link> 
            </form>
        </div>
    </div>
  )
}

export default Login
