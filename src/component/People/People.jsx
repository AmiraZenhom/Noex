import axios from "axios"
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import styles from "./People.module.scss"
import errorPhoto from "../../images/images.png"

export default function People() {
  const [ trendeingPerson , setTrendeingPerson] = useState([])
    useEffect(()=>{
      getTrendeingPerson();
    },[])
    let getTrendeingPerson=async()=>{
      let {data}=await axios.get("https://api.themoviedb.org/3/trending/person/day?api_key=32e2a2cfe9d2e731f20eee3199cf7e17")
      setTrendeingPerson(data.results)}
    return (
    
      <>
      {trendeingPerson.length>0?<div className='row my-3 py-5'>
        <div className='col-md-4'>
          <div>
            <div className={`w-25 mb-4 ${styles.bord}`}></div>
            <h3>Trending</h3>
            <h3>people </h3>
            <h3>To watch now</h3>
            <p className='text-muted'>most watched people by day</p>
            <div className={`w-100 mt-4 ${styles.bord}`}></div>
  
          </div>
        </div>
     {trendeingPerson.slice(0,10).map((item,index)=>(
       <div key={index} className='col-md-2'>
         < Link className="nav-link" to={`/details/${item.id}/${item.media_type}`}>
          <div className='item '>
            {item.profile_path? <img className='w-100' src={`https://image.tmdb.org/t/p/original${item.profile_path}`} alt="" />:<img className="w-100" src={errorPhoto}/>}
           
            <h6 className='py-2'>{item.title}{item.name}</h6>
           

          </div>
          </Link>
        </div>)
     )}
      </div>:<div className=" d-flex justify-content-center align-items-center"><i className="fa fa-spinner fa-spin fa-5x "></i></div>}
      
      </>
    )
    }
