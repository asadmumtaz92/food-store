import React, { useState, useEffect, useRef } from 'react'
import styles from './Cart.module.css'
import { formatter } from '../../Helpers/CurrancyFormat'
import Button from '../../components/UI/Button'


const Cart = (props) => {

    const nameRef = useRef('')
    const contRef = useRef('')
    const strRef = useRef('')
    const areaRef = useRef('')
    const cityRef = useRef('')
    const postalcodeRef = useRef('')
    const paymentRef = useRef('')

    const [isLoading, setIsLoading] = useState(false)
    const [httpError, setHttpError] = useState('')
    const [total, setTotal] = useState(null)
    const deliChar = 10.3

    // CALCULATE TOTAL PRICE
    useEffect(() => {
        const calcuTotle = () => {
            let ttt = 0
            props?.cartItems.map(item => {
                let t = (item?.price * item?.qty) + ttt
                ttt = t
                setTotal(t)
            })
        }
        calcuTotle()
    })

    const onConfirmOrder = async () => {

        setIsLoading(true)
        setHttpError('')

        let disabled = (
            nameRef?.current?.value?.length < 5
            || contRef?.current?.value?.length < 11
            || strRef?.current?.value?.length < 5
            || areaRef?.current?.value?.length < 5
            || cityRef?.current?.value?.length < 5
            || postalcodeRef?.current?.value?.length < 5
            || paymentRef?.current?.value?.length < 4)
            ? true
            : false

        let orderDetail = {
            orderDate: (new Date()).toString().substring(4, 21),
            orderNo: Math.floor(Math.random() * (9990 - 1000 + 1)) + 1000
        }
        let userInfo = {
            name: nameRef?.current?.value,
            contact: contRef?.current?.value,
            street: strRef?.current?.value,
            area: areaRef?.current?.value,
            city: cityRef?.current?.value,
            postalCode: postalcodeRef?.current?.value,
        }
        let paymentDetail = {
            payment: paymentRef?.current?.value,
            deliveryFee: deliChar,
            subTotal: total,
            total: total + deliChar,
        }
        let bodyData = {
            products: props?.cartItems,
            userInfo: userInfo,
            paymentDetail: paymentDetail,
            orderDetail: orderDetail,
        }

        if (!disabled) {
            const response = await fetch('https://reactjs-app-aa583-default-rtdb.firebaseio.com/orders.json', {
                method: 'POST',
                header: { 'Content-type': 'application/json' },
                body: JSON.stringify(bodyData)
            })
            if (response.ok) {
                alert(`\nYour order created seccessfully!\nOrder number is: ${orderDetail?.orderNo}.`)
                setTimeout(() => {
                    props?.OnConfirmOrder()
                    setTotal(0)
                    setIsLoading(false)
                    setHttpError('')
                }, 1000)
            }
            else {
                setHttpError(response.statusText)
                setIsLoading(false)
            }
        }
        else {
            setHttpError('Fill all input fields...')
            setIsLoading(false)
        }
    }

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
                    <img src={itemDetail?.logo} className={`${styles.image}`} alt='food logo...' />
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

    const IpComp = ({label, refName, placeholder, type='text'}) => {
        return (
            <>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6 align-self-end">
                    <h6 className={`${styles.heading}`}>{label}:</h6>
                </div>
                <div class=" col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-2">
                    <input type={type} ref={refName} class="form-control" placeholder={placeholder} required/>
                </div>
            </>
        )
    }

    return (
        <React.Fragment>
            <div className={`container-fluid mt-5 pt-4`} style={{minHeight:'87vh'}}>
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
                        {!isLoading && 
                            <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                {props?.cartItems?.length > 0
                                    ? props?.cartItems.map(item => <CartItem item={item} key={item?.item?.id} />)
                                    : <h4 className={`mt-5 mb-5 ${styles.noItem}`}>No Item Found In Your Cart</h4>
                                }
                            </div>
                        }

                        {(!isLoading && httpError) && <p className={`text-center mt-3 mb-3 font-weight-bold`}>{httpError}</p>}

                        {(props?.cartItems?.length > 0 && !isLoading)
                            ? <>
                                {/* USER INFO */}
                                <div class="row col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-4">
                                    <IpComp label='Full Name' refName={nameRef} placeholder='Enter your full name' />
                                    <IpComp label='Contact No' refName={contRef} placeholder='Enter contact no' type='number' />
                                    <IpComp label='Street Address' refName={strRef} placeholder='Enter street address' />
                                    <IpComp label='Area' refName={areaRef} placeholder='Enter area' />
                                    <IpComp label='City' refName={cityRef} placeholder='Enter city'/>
                                    <IpComp label='Postal Code' refName={postalcodeRef} placeholder='Enter postal code' type='number' />
                                </div>

                                {/* PAYMENT METHOD */}
                                <div class="row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6 align-self-center">
                                        <h6 className={`${styles.heading}`}>Payment Method:</h6>
                                    </div>
                                    <div class="col-sm-6 col-md-6 col-lg-6 col-xl-4">
                                        <select name="cars" class="custom-select mb-3" ref={paymentRef}>
                                            <option selected value=''>Select Payment</option>
                                            <option value="Cash">Cash</option>
                                            <option value="PayPal">PayPal</option>
                                            <option value="C/D Card">C/D Card</option>
                                        </select>
                                    </div>
                                </div>

                                {/* BILL DETAIL */}
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
                                        onClick={onConfirmOrder}
                                    />
                                </div>

                                {/* <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-4"></div> */}
                            </>
                            : isLoading && <p className={`text-center pt-5 pb-4 font-weight-bold`}><i class="fa fa fa-spinner fa-spin"></i> Processing wait...</p>
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Cart
