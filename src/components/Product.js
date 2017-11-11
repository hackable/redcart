import React, {Component} from 'react';
import Counter from './Counter';

class Product extends Component{
	constructor(props){
		super(props);
        this.state = {
            selectedProduct: {},
            quickViewProdcut: {},
            buttonLabel: "ADD TO CART"
        }
	}

    addToCart(image, name, brand, desc, measurement, price, id, quantity){
        this.setState({
            selectedProduct: {
							  image: image,
							  name: name,
							  brand: brand,
							  desc: desc,
							  measurement: measurement,
							  price: price,
                id: id,
                quantity: quantity
            }
        }, function(){
            this.props.addToCart(this.state.selectedProduct);
        })
        this.setState({
            buttonLabel: "✔ ADDED"
        }, function(){
            setTimeout(() => {
                this.setState({ buttonLabel: "ADD TO CART" });
            }, 5000);
        });
    }
    quickView(image, name,  brand, desc, measurement, price, id, quantity){
        this.setState({
            quickViewProdcut: {
                image: image,
                name: name,
								brand: brand,
								desc: desc,
								measurement: measurement,
                price: price,
                id: id
            }
        }, function(){
            this.props.openModal(this.state.quickViewProdcut);
        })
    }
    render(){
        let image = this.props.image;
        let name = this.props.name;
        let price = this.props.price;
				let brand = this.props.brand;
				let desc = this.props.desc;
				let measurement = this.props.measurement;
        let id = this.props.id;
        let quantity = this.props.productQuantity;
        return(
            <div className="product">
                <div className="product-image">
                    <img src={image} alt={this.props.name} onClick={this.quickView.bind(this, image, name,  brand, desc, measurement, price, id, quantity)}/>
                </div>
                <h4 className="product-name">{this.props.name}</h4>
								<p className="product-measurement">{this.props.measurement}</p>
								<p className="product-brand">{this.props.brand}</p>
                <p className="product-price">{this.props.price}</p>
                <Counter productQuantity={quantity} updateQuantity={this.props.updateQuantity}/>
                <div className="product-action">
                    <button type="button" onClick={this.addToCart.bind(this, image, name, brand, desc, measurement, price, id, quantity)}>{this.state.buttonLabel}</button>
                </div>
            </div>
        )
    }
}

export default Product;
