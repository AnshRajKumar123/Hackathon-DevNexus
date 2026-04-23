import React from 'react'
import Navbar from './ComponentJSX/Navbar'
import Home from './ComponentJSX/Home'
import Footer from './ComponentJSX/Footer'
import { Route, Routes } from 'react-router-dom'
import BookCenter from './ComponentJSX/BookCenter'
import BookedHistory from './ComponentJSX/BookedHistory'
import About from './ComponentJSX/About'
import HelpSupport from './ComponentJSX/HelpSupport'
import ReportAFraud from './ComponentJSX/ReportAFraud'
import AIAssistant from './ComponentJSX/AIAssistant'

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/bookcenter' element={<BookCenter />} />
        <Route path='/bookedhistory' element={<BookedHistory />} />
        <Route path='/about' element={<About />} />
        <Route path='/reportfraud' element={<ReportAFraud />} />
        <Route path='/helpsupport' element={<HelpSupport />} />
      </Routes>
      <AIAssistant />
      <Footer />
    </>
  )
}

export default App