import * as types from '../actionTypes/index'

const initialState = {
    orderList: [],
}


const orderReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.ORDERS: {
            return {
                ...state,
                orderList: action.orderList
            }
        }
        default: {
            return state;
        }
    }
}

export default orderReducer
