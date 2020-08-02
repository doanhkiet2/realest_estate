import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

//need to know : what is rest
const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, ...rest }) => {
    const next = window.location.pathname
    return (
        <Route
            {...rest}
            render={props => !isAuthenticated && !loading
                ? (<Redirect to={`/login?next=${next}`} />)
                : (<Component {...props} />)
            }
/>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps)(PrivateRoute)