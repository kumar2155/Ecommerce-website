import React, { useEffect, useState } from 'react'
import './Popular.css'
import Item from '../Items/Items'
const Popular1 = () => {
  const [popular,setpopular]=useState([]);
  useEffect(()=>{
    fetch("http://localhost:4000/popularmen")
    .then((response)=>response.json())
    .then((data)=>setpopular(data));
  },[]);
  return (
    <div id='popularinmen'>
    <div className='popular'>
      <h1>POPULAR IN MEN</h1>
      <hr/>
      <div className='popularitem'>
        {popular.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div></div>
  )
}

export default Popular1
