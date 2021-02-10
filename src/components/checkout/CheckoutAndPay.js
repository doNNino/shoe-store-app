import React from "react";
// redux import
import { connect } from "react-redux";
// MaterialUI components
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
// Custom components
import CheckoutDialog from "./CheckoutDialog";

// custom styles for the component
const useStyles = makeStyles((theme) => ({
  divStyle: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    width: "100%",
    marginTop: "25px",
  },
  priceStyle: {
    fontSize: "1.25rem",
    fontWeight: 800,
  },
}));
// start of the component
function CheckoutAndPay(props) {
  const classes = useStyles();
  // redux state props
  const { totalPriceOfProducts } = props;
  return (
    <div className={classes.divStyle}>
      <div>
        <Typography
          variant="body1"
          color="textSecondary"
          component="p"
          className={classes.priceStyle}
        >
          Total Price : {totalPriceOfProducts} $
        </Typography>
      </div>
      <div className="mt-3">
        <CheckoutDialog history={props.history} />
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
