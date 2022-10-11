import React, { useState } from 'react'
import NoteContext from './NoteContext'



function NoteState(props) {
  const host = "http://localhost:5000";
  const [prods, setProds] = useState([]);
  const [allProds, setAllProds] = useState([]);

  //Function to fetch user's products
  const getAllProds = async () => {
    const responce = await fetch(`${host}/api/prods/fetchallprods`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const result = await responce.json(); // without await it returns just promise
    setAllProds(result);
  };

  //Function to fetch user's products
  const getProds = async () => {
    const responce = await fetch(`${host}/api/prods/fetchmyprods`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const result = await responce.json(); // without await it returns just promise
    setProds(result);
  };

  // Function to add product
  const addProd = async (title, description, price, category) => {


    const responce = await fetch(`${host}/api/prods/addprod`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, price, category }),
    });

    const result = await responce.json();
    console.log("result from responce - ", result);

    props.showAlert("Product added successfully !", "success");

    getProds();

  };

  const deleteProd = async (id) => {
    const askToDelete = window.confirm("Are you sure to delete this product ?");
    if (askToDelete) {
      const responce = await fetch(`${host}/api/prods/deleteprod/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const result = await responce.json();
      console.log(result);

      props.showAlert(
        `Product '${result.prod.title.slice(0, 15)}'.. deleted !`,
        "error"
      );

      const remainingProds = prods.filter((prod) => {
        return prod._id !== id;
      });
      setProds(remainingProds);
    } else {
      props.showAlert("Product has not deleted !", "success");
    }
  };

  const editProd = async (id, title, description, price, category) => {
    const responce = await fetch(`${host}/api/prods/updateprod/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, price, category }),
    });
    const result = responce.json();
    console.log(result);

    getProds();
    // for (let i = 0; i < prods.length; i++) {
    //   const element = prods[i];
    //   if (element._id === id) {
    //       element._id = id;
    //       element.description = description;
    //       element.title = title;
    //       element.price = price;
    //       element.category = category;
    //   }
    // }
  };

  return (
    <NoteContext.Provider
      value={{ prods, allProds, setProds, addProd, deleteProd, editProd, getProds, getAllProds }}
    >
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState
