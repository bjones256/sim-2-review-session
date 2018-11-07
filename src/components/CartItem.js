import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getCart} from '../ducks/reducer'

class CartItem extends Component {

    updateQuantity = (update) => {
        let {id, quantity} = this.props.cartItem
        if(update === 'up') {
            quantity++
        } else if (update === 'down') {
         quantity--   
        }
        axios.put(`/api/cart/${id}?quantity=${quantity}`).then(results => {
            this.props.getCart(results.data)
        })
    }

    deleteItem = () => {
        axios.delete(`/api/cart/${this.props.cartItem.id}`).then(results => {
            this.props.getCart(results.data)
        })
    }

    render() {
        let {name, price, quantity} = this.props.cartItem
        return (
            <div>
                <h3>{name}</h3>
                <p>Quantity {quantity}</p>
                <button onClick={() => this.updateQuantity('up')}>+</button>
                <button onClick={() => this.updateQuantity('down')}>-</button>
                <button onClick={this.deleteItem}>Delete</button>
                <p>${Math.floor(price * quantity * 100) / 100}</p>
            </div>
        )
    }
}

export default connect(null, {getCart})(CartItem)