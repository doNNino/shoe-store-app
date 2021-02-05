import React from "react";
// redux import
import { connect } from "react-redux";
// MaterialUI imports
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import picture2 from "../../AV6243-400_350_350px.webp";

// import actions
import { addProductToCart } from "../../redux/actions/appActions.js";

// Custom styles for the component
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    minWidth: 320,
    textAlign: "center",
    boxShadow: "0px 1px 20px 0px #476d96",
  },
  media: {
    height: 140,
    backgroundSize: "316px 250px",
  },
  gridStyle: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "30px !important",
  },
  cardActionButtonContainerStyle: {
    display: "flex",
    justifyContent: "center",
  },
  cardActionButtonStyle: {
    width: "100%",
    background: "rgb(218 192 192 / 50%)",
  },
}));
// start of the component
function ProductCard(props) {
  const classes = useStyles();
  const {
    productBrand,
    productId,
    productImg,
    productName,
    productPrice,
  } = props.itemDetails;
  // redux state props and functions
  const { selectedProducts, addProductToCart } = props;

  const addToCart = async () => {
    await addProductToCart(props.itemDetails);
  };

  return (
    <Grid item lg={4} md={6} sm={12} xs={12} className={classes.gridStyle}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={picture2}
            title={productName}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {productName}
            </Typography>
            <div>
              <Typography variant="body2" color="textSecondary" component="p">
                Brand : {productBrand}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Name : {productName}
              </Typography>
              <Typography variant="h6" color="textSecondary" component="h6">
                Price : {productPrice} $
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActionButtonContainerStyle}>
          <Button
            size="small"
            color="primary"
            className={classes.cardActionButtonStyle}
            onClick={addToCart}
          >
            Add to cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
// redux state props function
const mapStateToProps = (state /* , ownProps*/) => {
  return {
    selectedProducts: state.appReducer.selectedProducts,
  };
};
// redux action functions object
const mapDispatchToProps = { addProductToCart };
// default export of the app connected with redux
export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);