import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
import './InputProdc.css'

function InputProd() {

  const context = useContext(NoteContext);
  const {addProd} = context;

  //Taking input from form
  const [product, setProduct] = useState({title:"", description:"", price:'', category:"notes"});

  const handleAddProd = async (e)=>{
    e.preventDefault();  // due to unwanted refresh of page caauses to leak new product data
    addProd(product.title, product.description, product.price, product.category);
    setProduct({ title: "", description: "", price: "", category: "notes" });
  }

  //putting form input in product state
  const handleOnchangeInp = (e)=>{
       setProduct({...product, [e.target.name]: e.target.value });
  }
  // const handleOnchangeFile = (e)=>{
  //   setProduct({})
  // }

  return (
    <div className="InputProd ">
      <form onSubmit={handleAddProd} encType="multipart/form-data">
        <div className="InputForm">
          <label><h2>Add a Product</h2></label>
          <div className="basic_info">
            <div className="title">
              <label htmlFor="title">Title </label><br/>
              <input type="text" className='prodInp' name="title" minLength={10} value={product.title} id="title" onChange={handleOnchangeInp} placeholder="Sem-5 SE notes all chapters" required/>
            </div>
            <div className="description">
              <label htmlFor="description">description </label><br/>
              <textarea type="text" className='prodInp' name="description" value={product.description} minLength={35} id="description" onChange={handleOnchangeInp} placeholder='Specifications about your product' required></textarea>
              <small>minimum 10 words</small>
            </div>
          </div>
          <div className="otherinfo">
            <div className="price">
              <label htmlFor="price">Price </label>
              <input type="number" className='prodInp' name="price" value={product.price} id="price" onChange={handleOnchangeInp} placeholder="00"/>
            </div>
            <div className="category">
              <label htmlFor="category">Category</label>
              <select name="category" className='prodInp ptr' value={product.category} onChange={handleOnchangeInp} id="category" >
                <option value="notes" defaultValue={"notes"}>Notes</option>
                <option value="books" >Books</option>
                <option value="device">Device</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="pimage">
              <label htmlFor="pimage"> Image</label>
              <input type="file" className='prodInp  ptr' onChange={handleOnchangeInp} name="image" id="pimage" />
            </div>
          </div>
          <button type='submit' disabled={product.title.length<10 || product.description.length<35} className='SubmitBtn Btn ptr' ><b>Submit</b></button>
        </div>
      </form>
    </div>
  );
}

export default InputProd
