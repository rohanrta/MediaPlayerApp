import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div style={{height:'300px'}} className='mt-5 container w-100'>
    <div className='d-flex justify-content-between'>
       {/* intro */}
       <div style={{width:'400px'}} className='intro'>
       <h5><i class="fa-solid fa-music me-3"></i>
       Media Player</h5>
       <p>
       Designed and built with all the love in the world by the Bootstrap team with the help of our contributors.
       </p>
       <p>
       Code licensed MIT, docs CC BY 3.0.
       </p>
       <p>
       Currently v5.3.3.
       </p>
       </div>
       {/* LInk */}
       <div className='d-flex flex-column'>
    <h5>Links</h5>
    <Link to={'/'} style={{textDecoration:'none',color:'white'}}>Landing Page</Link>
    <Link to={'/home'} style={{textDecoration:'none',color:'white'}}>Home Page</Link>
    <Link to={'/history'} style={{textDecoration:'none',color:'white'}}>History Page</Link>
       </div>
       {/* Guides */}
       <div className='d-flex flex-column'>
       <h5>Guides</h5>
   <a href="https://react.dev/" target='_blank' style={{textDecoration:'none',color:'white'}}>React</a>
   <a href="https://www.w3schools.com/js/" target='_blank' style={{textDecoration:'none',color:'white'}}>Javascript</a>
   <a href="https://www.w3schools.com/css/" target='_blank' style={{textDecoration:'none',color:'white'}}>CSS</a>
       </div>
       {/* Contact */}
       <div className='d-flex flex-column'>
      <h5>Contact Us</h5>
      <div className='d-flex flex-row'>
        <input type="text" placeholder='Enter your Email Here..' className='form-control me-2' />
        <button className='btn btn-info'><i class="fa-solid fa-arrow-right"></i></button>
      </div>
      <div className='d-flex justify-content-between mt-3'>
        <a href="https://en.wikipedia.org/wiki/Twitter" target='_blank' style={{textDecoration:'none',color:'white'}}><i class="fa-brands fa-twitter"></i></a>
        <a href="https://www.instagram.com/" target='_blank' style={{textDecoration:'none',color:'white'}}><i class="fa-brands fa-instagram"></i></a>
        <a href="https://en.wikipedia.org/wiki/LinkedIn" target='_blank' style={{textDecoration:'none',color:'white'}}><i class="fa-brands fa-linkedin"></i></a>
        <a href="https://en.wikipedia.org/wiki/GitHub" target='_blank' style={{textDecoration:'none',color:'white'}}><i class="fa-brands fa-github"></i></a>
        <a href="https://en.wikipedia.org/wiki/GitHub" target='_blank' style={{textDecoration:'none',color:'white'}}><i class="fa-solid fa-phone"></i></a>
      </div>

       </div>
    </div>
    <p className='text-center' style={{color:'white'}}>© Media Player, Inc.</p>
    </div>
  )
}

export default Footer