import React, {Component} from 'react'
import CartItem from './CartItem'
import axios from 'axios'
import {getCart} from '../ducks/reducer'
import {connect} from 'react-redux'

class Cart extends Component {

    componentDidMount() {
        axios.get('/api/cart').then(results => {
            this.props.getCart(results.data)
        })
    }

    checkout = () => {
        if(this.props.cart.length) {
            axios.delete('/api/cart/checkout').then(results => {
                alert('You Bought The Things!')
                this.props.getCart(results.data)
            })
        } else {
            alert("Add stuff to your cart ya dummy!")
        }
    }

    render() {
        let cartTotal = 0
        let cart = this.props.cart.map(e => {
            cartTotal += e.price * e.quantity
            return (
                <CartItem cartItem={e} key={e.id} updateCart={this.props.updateCart}/>
            )
        })
        return (
            <div>
                <h1>Cart</h1>
                {cart}
                <p>Total ${Math.floor(cartTotal * 100) / 100}</p>
                <button onClick={this.checkout}>Checkout</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps, {getCart})(Cart)