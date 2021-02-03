import React, { useState, useEffect } from "react";
// custom components
import NavBar from "../reusable/NavBar";
// MaterialUI components
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
}));
// start of the component
export default function Home() {
  useEffect(() => {
    console.log(productsObj.products);
  });
  const classes = useStyles();
  const { products } = productsObj;
  return (
    <div className="w-100 h-100">
      <NavBar />
      <div className={classes.root}>
        <Grid container>
          {products.map((item) => (
            <ProductCard item={item} />
          ))}
        </Grid>
      </div>
    </div>
  );
}
