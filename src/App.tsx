import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import { BrowserRouter, Routes } from 'react-router-dom'

function App() {

  return (
    <React.Fragment>
      <div className='bg-effect'></div>
      <BrowserRouter>
        <Header />
        <Routes>

        </Routes>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App
