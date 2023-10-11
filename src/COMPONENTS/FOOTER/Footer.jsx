import React from 'react'
import "./footer.css"
import linkedin from "./Media/Linkedin.png"
import Facebook from "./Media/Faceook.png"
import Instagram from "./Media/Instagram.png"
import Pinterst from "./Media/Pinterst.png"
import Reddit from "./Media/Reddit.png"
import Twitter from "./Media/Twitter.png"
import Youtube from "./Media/Youtube.png"
function Footer() {
  return (
    <div>
      <div className="footer">
        <div className="left">
            <div className="Footer">
                <h1>CONTACT US</h1>
                <h4>For any kind of query, contact us with the details below.</h4>                
            </div>
            <div className="phonenumber">
            +91-7015574125, +91-8810385787, <br /> +91-7206533219 , +91-9817622697
            </div>
            <div className="email">
            andisoftwaresolutions@gmail.com
            </div>
            <div className="location">
            ANDi Software Solutions Panipat & Noida
            </div>
            <div className="socialhandles">
            Follow Us:
            <div className="icon">
                <img src={Facebook} alt="" /><img src={linkedin} alt="" /><img src={Youtube} alt="" /><img src={Reddit} alt="" /><img src={Pinterst} alt="" /><img src={Twitter} alt="" /><img src={Instagram} alt="" />
            </div>
            </div>

        </div>
        <div className="right">
          <div className="gmap-frame">
          <iframe width="600" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=%20Andi%20Software%20Solutions%20near,%20Railway%20Rd,%20Geeta%20Colony,%20Panipat,%20Haryana%20132103+(Andi%20Software%20Solutions)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/population/">Find Population on Map</a></iframe>
          </div>
        </div>
      </div>
      <h3 className='FootBanner'>
        Copyright 2021 © ANDi Software Solutions . All Rights reserved
        </h3>
    
    </div>
  )
}

export default Footer
