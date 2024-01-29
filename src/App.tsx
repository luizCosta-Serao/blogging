import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { PostsContextProvider } from './context/PostsContext'

function App() {

  return (
    <PostsContextProvider>
      <div className='bg-effect'></div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </PostsContextProvider>
  )
}

export default App
