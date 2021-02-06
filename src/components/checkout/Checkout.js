import React from "react";
// redux import
import { connect } from "react-redux";
// MaterialUI components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
// custom components import
import NavBar from "../reusable/NavBar";
import CheckoutProductCard from "./CheckoutProductCard";
import CheckoutAndPay from "./CheckoutAndPay";

// custom styles for the component
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  gridStyle: {
    padding: "25px",
  },
}));
// start of the component
function Checkout(props) {
  const classes = useStyles();
  const { selectedProducts } = props;
  return (
    <div className="w-100 h-100">
      <NavBar />
      <div className={classes.root}>
        <Container>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.gridStyle}
          >
            {selectedProducts.map((item) => (
              <CheckoutProductCard itemDetails={item} key={item.productId} />
            ))}
            <Grid item className="w-100">
              <CheckoutAndPay />
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

// redux state props function
const mapStateToProps = (state /* , ownProps*/) => {
  return {
    selectedProducts: state.appReducer.selectedProducts,
  };
};
// redux action functions object
const mapDispatchToProps = {};
// default export of the app connected with redux
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
