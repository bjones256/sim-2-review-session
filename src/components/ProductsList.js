import React from 'react'
import Product from './Product'
import {connect} from 'react-redux'

function ProductsList(props) {
    let products =props.products.map( e => {
        return (
            <Product product={e} key={e.id} updateCart={props.updateCart}/>
        )
    })
    return (
        <div>
            <h1>Products</h1>
            {products}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(ProductsList)