import React from "react";
// redux import
import { connect } from "react-redux";
// history hook import
import { useHistory } from "react-router-dom";
// MaterialUI components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import { makeStyles } from "@material-ui/core/styles";
// custom components import
import NavBar from "../reusable/NavBar";
import OrderHistoryList from "./OrderHistoryList";
// redux actions imports
import { clearOrderHistory } from "../../redux/actions/appActions";

// custom styles for the component
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  gridStyle: {
    padding: "25px",
  },
  noOrderHistoryDivStyle: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    minHeight: "80vh",
  },
  iconSize: {
    fontSize: "100px",
    width: "100%",
  },
  textSize: {
    fontSize: "30px",
  },
}));
// start of the component
function OrderHistory(props) {
  const classes = useStyles();
  // global state props
  const { orderHistory } = props;
  // redux actions
  const { clearOrderHistory } = props;
  // history hook
  let history = useHistory();
  // boolian that shows which page should be rendered
  const showPageWithOrderHistory = orderHistory.length > 0;

  // function that calls clearOrderHistory and redirects to homepage
  const clearHistory = async () => {
    await clearOrderHistory();
    history.push("/home");
  };

  return (
    <div className="w-100 h-100">
      <NavBar />
      {showPageWithOrderHistory ? (
        <div className={classes.root}>
          <Container>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              className={classes.gridStyle}
            >
              {orderHistory.map((item, index) => (
                <Grid item className="w-100" key={index}>
                  <OrderHistoryList
                    orderDetails={item}
                    id={index}
                    key={index}
                  />
                </Grid>
              ))}
              <Grid item className="w-100 text-center mt-5">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={clearHistory}
                >
                  Clear History
                </Button>
              </Grid>
            </Grid>
          </Container>
        </div>
      ) : (
        // render page without products
        <div className={classes.noOrderHistoryDivStyle}>
          <p className={classes.textSize}>Order History is empty</p>
          <NotInterestedIcon className={classes.iconSize} />
        </div>
      )}
    </div>
  );
}

// redux state props function
const mapStateToProps = (state /* , ownProps*/) => {
  return {
    orderHistory: state.appReducer.orderHistory,
  };
};
// redux action functions object
const mapDispatchToProps = { clearOrderHistory };
// default export of the app connected with redux
export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
