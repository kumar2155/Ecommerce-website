import React, { useContext, useEffect } from 'react'
import "../pages/CSS/Verify.css";
import axios from 'axios';
import {useNavigate, useSearchParams} from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
const Verify = () => {
  const [searchparams,setSearchParams]=useSearchParams();
  const success = searchparams.get("success")
  const orderId = searchparams.get("orderId")
  const navigate=useNavigate();
  const {url}=useContext(ShopContext);
  const verifypayment=async()=>{
    const response=await axios.post(url+"/api/order/verify",{success,orderId})
    if(response.data.success){
      navigate("/myorders");
    }
    else{
      navigate("/");
    }
  }

  useEffect(()=>{
    verifypayment();
  },[])
  return (
    <div className='verify'>
      <div className='spinner'>

      </div>
    </div>
  )
}

export default Verify
