import * as types from '../actionTypes/index'

const initialState = {
    userInfo: {},
    isLogin: false,
}


const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.IS_LOGIN: {
            return {
                ...state,
                isLogin: action.isLogin
            }
        }
        case types.USER_INFO: {
            return {
                ...state,
                userInfo: action.userInfo
            }
        }
        default: {
            return state;
        }
    }
}

export default userReducer
