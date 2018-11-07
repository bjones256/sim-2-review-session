require('dotenv').config()
const express = require('express')
    , bodyParser = require('body-parser')
    , controller = require('./controller')
    , massive = require('massive')
    , session = require('express-session')

const app = express();

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

app.use(bodyParser.json())


//setting up sessions
//resave tells session whether or not to save a session to the store if nothing was changed on the session
//saveUninitialized tells session whether or not to save a session to the store if a request is made and n
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('connected')
})

//TOP/APP LEVEL MIDDLEWARE
//when a call to your server gets processed, it gets passed through your top level middleware first before it will move on to the endpoints
//checks to see if a user exists on the session object
//if a user does not exist, then add a user and make it equal to an object that has a property called cart that is initialized to an empty array
app.use((req, res, next) => {
    if(!req.session.user) {
        req.session.user = {
            cart: [],
        }
    }
    //invoke next so it can move on to the endpoints
    next()
})

app.get('/api/products', controller.getProducts)

app.get('/api/cart', controller.getCart)
app.post('/api/cart/:id', controller.addToCart)
app.put('/api/cart/:id', controller.updateQuantity)
app.delete('/api/cart/checkout', controller.checkout)
app.delete('/api/cart/:id', controller.deleteItem)

app.listen(SERVER_PORT, () => console.log('You are who you chose to be', SERVER_PORT))
