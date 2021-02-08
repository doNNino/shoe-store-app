// import types
import {
  FETCH_PRODUCTS,
  SELECTED_PRODUCTS,
  TOTAL_PRICE_OF_PRODUCTS,
} from "../Types";
// Define an initial state value for the app
const initialState = {
  allProducts: [],
  selectedProducts: [],
  totalPriceOfProducts: 0,
};
// appReducer function
export function appReducer(state = initialState, action) {
  // depending on the action type change state
  switch (action.type) {
    // all products fetched from backend
    case FETCH_PRODUCTS:
      return { ...state, allProducts: action.payload };
    // selected products added to the cart
    case SELECTED_PRODUCTS:
      return { ...state, selectedProducts: action.payload };
    // total price of selected products
    case TOTAL_PRICE_OF_PRODUCTS:
      return { ...state, totalPriceOfProducts: action.payload };
    default:
      // If the reducer doesn't care about this action type,
      // return the existing state unchanged
      return state;
  }
}
