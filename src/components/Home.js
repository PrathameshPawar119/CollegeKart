import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext'
import Product from './Product.js';

function Home(props) {
  const context = useContext(NoteContext);
  const {allProds, getAllProds} = context;

  useEffect(()=>{
    getAllProds();
  })

  return (
    <div>
      <div className="productContainer">
        {
          allProds.map((allProd)=>{
            return <Product allProd={allProd} key={allProd._id} showAlert={props.showAlert}/>
          })
        }
      </div>
    </div>
  )
}

export default Home
