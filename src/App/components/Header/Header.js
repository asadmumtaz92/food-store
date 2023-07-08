import React from "react"
import styles from './styles/Header.module.css'
import CartButton from '../Cart/CartButton'
import Button from "../UI/Button"

const Header = (props) => {

    return (
        <nav className={`navbar navbar-expand-sm bg-dark navbar-dark fixed-top ${styles.myNav}`}>
            <a className={`navbar-brand ${styles.logo}`} href="#">Food Store</a>
            <ul className="navbar-nav" style={{ flex: 1,'display': 'flex', 'justifyContent': 'end', alignItems: "end" }}>
                {props?.cartLength > 0
                    && <li className="nav-item">
                        <Button title="Checkout" onClick={() => { props?.activeScreenHandler ('Checkout')}}/>
                        {/* <a className="nav-link" href="#">Checkout</a> */}
                    </li>
                }
                <li className="nav-item">
                    <CartButton cartLength={props?.cartLength} />
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
