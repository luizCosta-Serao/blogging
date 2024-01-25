import React from 'react'
import styles from './WelcomeHome.module.css'

const WelcomeHome = () => {
  return (
    <div className={styles.welcomeHome}>
      <h1>Inspiration for travel by  real people</h1>
      <p>Book smart, travel simple</p>
      <button>Start planning your trip</button>
    </div>
  )
}

export default WelcomeHome