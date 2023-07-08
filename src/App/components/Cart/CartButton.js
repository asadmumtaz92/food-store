import styles from './styles/CartButton.module.css'
import CartIcon from './cartIcon'

const CartButton = (props) => {
    return (
        <button className={styles.button} data-toggle="modal" data-target="#myModal">
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={styles.badge}>{props?.cartLength}</span>
        </button>
    )
}
export default CartButton
