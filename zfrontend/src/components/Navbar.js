import React, { Fragment } from 'react'
import Alert from './Alert'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../actions/auth'

const navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    console.log("isAuthenticated", isAuthenticated)
    console.log("loading", loading)
    const authDisplay = loading
        ? null
        : isAuthenticated
            ? <li className="navbar__nav__item">
                <a href="#!" className="navbar__nav__item__link li_auth" onClick={logout}>logout</a>
            </li>
            : <Fragment>
                <li className="navbar__nav__item">
                    <NavLink className="navbar__nav__item__link li_auth" exact to="/login">login</NavLink>
                </li>
                <li className="navbar__nav__item">
                    <NavLink className="navbar__nav__item__link li_auth" exact to="/signup">signup</NavLink>
                </li>
            </Fragment>


    return (
        <Fragment>
            <nav className='navbar'>
                <div className="navbar_logo">
                    <Link className='navbar__logo__link' to='/'>Realest Estate</Link>
                </div>
                <ul className="navbar__collapse navbar__nav">
                    <li className="navbar__nav__item">
                        <NavLink className="navbar__nav__item__link" exact to="/">Home</NavLink>
                    </li>
                    <li className="navbar__nav__item">
                        <NavLink className="navbar__nav__item__link" exact to="/listings">Listing</NavLink>

                    </li>
                    <li className="navbar__nav__item">
                        <NavLink className="navbar__nav__item__link" exact to="/about">About</NavLink>

                    </li>
                    <li className="navbar__nav__item">
                        <NavLink className="navbar__nav__item__link" exact to="/contact">Contact</NavLink>

                    </li>
                </ul>

                <ul className="navbar__auth navbar__nav">
                    {authDisplay}
                </ul>
            </nav>
            <Alert />
        </Fragment>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(navbar)