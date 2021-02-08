import React from "react";
// redux import
import { connect } from "react-redux";
// MaterialUI components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
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
  noProductsDivStyle: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    minHeight: "80vh",
  },
  iconSize: {
    fontSize: "100px",
    width: "100%",
  },
  textSize: {
    fontSize: "30px",
  },
}));
// start of the component
function Checkout(props) {
  const classes = useStyles();
  // redux state props
  const { selectedProducts } = props;
  // boolian that shows wich page we should render
  const showPageWithProducts = selectedProducts.length > 0;
  return (
    <div className="w-100">
      <NavBar />
      {showPageWithProducts ? (
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
                <CheckoutProductCard itemDetails={item} key={item._id} />
              ))}
              <Grid item className="w-100">
                <CheckoutAndPay history={props.history} />
              </Grid>
            </Grid>
          </Container>
        </div>
      ) : (
        // render page without products
        <div className={classes.noProductsDivStyle}>
          <p className={classes.textSize}>
            Shoping Cart is empty, please select some of the products
          </p>
          <RemoveShoppingCartIcon className={classes.iconSize} />
        </div>
      )}
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
