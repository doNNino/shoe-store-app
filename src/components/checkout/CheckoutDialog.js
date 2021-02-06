import React from "react";
// MaterialUI components
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

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

export default function CheckoutDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            type="text"
            className={classes.textFieldStyle}
          />
          <TextField
            autoFocus
            margin="dense"
            id="city"
            label="City"
            type="text"
            className={classes.textFieldStyle}
          />
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Address"
            type="text"
            className={classes.textFieldStyle}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            className={classes.textFieldStyle}
          />
          <TextField
            autoFocus
            margin="dense"
            id="telephone"
            label="Telephone"
            type="tel"
            className={classes.textFieldStyle}
          />
          <h6 style={{ textAlign: "start" }}>Credit Card Info:</h6>
          <TextField
            autoFocus
            margin="dense"
            id="card-holder-name"
            label="Cardholder Name"
            type="text"
            className={classes.textFieldStyle}
          />
          <TextField
            autoFocus
            margin="dense"
            id="card-number"
            label="Card Number"
            type="text"
            className={classes.textFieldStyle}
          />
          <TextField
            autoFocus
            margin="dense"
            id="card-expiration-date"
            label="Card Expiration Date"
            type="text"
            className={classes.textFieldStyle}
          />
        </DialogContent>
        <DialogActions className={classes.dialogActionStyle}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Pay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
