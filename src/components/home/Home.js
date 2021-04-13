import React from "react";
// redux import
import { connect } from "react-redux";
// custom components
import NavBar from "../reusable/NavBar";
// MaterialUI components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ProductCard from "../reusable/ProductCard";
import { makeStyles } from "@material-ui/core/styles";

// custom styles for the component
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));
// start of the component
function Home(props) {
  // redux store props destructuring
  const { allProducts } = props;
  // use custom styles
  const classes = useStyles();

  return (
    <div className="w-100 h-100">
      <NavBar />
      <div className={classes.root}>
        <Container maxWidth="xl">
          <Grid container>
            {allProducts.map((item) => (
              <ProductCard itemDetails={item} key={item._id} />
            ))}
          </Grid>
        </Container>
      </div>
    </div>
  );
}
// redux state props function
const mapStateToProps = (state /* , ownProps*/) => {
  return { allProducts: state.appReducer.allProducts };
};
// redux action functions object
const mapDispatchToProps = {};
// default export of the app connected with redux
export default connect(mapStateToProps, mapDispatchToProps)(Home);
