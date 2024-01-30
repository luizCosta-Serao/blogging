import React from 'react'
import WelcomeHome from '../components/WelcomeHome/WelcomeHome'
import PostsHome from '../components/PostsHome/PostsHome'
import BannerCommunity from '../components/BannerCommunity/BannerCommunity'
import TopPosts from '../components/TopPosts/TopPosts'

const Home = () => {
  return (
    <section>
      <WelcomeHome />
      <PostsHome />
      <BannerCommunity />
      <TopPosts />
    </section>
  )
}

export default Home