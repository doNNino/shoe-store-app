// import types
import {
  FETCH_PRODUCTS,
  SELECTED_PRODUCTS,
  TOTAL_PRICE_OF_PRODUCTS,
} from "../Types";

// other imports
import axios from "axios";

// redux actions file

// function that sets new array which contains fetched products
export const fetchAllProductsSet = (data) => ({
  type: FETCH_PRODUCTS,
  payload: data,
});

// function that sets new array with added product to the reducer state
export const addProductToCartSet = (data) => ({
  type: SELECTED_PRODUCTS,
  payload: data,
});
// funciton that sets the total price value of selected products(products added to the cart)
export const totalPriceOfProductsSet = (data) => ({
  type: TOTAL_PRICE_OF_PRODUCTS,
  payload: data,
});

// function that fetch all the products from the backend
export const fetchAllProducts = () => async (dispatch, getState) => {
  try {
    // send get request to fetch products
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/v1/products`
    );
    const { products } = response.data.data;
    // dispatch fetched products to the redux store
    await dispatch(fetchAllProductsSet(products));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// funciton that adds new product into the cart (into the existing products array saved in reducer state)
export const addProductToCart = (product) => async (dispatch, getState) => {
  try {
    // array of already selected products
    let selectedProducts = [...getState().appReducer.selectedProducts];
    // array of Ids of selected products
    let selectedProductsIds = selectedProducts.map((item) => item.productId);
    // adding product to the selected products if its not already added(by checking if Id is not in the array of selected products Ids)
    if (!selectedProductsIds.includes(product.productId)) {
      // pushing new product in the array of selected products
      await selectedProducts.push(product);
      // dispatching function to set new array of selected products
      await dispatch(addProductToCartSet(selectedProducts));
      await dispatch(totalPriceOfProducts());
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// function that calculates the total price of the selected products
export const totalPriceOfProducts = () => async (dispatch, getState) => {
  try {
    const selectedProducts = getState().appReducer.selectedProducts;
    let newTotalPrice = 0;
    for (const product of selectedProducts) {
      newTotalPrice += product.productPrice;
    }
    // dispatch the newly calculated total price of selected products to the redux store
    await dispatch(totalPriceOfProductsSet(newTotalPrice));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
