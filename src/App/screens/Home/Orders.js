import React, { useState, useEffect } from 'react'
import Button from '../../components/UI/Button'
import styles from './orders.module.css'
import { formatter } from '../../Helpers/CurrancyFormat'


const Orders = (props) => {

    const [order, setOrder] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [httpError, setHttpError] = useState('')

    const fetchOrders = async () => {
        setIsLoading(true)
        setHttpError('')
        const response = await fetch('https://reactjs-app-aa583-default-rtdb.firebaseio.com/orders.json')

        if (response.ok) {
            let data = await response.json()
            const loadedItems = []

            for (const key in data) {
                loadedItems.push({
                    products: data[key].products,
                    userInfo: data[key].userInfo,
                    paymentDetail: data[key].paymentDetail,
                    orderDetail: data[key].orderDetail
                })
            }
            setOrder(loadedItems)
        }
        else {
            setHttpError(response?.statusText)
            throw new Error(response?.statusText)
        }
        setIsLoading(false)
    }
    
    useEffect(() => {
        const getOrders = async () => {
            await fetchOrders().catch(error => {
                setIsLoading(false)
                setHttpError(error.message)
            })
        }
        getOrders()
    }, [])

    const OrderItem = (item) => {
        let orderData = item?.item
        let userInfo = orderData?.userInfo
        let orderDetail = orderData?.orderDetail
        let paymentDetail = orderData?.paymentDetail

        return (
            <div className={`row mb-4 bg-white text-dark rounded p-3 align-items-end`}>
                <div className={`col-sm-5 col-md-5 col-lg-5 col-xl-5`}>
                    {orderData?.products.map(item => {
                        return (
                            <div className={`row p-3`} style={{borderBottom:'1px solid #C2C2C2'}}>
                                <img src={item?.logo} style={{ width: 50 }} />
                                <div className={`col-sm-8 col-md-8 col-lg-8 col-xl-9`} style={{ display: 'flex', flex: 1, justifyContent: 'center', flexDirection:'column',}}>
                                    <h5 className={`text-uppercase font-weight-bold ${styles.m0}`}>{item?.name}</h5>
                                    <p className={`${styles.m0}`} style={{fontSize: 14}}><span className={`font-weight`}>Price: </span> {formatter.format(item?.price)}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1" />
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <h6 className={`text-capitalize`}><span className={`font-weight-bold`}>Name:</span> {userInfo?.name}</h6>
                    <h6 className={`text-capitalize`}><span className={`font-weight-bold`}>Contact:</span> {userInfo?.contact}</h6>
                    <h6 className={`text-capitalize`}><span className={`font-weight-bold`}>Address:</span> {`${userInfo?.street} ${userInfo?.area} ${userInfo?.city}  ${userInfo?.postalCode}`}</h6>
                    <h6 className={`text-capitalize`}><span className={`font-weight-bold`}>Total Bill:</span> {formatter.format(paymentDetail?.total)}</h6>
                    <h6 className={`text-capitalize`}><span className={`font-weight-bold`}>Order Date:</span> {orderDetail?.orderDate ? orderDetail?.orderDate : orderDetail?.orderDare}</h6>
                    <h6 className={`text-capitalize`}><span className={`font-weight-bold`}>Payment Method:</span> {paymentDetail?.payment}</h6>
                </div>            
            </div>
        )
    }

    return (
        <div className={`container-fluid pt-4 mt-5`}>
            {/* HEADER */}
            <div className={`row mb-1`}>
                <div className={`col-sm-4 col-md-3 col-lg-3 col-xl-3 text-center`}>
                    <Button className={styles.backBtn} onClick={() => { props?.activeScreenHandler('Home') }}>BACK</Button>
                </div>
                <div className={`col-sm-7 col-md-6 col-lg-6 col-xl-6`}>
                    <h2 className={`text-center`} style={{ fontWeight: 700 }} >Previous Ordres</h2>
                </div>
            </div>

            <div className={`row justify-content-center bg-dark pt-5 pb-2`}>
                <div className={`col-sm-11 col-md-9 col-lg-9 col-xl-9`}>

                    {httpError && <p className={`text-center mt-2 mb-5 p-5 rounded font-weight-bold bg-white`}>{httpError}</p>}
                    {isLoading && <p className={`text-center mt-2 mb-5 p-5 rounded font-weight-bold bg-white ${styles.m0}`}><i class="fa fa fa-spinner fa-spin"></i> Loading...</p>}

                    {order?.length > 0 && !isLoading
                        ? order.map(item => <OrderItem item={item} /> )
                        : !isLoading && <p className={`text-center mt-5 mb-5 font-weight-bold`}>You don't have any order</p>
                    }

                </div>
            </div>
        </div>
    )
}

export default Orders
