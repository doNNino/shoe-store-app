import React from "react";
// MaterialUI components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import picture2 from "../../AV6243-400_350_350px.webp";

// custom styles for the component
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  containerStyle: {
    display: "flex",
    flexDirection: "column",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    minHeight: "200px",
    marginTop: "20px",
    justifyContent: "space-between",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
  },
  priceDivStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  imageDivStyle: {
    minWidth: "270px",
    minHeight: "200px",
    backgroundSize: "270px 200px",
    background: ` url(${picture2}) no-repeat`,
  },
}));

export default function CheckoutProductCard(props) {
  const classes = useStyles();
  const {
    productBrand,
    productId,
    productImg,
    productName,
    productPrice,
  } = props.itemDetails;
  return (
    <Grid className={`w-100 ${classes.containerStyle}`}>
      <Grid item className={classes.imageDivStyle} xl={5} sm={12}></Grid>
      <Grid item className={classes.priceDivStyle} xl={5} sm={12}>
        <Typography variant="body2" color="textSecondary" component="p">
          Brand : {productBrand}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Name : {productName}
        </Typography>
        <Typography variant="h6" color="textSecondary" component="h6">
          Price : {productPrice} $
        </Typography>
      </Grid>
      <Grid item className={classes.priceDivStyle} xl={2} sm={12}>
        <Typography variant="h6" color="textSecondary" component="h6">
          Count : 1
        </Typography>
      </Grid>
    </Grid>
  );
}
