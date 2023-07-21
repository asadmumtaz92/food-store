import React from 'react'
import styles from './styles/Header.module.css'

const Header = () => {

    return (
        <div className={`row col-sm-12 col-md-12 col-lg-12 col-xl-12 bg-white ${styles.header}`}>
            <h2 className={`${styles.logo}`}>Celfic</h2>
            <div className={`${styles.menuDiv}`}>
                <a href='/signup' className={`${styles.link}`}>Sign Up</a>
                <a href='/login' className={`${styles.link}`}>Log In</a>
            </div>
        </div>
    )
}

export default Header
