import * as constants from '../constants';
import apiClient from '../utils/api';

export function search() {
  return (dispatch) => {
    apiClient().get('/products')
      .then((response) => {
        if (response.data) {
          dispatch({
            type: constants.SEARCH_PRODUCT,
            products: response.data.products
          });
        } else {
          dispatch({
            type: constants.PRODUCT_NOT_FOUND,
            products: response.data.products
          })
        }
      })
      .catch((response) => {
        dispatch({
          type: constants.CONNECTION_FAILD,
          products: response
        });
      });
  };
}