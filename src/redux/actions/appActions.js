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

/**
 * function that sets new array which contains fetched products
 * @param {array} data- fetched array of data
 */
export const fetchAllProductsSet = (data) => ({
  type: FETCH_PRODUCTS,
  payload: data,
});
/**
 * function that sets new array with added product to the reducer state
 * @param {array} data - new array with added product
 */
export const selectedProductsSet = (data) => ({
  type: SELECTED_PRODUCTS,
  payload: data,
});
/**
 * funciton that sets the total price value of selected products(products added to the cart)
 * @param {Number} data - total price value
 */
export const totalPriceOfProductsSet = (data) => ({
  type: TOTAL_PRICE_OF_PRODUCTS,
  payload: data,
});
/**
 * funciton that sets the order History after completed purchase
 * @param {array} data - array with order history objects
 */
export const orderHistorySet = (data) => ({
  type: ORDER_HISTORY,
  payload: data,
});
/**
 * function that reset order History array in redux store
 */
export const clearOrderHistory = () => ({
  type: CLEAR_ORDER_HISTORY,
});
/**
 * function that reset redux state except order history and fetched products
 */
export const clearGlobalState = () => ({
  type: CLEAR_GLOBAL_STATE,
});
/**
 * function that fetch all the products from the backend
 */
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
/**
 * funciton that adds new product into the cart (into the existing products array saved in reducer state)
 * @param {Object} product - newly added product object
 */
export const addProductToCart = (product) => async (dispatch, getState) => {
  try {
    // array of already selected products
    let selectedProducts = [...getState().appReducer.selectedProducts];
    // array of Ids of selected products
    let selectedProductsIds = selectedProducts.map((item) => item._id);
    // adding product to the selected products if its not already added(by checking if Id is not in the array of selected products Ids)
    if (!selectedProductsIds.includes(product._id)) {
      // add the quantity property for the selected product
      product.Quantity = 1;
      // pushing new product in the array of selected products
      await selectedProducts.push(product);
      // dispatching function to set new array of selected products
      await dispatch(selectedProductsSet(selectedProducts));
      await dispatch(totalPriceOfProducts());
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
/**
 * function that changes the quantity of the product with given parameters
 * @param {*} itemId - Id of the product for which we are changing quantity
 * @param {*} actionType - type of the action, it can be: 'add' to increment quantity or 'remove' to decrement quantity(if quantity reaches 0 selected product is removed(deselected))
 * @returns
 */
export const changeQuantity = (productId, actionType, history) => async (
  dispatch,
  getState
) => {
  // selected products array
  const selectedProducts = [...getState().appReducer.selectedProducts];
  // selected product(item)
  const selectedProduct = selectedProducts.filter(
    (item) => item._id === productId
  )[0];
  // Index of selected product(item)
  const indexOfselectedProduct = selectedProducts.indexOf(selectedProduct);
  // Depending of the action type we are either incrementing or decrementing quantity
  switch (actionType) {
    case "add": {
      selectedProduct.Quantity = selectedProduct.Quantity + 1;
      break;
    }
    case "remove": {
      // if quantity reaches 0, product is removed(deselected)
      selectedProduct.Quantity === 1
        ? selectedProducts.splice(indexOfselectedProduct, 1)
        : (selectedProduct.Quantity = selectedProduct.Quantity - 1);
      break;
    }
    default:
  }
  // dispatch new selected products(with new Quantity values)
  await dispatch(selectedProductsSet(selectedProducts));
  // check if all products are unselected(in that case navigate back to homepage)
  if (actionType === "remove" && selectedProducts.length === 0) {
    history.push("/home");
  }
  // Recalculate the total price for products
  await dispatch(totalPriceOfProducts());
};
/**
 * function that calculates the total price of the selected products
 */
export const totalPriceOfProducts = () => async (dispatch, getState) => {
  try {
    const selectedProducts = getState().appReducer.selectedProducts;
    let newTotalPrice = 0;
    for (const product of selectedProducts) {
      newTotalPrice += product.Price * product.Quantity;
    }
    // dispatch the newly calculated total price of selected products to the redux store
    await dispatch(totalPriceOfProductsSet(newTotalPrice));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
/**
 * function that is called on order completion
 * @param {Object} userInfo - object that contains userInfo
 * @param {Object} history - history object
 */
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
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
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
