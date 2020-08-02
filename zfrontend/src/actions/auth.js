import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, SIGNUP_SUCCESS, SIGNUP_FAIL } from './types'
import { setAlert } from './alerts'
import axios from 'axios'

export const logout = () => dispatch => {
    dispatch(setAlert('logout successful', 'success'))
    dispatch({ type: LOGOUT })
}

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password })

    try {
        const res = await axios.post('http://192.168.1.169:8000/api/token/', body, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(setAlert('login successful', 'success'))
    }
    catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
        dispatch(setAlert('login fail', 'error'))
    }
}


export const signUp = ({ name, email, password, password2 }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password, password2 })

    try {
        const res = await axios.post('http://192.168.1.169:8000/api/accounts/signup', body, config)
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        })
        dispatch(login(email, password))
        dispatch(setAlert('register successful', 'success'))
    }
    catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        })
        dispatch(setAlert('login fail', 'error'))
    }
}