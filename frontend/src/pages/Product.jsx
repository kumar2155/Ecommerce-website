import React, { useContext } from 'react'
import {ShopContext} from '../context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrum from '../components/Breadcrum/Breadcrum';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';
import Descriptionbox from '../components/DescrptionBox/Descriptionbox';
import Relatedproducts from '../components/RelatedProducts/Relatedproducts';
const Product = () => {
  const {all_product}=useContext(ShopContext);
  const {productid}=useParams();
  const product=all_product.find((e)=>e.id===Number(productid))
  return (
    <div> 
      <Breadcrum product={product}/>
      <ProductDisplay product={product}/>
      <Descriptionbox/>
      <Relatedproducts product={product}/>
    </div>
  )
}

export default Product
