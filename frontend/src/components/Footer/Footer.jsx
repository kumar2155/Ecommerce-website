import React from 'react'
import './Footer.css' 
import Footer_logo from '../Assets/logo_big.png' 
import instagram_icon from '../Assets/instagram_icon.png'
import pintester_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'
const Footer = () => {
  return (
    <div className='footer'>
      <div className='footerlogo'>
        <a href='/'><img src={Footer_logo} alt=''/></a><p>SMART CART</p>
      </div>
      <ul className='footerlinks'>
        <a href='#'><li>Company</li></a>
        <a href='#'><li>Products</li></a>
        <a href='#'><li>Offices</li></a>
        <a href='#'><li>About</li></a>
        <a href='#'><li>Contact</li></a>
      </ul>
      
        <div className='footersocialicon'>
            <div className='footericonscontainer'>
            <a href='https://www.bing.com/ck/a?!&&p=b2037f9f40f953598b3e0604d04a21957b792a86df3fe7b5c24e378e13299fa5JmltdHM9MTczOTA1OTIwMA&ptn=3&ver=2&hsh=4&fclid=3f186e1b-2f7a-693b-2c5f-7dcf2ed76826&psq=instagram+link+website+login+page+link&u=a1aHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9hY2NvdW50cy9sb2dpbi8&ntb=1'><img src={instagram_icon} alt=''/></a>
            </div>
            <div className='footericonscontainer'>
                <a href='https://twitter.com/'><img src={pintester_icon} alt='pintester_icon'/></a>
            </div>
            <div className='footericonscontainer'>
            <a href='https://whatsapp.com/'><img src={whatsapp_icon} alt=''/></a>
            </div>
        </div>
        <div className='footercopyright'>
            <hr/>
            <p>Copyright @ 2024 -All Right Reserved</p>
        </div>
     
    </div>
  )
}

export default Footer
