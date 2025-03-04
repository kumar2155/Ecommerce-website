import React,{useState} from 'react'
import './NewsLetter.css'
const NewsLetter = () => {
   
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
  
    const handlesubscribe = () => {
      if (email.trim() === '') {
        alert("Please enter a valid email!");
        return;
      }
      setSubscribed(true);
    };
  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      <div>
        <input type='email' placeholder='your email id' value={email} onChange={(e) => setEmail(e.target.value)}
          disabled={subscribed}/>
        <button onClick={handlesubscribe}disabled={subscribed}>{subscribed ? 'Subscribed' : 'Subscribe'}</button>
      </div>
    </div>
  )
}

export default NewsLetter
