import React, { useState } from 'react'
import './CSS/Loginsignup.css'
const Loginsignup = () => {
const [state,setstate]=useState("login");
const [isChecked, setIsChecked] = useState(false);

const [formdata,setformdata]=useState({
  username:"",
  password:"",
  email:""
})

const changehandler=(e)=>{
  setformdata({...formdata,[e.target.name]:e.target.value})
}

const login=async()=>{
    console.log("login page executed",formdata);
    let responsedata;
    await fetch("http://localhost:4000/login",{
      method:"POST",
      headers:{
        Accept:'application/formdata',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formdata),
    }).then((response)=>response.json()).then((data)=>responsedata=data);
    if(responsedata.success){
      localStorage.setItem('auth-token',responsedata.token);
      window.location.replace("/");
    }else{
      alert(responsedata.errors);
      
    }

}
const signup=async()=>{
    console.log("signup page executed",formdata);
    let responsedata;
    await fetch("http://localhost:4000/signup",{
      method:"POST",
      headers:{
        Accept:'application/formdata',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formdata),
    }).then((response)=>response.json()).then((data)=>responsedata=data);
    if(responsedata.success){
      localStorage.setItem('auth-token',responsedata.token);
      window.location.replace("/");
    }else{
      alert(responsedata.errors);
      
    }
}

  return (
    <div className='loginsignup'>
      <div className='loginsignupcontainer'>
        <h1>{state}</h1>
        <div className='loginsignupfields'>
         {state==="signup"?<input name='username' value={formdata.username} onChange={changehandler} type='text'placeholder='your name'/>:<></>}
          <input name='email' value={formdata.email} onChange={changehandler} type='email'placeholder='email address'/>
          <input name='password' value={formdata.password} onChange={changehandler}type='password'placeholder='password'/>

        </div>
        <button disabled={!isChecked} onClick={() => (state === "login" ? login() : signup())}>
          Continue
        </button>        {state==="signup"?
        <p className='loginsignuplogin'>Already have an account? <span onClick={()=>{setstate("login")}}>Login here</span></p>:
        <p className='loginsignuplogin'>create an account? <span onClick={()=>{setstate("signup")}}>click here</span></p>}

        <div className="loginsignupagree">
          <input required type='checkbox' name='' id=''checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
          <p>By continuin, i agree to the terms of use & privacy policy</p>
        </div>
      </div>
      
    </div>
  )
}

export default Loginsignup
