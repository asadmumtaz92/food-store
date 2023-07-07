import React from "react"
import styles from './styles/Header.module.css'
import CartButton from '../Cart/CartButton'

const Header = (props) => {

    return (
        <nav className={`navbar navbar-expand-sm bg-dark navbar-dark fixed-top ${styles.myNav}`}>
            <a className={`navbar-brand ${styles.logo}`} href="#">Food Store</a>
            <ul className="navbar-nav" style={{ flex:1,'display': 'flex', 'justifyContent': 'end', alignItems: "end" }}>
                <li className="nav-item">
                    {/* <a className="nav-link" href="#">Cart</a> */}
                    <CartButton />
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Logout</a>
                </li>
            </ul>
        </nav>

        // <nav className={`navbar navbar-expand-sm bg-dark navbar-dark  fixed-top ${styles.myNav} `}>
        //     <h1 class="navbar-brand" className={styles.logo}>Food Store</h1>
        //     {/* <h1>Food Store</h1> */}
        //     <ul className={`navbar-nav ${styles.ul}`}>
        //         <li className={`nav-item ${styles.li}`}>
        //             <a class="nav-link" href="#">Link</a>
        //         </li>
        //         <li className={`nav-item ${styles.li}`}>
        //             <a class="nav-link" href="#">Link</a>
        //         </li>
        //     </ul>
        // </nav>
    )
}

export default Header
