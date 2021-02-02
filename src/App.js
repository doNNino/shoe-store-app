import React from "react";
// Main scss file import
import "./App.scss";
// redux import
import { connect } from "react-redux";
// react router
import { BrowserRouter as Router, Route } from "react-router-dom";
// custom component imports
import HomePage from "./components/home/Home";
import CheckoutPage from "./components/checkout/Checkout";
import OrderHistoryPage from "./components/orderHistory/OrderHistory";

function App(props) {
  // initial router for the app
  return (
    <Router>
      <Route exact path={["/home", "/"]} component={HomePage} />
      <Route exact path="/checkout" component={CheckoutPage} />
      <Route exact path="/order-history" component={OrderHistoryPage} />
    </Router>
  );
}
// redux state props function
const mapStateToProps = (state /* , ownProps*/) => {
  return {};
};
// redux action functions object
const mapDispatchToProps = {};
// default export of the app connected with redux
export default connect(mapStateToProps, mapDispatchToProps)(App);
