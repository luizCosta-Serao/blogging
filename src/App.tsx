import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { PostsContextProvider } from './context/PostsContext'
import Footer from './components/Footer/Footer'
import PostPage from './pages/PostPage'

function App() {

  return (
    <PostsContextProvider>
      <BrowserRouter>
        <div className='bg-effect'></div>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/post/:id' element={<PostPage />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </PostsContextProvider>
  )
}

export default App
