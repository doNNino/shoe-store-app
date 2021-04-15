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

// import actions
import { addProductToCart } from "../../redux/actions/appActions.js";

// Custom styles for the component
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    minWidth: 270,
    textAlign: "center",
    boxShadow: "0px 1px 20px 0px #476d96",
  },
  media: {
    height: 140,
    backgroundSize: "270px 250px",
  },
  gridStyle: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "30px !important",
  },
  cardContentStyle: {
    maxWidth: "320px",
    minHeight: "180px",
  },
  typographyNameStyle: {
    minHeight: 64,
    fontSize: "1.25rem",
    fontWeight: 800,
  },
  typographyPriceStyle: {
    fontSize: "1.10rem",
    fontWeight: 800,
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
  const { Brand, ImgSrc, Name, Price } = props.itemDetails;
  // redux state props and functions
  const { addProductToCart } = props;
  /**
   * function called upon clicking Add To Cart button
   */
  const addToCart = async () => {
    await addProductToCart(props.itemDetails);
  };

  return (
    <Grid item lg={3} md={4} sm={6} xs={12} className={classes.gridStyle}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={`${process.env.PUBLIC_URL}assets/${ImgSrc}.jpg`}
            title={Name}
          />
          <CardContent className={classes.cardContentStyle}>
            <Typography
              gutterBottom
              variant="body1"
              component="p"
              className={classes.typographyNameStyle}
            >
              {Name}
            </Typography>
            <div>
              <Typography variant="body2" color="textSecondary" component="p">
                Brand : {Brand}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Name : {Name}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.typographyPriceStyle}
              >
                Price:{" "}
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "RSD",
                }).format(Price)}
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
  return {};
};
// redux action functions object
const mapDispatchToProps = { addProductToCart };
// default export of the app connected with redux
export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
