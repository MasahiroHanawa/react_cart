import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar
} from 'react-bootstrap';
import PropTypes from 'prop-types';

class Header extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      cart: this.props.cart
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cart: nextProps.cart
    });

  }
  
  render() {
    let amountClassName = 'no-amount';
    if (this.state.cart.amount > 0) {
      amountClassName = 'amount'
    }
    return (
      <Navbar className="header">
        <Navbar>
          <Navbar>
            <Link to="/">Home</Link>
          </Navbar>
        </Navbar>
        <Navbar>
          <Navbar>
            <Link to="/top_five">Top-5 Product</Link>
          </Navbar>
        </Navbar>
        <Navbar>
          <Navbar>
            <Link to="/cart">Your Cart</Link>
            <div className={amountClassName}>{this.state.cart.amount}</div>
          </Navbar>
        </Navbar>
      </Navbar>
    );
  }
}

Header.proptypes = {
  cart: PropTypes.shape({
    isAdd: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    product: PropTypes.array.isRequired
  }).isRequired
}

export default Header;