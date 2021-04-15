import React from "react";
// redux connect import
import { connect } from "react-redux";
// react router useHistory hook import
import { useHistory } from "react-router-dom";
// MaterialUI components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
// materialUI icons imports
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
// redux actions imports
import { changeQuantity } from "../../redux/actions/appActions";

// custom styles for the component
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  containerStyle: {
    display: "flex",
    flexDirection: "column",
    minHeight: "150px",
    marginTop: "20px",
    justifyContent: "space-evenly",
    [theme.breakpoints.up("xs")]: {
      flexDirection: "row",
    },
  },
  priceTypographyStyle: {
    fontWeight: 800,
  },
  priceDivStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "start",
    height: "150px",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      height: "100px",
    },
  },
  quantityTypographyStyle: {
    display: "flex",
    alignItems: "center",
    fontSize: "1rem",
  },
  quantityDivStyle: {
    display: "flex",
    justifyContent: "space-evenly",
    height: "150px",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      height: "100px",
      alignItems: "center",
    },
  },
  iconButtonStyle: {
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
  imageDivStyle: {
    width: "150px",
    height: "150px",
    backgroundSize: "150px 150px !important",
    [theme.breakpoints.down("xs")]: {
      width: "220px",
      height: "200px",
      backgroundSize: "220px 200px !important",
    },
  },
}));
// main function start here
function CheckoutProductCard(props) {
  const classes = useStyles();
  // redux actions props
  const { changeQuantity } = props;
  // redux store props
  const { Quantity } = props;
  // item details
  const { Brand, _id, ImgSrc, Name, Price } = props.itemDetails;
  // history hook
  let history = useHistory();
  return (
    <Grid container className={`w-100 divider ${classes.containerStyle}`}>
      <Grid
        item
        className={classes.imageDivStyle}
        sm={4}
        xs={12}
        style={{
          background: `url(${process.env.PUBLIC_URL}assets/${ImgSrc}.jpg) no-repeat center`,
        }}
      ></Grid>
      <Grid item className={classes.priceDivStyle} sm={4} xs={12}>
        <Typography variant="body2" color="textSecondary" component="p">
          Brand : {Brand}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Name : {Name}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          component="p"
          className={classes.priceTypographyStyle}
        >
          Price:{" "}
          {new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "RSD",
          }).format(Price)}
        </Typography>
      </Grid>
      <Grid item className={classes.quantityDivStyle} sm={4} xs={12}>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.quantityTypographyStyle}
        >
          Quantity : {Quantity}
        </Typography>
        <div className={classes.quantityTypographyStyle}>
          <IconButton
            aria-label="increase-quantity"
            size="medium"
            className={classes.iconButtonStyle}
            onClick={() => changeQuantity(_id, "add")}
          >
            <ArrowUpwardIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="decrease-quantity"
            size="medium"
            className={classes.iconButtonStyle}
            onClick={() => changeQuantity(_id, "remove", history)}
          >
            <ArrowDownwardIcon fontSize="inherit" />
          </IconButton>
        </div>
      </Grid>
    </Grid>
  );
}
// redux state prop function
const mapStateToProps = (state /* , ownProps*/) => {
  return {};
};
// redux actions function object
const mapDispatchToProps = { changeQuantity };

// default export of the component with redux connect

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutProductCard);
