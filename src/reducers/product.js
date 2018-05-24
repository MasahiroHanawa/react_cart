import * as constants from '../constants';

const initialState = {
  products: [],
  message: null,
  isApi: false
}

export default function search(state = initialState, action) {
  switch (action.type) {
    case constants.SEARCH_PRODUCT:
      return {
        products: action.products,
        message: null,
        isApi: true
      }
    case constants.NOT_FOUND:
      return {
        products: [],
        message: 'Product not found',
        isApi: true
      }
    case constants.CONNECTION_FAILD:
      return {
        products: [],
        message: 'Internet connection failed',
        isApi: true
      }
    default:
      return {
        products: [],
        message: null,
        isApi: false
      }
  }
}
