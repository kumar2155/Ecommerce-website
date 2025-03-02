import React, { useEffect, useState } from 'react'
import './NewCollections.css'

import Item from '../Items/Items'
const NewCollections = () => {
  const [newcollection,setnewcollection]=useState([]);
  useEffect(()=>{
    fetch("http://localhost:4000/newcollections")
    .then((response)=>response.json())
    .then((data)=>setnewcollection(data));
  },[]);
  return (
    <div className='newcollection' id="newcollections">
    <div className='newcollection'>
      <h1>NEW COLLECTIONS</h1>
      <hr/>
      <div className='collection'>
        {newcollection.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
    </div>
  )
}

export default NewCollections
