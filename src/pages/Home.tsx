import React from 'react'
import WelcomeHome from '../components/WelcomeHome/WelcomeHome'
import PostsHome from '../components/PostsHome/PostsHome'

const Home = () => {
  return (
    <section>
      <WelcomeHome />
      <PostsHome />
    </section>
  )
}

export default Home