import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'
// import { application } from 'express';
const ListProduct = () => {
  const [allproducts,setallproducts]=useState([]);

  const fetchinfo =async() =>{
    await fetch("http://localhost:4000/allproducts")
    .then((res)=>res.json())
    .then((data)=>{setallproducts(data)});
  }
  useEffect(()=>{
    fetchinfo();
  }) 

  const removeproduct=async(id)=>{
    await fetch("http://localhost:4000/removeproduct",{
      method:"POST",
      headers:{
        Accept:"application/json",
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id})
    })
    await fetchinfo();
  }

  return (
    <div className='listproduct'>
      <h1>All Product List</h1>
      <div className='listproductformatmain'>
        <p>Products</p>
        <p>Title</p>
        <p>Old price</p>
        <p>New price</p>
        <p>Category</p>
        <p>Remove</p>

      </div>
      <div className="listproductallproducts">
        <hr/>
        {allproducts.map((product,index)=>{
          return <> <div key={index}className="listproductformatmain listproductmain">
            <img src={product.image} alt="" className='listproductformatmainimg' />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={()=>{removeproduct(product.id)}}src={cross_icon}alt="" className='listproductremoveicon' />
          </div>
          <hr/>
          </>
        })}
      </div>
    </div>
  )
}

export default ListProduct
