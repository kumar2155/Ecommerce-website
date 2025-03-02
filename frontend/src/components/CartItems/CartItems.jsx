import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import { useNavigate } from 'react-router-dom'
const CartItems = () => {
    const {getTotalCartAmount,all_product,cartitems,removefromcart}=useContext(ShopContext);
    const navigate=useNavigate();
  return (
    <div className='cartitems'>
      <div className="cartitemsformatmain">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        {/* <p>Size</p> */}
        <p>Remove</p>
      </div>
      <hr/>
      {all_product.map((e)=>{
        if(cartitems[e.id]>0)
        {
            return <div>
                   <div className="cartitemsformat">
                   <img src={e.image} alt='' className='cartproducticon'/>
                   <p>{e.name}</p>
                   <p>${e.new_price}</p>
                   <button className='cartitemsquantity'>{cartitems[e.id]}</button>
                    <p>${e.new_price*cartitems[e.id]}</p>
                   <img className='cartitemremoveicon'src={remove_icon} onClick={()=>
                    removefromcart(e.id)}alt=''/>
                 </div>
            <hr/>
          </div>
        }
        return null;
      })}
      <div className="cartitemsdown">
        <div className='cartitemstotal'>
            <h1>Cart Totals</h1>
            <div>
                <div className="cartitemstotalitem">
                    <p>SubTotal</p>
                    <p>${getTotalCartAmount()}</p>
                </div>
                <hr/>
                <div className='cartitemstotalitem'>
                    <p>Shipping Fee</p>
                    <p>${getTotalCartAmount()===0?0:2}</p>
                </div>
                <hr/>
                <div className='cartitemstotalitem'>
                    <h3>Total</h3>
                    <h3>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</h3>
                </div>
            </div>
            <button onClick={() => navigate('/delivery-info')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitemspromocode">
            <p>If you have a promo code, Enter it here</p>
            <div className='cartitemspromobox'>
                <input type='text' placeholder='promo code'/>
                <button>Submit</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CartItems
