import React, { useContext, useEffect } from 'react'
import InputProd from './InputProd'
import UserProduct from "./UserProduct.js"
import NoteContext from '../context/notes/NoteContext';
import {useNavigate } from 'react-router-dom';

function UserProfile(props) {
  const context = useContext(NoteContext);
  const{prods, getProds} = context;

  const navigate = useNavigate();

  useEffect(()=>{
    if (localStorage.getItem('token')) {
      getProds();
    }
    else{
      console.log("not logged")
      navigate('/login');
    }

    // this function is called here because whenever user interacts with products this will run
    // if it is called in notestate then it would run forever
  })

  return (
    <div>
      <InputProd />

      <h1 style={{marginTop:"40px"}}>Your Active Prodcuts</h1>
      <div className="productContainer">
        <h2>{prods.length===0?"Please upload any product above !":""}</h2>
       {
        prods.map((prod)=>{
          return (
            <UserProduct prod={prod} key={prod._id} showAlert={props.showAlert}/>
          );
        })
       }
       
      </div>
    </div>
  );
}

export default UserProfile
