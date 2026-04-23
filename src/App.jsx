import React from 'react'
import Navbar from './ComponentJSX/Navbar'
import Home from './ComponentJSX/Home'

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}

export default App