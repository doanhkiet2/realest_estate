import React, { useState } from 'react'
import { connect } from 'react-redux'
import { signUp } from '../actions/auth'
import { Redirect, Link } from 'react-router-dom'
import { setAlert } from '../actions/alerts'


const SignUp = ({ isAuthenticated, signUp, setAlert }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    const { name, email, password, password2 } = formData

    const onSubmit = e => {
        e.preventDefault()
        if (password < 2) {
            setAlert('Password must be at least 2 character')
        }
        signUp({ name, email, password, password2 })

    }

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })


    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <div className="auth">
            <h1 className="auth__title">Sign Up</h1>
            <p className="auth__lead">Sign Up your Account</p>
            <form onSubmit={e => onSubmit(e)} className="auth__form">
                <div className="auth__form__group">
                <label htmlFor='name' className="auth__form__label">Name:</label>

                    <input
                        type="text"
                        className="auth__form__input"
                        name="name"
                        value={name}
                        required
                        placeholder="Name"
                        onChange={e => onChange(e)}
                    />
                </div>
                <label htmlFor='email' className="auth__form__label">Email:</label>

                <div className="auth__form__group">
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
                <label htmlFor='password' className="auth__form__label">Password:</label>

                <div className="auth__form__group">
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
                <label htmlFor='password2' className="auth__form__label">Password2:</label>

                <div className="auth__form__group">
                    <input
                        type="password"
                        className="auth__form__input"
                        name="password2"
                        value={password2}
                        required
                        placeholder="Password2"
                        onChange={e => onChange(e)}
                    />
                </div>
                <button className="auth__form__button">SignUp</button>
            </form>
            <p className="auth__authhint">Already have an Account,
                <Link className="auth__authhint__link" to='/login'>Login</Link>
            </p>

        </div>
    )
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { signUp, setAlert })(SignUp)