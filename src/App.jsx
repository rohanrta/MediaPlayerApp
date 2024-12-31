import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Home from './pages/Home'
import History from './pages/History'
import Header from './components/Header'
import Footer from './components/Footer'
History
Home
Routes
function App() {


  return (
    <>
      <div>
        <Header/>
      {/* {path for landing(http://localhost:5174/),home(http://localhost:5174/home),history(http://localhost:5174/hostory)} */}
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/history' element={<History/>}/>
      </Routes>
        <Footer/>
      </div>
      
    </>
  )
}

export default App
