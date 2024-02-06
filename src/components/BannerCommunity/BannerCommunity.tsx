import React from 'react'
import styles from './BannerCommunity.module.css'
import { useNavigate } from 'react-router-dom'

const BannerCommunity = () => {
  const navigate = useNavigate()

  return (
    <section className={styles.community}>
      <div className={styles.bgEffect}></div>
      <div className={styles.content}>
        <span className={styles.tag}>Dogs</span>
        <h1 className={styles.title}>Where Love and Barking Meet!</h1>
        <p className={styles.text}>Welcome to our Dog Community, where every bark is an expression of joy and every wagging tail is a dance of love!</p>
        <button onClick={() => navigate('/pet')} className={styles.start}>Send a message</button>
      </div>
    </section>
  )
}

export default BannerCommunity