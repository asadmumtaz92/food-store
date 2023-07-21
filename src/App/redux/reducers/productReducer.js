import * as types from '../actionTypes/index'

const initialState = {
    productList: [],
}


const productReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.PRODUCTS: {
            return {
                ...state,
                productList: action.productList
            }
        }
        default: {
            return state;
        }
    }
}

export default productReducer
