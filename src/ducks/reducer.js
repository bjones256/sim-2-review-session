let initialState = {
    products: [],
    cart: []
}

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_CART = 'GET_CART'

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_PRODUCTS: 
            return Object.assign({}, state, {products: action.payload})
        case GET_CART: 
            return {...state, cart: action.payload}
        default: 
            return state
    }
}

export function getProducts(products) {
    return {
        type: GET_PRODUCTS,
        payload: products
    }
}
export function getCart(cart) {
    return {
        type: GET_CART,
        payload: cart
    }
}