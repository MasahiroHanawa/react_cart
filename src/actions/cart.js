import * as constants from '../constants';

export function add(product) {
  return (dispatch) => {
    if (product) {
      dispatch({
        type: constants.ADD_CART,
        product: product,
      });
    } else {
      dispatch({
        type: constants.INVALID_PRODUCT,
      });
    }
  };
}

export function change(quantity, product) {
  return (dispatch) => {
    if (product && quantity) {
      dispatch({
        type: constants.CHANGE_QUANTITY,
        product: product,
        quantity: quantity
      });
    } else {
      dispatch({
        type: constants.INVALID_QUANTITY,
      });
    }
  };
}

export function remove(product) {
  return (dispatch) => {
    if (product) {
      dispatch({
        type: constants.REMOVE_PRODUCT,
        product: product,
      });
    } else {
      dispatch({
        type: constants.INVALID_PRODUCT,
      });
    }
  };
}