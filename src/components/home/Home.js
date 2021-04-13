import React, { useState, useEffect } from "react";
// redux import
import { connect } from "react-redux";
// custom components
import NavBar from "../reusable/NavBar";
import Pagination from "./Pagination";
// MaterialUI components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ProductCard from "../reusable/ProductCard";
import { makeStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";

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
  // width of the window prop(from material UI withWidth function)
  const { width } = props;
  // state props
  const [currentPage, setCurrentPage] = useState(1);
  const [ProductsPerPage, setProductsPerPage] = useState(8);
  // pagination props
  const indexOfLastProduct = currentPage * ProductsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - ProductsPerPage;
  const curentProducts = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const count = Math.ceil(allProducts.length / ProductsPerPage);
  // switch the products per page shown for pagination regarding of width of the container
  useEffect(() => {
    switch (width) {
      case "xl":
      case "lg":
      default:
        setProductsPerPage(8);
        break;
      case "md":
        setProductsPerPage(6);
        break;
      case "sm":
        setProductsPerPage(4);
        break;
    }
    setCurrentPage(1);
  }, [width]);

  // function called when pagination number is changed
  const paginate = (page) => setCurrentPage(page);
  // use custom styles
  const classes = useStyles();

  return (
    <div className="w-100 h-100">
      <NavBar />
      <div className={classes.root}>
        <Container maxWidth="xl">
          <Grid container>
            {curentProducts.map((item) => (
              <ProductCard itemDetails={item} key={item._id} />
            ))}
          </Grid>
          <Grid item className="w-100 p-0">
            <Pagination count={count} paginate={paginate} page={currentPage} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(Home));
