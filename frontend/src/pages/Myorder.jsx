import React, { useContext, useEffect, useState } from 'react'
import "../pages/CSS/Myorder.css"
import axios from "axios";
import { ShopContext } from '../context/ShopContext';
import image from '../components/Assets/image.png';
const Myorder = () => {

    const[data,setdata]=useState([]);
    const{url,authtoken}=useContext(ShopContext);
    const fetchorders=async()=>{
        const response=await axios.post(url+"/api/order/userorders",{},{headers:{"auth-token": authtoken }});
        setdata(response.data.data);
        console.log(response.data.data);
    }

    useEffect(()=>{
        if(authtoken){
            fetchorders();
        }
    },[authtoken])
  return (
    <div className='myorders'>
        <h2>My Orders</h2>
        <div className='container'>
            {data.map((order,index)=>{
                return(
                    <div className='myordersorder' key={index} >
                        <img src={image} alt="" />
                        <p>{order.items.map((item,index)=>{
                            if(index===order.items.length-1){
                                return item.name+" x "+item.quantity
                            }
                            else{
                                return item.name+" x "+item.quantity+", "

                            }
                        })}</p>
                        <p>${order.amount}.00</p>
                        <p>items:{order.items.length}</p>
                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                        <button>Track Order</button>
                    </div>

                )
            })}
        </div>
      
    </div>
  )
}

export default Myorder
