import React from 'react'
import WelcomeHome from '../components/WelcomeHome/WelcomeHome'
import PostsHome from '../components/PostsHome/PostsHome'
import BannerCommunity from '../components/BannerCommunity/BannerCommunity'
import TopPosts from '../components/TopPosts/TopPosts'
import OtherPosts from '../components/OtherPosts/OtherPosts'
import styles from './Home.module.css'

const Home = () => {
  return (
    <section className={styles.home}>
      <div className='bg-effect'></div>
      <WelcomeHome />
      <PostsHome />
      <BannerCommunity />
      <TopPosts />
      <OtherPosts />
    </section>
  )
}

export default Home