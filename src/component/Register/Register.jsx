import  axios  from 'axios';
import joi from "joi";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const [user, setUser] = useState({
    first_name:"",
    last_name:"",
    age :"",
    email:"",
    password:"",
  })
  const [errorMsg,setErrorMsg] = useState("");
  const [errorsList,setErrorsList] = useState([]);
  let navigate=useNavigate();
  let submitData=async(e)=>{
    e.preventDefault();
   let validationResponse=validateFromData();
console.log(validationResponse)

   if (validationResponse.error) {
    setErrorsList(validationResponse.error.details)
   }
   else{let{data}=await axios.post("https://sticky-note-fe.vercel.app/signup",user);
   
   if (data.message=="success") {
    goToLogin()
   }
   else{setErrorMsg(data.message)}
  }}; 
  let validateFromData=()=>{
    const sechema=joi.object({
      first_name:joi.string().required().min(1).max(10),
      last_name:joi.string().alphanum().required().min(3).max(10),
      age:joi.number().required().min(20).max(70),
      email:joi.string().required().email({tlds:{allow:["com","net"]}}),
      password:joi.string().required().pattern(new RegExp(/^[a-z][0-9]{3}$/))
    })
    return sechema.validate(user,{abortEarly:false});
  }
  
  let goToLogin=()=>{
navigate("/login")
  }
  let getInputValue=(e)=>{
let myUser={...user};
myUser[e.target.name]=e.target.value;
setUser(myUser)
console.log(myUser)

  }
  return (
    <>
    <div className='w-75 py-5 m-auto'>
    <h2 className='my-4'>Registeration Form</h2>
     {errorsList.map((error,index)=>(
       <div key={index} className='alert alert-danger my-2'>{error.message}</div>
    ))}
    {errorMsg?  <div className='alert alert-danger my-2'>{errorMsg}</div>:""}
    <form onSubmit={submitData} >
      <div className='inputData my-2'>
        <label htmlFor="first-name">First name</label>
        <input onChange={getInputValue} type="text" className='form-control my-2' name='first_name' />
      </div>
      <div className='inputData my-2'>
        <label htmlFor="last-name">Last name</label>
        <input  onChange={getInputValue} type="text" className='form-control my-2' name='last_name' />
      </div>
      <div className='inputData my-2'>
        <label htmlFor="age">Age</label>
        <input  onChange={getInputValue} type="text" className='form-control my-2' name='age' />
      </div>
      <div className='inputData my-2'>
        <label htmlFor="email">Email</label>
        <input  onChange={getInputValue} type="text" className='form-control my-2' name='email' />
      </div>
      <div className='inputData my-2'>
        <label htmlFor="password">Password</label>
        <input  onChange={getInputValue} type="password" className='form-control my-2' name='password' />
      </div>
      <button className='btn btn-info float-end my-3'>Register</button>
      <div className='claer-fix'></div>
    </form>
    </div>
   
    </>
  )
}
