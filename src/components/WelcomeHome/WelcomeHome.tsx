import React from 'react'
import styles from './WelcomeHome.module.css'
import { useNavigate } from 'react-router-dom'

const WelcomeHome = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.welcomeHome}>
      <h1>Exploring the Dog World with Love and Joy!</h1>
      <p> The virtual corner dedicated to our four-legged friends and the incredible canine universe!</p>
      <button onClick={() => navigate('/mammal')}>Explore more</button>
    </div>
  )
}

export default WelcomeHome