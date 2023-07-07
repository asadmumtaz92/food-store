import styles from './styles/CartButton.module.css'
import CartIcon from './cartIcon'

const CartButton = (props) => {
    return (
        <button className={styles.button} data-toggle="modal" data-target="#myModal">
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>Your cart</span>
            <span className={styles.badge}>4</span>
        </button>
    )
}
export default CartButton
