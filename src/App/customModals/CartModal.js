import React, { useState, useEffect } from 'react'
import styles from './styles/cartModal.module.css'
import ReactDOM from 'react-dom'
import { formatter} from '../Helpers/CurrancyFormat'

const CartModal = (props) => {

    const [total, setTotal] = useState(null)

    // CALCULATE TOTAL PRICE
    useEffect(() => {
        let ttt = 0
        props?.cartItems.map(item => {
            let t = item?.price * item?.qty + ttt
            ttt = t
            setTotal(t)
        })
    })

    const CartItem = (item) => {

        let itemDetail = item?.item

        return (
            <div className={styles.cartItem}>
                <img src={itemDetail?.logo} alt='Cart food image...' className={styles.image} />

                <div className={styles.descBox}>
                    <p className={styles.title}>{itemDetail?.name}</p>
                    <p className={styles.price}>{formatter.format(itemDetail?.price)}</p>
                    <p className={styles.qty}>{itemDetail?.qty}</p>
                    <p className={styles.total}>{formatter.format(itemDetail?.price * itemDetail?.qty)}</p>
                </div>
            </div>
        )
    }

    const MyModal = () => {

        return (
            <div className={`modal fade ${styles.modaal}`} id="myModal">
                <div className={`modal-dialog modal-dialog-centered`}>
                    <div className={`modal-content`}>

                        {/* <!-- Modal Header --> */}
                        <div className={`modal-header`}>
                            <h4 className={`modal-title ${styles.modalTitle}`}>Your Cart</h4>
                            <button type="button" className={`close`} data-dismiss="modal">&times;</button>
                        </div>

                        {/* <!-- Modal body --> */}
                        <div className={`modal-body ${styles.mBody}`}>
                            {props?.cartItems?.length > 0
                                ? props?.cartItems.map(item => <CartItem item={item} key={item?.item?.id} />)
                                : <h4> No Item Found In Your Cart</h4>
                            }
                        </div>

                        {/* <!-- Modal footer --> */}
                        <div className={`modal-footer ${styles.footer}`}>
                            {total > 0
                                && <div className={styles.priceBox}>
                                    <h4>Total Amount:</h4>
                                    <h4>{formatter.format(total)}</h4>
                                </div>
                            }

                            {props?.cartItems?.length > 0
                                && <div className={styles.ftr}>
                                    <button
                                        type="button" className={`btn btn-secondary`} data-dismiss="modal"
                                        onClick={() => { props?.activeScreenHandler('Checkout') }}
                                    >
                                        Checkout
                                    </button>
                                </div>
                            }
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
