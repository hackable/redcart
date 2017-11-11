import React, {Component} from 'react';

const EmptyCart = (props) =>{
    return(
        <div className="empty-cart">
            <img src="dist/assets/empty-cart.png" alt="empty-cart"/>
            <h2>You cart is empty!</h2>
        </div>
    )
};

export default EmptyCart;
