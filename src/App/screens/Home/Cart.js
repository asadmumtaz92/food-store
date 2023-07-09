import React, { useState, useEffect } from 'react'
import styles from './Cart.module.css'
import { formatter } from '../../Helpers/CurrancyFormat'
import Button from '../../components/UI/Button'


const Cart = (props) => {

    const [total, setTotal] = useState(null)
    const deliChar = 10

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

        const deleteItemHandler = () => {
            props?.deleteItemHandler(itemDetail?.id)
        }
        const incrementHandler = () => {
            props?.incrementHandler(itemDetail?.id)
        }
        const decremetHandler = () => {
            props?.decremetHandler(itemDetail?.id)
        }

        return (
            <div class="row mt-3 justify-content-between" style={{ 'border-bottom': '1px solid lightgray' }}>
                <div class="col-sm-2 col-md-2 col-lg-2 col-xl-1">
                    <img src={itemDetail?.image} className={`${styles.image}`} alt='Cart food image...' />
                </div>

                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3 mt-5 text-left">
                    <h5 className={`pl-1 ${styles.heading}`}>{itemDetail?.name}</h5>
                </div>

                <div class="col-sm-2 col-md-1 col-lg-2 col-xl-2 mt-5">
                    <p className={`${styles.text}`}>{formatter.format(itemDetail?.price)}</p>
                </div>

                <div class="col-sm-2 col-md-3 col-lg-2 col-xl-3 mt-4 pt-4">
                    <div class="row justify-content-center">
                        <div class="col-sm-4 col-md-4 col-lg-4 col-xl-3 text-center">
                            <button className={styles.qtyBtn} onClick={decremetHandler}>
                                <i class="fa fa-minus-square" style={{ fontSize: 25 }}></i>
                            </button>
                        </div>
                        <div class="col-sm-4 col-md-4 col-lg-4 col-xl-2 text-cent">
                            <p className={styles.qty}>{itemDetail?.qty}</p>
                        </div>
                        <div class="col-sm-4 col-md-4 col-lg-4 col-xl-3 text-center">
                            <button className={styles.qtyBtn} onClick={incrementHandler}>
                                <i class="fa fa-plus-square" style={{ fontSize: 25 }}></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="col-sm-2 col-md-2 col-lg-2 col-xl-1 mt-5 text-right">
                    <p className={`${styles.text}`}>{formatter.format(itemDetail?.price * itemDetail?.qty)}</p>
                </div>

                <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 mt-5 text-right">
                    <Button onClick={deleteItemHandler} className={`${styles.delete}`}>
                        <i class="fa fa-trash" style={{ fontSize: 25 }}></i>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>
            <div className={`container-fluid mt-5 pt-4`}>
                {/* HEADING SECTION */}
                <div class="row">
                    <div class="col-sm-4 col-md-3 col-lg-3 col-xl-3 text-center">
                        <Button className={styles.backBtn} onClick={() => { props?.activeScreenHandler('Home') }}>BACK</Button>
                    </div>
                    <div class="col-sm-7 col-md-6 col-lg-6 col-xl-6">
                        <h2 className={`text-center`} style={{fontWeight: 700 }} >Checkout</h2>
                    </div>
                </div>
                <hr style={{margin: '0 5%', marginTop: 10}} />

                <div class="row justify-content-center bg-dark pt-5 pb-5">
                    <div class="col-sm-11 col-md-9 col-lg-9 col-xl-9 bg-white rounded">
                        {/* BODY */}
                        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            {props?.cartItems?.length > 0
                                ? props?.cartItems.map(item => <CartItem item={item} key={item?.item?.id} />)
                                : <h4 className={`mt-5 mb-5 ${styles.noItem}`}> No Item Found In Your Cart</h4>
                            }
                        </div>
                        {props?.cartItems?.length > 0
                            && <>
                                {/* ADDRESS */}
                                <div class="row col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-4">
                                    <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6 align-self-end">
                                        <h6 className={`${styles.heading}`}>Delivery Address:</h6>
                                    </div>
                                    <div class=" col-sm-6 col-md-6 col-lg-6 col-xl-6 ">
                                        <textarea type="text" rows="2" class="form-control" placeholder="Enter delivery address" ></textarea>
                                    </div>
                                </div>

                                {/* PAYMENT METHOD */}
                                <div class="row col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-4">
                                    <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6 align-self-center">
                                        <h6 className={`${styles.heading}`}>Payment Method:</h6>
                                    </div>
                                    <div class="col-sm-6 col-md-6 col-lg-6 col-xl-4">
                                        <select name="cars" class="custom-select mb-3">
                                            <option selected>Select Payment</option>
                                            <option value="volvo">Cash</option>
                                            <option value="fiat">PayPal</option>
                                            <option value="audi">C/D Card</option>
                                        </select>
                                    </div>
                                </div>

                                {/* AMOUNT */}
                                <div class="row col-sm-12 col-md-12 col-lg-12 col-xl-12 bg-drak">
                                    <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                        <h6 className={`${styles.heading}`}>Sub Total:</h6>
                                    </div>
                                    <div class="col-sm-6 col-md-6 col-lg-5 col-xl-5">
                                        {formatter.format(total)}
                                    </div>
                                    <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                        <h6 className={`${styles.heading}`}>Delivery Charges:</h6>
                                    </div>
                                    <div class="col-sm-6 col-md-6 col-lg-5 col-xl-5">
                                        {formatter.format(deliChar)}
                                    </div>

                                    <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                        <h6 className={`${styles.heading}`}>Total Amount:</h6>
                                    </div>
                                    <div class="col-sm-6 col-md-6 col-lg-5 col-xl-5">
                                        {formatter.format(total + deliChar)}
                                    </div>
                                </div>

                                {/* CONFIRM ORDER BUTTON */}
                                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-4 mb-3 text-center">
                                    <Button
                                        title="Confirm Order" className={styles.confirmBtn}
                                        onClick={() => {
                                            let num = Math.floor(Math.random() * (9990 - 1000 + 1)) + 1000
                                            setTimeout(() => { alert(`\nYour order created seccessfully!\nOrder number is: ${num}.`) }, 1000)
                                        }}
                                    />
                                </div>

                                {/* <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-4"></div> */}
                            </>
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Cart
