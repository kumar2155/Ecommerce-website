import React from 'react';
import './Hero2.css';
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'
const Hero1 = () => {
  return (
    <div className='hero'>
      <div className='heroleft'>
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
        
            <div className='handhandicon'>
                <p>new</p>
                <img src={hand_icon} alt=''/>
            </div>
            <p>collections</p>
            <p>for everyone</p>
        </div>
        
        <div className='herolatestbutton'>
            <div>latest collections</div><a href='#newcollections'><img src={arrow_icon} alt=''/></a>
        </div>
        </div>
        <div className='heroright'>
            <img src={hero_image} alt=''/>
        </div>
      
    </div>
  )
}

export default Hero1;
