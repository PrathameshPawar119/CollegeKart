import React, { useContext }  from 'react'
import NoteContext from '../context/notes/NoteContext.js';
import ImageUrl from "../images/amazon-prod1.jpg";



export default function Product (props) {

  const context = useContext(NoteContext);
  const {deleteProd} = context;

  //destructing data from prod objects deom userprofile
  const {title, description} = props.prod;

  const deleteThisProduct = ()=>{
      deleteProd(props.prod._id);
  }
  


    return (
      <div>
        <div className="prodsElement">
          <div className="prodsImg">
              <img src={ImageUrl} alt="Img" />
          </div>
          <div className="prodsContent">
            <div className="prodsTitle">
                {title}
            </div>
            <div className="prodsDesc">
                {description} this is description bro, don't mine it.. <button className='readMoreBtn'>read more</button> 
            </div>
          </div>
          <div className="metadata">
            <div><button className="user_prod_btns " id='delete_prod' onClick={deleteThisProduct}>Delete</button></div>
            <div><button className= "user_prod_btns " onClick={()=>{console.log("ediiit")}} disabled={true}  id='edit_prod'>Edit</button></div>
          </div>
            {/* <div><button type="button" className="user_prod_btns" data-bs-toggle="modal" data-bs-target="#exampleModal" data-target="#myModal" data-backdrop="false">Edit</button></div> */}

        {/* <!-- Modal --> */}
        {/* <div className="ModalContainer">
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    ...
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary">Save changes</button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );

}

