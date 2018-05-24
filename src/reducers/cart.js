import * as constants from '../constants';
import _ from 'lodash';

const initialState = {
  products: [],
  amount: 0,
  message: null,
  isAdd: false
}

export default function cart(state = initialState, action) {
  let products =  state.products
  let amount = state.amount;
  let filterProduct = {};
  let rejectProduct = {};
  switch (action.type) {
    case constants.ADD_CART:
      amount++;
      filterProduct = _.filter(products, {
        productID: action.product.productID
      });
      if (filterProduct.length > 0) {
        filterProduct.amount++;
        _.assign({}, products, filterProduct);
      } else {
        action.product.amount = 1;
        products.push(action.product);
      }
      return {
        products: products,
        amount: amount,
        message: null,
        isAdd: true
      }
    case constants.CHANGE_QUANTITY:
      filterProduct = _.filter(products, {
        productID: action.product.productID
      });
      amount = amount - filterProduct[0].amount + action.quantity;
      filterProduct[0].amount = action.quantity;
      _.assign({}, products, filterProduct);
      return {
        products: products,
        amount: amount,
        message: null,
        isAdd: true
      }
    case constants.REMOVE_PRODUCT:
      rejectProduct = _.reject(products, {
        productID: action.product.productID
      });
      filterProduct = _.filter(products, {
        productID: action.product.productID
      });
      amount = amount - filterProduct[0].amount
      return {
        products: rejectProduct,
        amount: amount,
        message: null,
        isAdd: true
      }
    case constants.INVALID_PRODUCT:
      return {
        products: products,
        amount: amount,
        message: 'Product not found',
        isAdd: false
      }
    default:
      return {
        products: products,
        amount: amount,
        message: null,
        isAdd: false
      }
  }
}