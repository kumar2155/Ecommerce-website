import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import "../pages/CSS/Deliveryinfo.css"
import { ShopContext } from '../context/ShopContext';
const Deliveryinfo = () =>{
    const {getTotalCartAmount,cartitems,all_product,authtoken,url}=useContext(ShopContext)

    const [Deliveryinfo,setDeliveryinfo]=useState({
        Firstname:"",
        Lastname:"",
        Emailid:"",
        Street:"",
        city:"",
        state:"",
        pincode:"",
        country:"",
        phonenumber:""
    });

    const placeorder=async (event)=>{
        event.preventDefault();
        for (let key in Deliveryinfo) {
            if (!Deliveryinfo[key] || Deliveryinfo[key].trim() === "") {
                alert("Please fill in all fields before proceeding.");
                return;
            }
        }
        // let orderitems=[];
        let orderitems = all_product
        .filter(item => cartitems[item.id] > 0)
        .map(item => ({
            ...item,
            quantity: cartitems[item.id],
        }));

        

//         let totalAmount = orderitems.reduce((total, item) => total + (Number(item.price) || 0) * item.quantity, 0);
// console.log("Total Amount:", totalAmount);

        let orderdata = {
            // userid: actualUserId,  // Make sure to replace this with actual user ID
            address: Deliveryinfo,
            items: orderitems,
            amount: getTotalCartAmount(),
        };
        
        

        try {
            let response = await axios.post(url + "/api/order/place", orderdata, {
                headers: { "auth-token": authtoken },
            });
    
            console.log("Stripe Response:", response.data);
    
            if (response.data.sucess && response.data.session_url) { 
                window.location.href = response.data.session_url;
            } else {
                alert("Payment Error: No session URL received.");
            }
        } catch (error) {
            console.error("Error during order placement:", error);
            alert("An error occurred while processing your order.");
        }
    }
    // useEffect(()=>{
    //     console.log(Deliveryinfo);
    // },[Deliveryinfo])
    // const navigate = useNavigate();

    const handleChange = (e) => {
        setDeliveryinfo(Deliveryinfo=>({ ...Deliveryinfo, [e.target.name]: e.target.value }));
    };

    const navigate=useNavigate()
    useEffect(()=>{
        if(!authtoken){
            navigate('/cart');
        }
        else if(getTotalCartAmount()===0)
        {
            navigate('/cart');
        }
    })

    

    return (
        <form onSubmit={placeorder} className='placeorder'>
        <div className="delivery-info">
            <h2>Delivery Information</h2>
            <input required className='inputpayment' name="Firstname" type="text" placeholder="First Name" onChange={handleChange} value={Deliveryinfo.Firstname} />
            <input required className='inputpayment' name="Lastname" type="text" placeholder="Last Name" onChange={handleChange} value={Deliveryinfo.Lastname} />
            <input required className='inputpayment' name="Emailid" type="email" placeholder="Email" onChange={handleChange} value={Deliveryinfo.Emailid}  />
            <input required className='inputpayment' name="Street" type="text" placeholder="Street" onChange={handleChange} value={Deliveryinfo.Street}  />
            <input required className='inputpayment' name="city" type="text" placeholder="City" onChange={handleChange}value={Deliveryinfo.city} />
            <input required className='inputpayment' name="state" type="text" placeholder="State" onChange={handleChange} value={Deliveryinfo.state} />
            <input required className='inputpayment' name="pincode" type="number" placeholder="PinCode" onChange={handleChange} value={Deliveryinfo.pincode}  />
            <input required className='inputpayment' name="country" type="text" placeholder="Country" onChange={handleChange} value={Deliveryinfo.country}  />
            <input required className='inputpayment' name="phonenumber" type="text" placeholder="Phone Number" onChange={handleChange} value={Deliveryinfo.phonenumber}   />
            <button required className='paymentbutton' type='submit'>Proceed to Payment</button>
        </div>
        </form>
    );
};

export default Deliveryinfo;





    

