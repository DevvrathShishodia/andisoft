import React from 'react'
import "./Navbar.css"
import logo from "./logo.jpg"
function Navbar() {
  return (
    <div className='navbar'>
      <div className="navlinks">
        <img src={logo} alt="" />
        <li>Home</li>
        <li>About Us</li>
        <li>Cloud Software</li>
      </div>
      <div class="banner">
<h3>Freelancers/Franchise/Reseller Required in all major cities</h3>
</div>
    </div>
  )
}

export default Navbar
