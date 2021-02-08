import React from "react";
// MaterialUI components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
// materialUI icons imports
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

import picture2 from "../../assets/AV6243-400_350_350px.webp";

// custom styles for the component
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  containerStyle: {
    display: "flex",
    flexDirection: "column",
    minHeight: "200px",
    marginTop: "20px",
    borderBottom: "1px solid black",
    justifyContent: "space-between",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  },
  priceDivStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    [theme.breakpoints.up("lg")]: {
      textAlign: "start",
    },
  },
  quantityTypographyStyle: {
    display: "flex",
    alignItems: "center",
  },
  quantityDivStyle: {
    display: "flex",
    justifyContent: "space-evenly",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  iconButtonStyle: {
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
  imageDivStyle: {
    minWidth: "230px",
    minHeight: "200px",
    backgroundSize: "270px 200px",
    background: ` url(${picture2}) no-repeat center`,
  },
}));

export default function CheckoutProductCard(props) {
  const classes = useStyles();
  const { Brand, _id, ImgSrc, Name, Price } = props.itemDetails;
  return (
    <Grid className={`w-100 ${classes.containerStyle}`}>
      <Grid item className={classes.imageDivStyle} xl={5} sm={12}></Grid>
      <Grid item className={classes.priceDivStyle} xl={4} sm={12}>
        <Typography variant="body2" color="textSecondary" component="p">
          Brand : {Brand}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Name : {Name}
        </Typography>
        <Typography variant="h6" color="textSecondary" component="h6">
          Price : {Price} $
        </Typography>
      </Grid>
      <Grid item className={classes.quantityDivStyle} xl={3} sm={12}>
        <Typography
          variant="h6"
          color="textSecondary"
          component="h6"
          className={classes.quantityTypographyStyle}
        >
          Quantity : 1
        </Typography>
        <div className={classes.quantityTypographyStyle}>
          <IconButton
            aria-label="increase-quantity"
            size="medium"
            className={classes.iconButtonStyle}
            disabled
          >
            <ArrowUpwardIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="decrease-quantity"
            size="medium"
            className={classes.iconButtonStyle}
            disabled
          >
            <ArrowDownwardIcon fontSize="inherit" />
          </IconButton>
        </div>
      </Grid>
    </Grid>
  );
}
