import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./Navbar.module.scss";
export default function Navbar({userData,logout}) {
  return (
    <>
    <nav className={`navbar navbar-expand-lg ${styles.bgNavbar}`}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="">Noxe</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
     {userData? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="movies">Movies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="tvshows">Tvshows</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="people">People</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="about">About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="network">Networks</Link>
        </li>
      </ul>:""}
     
      
      
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <div className='social-media d-flex align align-items-center '>
      <i className="fa-brands fa-facebook mx-2"></i>
      <i className="fa-brands fa-youtube m-2"></i>
      <i className="fa-brands fa-instagram m-2"></i>
      <i className="fa-brands fa-spotify m-2"></i>
      </div>
       {userData?<li className="nav-item">
        <div className='d-flex  align-items-center px-3'>
          <span className='px-2'>Hello : {userData.first_name}</span>
          <Link className="nav-link"  onClick={logout}>logout</Link>
        </div>
         
        </li> : <>
        <li className="nav-item">
          <Link className="nav-link" to="login">login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="register">Register</Link>
        </li>
        </>}
       
      </ul>
      
    </div>
  </div>
</nav>
    </>
  )
}
