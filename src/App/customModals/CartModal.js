import React, { useState, useEffect } from 'react'
import styles from './styles/cartModal.module.css'
import ReactDOM from 'react-dom'
import { formatter} from '../Helpers/CurrancyFormat'

const CartModal = (props) => {

    const [total, setTotal] = useState(null)

    useEffect(() => {
        let ttt = 0
        props?.cartItems.map(item => {
            let t = item?.item?.price * item?.qty + ttt
            ttt = t
            setTotal(t)
        })
    })

    const CartItem = (item) => {

        let itemDetail = item?.item?.item
        let qty = item?.item?.qty

        return (
            <div className={styles.cartItem}>
                <img src={itemDetail?.image} alt='Cart food image...' className={styles.image} />

                <div className={styles.descBox}>
                    <p className={styles.title}>{itemDetail?.name}</p>
                    <p className={styles.price}>{formatter.format(itemDetail?.price)}</p>
                    <p className={styles.qty}>{qty}</p>
                    <p className={styles.total}>{formatter.format(itemDetail?.price * qty)}</p>
                </div>
            </div>
        )
    }

    const MyModal = () => {

        return (
            <div className={`modal fade ${styles.modaal}`} id="myModal">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">

                        {/* <!-- Modal Header --> */}
                        <div class="modal-header">
                            <h4 class="modal-title">Your Cart</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        {/* <!-- Modal body --> */}
                        <div class="modal-body">
                            {props?.cartItems.length < 1 && <h4>No Item Found In Your Cart</h4>}
                            {props?.cartItems.map(item => <CartItem item={item} /> )}
                            
                            {total > 0
                                && <div className={styles.priceBox}>
                                    <h4>Total Amount:</h4>
                                    <h4>{formatter.format(total)}</h4>
                                </div>
                            }
                        </div>

                        {/* <!-- Modal footer --> */}
                        <div className={`modal-footer ${styles.ftr}`}>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Checkout</button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <MyModal />,
                document.getElementById('cart-modal-root')
            )}
        </React.Fragment>
    )
}

export default CartModal
