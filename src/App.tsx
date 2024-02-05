import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { PostsContextProvider } from './context/PostsContext'
import Footer from './components/Footer/Footer'
import PostPage from './pages/PostPage'
import Category from './pages/Category'
import BannerHuman from './assets/banner-human.jpg'
import BannerPet from './assets/banner-pet.jpg'
import BannerMammal from './assets/banner-mammal.jpg'
import BannerCanine from './assets/banner-canine.jpg'

function App() {

  return (
    <PostsContextProvider>
      <BrowserRouter>
        <div className='bg-effect'></div>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/human' element={<Category title='With Humans' img={BannerHuman} tag='human'/>} />
          <Route path='/pet' element={<Category title='Pets' img={BannerPet} tag='pet'/>} />
          <Route path='/mammal' element={<Category title='Mammal' img={BannerMammal} tag='mammal'/>} />
          <Route path='/canine' element={<Category title='Canine' img={BannerCanine} tag='canine'/>} />
          <Route path='/post/:id' element={<PostPage />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </PostsContextProvider>
  )
}

export default App
