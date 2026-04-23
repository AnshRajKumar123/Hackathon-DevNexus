import React from 'react'
import Navbar from './ComponentJSX/Navbar'
import Home from './ComponentJSX/Home'
import Footer from './ComponentJSX/Footer'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App