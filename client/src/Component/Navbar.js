import React from 'react'
import "../Styles/Navbar.css"
const Navbar = () => {
  return (
    <div>
       <nav className="navbar">
      <div className="navbar-logo">
        <h1>Logo</h1>
      </div>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">Parking Space</a></li>
        <li><a href="#services">Booking</a></li>
        <li><a href="#contact">Wallet</a></li>
        <li><a href="#contact">Profile</a></li>
        <li><a href="#contact">Contact us </a></li>


      </ul>
    </nav>
      
    </div>
  )
}

export default Navbar