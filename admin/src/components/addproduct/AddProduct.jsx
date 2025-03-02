import React, { useState } from 'react'
import './AddProduct.css'
import upload from '../../assets/upload_area.svg'


const AddProduct = () => {

  const [image,setimage]=useState(false);
  const [productdetails,setproductdetails]=useState({
    name:"",
    image:"",
    category:"",
    old_price:"",
    new_price:""
  })
  const imagehandler=(e)=>{
    setimage(e.target.files[0]);
  }

  const changehandler=(e)=>{
    setproductdetails({...productdetails,[e.target.name]:e.target.value})
  }

  const add_product=async()=>{
    console.log(productdetails);
    let responsedata;
    let product=productdetails;

    let formdata=new FormData();
    formdata.append("product",image);

    await fetch("http://localhost:4000/upload",{
      method:'POST',
      headers:{
        Accept:'application/json',
      },
      body:formdata,
    }).then((resp)=>resp.json()).then((data)=>{responsedata=data})

    if(responsedata.success)
    {
      product.image=responsedata.image_url;
      console.log(product);
      await fetch("http://localhost:4000/addproduct",{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify(product),
      }).then((resp)=>resp.json()).then((data)=>{data.success?alert("product added"):alert("failed")})
    }
  }
  return (
    <div className='addproduct'>
      <div className="addproductitemfield">
        <p>Product Title</p>
        <input value={productdetails.name} onChange={changehandler}type='text' name='name' placeholder='type here'/>
      </div>
      <div className="addproductprice">
        <div className="addproductitemfield">
            <p>Price</p>
            <input value={productdetails.old_price} onChange={changehandler}type='text' name='old_price' placeholder='type here'/>
        </div>
        <div className="addproductitemfield">
            <p> Offer Price</p>
            <input value={productdetails.new_price} onChange={changehandler} type='text' name='new_price' placeholder='type here'/>
        </div>
      </div>
        <div className='addproductitemfield'>
          <p>Product Category</p>
          <select value={productdetails.category} onChange={changehandler}name='category' className='addproductselector'>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
          </select>
        </div>
        <div className="addproductitemfield">
          <label htmlFor="fileinput">
            <img src={image?URL.createObjectURL(image):upload} className='addproductthumbnailimg' />
            <input onChange={imagehandler} type="file" name='image' id='fileinput' hidden/>
          </label>
        </div>
        <button className='addproductbutton' onClick={()=>{add_product()
        }}>ADD</button>
      
    </div>
  )
}

export default AddProduct
