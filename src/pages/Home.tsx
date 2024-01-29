import React from 'react'
import WelcomeHome from '../components/WelcomeHome/WelcomeHome'
import PostsHome from '../components/PostsHome/PostsHome'
import BannerCommunity from '../components/BannerCommunity'

const Home = () => {
  return (
    <section>
      <WelcomeHome />
      <PostsHome />
      <BannerCommunity />
    </section>
  )
}

export default Home