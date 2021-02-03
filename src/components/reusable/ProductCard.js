import React from "react";
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

// Custom styles for the component
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    textAlign: "center",
    boxShadow: "0px 1px 20px 0px #476d96",
  },
  media: {
    height: 140,
  },
  gridStyle: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "30px !important",
  },
  cardActionButtonStyle: {
    display: "flex",
    justifyContent: "center",
  },
}));
// start of the component
export default function ProductCard() {
  const classes = useStyles();

  return (
    <Grid item lg={4} md={6} sm={12} xs={12} className={classes.gridStyle}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={null}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Lizard
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActionButtonStyle}>
          <Button size="small" color="primary">
            Add to cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
