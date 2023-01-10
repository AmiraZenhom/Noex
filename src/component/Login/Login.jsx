import  axios  from 'axios';
import joi from "joi";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({saveUserData}) {
  const [user, setUser] = useState({
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
   else{let{data}=await axios.post("https://sticky-note-fe.vercel.app/signin",user);
   console.log(data)
   if (data.message=="success") {
    localStorage.setItem("token",data.token);
    saveUserData();
    goToHome();
   }
   else{setErrorMsg(data.message)}
  }}; 
  let validateFromData=()=>{
    const sechema=joi.object({
      email:joi.string().required().email({tlds:{allow:["com","net"]}}),
      password:joi.string().required().pattern(new RegExp(/^[a-z][0-9]{3}$/))
    })
    return sechema.validate(user,{abortEarly:false});
  }
  let goToHome=()=>{
    navigate("/")
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
    <h2 className='my-4'>Login Form</h2>
     {errorsList.map((error,index)=>(
       <div key={index} className='alert alert-danger my-2'>{error.message}</div>
    ))}
    {errorMsg?  <div className='alert alert-danger my-2'>{errorMsg}</div>:""}
    <form onSubmit={submitData} >
      <div className='inputData my-2'>
        <label htmlFor="email">Email</label>
        <input  onChange={getInputValue} type="text" className='form-control my-2' name='email' />
      </div>
      <div className='inputData my-2'>
        <label htmlFor="password">Password</label>
        <input  onChange={getInputValue} type="password" className='form-control my-2' name='password' />
      </div>
      <button className='btn btn-info float-end my-3'>Login</button>
      <div className='claer-fix'></div>
    </form>
    </div>
   
    </>
  )
}
