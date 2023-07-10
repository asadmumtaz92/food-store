import React from "react"
import styles from './styles/Header.module.css'
import CartButton from '../Cart/CartButton'
import Button from "../UI/Button"


const Header = (props) => {

    const logoutHandler = () => {
        props?.OnConfirmOrder()
        localStorage.setItem('Login', 'Login')
        props?.activeScreenHandler('Login')
    }


    return (
        <nav className={`navbar navbar-expand-sm bg-dark navbar-dark fixed-top ${styles.myNav}`}>
            <a className={`navbar-brand ${styles.logo}`} href="#">Food Store</a>
            <ul className={`navbar-nav ${styles.myUl}`}>
                {props?.activeScreenName !== 'Login'
                    && <li className="nav-item">
                        <Button title="Logout" onClick={logoutHandler} />
                    </li>
                }
                {props?.activeScreenName == 'Home'
                    ? props?.cartLength > 0
                        && <li className="nav-item">
                            <Button title="Checkout" onClick={() => { props?.activeScreenHandler('Checkout') }} />
                        </li>
                    : <li className="nav-item">
                        <Button title="Home" onClick={() => { props?.activeScreenHandler('Home') }} />
                        {/* <a className="nav-link" href="#">Checkout</a> */}
                    </li>
                }
                <li className="nav-item">
                    <CartButton cartLength={props?.cartLength} />
                </li>

            </ul>
        </nav>
    )
}

export default Header
