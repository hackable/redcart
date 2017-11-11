import React, {Component} from 'react';
import Product from './Product';
import LoadingProducts from '../loaders/Products';
import NoResults from "../es/NoResults";
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class Products extends Component{
	constructor(){
		super();
	}
  	render(){
    	let productsData;
    	let term = this.props.searchTerm;
			let price = this.props.priceRange;
			let category = this.props.category;
    	let x;

		function searchingFor(term){
			return function(x){
				//console.log("category", category.length);
				return ( ( (category.indexOf(x.brand) > -1) || (category.length === 0)) && (x.name.toLowerCase().includes(term.toLowerCase()) || !term) && (x.price >= price.min && x.price <= price.max ));
			}
		}
		productsData = this.props.productsList.filter(searchingFor(term)).map(product =>{
			return(
						<Product key={product.id} desc={product.desc} measurement={product.measurement} price={product.price} brand={product.brand} name={product.name} image={product.image} id={product.id} addToCart={this.props.addToCart} productQuantity={this.props.productQuantity} updateQuantity={this.props.updateQuantity} openModal={this.props.openModal}/>
				)
			}
		);

		// Empty and Loading States
		let view;
		if(productsData.length <= 0 && !term){
			view = <LoadingProducts />
		} else if(productsData.length <= 0 && term){
			view = <NoResults />
		} else{
			view = <CSSTransitionGroup
				transitionName="fadeIn"
				transitionEnterTimeout={500}
				transitionLeaveTimeout={300}
				component="div"
				className="products">
					{productsData}
			</CSSTransitionGroup>
		}
		return(
			<div className="products-wrapper">
				{view}
			</div>
		)
	}
}

export default Products;
