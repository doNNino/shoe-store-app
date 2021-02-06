import React from "react";
// redux import
import { connect } from "react-redux";
// MaterialUI components
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

// custom styles for the component
const useStyles = makeStyles((theme) => ({
  divStyle: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    width: "100%",
    marginTop: "25px",
  },
}));

function CheckoutAndPay(props) {
  const classes = useStyles();
  // redux state props
  const { totalPriceOfProducts } = props;
  return (
    <div className={classes.divStyle}>
      <div>
        <Typography variant="h5" color="textSecondary" component="h6">
          Total Price : {totalPriceOfProducts} $
        </Typography>
      </div>
      <div>
        <button
          onClick={() => console.log("PAY UP")}
          className="btn btn-primary mt-3"
        >
          Checkout & Pay
        </button>
      </div>
    </div>
  );
}
// redux state props function
const mapStateToProps = (state /* , ownProps*/) => {
  return {
    totalPriceOfProducts: state.appReducer.totalPriceOfProducts,
  };
};
// redux action functions object
const mapDispatchToProps = {};
// default export of the app connected with redux
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutAndPay);
