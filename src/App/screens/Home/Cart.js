import React, { useState, useEffect } from 'react'
import styles from './Cart.module.css'
import { formatter } from '../../Helpers/CurrancyFormat'
import Header from '../../components/Header/Header'
import Button from '../../components/UI/Button'

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
            <div class="row mt-3 justify-content-between" style={{ 'border-bottom': '1px solid lightgray' }}>
                <div class="col-sm-2 col-md-2 col-lg-2 col-xl-1">
                    <img src={itemDetail?.image} className={`${styles.image}`} alt='Cart food image...' />
                </div>

                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3 mt-5 text-left">
                    <h5 className={`${styles.heading}`}>{itemDetail?.name}</h5>
                </div>

                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-2 mt-5">
                    <p className={`${styles.text}`}>{formatter.format(itemDetail?.price)}</p>
                </div>

                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3 mt-4 pt-3">
                    <div class="row justify-content-center">
                        <div class="col-sm-4 col-md-4 col-lg-4 col-xl-3">
                            <button className={styles.qtyBtn}><i class="fa fa-minus-square" style={{ fontSize: 30, color: 'rgb(232, 71, 71)' }}></i></button>
                        </div>
                        <div class="col-sm-4 col-md-4 col-lg-4 col-xl-2">
                            <p className={styles.qty}>{itemDetail?.qty}</p>
                        </div>
                        <div class="col-sm-4 col-md-4 col-lg-4 col-xl-3">
                            <button className={styles.qtyBtn}><i class="fa fa-plus-square" style={{ fontSize: 32, color: 'rgb(12, 213, 62)' }}></i></button>
                        </div>
                    </div>
                </div>

                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-1 mt-5">
                    <p className={`${styles.text}`}>{formatter.format(itemDetail?.price * itemDetail?.qty)}</p>
                </div>

                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-1 mt-5 text-right">
                    <Button onClick={() => { }} className={`${styles.delete}`}>
                        <i class="fa fa-trash" style={{ fontSize: 26 }}></i>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>
            <Header cartLength={props?.cartItems?.length} />

            <div className={`container-fluid pb-3 mt-5 pt-4`}>
                {/* HEADING SECTION */}
                <div class="row">
                    <div class="col-sm-4 col-md-3 col-lg-3 col-xl-3 text-center">
                        <Button className={styles.backBtn} onClick={() => { props?.activeScreenHandler('Home') }}>BACK</Button>
                    </div>
                    <div class="col-sm-7 col-md-6 col-lg-6 col-xl-6">
                        <h2 className={`text-center`} style={{fontWeight: 700 }} >Checkout</h2>
                    </div>
                </div>
            
                {/* BODY SECTION */}
                <hr style={{margin: '0 5%', marginTop: 10}} />
                <div class="row justify-content-center mt-4">
                    <div class="col-sm-11 col-md-9 col-lg-8 col-xl-8"> {/*  offset-md-2 offset-lg-2 offset-xl-2 */}
                        {props?.cartItems?.length > 0
                            ? props?.cartItems.map(item => <CartItem item={item} key={item?.item?.id} />)
                            : <h4 className={styles.noItem}> No Item Found In Your Cart</h4>
                        }
                    </div>
                </div>

                {props?.cartItems?.length > 0
                    && <>
                        {/* ADDRESS */}
                        <div class="row justify-content-center mt-3">
                            <div class="col-sm-6 col-md-5 col-lg-4 col-xl-4 text-left align-content-end">
                                {/* <h4>Delivery Address:</h4> */}
                            </div>
                            <div class="form-group col-sm-5 col-md-4 col-lg-4 col-xl-4 ">
                                {/* <label for="usr" class='text-left font-weight-bold'>Delivery Address:</label> */}
                                <textarea type="text" rows="3" class="form-control" placeholder="Enter delivery address" ></textarea>
                            </div>
                        </div>

                        {/* PAYMENT */}
                        <div class="row justify-content-center mt-1">
                            <div class="col-sm-6 col-md-5 col-lg-4 col-xl-4 text-left" />
                            <div class="col-sm-5 col-md-4 col-lg-3 col-xl-4">
                                <label for="usr" class='text-left font-weight-bold'>Payment Method:</label>
                                <select name="cars" class="custom-select mb-3">
                                    <option selected>Select Payment</option>
                                    <option value="volvo">Cash</option>
                                    <option value="fiat">PayPal</option>
                                    <option value="audi">C/D Card</option>
                                </select>
                            </div>
                        </div>

                        {/* TOTAL */}
                        <div class="row justify-content-center mt-3">
                            <div class="col-sm-6 col-md-5 col-lg-4 col-xl-4 text-left">
                                <h4 className={`${styles.heading}`}>Total Amount:</h4>
                            </div>
                            <div class="col-sm-5 col-md-4 col-lg-4 col-xl-4 text-right">
                                <h4 className={`${styles.heading}`}>{formatter.format(total)}</h4>
                            </div>
                        </div>

                        {/* CONFIRM BUTTON */}
                        <hr style={{ margin: '0 15%', marginTop: 10 }} />
                        <div class="row mt-3">
                            <div class="col-sm-11 col-md-11 col-lg-10 col-xl-10 bg-drak text-right">
                                <Button
                                    title="Confirm Order" className={styles.confirmBtn}
                                    onClick={() => {
                                        let num = Math.floor(Math.random() * (9990 - 1000 + 1)) + 1000
                                        setTimeout(() => { alert(`\nYour order created seccessfully!\nOrder number is: ${num}.`) }, 1000)
                                    }}
                                />
                            </div>
                        </div>
                    </>
                }
            </div>
        </React.Fragment>
    )
}

export default Cart
