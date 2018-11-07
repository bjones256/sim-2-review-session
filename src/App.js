import React, { Component } from 'react';
import './App.css';
import ProductsList from './components/ProductsList'
import Cart from './components/Cart'
import axios from 'axios'
import {connect} from 'react-redux'
import {getProducts} from './ducks/reducer'
import {Switch, Route, withRouter} from 'react-router-dom'
import Nav from './components/Nav'


class App extends Component {

  componentDidMount() {
    axios.get('/api/products').then(results => {
      this.props.getProducts(results.data)
    })
  }

  render() {
    return (
      <div>
        <Nav/>
        <Switch>
          <Route exact path='/' component={ProductsList} />
          <Route path='/cart' component={Cart} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(null, {getProducts})(App))
