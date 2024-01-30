import React from 'react'
import styles from './BannerCommunity.module.css'

const BannerCommunity = () => {
  return (
    <section className={styles.community}>
      <div className={styles.bgEffect}></div>
      <div className={styles.content}>
        <span className={styles.tag}>Travel</span>
        <h1 className={styles.title}>Richird Norton photorealistic rendering as real photos</h1>
        <p className={styles.text}>Progressively incentivize cooperative systems through technically sound functionalities. The credibly productivate seamless data.</p>
        <button className={styles.start}>Start planning your trip</button>
      </div>
    </section>
  )
}

export default BannerCommunity