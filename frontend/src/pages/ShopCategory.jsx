import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../context/ShopContext';
import dropdown_icon from '../components/Assets/dropdown_icon.png'
import Item from '../components/Items/Items'
const ShopCategory = (props) => {
  const {all_product}=useContext(ShopContext);
  return (
    <div className='shopcategory'>
        <a href='#shopping'><img  className='shopcategorybanner'src={props.banner} alt=''/></a>
        <div className='shopcategoryindexsort'>
          <p>
            <span>Showing 1-12</span>out of 36 products
          </p>
          {/* <div className='shopcategorysort'>
            Sort By <img src={dropdown_icon} alt=''/>
          </div> */}
        </div>
        <div className='shopcategoryproducts' id='shopping'>
          {all_product.map((item,i)=>{
            if(props.category===item.category){
              return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            }
              else{
              return null;
             }
          })}
        </div>
        <div className='shopcategorya'>
        <a href='#shopping'><div className='shopcategoryload'>
          Explore more
        </div></a></div>
    </div>
  )
}

export default ShopCategory
