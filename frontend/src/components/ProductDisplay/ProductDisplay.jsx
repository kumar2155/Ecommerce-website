import React, { useContext, useState } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../context/ShopContext'
const ProductDisplay = (props) => {
    const {product}=props;
    const {addtocart}=useContext(ShopContext);
    const [selectsize,setselectedsize]=useState(null);

    const handlesizeselection = (size) => {
        setselectedsize(size);
    };
    const handleAddToCart = () => {
        if (!selectsize) {
            alert("Please select a size before adding to cart!");
            return;
        }
        addtocart(product.id, selectsize);
    };
  return (
    <div className='productdisplay'>
      <div className='productsdisplayleft'>
        <div className='productdisplayimglist'>
            <img src={product.image} alt=''/>
            <img src={product.image} alt=''/>
            <img src={product.image} alt=''/>
            <img src={product.image} alt=''/>
        </div>
        <div className='productdisplayimg'>
            <img  className= "productdisplaymainimage" src={product.image} alt=''/>
        </div>
        </div>
        <div className='productdisplayright'>
            <h1>{product.name}</h1>
            <div className='productdisplayrightstars'>
                <img src={star_icon} alt=''/>
                <img src={star_icon} alt=''/>
                <img src={star_icon} alt=''/>
                <img src={star_icon} alt=''/>
                <img src={star_dull_icon} alt=''/>
                <p>(122)</p>
            </div>
            <div className="productdisplayrightprices">
                <div className="productdisplayrightoldprice">${product.old_price}</div>
                <div className="productdisplayrightpricenew">${product.new_price}</div>
            </div>
            <div className="productdisplayrightdescription">
                lightweight,usually knitted,pullower shirt,close-fitting and wide a round neckline and short sleeves,worn as an undershirt outer sleeves garment.
            </div>
            <div className="productdisplayrightsize">
                    <h1>Select size</h1>
                    <div className='productdisplayrightsizes'>
                        {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                            <div 
                                key={size} 
                                className={selectsize === size ? 'size-selected' : ''} 
                                onClick={() => handlesizeselection(size)}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                <p>Selected Size:{selectsize}</p>
        </div>
        <button onClick={handleAddToCart}>ADD TO CART</button>
        <p className='productdisplayrightcategory'><span>category :</span>women,T-shirt,Crop-top</p>
        <p className='productdisplayrightcategory'><span>Tags :</span>modern,latest</p>

        </div>
    </div>
  )
}

export default ProductDisplay
