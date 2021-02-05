import React, { useState, useEffect } from "react";
// custom components
import NavBar from "../reusable/NavBar";
// MaterialUI components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ProductCard from "../reusable/ProductCard";
import { makeStyles } from "@material-ui/core/styles";
// JSON object with products inside
import productsObj from "../../products.json";

// custom styles for the component
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  gridStyle: {
    padding: "25px",
  },
}));
// start of the component
export default function Home() {
  const classes = useStyles();
  const { products } = productsObj;
  return (
    <div className="w-100 h-100">
      <NavBar />
      <div className={classes.root}>
        <Container>
          <Grid container className={classes.gridStyle}>
            {products.map((item) => (
              <ProductCard itemDetails={item} key={item.productId} />
            ))}
          </Grid>
        </Container>
      </div>
    </div>
  );
}
