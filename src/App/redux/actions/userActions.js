import * as types from '../actionTypes/index'
import { BASE_URL } from '../../enviroments/index'


export const getProducts = () => async (dispatch, store) => {

    const response = await fetch(`${BASE_URL}/meals.json`)
    if (!response.ok) {
        throw new Error(response?.statusText);
    }
    let data = await response.json()
    const loadedItems = []

    for (const key in data) {
        loadedItems.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
            logo: data[key].logo,
        })
    }
    dispatch({ type: types.PRODUCTS, productList: loadedItems })
}

export const setUserInfo = (data) => {
    return {
        type: types.USER_INFO,
        userInfo: data
    }
}

export const setUserLoginStatus = (data) => {
    return {
        type: types.IS_LOGIN,
        isLogin: data
    }
}
