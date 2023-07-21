import * as types from '../actionTypes/index'
import { BASE_URL } from '../../enviroments/index'


export const getOrders = () => async (dispatch, store) => {

    const response = await fetch(`${BASE_URL}/orders.json`)
    if (!response.ok) {
        throw new Error(response?.statusText);
    }
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
    dispatch({ type: types.ORDERS, orderList: loadedItems })
}
