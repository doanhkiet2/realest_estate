import { LOGIN_FAIL, LOGIN_SUCCESS, SIGNUP_FAIL, SIGNUP_SUCCESS, LOGOUT } from '../actions/types'
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: false
}
export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.access)
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                token: payload.access
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                loading: true,
            }
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
            }
        default:
            return state
    }
} 