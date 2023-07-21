import { combineReducers } from 'redux'

// userReducer
import userReducer from './userReducer'
// productReducer
import productReducer from './productReducer'
// orderReducer
import orderReducer from './orderReducer'

const rootReducer = combineReducers({
    productReducer: productReducer,
    orderReducer: orderReducer,
    userReducer: userReducer,
})

export default rootReducer;
