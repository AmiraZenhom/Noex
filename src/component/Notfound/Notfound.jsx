import React from 'react'
import errorPage from "../../images/download.png"
export default function Notfound() {
  return (
    <>
    <h1 className=' text-center py-5 '>ERROR 404</h1>
    <div className='my-5  d-flex justify-content-center align-items-center text-center'>
     
      <img src={errorPage} alt="error" />
    </div>
    </>
  )
}
