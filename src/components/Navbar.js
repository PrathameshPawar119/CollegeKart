import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import menu1 from '../images/menu.png'
import search from '../images/loupe.png'
import books from '../images/books.png'
import notes from '../images/notes.png'
import objects from '../images/objects.png'
import plus from '../images/plus.png'
import devices from '../images/devices.png'
import techIcon from '../images/data-management.png'
import userIcon from '../images/user.png'
import signOut from '../images/sign-out.png'


export default function Navbar(props){

  let location = useLocation();
  useEffect(()=>{
    console.log(location);
  })

  const handleLogout =  async ()=>{
     localStorage.removeItem('token');
     window.location = "/login";
  }

//  This function changes width of sidebar when clicked on menu 
   const makeActive = ()=>{
    document.querySelector('.sidebar').classList.toggle("active");
  }

  const mystyle = {
    borderBottomColor: "whitesmoke"
  }

    return (
      <div className="NavContainer">
        <div className="sidebar">
          <div className="logo_content">
            <div className="logo">College Bazar</div>
            <img src={menu1} alt="Menu" onClick={makeActive} className="menuImg icon toggle"/>
          </div>
          <ul className="nav_list">
            <li className="searchElem">
              <img src={search} alt="Search" id="searchIcon" className=" searchIcon icon" />
              <input type="text" id="SearchNewsInp" placeholder=" Search..." />
              <span className="tooltip searchTooltip">Search</span>
            </li>
            <div className="temp"></div>
            <li>
              <a href="#" id="books">
                <img src={books} alt="books" className="icon" />
                <span className="links_name">Books</span>
              </a>
              <span className="tooltip">Books</span>
            </li>
            <li>
              <a href="#" id="notes">
                <img src={notes} alt="notes" className="icon" />
                <span className="links_name">Notes</span>
              </a>
              <span className="tooltip">Notes</span>
            </li>
            <li>
              <a href="#" id="devices">
                <img src={devices} alt="devices" className="icon" />
                <span className="links_name">Devices</span>
              </a>
              <span className="tooltip">Devices</span>
            </li>
            <li>
              <Link to={"/"} id="objects">
                <img src={objects} alt="objects" className="icon" />
                <span className="links_name">Other</span>
              </Link>
              <span className="tooltip">Other</span>
            </li>
            <li >
              <Link to={"/userprofile"} id="add_prod">
                <img src={plus} style={mystyle} alt="plus"  className={` icon ${location.pathname === '/userprofile'?'highlight':''}`}/>
                <span className="links_name">Add Product</span>
              </Link>
              <span className="tooltip">Add Product</span>
            </li>
            <li>
              <Link to={"/contactus"} id="contactUs">
                <img src={techIcon} style={mystyle} alt="Technology" className={` icon ${location.pathname === '/contactus'?'highlight':''}`} />
                <span className="links_name">Contact us</span>
              </Link>
              <span className="tooltip">Contact us</span>
            </li>
            { 
            !localStorage.getItem('token')?<li>
              <Link to={"/login"} id="profile" className='profile_content'>
                <img src={userIcon} style={mystyle} alt="Profile" className="icon profile_img" />
                <span className="links_name UserName">Login</span>
              </Link>
              <span className="tooltip">Login or SignUp</span>
            </li>: 
            <li>
              <Link to={"/logout"}  onClick={handleLogout} id="profile" className='profile_content'>
                <img src={signOut} style={mystyle} alt="Profile" className="icon profile_img" />
                <span className="links_name UserName">Log Out</span>
              </Link>
              <span className="tooltip">Log Out</span>
            </li>
            }
          </ul>
        </div>
      </div>
    );
  
}



// business entertainment health science sports technology