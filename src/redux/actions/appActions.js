// import types
import {
  FETCH_PRODUCTS,
  SELECTED_PRODUCTS,
  TOTAL_PRICE_OF_PRODUCTS,
  ORDER_HISTORY,
  CLEAR_ORDER_HISTORY,
  CLEAR_GLOBAL_STATE,
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
// funciton that sets the order History after completed purchase
export const orderHistorySet = (data) => ({
  type: ORDER_HISTORY,
  payload: data,
});
// function that reset order History array in redux store
export const clearOrderHistory = () => ({
  type: CLEAR_ORDER_HISTORY,
});
// function that reset redux state except order history and fetched products
export const clearGlobalState = () => ({
  type: CLEAR_GLOBAL_STATE,
});

// function that fetch all the products from the backend
export const fetchAllProducts = () => async (dispatch, getState) => {
  try {
    // send get request to fetch products
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/v1/products`
    );
    const products = response.data.data;
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
    let selectedProductsIds = selectedProducts.map((item) => item._id);
    // adding product to the selected products if its not already added(by checking if Id is not in the array of selected products Ids)
    if (!selectedProductsIds.includes(product._id)) {
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
      newTotalPrice += product.Price;
    }
    // dispatch the newly calculated total price of selected products to the redux store
    await dispatch(totalPriceOfProductsSet(newTotalPrice));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// function that is called on order completion
export const completeOrder = (userInfo, history) => async (
  dispatch,
  getState
) => {
  // redux props
  const selectedProducts = getState().appReducer.selectedProducts;
  const totalPrice = getState().appReducer.totalPriceOfProducts;
  const orderHistory = getState().appReducer.orderHistory;
  // getting the date of the order
  const date = new Date();
  const orderDate =
    date.getDate() + "/" + date.getMonth() + 1 + "/" + date.getFullYear();
  // new order to be saved in order history
  const newOrder = {
    userInfo,
    selectedProducts,
    totalPrice,
    orderDate,
  };
  // new history array to be updated and dispatched
  const newHistory = [...orderHistory, newOrder];
  // save newly updated Order history in redux orderHistory and clear global state
  await dispatch(orderHistorySet(newHistory));
  await dispatch(clearGlobalState());
  history.push("/order-history");
};
