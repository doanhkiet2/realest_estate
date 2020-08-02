import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './containers/Home'
import Listings from './containers/Listings'
import ListingDetail from './containers/ListingDetail'
import About from './containers/About'
import Contact from './containers/Contact'
import Login from './containers/Login'
import SignUp from './containers/SignUp'
import NotFound from './components/NotFound'
import Layout from './hocs/Layout'
import PrivateRoute from './components/privateRoute'

import { Provider } from 'react-redux'
import store from './store'

import './sass/main.scss'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/listings' component={Listings} />
            <PrivateRoute exact path='/listings/:id' component={ListingDetail} />
            <Route exact path='/about' component={About} />
            <Route exact path='/contact' component={Contact} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signUp' component={SignUp} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
