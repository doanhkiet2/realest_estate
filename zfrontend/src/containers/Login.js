import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/auth'
import { Redirect, Link } from 'react-router-dom'


const Login = ({ isAuthenticated, login }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { email, password } = formData

    const getNextURL = () => {
        const href = window.location.href
        // const href ="http://localhost:3000/login?next=/listings/10811-11199-NW-122nd-St-Medley-FL&sfs"
        //need to know: why not stop at &
        let regex = /next=(?<next>.+)&?/
        let match = href.match(regex)
        if (match) {
            // console.log("next", match.groups.next)
            return match.groups.next
        }
        return ''
    }

    const onSubmit = e => {
        e.preventDefault()
        login(email, password)
    }

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })


    if (isAuthenticated) {
        const next = getNextURL()
        console.log("next", next)
        return <Redirect to={`${next}`} />
    }

    return (
        <div className="auth">
            <h1 className="auth__title">SignIn</h1>
            <p className="auth__lead">Sign into your Account</p>
            <form onSubmit={e => onSubmit(e)} className="auth__form">
                <div className="auth__form__group">
                    <label htmlFor='' className="auth__form__label">Email:</label>
                    <input
                        type="email"
                        className="auth__form__input"
                        name="email"
                        value={email}
                        required
                        placeholder="Email"
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="auth__form__group">
                    <label htmlFor="password" className="auth__form__label">Password: </label>
                    <input
                        type="password"
                        className="auth__form__input"
                        name="password"
                        value={password}
                        required
                        placeholder="Password"
                        onChange={e => onChange(e)}
                    />
                </div>
                <button className="auth__form__button">Login</button>
            </form>
            <p className="auth__authhint">Don't have an Account?
            <Link className="auth__authhint__link" to='/signup'> Sign Up</Link>
            </p>

        </div>
    )
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { login })(Login)