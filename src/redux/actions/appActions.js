// import types
import { SELECTED_PRODUCTS } from "../Types";

// redux actions file

// function that set new array with added product to the reducer state
export const addProductToCartSet = (data) => ({
  type: SELECTED_PRODUCTS,
  payload: data,
});

// funciton that adds new product into the cart (into the existing products array saved in reducer state)
export const addProductToCart = (product) => async (dispatch, getState) => {
  // array of already selected products
  let selectedProducts = [...getState().appReducer.selectedProducts];
  // pushing new product in the array of selected products
  selectedProducts.push(product);
  // dispatching function to set new array of selected products
  await dispatch(addProductToCartSet(selectedProducts));
};
