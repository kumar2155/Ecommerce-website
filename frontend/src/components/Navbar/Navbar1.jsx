import React, { useContext, useRef, useState } from "react";
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import nav_dropdown from "../Assets/nav_dropdown.png"
import image1 from "../Assets/image1.png"
const Navbar =() =>{
    const[menu,setmenu]=useState("shop");
    const{gettotalcartitem}=useContext(ShopContext);
    const menuref=useRef();

    const dropdown_toggle=(e)=>{
        menuref.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }
    return(
        <div className="navbar">
            <div className="navlogo">
                <a href="/"><img src={logo} alt=""/></a>
                <p>SMART CART</p>
            </div>
            <img className="navdropdown" onClick={dropdown_toggle}src={nav_dropdown} alt="" />
            <ul ref={menuref}className="navmenu">
                <li onClick={()=>{setmenu("shop")}} ><Link to='/' style={{textDecoration:'none'}}>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
                <li onClick={()=>{setmenu("mens")}}><Link to='/mens'style={{textDecoration:'none'}}>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
                <li onClick={()=>{setmenu("womens")}}><Link to='/womens'style={{textDecoration:'none'}}>Women</Link>{menu==="womens"?<hr/>:<></>}</li>
                <li onClick={()=>{setmenu("kids")}}><Link to='/kids'style={{textDecoration:'none'}}>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
            </ul>
            <div
            className="navlogincart">
                {localStorage.getItem("auth-token")?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace("/")}}>Logout</button>
                :<Link to='/login'><button>Login</button></Link>}
                <Link to='/cart'><img src={cart_icon} alt=""/></Link>
                <div className="navlogincount">{gettotalcartitem()}</div>
                <Link to='/myorders'><img className="image" src={image1}/></Link>
            </div>
        </div>
    )
}

export default Navbar;