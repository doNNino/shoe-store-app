import React, { useState } from "react";
// redux import
import { connect } from "react-redux";
// MaterialUI components
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
// redux actions import
import { completeOrder } from "../../redux/actions/appActions";

// custom styles for the component
const useStyles = makeStyles((theme) => ({
  dialogStyle: {
    textAlign: "center",
  },
  dialogActionStyle: {
    justifyContent: "center",
  },
  textFieldStyle: {
    margin: "15px",
  },
}));
// main function starts here
function CheckoutDialog(props) {
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    Name: "",
    City: "",
    Address: "",
    Email: "",
    Telephone: "",
    CardName: "",
    CardNumber: "",
    CardExpDate: "",
  });

  // redux props destructured
  const { completeOrder } = props;
  // redux store props
  const { selectedProducts } = props;
  // custom styles
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePay = async () => {
    await completeOrder(userInfo, props.history);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Checkout & Pay
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        className={classes.dialogStyle}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Checkout & Pay Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To succesfully complete purchase, please fill this form
          </DialogContentText>
          <h6 style={{ textAlign: "start" }}>Personal Info:</h6>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name & Surname"
            name="Name"
            type="text"
            className={classes.textFieldStyle}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="city"
            label="City"
            name="City"
            type="text"
            className={classes.textFieldStyle}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Address"
            name="Address"
            type="text"
            className={classes.textFieldStyle}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            name="Email"
            type="email"
            className={classes.textFieldStyle}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="telephone"
            label="Telephone"
            name="Telephone"
            type="tel"
            className={classes.textFieldStyle}
            onChange={handleInputChange}
          />
          <h6 style={{ textAlign: "start" }}>Credit Card Info:</h6>
          <TextField
            autoFocus
            margin="dense"
            id="card-holder-name"
            label="Cardholder Name"
            name="CardName"
            type="text"
            className={classes.textFieldStyle}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="card-number"
            label="Card Number"
            name="CardNumber"
            type="text"
            className={classes.textFieldStyle}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="card-expiration-date"
            label="Card Expiration Date"
            name="CardExpDate"
            type="text"
            className={classes.textFieldStyle}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions className={classes.dialogActionStyle}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handlePay}
            color="primary"
            disabled={!selectedProducts.length}
          >
            Pay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
// redux state props function
const mapStateToProps = (state /* , ownProps*/) => {
  return { selectedProducts: state.appReducer.selectedProducts };
};
// redux action functions object
const mapDispatchToProps = { completeOrder };
// default export of the app connected with redux
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutDialog);
