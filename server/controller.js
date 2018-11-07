module.exports = {
    getProducts: (req, res) => {
        const db = req.app.get('db')
        db.get_products().then(products => {
            res.status(200).send(products)
        })
    },
    getCart: (req, res) => {
        res.status(200).send(req.session.user.cart)
    },
    addToCart: (req, res) => {
        const db = req.app.get('db')
        let {id} = req.params
        let {cart} = req.session.user

    //check to see if item is in the cart already
        let index = cart.findIndex(d => d.id === +id)

    //we check if index is equal to -1 because if findIndex doesn't find a match it will return -1
        if(index === -1) {
            //since the index is -1, the item isn't in the cart array yet
            //so we have to grab the product information of the product we want to add
            //we can do this by querying the database to get a product by id
            db.get_product_by_id(id).then(item => {
            //we then add a quantity property to the item object, so we can keep track of that
            //we have to use item[0] because get_product_by_id returns an array with one item in it so we need to access the first/only item in that array
              item[0].quantity = 1
            //we then push the item into the cart array and send back the cart
              cart.push(item[0])  
              res.status(200).send(cart)
            })
        } else {
            //if the item is already in the cart then we just update the quantity and send back the cart
            cart[index].quantity++
            res.status(200).send(cart)
        }
    },
    updateQuantity: (req, res) => {
        let {id} = req.params
        let {quantity} = req.query
        let {cart} = req.session.user

    //finding the index of the item we are updating in the cart array
        let index = cart.findIndex(d => d.id === +id)        

    //check to make sure the item was found and is in the cart array
        if(index !== -1) {
    //if the item is in the array and the quantity is 0 we just delete the item from the cart
            if(+quantity === 0) {
                cart.splice(index, 1)
            } else {
    //otherwise we just update the quantity of the item to be the quantity that was passed via a query
                cart[index].quantity = quantity
            }
        }
        res.status(200).send(cart)
    },
    deleteItem: (req, res) => {
        let {id} = req.params
        let {cart} = req.session.user

        //once again check if the item is in the cart
        let index = cart.findIndex(d => d.id === +id)                

        //if findIndex doesn't return -1 then the item is in the cart and we can delete it then send cart back
        if(index !== -1) {
            cart.splice(index, 1)
        }
        res.status(200).send(cart)
    },
    checkout: (req, res) => {        
        //sets the cart on the session back to an empty array
        req.session.user.cart = []
        res.status(200).send(req.session.user.cart)
    }
}