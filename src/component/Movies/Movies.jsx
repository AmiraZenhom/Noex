import axios from "axios"
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import styles from "./Movies.module.scss"

export default function Movies() {
  const [ trendeingItems , setTrendeingItems] = useState([])
    useEffect(()=>{
      getTrendeingItems();
    },[])
    let getTrendeingItems=async()=>{
      let {data}=await axios.get("https://api.themoviedb.org/3/trending/movie/day?api_key=32e2a2cfe9d2e731f20eee3199cf7e17")
      setTrendeingItems(data.results)}
    return (
    
      <>
      
      {trendeingItems.length>0?
       <div className='row my-3 py-5'>
        <div className='col-md-4'>
          <div>
            <div className={`w-25 mb-4 ${styles.bord}`}></div>
            <h3>Trending</h3>
            <h3>Movies</h3>
            <h3>To watch now</h3>
            <p className='text-muted'>most watched movies by day</p>
            <div className={`w-100 mt-4 ${styles.bord}`}></div>
  
          </div>
        </div>
     {trendeingItems.slice(0,10).map((item,index)=>(
       <div key={index} className='col-md-2'>
       <Link className="nav-link" to={`/details/${item.id}/${item.media_type}`}>
       <div className='item  position-relative'>
            <img className='w-100' src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="" />
            <h6 className='py-2'>{item.title}{item.name}</h6>
            <span className=" position-absolute top-0 end-0 bg-info p-2 ">{item.vote_average.toFixed(1)}</span>
          </div>
       </Link>
        </div>)
     )}
      </div>:<div className=" d-flex justify-content-center align-items-center"><i className="fa fa-spinner fa-spin fa-5x "></i></div>}
     
      </>
    )
    }

