import React from 'react';
import * as cartActions from '../actions/cart';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  Grid,
  Row,
  Col,
  Button,
  Navbar,
  FormControl,
  FormGroup
} from 'react-bootstrap';
import {
  BootstrapTable,
  TableHeaderColumn
} from 'react-bootstrap-table';
import Header from './Header';
import '../index.css';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
      cart: this.props.cart
    };
  }

  onClickRemoveProduct(product) {
    this.props.cartActions.remove(product);
  }

  onChangeQuantity(e, product) {
    this.props.cartActions.change(parseInt(e.target.value), product);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cart.isAdd) {
      this.setState({
        cart: nextProps.cart
      });
    }
  }

  render() {
    let carts = null;
    let totalPrice = 0;
    let total = 'loading';
    if (this.state.cart.amount > 0) {
      carts = this.state.cart.products.map((product) => {
        let quantity = []
        let options = (i) => {
          return <option value={i} key={product.productId + '_' + i}>{i}</option>;
        };
        for(let i = 1; i <= product.unitsInStock; i++) {
          quantity.push(i);
        }

        totalPrice = totalPrice + product.unitPrice;

        return (
          <Row key={product.productID}>
            <Col>
              <div className={"avatar"}><img src={product.image} alt="" /></div>
            </Col>
            <Col>
              <div>{product.name}</div>
              <div>Item left in stock:{product.unitsInStock}</div>
            </Col>
            <Col>
              <div>Price {product.unitPrice}$</div>
            </Col>
            <Col>
              <FormControl componentClass="select" placeholder="select" onChange={(e) => this.onChangeQuantity(e, product)} defaultValue={product.amount}>
                <option value="">select</option>
                {quantity.map(options)}
              </FormControl>
            </Col>
            <Col>
              <Button className="btn-remove" title='remove' onClick={() => this.onClickRemoveProduct(product)}>×</Button>
            </Col>
          </Row>
        );
      });
    }
    if (totalPrice > 0) {
      total = 'total_price'
    }

    return (
      <div>
        <Header cart={this.state.cart}/>
        <Navbar>
          <Navbar>
            <Navbar>
              Your Cart
            </Navbar>
          </Navbar>
        </Navbar>
        <FormGroup>
          <Grid>
            {carts}
            <Row className={total}>
              <Col>
              </Col>
              <Col>
              </Col>
              <Col>
              </Col>
              <Col>
                Total Price:{totalPrice}$
              </Col>
            </Row>
          </Grid>
        </FormGroup>
      </div>
    );
  }
}

Cart.proptypes = {
  cartActions: PropTypes.shape({
    add: PropTypes.func.isRequired
  }).isRequired,
  cart: PropTypes.shape({
    products: PropTypes.array.isRequired,
    amount: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    isAdd: PropTypes.bool.isRequired
  }).isRequired,
  product: PropTypes.shape({
    products: PropTypes.array.isRequired,
    message: PropTypes.string.isRequired,
    isApi: PropTypes.bool.isRequired
  }).isRequired,
}

const mapStateToProps = (state) => {
  const stateToProps = {
    product: {
      ...state.product
    },
    cart: {
      ...state.cart
    }
  };
  return stateToProps;
}

const mapDispatchToProps = (dispatch) => {
  const dispatchProps = {
    cartActions: bindActionCreators({
      ...cartActions
    }, dispatch)
  };
  return dispatchProps;
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart)
