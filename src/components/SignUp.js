import React, { useContext, useState } from 'react'
import AuthContext from '../context/auth/AuthContext';

function SignUp(props) {
  const context = useContext(AuthContext);
  const {addUser} = context;

  const [user, setUser]  = useState({name:"", email:"", password:"", CnfPassword:""})

  const handleOnchange = (e)=>{
    setUser({...user, [e.target.name]:e.target.value});
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if (user.password === user.CnfPassword) {
      await addUser(user.name, user.email, user.password);
      setUser({ name: "", email: "", password: "" , CnfPassword:""});

      props.showAlert("Signed in successfully !")
    }
    else{
      props.showAlert("Please enter both same passwords !", "error");
    }
  }

  return (
    <div className='container'>
      <h2>Don't let your notes,books to be dump in 'raddi' !!</h2>
      <h1>Give them to deserving junior</h1>
      <div className="my-3">&nbsp;</div>
      <div className="container my-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">UserName </label>
                <input type="text" className="form-control" onChange={handleOnchange} value={user.name} minLength={4} id="name" name='name' aria-describedby="emailHelp" required/>
          </div>
          <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" onChange={handleOnchange} value={user.email} minLength={6} id="email" name='email' aria-describedby="emailHelp" required />
          </div>
          <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" onChange={handleOnchange} value={user.password} minLength={6} id="password" name='password' required/>
          </div>
          <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" onChange={handleOnchange} value={user.CnfPassword} minLength={6} id="CnfPassword" name='CnfPassword' required/>
          </div>

          <button type="submit" disabled={(user.name.length <4 || user.email.length <6 || user.password.length <6)} style={{width:"96%"}} className="Btn" ><b>Submit</b> </button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
