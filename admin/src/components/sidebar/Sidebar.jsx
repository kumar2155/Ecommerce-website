import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import addproducticon from '../../assets/Product_Cart.svg'
import listproducticon from '../../assets/Product_list_icon.svg'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/addproduct'} style={{textDecoration:"none"}}>
      <div className='sidebaritem'>
        <img src={addproducticon} alt="" />
        <p>Add product</p>
      </div>
      </Link>
      <Link to={'/listproduct'} style={{textDecoration:"none"}}>
      <div className='sidebaritem'>
        <img src={listproducticon} alt="" />
        <p>product List</p>
      </div>
      </Link>
    </div>
  )
}

export default Sidebar
