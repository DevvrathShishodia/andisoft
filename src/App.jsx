
import './App.css'
import Navbar from './COMPONENTS/NAVBAR/Navbar'


import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import Aboutus from './COMPONENTS/ABOUTUS/Aboutus';
import Footer from './COMPONENTS/FOOTER/Footer';
import CarouselBootstrap from './COMPONENTS/CAROUSEL/CarouselBootstrap';

function App() {


  return (
    <>
     <Navbar/>  
            <CarouselBootstrap/>
            <Aboutus/>
            <Footer/>
           
               
    </>
  )
}

export default App

