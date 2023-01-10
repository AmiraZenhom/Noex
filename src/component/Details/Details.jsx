import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'


export default function Details() {
  const [itemsDetalis, setItemsDetalis] = useState("")
 
  let getItemsDetails=async()=>{
    let {data}=await axios.get(`https://api.themoviedb.org/3/${prams.mediaType}/${prams.id}?api_key=32e2a2cfe9d2e731f20eee3199cf7e17&language=en-US`)
    setItemsDetalis(data);
  }

useEffect(() => {
  getItemsDetails();
}, []);
let prams=useParams();

  return (
    <>
   {itemsDetalis? <div className='row my-5'>
      <div className='col-md-3'>
        <div>
        
        {prams.mediaType=="person"?<img className='w-100 my-5' src={`https://image.tmdb.org/t/p/original${itemsDetalis.profile_path}`} alt="" />:
          <img className='w-100 ' src={`https://image.tmdb.org/t/p/original${itemsDetalis.poster_path}`} alt="" />
          }
        </div>
      </div>
      <div className='col-md-9'>
          <h2>{itemsDetalis.title}{itemsDetalis.name}</h2>
          {prams.mediaType=="person"?<>
          <p>{itemsDetalis.also_known_as}</p>
          <h5 className='my-4' >popularity : {itemsDetalis.popularity}</h5>
          <h5 className='my-4' >birthday : {itemsDetalis.birthday}</h5>
          </>:<> 
          <p>{itemsDetalis.genres.map((gen,index)=><span className=' badge bg-info py-2 m-2' key={index}>{gen.name}</span>)}</p>
          <h5 className='my-4'>Vote : {itemsDetalis.vote_average}</h5>
          <h5 className='my-4' >Vote count : {itemsDetalis.vote_count}</h5>
          <h5 className='my-4' >popularity : {itemsDetalis.popularity}</h5>
          <h5  className='my-4'>release date : {itemsDetalis.release_date}</h5></>}          
          <p className=' text-muted py-3'>{itemsDetalis.overview}{itemsDetalis.biography}</p>

        </div>
    </div>:<div className=" d-flex justify-content-center align-items-center"><i className="fa fa-spinner fa-spin fa-5x "></i></div>}
    </>
  )
}
