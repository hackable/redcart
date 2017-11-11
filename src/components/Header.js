import React, {Component} from 'react';
import CartScroll from './CartScroll';
import Counter from './Counter';
import EmptyCart from '../es/EmptyCart';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {findDOMNode} from 'react-dom';

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            showCart: false,
            cart: this.props.cartItems,
            mobileSearch: false
        };
    }
    handleCart(e){
        e.preventDefault();
        this.setState({
            showCart: !this.state.showCart
        })
    }
    handleSubmit(e){
        e.preventDefault();
    }
    handleMobileSearch(e){
        e.preventDefault();
        this.setState({
            mobileSearch: true
        })
    }
    handleSearchNav(e){
        e.preventDefault();
        this.setState({
            mobileSearch: false
        }, function(){
            this.refs.searchBox.value = "";
            this.props.handleMobileSearch();
        })
    }
    handleClick(event) {
        const cartNode = findDOMNode(this.refs.cartPreview);
        const buttonNode = findDOMNode(this.refs.cartButton);
        if(cartNode.classList.contains('active')){
            if (!cartNode || !cartNode.contains(event.target)){
                this.setState({
                    showCart: false
                })
                event.stopPropagation();
            }
        }
    }
    componentDidMount() {
      document.addEventListener('click', this.handleClick.bind(this), true);
    }
    componentWillUnmount() {
      document.removeEventListener('click', this.handleClick.bind(this), true);
    }
    render(){
        let cartItems;
        cartItems = this.state.cart.map(product =>{
			return(
				<li className="cart-item" key={product.name}>
                    <img className="product-image" src={product.image} />
                    <div className="product-info">
                        <p className="product-name">{product.name}</p>
                        <p>{product.measurement}</p>
                    </div>
                    <div className="product-total">
                        <p className="quantity">{product.quantity} {product.quantity > 1 ?"Qtys." : "Qty." } </p>
                        <p className="amount">{(product.quantity * product.price).toFixed(2)}</p>
                    </div>
                    <a className="product-remove" href="#" onClick={this.props.removeProduct.bind(this, product.id)}>×</a>
                </li>
			)
		});
        let view;
        if(cartItems.length <= 0){
			view = <EmptyCart />
		} else{
			view = <CSSTransitionGroup transitionName="fadeIn" transitionEnterTimeout={500} transitionLeaveTimeout={300} component="ul" className="cart-items">{cartItems}</CSSTransitionGroup>
		}
        return(
            <header>
                <div className="container">
                    <div className="brand">
                        <img className="logo" src="dist/assets/logo.png" alt="Redmart"/>
                    </div>

                    <div className="search">
                        <a className="mobile-search" href="#" onClick={this.handleMobileSearch.bind(this)}><img src="dist/assets/search.png" alt="search"/></a>
                        <form action="#" method="get" className={this.state.mobileSearch ? "search-form active" : "search-form"}>
                            <a className="back-button" href="#" onClick={this.handleSearchNav.bind(this)}><img src="dist/assets/back.png" alt="back"/></a>
                            <input type="search" ref="searchBox" placeholder="Search for Items" className="search-keyword" onChange={this.props.handleSearch}/>
                        </form>
                    </div>

                    <div className="cart">
                        <div className="cart-info">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Items</td>
                                        <td>:</td>
                                        <td><strong>{this.props.totalItems}</strong></td>
                                    </tr>
                                    <tr>
                                        <td>Total Amount</td>
                                        <td>:</td>
                                        <td><strong>{(this.props.total).toFixed(2)}</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <a className="cart-icon" href="#" onClick={this.handleCart.bind(this)} ref="cartButton">
                            <img className={this.props.cartBounce ? "tada" : " "} src="dist/assets/bag.png" alt="Cart"/>
                            {this.props.totalItems ? <span className="cart-count">{this.props.totalItems}</span> : "" }
                        </a>
                        <div className={this.state.showCart ? "cart-preview active" : "cart-preview"} ref="cartPreview">
                            <CartScroll>
                                {view}
                            </CartScroll>
                            <div className="action-block">
                                <button type="button" className={this.state.cart.length > 0 ? " " : "disabled"}>PROCEED TO CHECKOUT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;
