import React from 'react'
import {Link, withRouter} from 'react-router-dom'

function Nav() {
    return(
        <div>
            <Link to='/'>Products</Link>
            <Link to='/cart'>Cart</Link>
        </div>
    )
}

export default withRouter(Nav)