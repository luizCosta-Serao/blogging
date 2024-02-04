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
        <nav>
          <div onClick={handleChange}>
            <button className={styles.btnMenuMobile}></button>
          </div>
          <ul className={`${styles.menu} ${menuMobile ? styles.active : ''}`}>
            <li><Link to='/destinations'>Destinations</Link></li>
            <li><Link to='/food'>Food</Link></li>
            <li><Link to='/wellbeing'>Well Being</Link></li>
            <li><Link to='/sport'>Sport</Link></li>
            <li><Link to='/family'>Family</Link></li>
            <li><Link to='/lifestyle'>Lifestyle</Link></li>
          </ul>
        </nav>
        <div className={`${styles.search} ${menuMobile ? styles.active : ''}`}>
          <div className={styles.loupe}>
            <img src={Loupe} alt="Loupe" />
          </div>
          <div className={styles.descount}>
            <button>Get your 120$ christmas gift</button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header