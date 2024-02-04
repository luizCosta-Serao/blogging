import React from 'react'
import Logo from '../../assets/logo.svg'
import Loupe from '../../assets/loupe.svg'
import { Link, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

const Header = () => {
  const [menuMobile, setMenuMobile] = React.useState(false)
  const { pathname } = useLocation()

  function handleChange() { 
    setMenuMobile((menuMobile) => !menuMobile)
  }

  return (
    <>
      {pathname === '/' ? <div className={styles.bannerHome}></div> : ''}
      <header className={`${styles.header} container`}>
        <div className={styles.logo}>
          <Link to='/'><img src={Logo} alt="Logo" /></Link>
        </div>
        <div className={styles.menuAndLoupe}>
          <nav>
            <div onClick={handleChange}>
              <button className={styles.btnMenuMobile}></button>
            </div>
            <ul className={`${styles.menu} ${menuMobile ? styles.active : ''}`}>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/human'>With Humans</Link></li>
              <li><Link to='/pet'>Pet</Link></li>
              <li><Link to='/mammal'>Mammal</Link></li>
              <li><Link to='/canine'>Canine</Link></li>
            </ul>
          </nav>
          <div className={`${styles.search}`}>
            <div className={styles.loupe}>
              <img src={Loupe} alt="Loupe" />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header