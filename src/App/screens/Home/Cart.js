import React, { useState, useEffect } from 'react'
import styles from './Cart.module.css'
import { formatter } from '../../Helpers/CurrancyFormat'
import Header from '../../components/Header/Header'

const Cart = (props) => {

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
                <img src={itemDetail?.image} alt='Cart food image...' className={styles.image} />
                <div className={styles.descBox}>
                    <p className={styles.name}>{itemDetail?.name}</p>
                    <p className={`${styles.name} text-center`}>{formatter.format(itemDetail?.price)}</p>
                    <div className={styles.qtyBox}>
                        <p className={styles.minus}>-</p>
                        <p className={styles.qty}>{itemDetail?.qty}</p>
                        <p className={styles.plus}>+</p>
                    </div>
                    <p className={styles.total}>{formatter.format(itemDetail?.price * itemDetail?.qty)}</p>
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>
            <Header cartLength={props?.cartItems?.length} />

            <div className={`container-fluid ${styles.cart}`}>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <button className={styles.backButton} onClick={() => {props?.activeScreenHandler('Home')}}>BACK</button>
                    <h2 className={`text-center`} style={{flex:1, fontWeight:700}} >Checkout</h2>
                </div>

                <div className={styles.body}>
                    {props?.cartItems?.length > 0
                        ? props?.cartItems.map(item => <CartItem item={item} key={item?.item?.id} />)
                        : <h4 className={styles.noItem}> No Item Found In Your Cart</h4>
                    }
                </div>

                <div className={`${styles.footer}`}>
                    {total > 0
                        && <div className={styles.priceBox}>
                            <h4>Total Amount:</h4>
                            <h4>{formatter.format(total)}</h4>
                        </div>
                    }
                </div>

                <div className={styles.footerAction}>
                    <p style={{margin:0, fontWeight:600}}>
                        Payment Method:
                        <span>
                            <select name="cars" class="custom-select mb-3">
                                <option selected>Payment Method</option>
                                <option value="volvo">Cash</option>
                                <option value="fiat">PayPal</option>
                                <option value="audi">C/D Card</option>
                            </select>
                        </span>
                    </p>
                </div>

                <div className={styles.footerAction} style={{marginTop: '0px !important'}}>
                    <button type="button" className={`btn btn-secondary `} style={{ alignSelf: 'center', padding: '10px 50px', fontWeight:700, letterSpacing:1.4, textTransform: 'uppercase' }} data-dismiss="modal">Confirm</button>
                </div>

            </div>
        </React.Fragment>
    )
}

export default Cart
