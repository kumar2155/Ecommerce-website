import React from 'react'
import './Relatedproducts.css'
import data_product from '../Assets/data'
import Item from '../Items/Items'
const Relatedproducts = () => {
  return (
    <div className='relatedproducts'>
      <h1>RELATED PRODUCTS</h1>
      <hr/>
      <div className="relatedproductsitem">
        {data_product.map((item,i)=>{
            return <Item key={item.id} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
          }
        )}
      </div>
    </div>
  )
}

export default Relatedproducts
