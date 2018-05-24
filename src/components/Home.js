import React from 'react';
import * as productActions from '../actions/product';
import * as cartActions from '../actions/cart';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  Grid,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import Header from './Header';
import '../index.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
      cart: this.props.cart
    };
  }

  onClickAddCart(product) {
    this.props.cartActions.add(product);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.product.isApi) {
      this.setState({
        product: nextProps.product
      });
    } else if (nextProps.cart.isAdd) {
      this.setState({
        cart: nextProps.cart
      });
    }
  }

  componentDidMount() {
    this.props.productActions.search();
  }

  render() {
    let products = null;
    if (this.state.product.products.length > 0) {
      products = this.state.product.products.map((product) => {
        let cartClassName = '';
        if (product.unitsInStock > 0) {
          cartClassName = 'sell';
        } else {
          cartClassName = 'sold_out';
        }
        return (
          <Col xs={12} md={4} key={product.productID}>
            <div className={"item"}>
              <div className={"avatar"}><img src={product.image} alt="" /></div>
              <div className={"title-header"}>
                <h3>{product.name}</h3>
              </div>
              <div className={cartClassName}>
                <Button className="btn-add" title='add' onClick={() => this.onClickAddCart(product)}>+</Button>
                <div>Sold out</div>
              </div>
            </div>
          </Col>
        );
      });
    }
    return (
      <div>
        <Header cart={this.state.cart}/>
        <Grid>
          <Row>
            {products}
          </Row>
        </Grid>
      </div>
    );
  }
}

Home.proptypes = {
  productActions: PropTypes.shape({
    search: PropTypes.func.isRequired
  }).isRequired,
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
    productActions: bindActionCreators({
      ...productActions
    }, dispatch),
    cartActions: bindActionCreators({
      ...cartActions
    }, dispatch)
  };
  return dispatchProps;
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
