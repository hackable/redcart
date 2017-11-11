import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Counter extends Component {
	constructor(props){
		super(props)
		this.state = { value: this.props.productQuantity };
		this.incr = this.incr.bind(this);
		this.decr = this.decr.bind(this);
	}

	incr(e){
    	this.setState(prevState => ({
      	value: Number(prevState.value) + 1
    	}), function(){
				this.props.updateQuantity(this.state.value);
		});
		e.preventDefault();
  };

	decr(e){
		e.preventDefault();
		if(this.state.value <= 1){
			return this.state.value;
		}
		else{
			this.setState(prevState => ({
				value: Number(prevState.value) - 1
			}), function(){
				this.props.updateQuantity(this.state.value);
			});
		}
	};

	feed(e){
		this.setState({
			value: this.refs.feedQty.value
		}, function(){
				this.props.updateQuantity(this.state.value);
		})
	};


	render() {
		return (
			<div className="stepper-input">
				<a href="#" className="decr" onClick={this.decr}>–</a>
				<input ref="feedQty" type="number" className="quantity" value={this.state.value} onChange={this.feed.bind(this)} />
				<a href="#" className="incr" onClick={this.incr}>+</a>
			</div>
		)
	}
}

Counter.propTypes = {
  value: PropTypes.number
};

export default Counter;
