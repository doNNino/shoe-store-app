import React, { useState } from "react";
// redux import
import { connect } from "react-redux";
// form validation import
import { useForm, Controller } from "react-hook-form";
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
  infoSubtitleStyle: {
    textAlign: "start",
    fontSize: "1rem",
    fontWeight: 500,
  },
}));
// main function starts here
function CheckoutDialog(props) {
  const [open, setOpen] = useState(false);

  // form validation functions destructuring
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
  /**
   * function called when pay button is clicked
   */
  const handlePay = async (data) => {
    await completeOrder(data, props.history);
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
          <p className={classes.infoSubtitleStyle}>Personal Info:</p>
          <Controller
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name & Surname"
                type="text"
                className={classes.textFieldStyle}
                error={errors.Name}
                helperText={errors.Name ? errors.Name.message : ""}
                {...field}
              />
            )}
            name="Name"
            rules={{
              required: "Please populate Name & Surname field to continue",
            }}
            defaultValue=""
            control={control}
          />
          <Controller
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                id="city"
                label="City"
                type="text"
                className={classes.textFieldStyle}
                error={errors.City}
                helperText={errors.City ? errors.City.message : ""}
                {...field}
              />
            )}
            name="City"
            rules={{ required: "Please populate City field to continue" }}
            defaultValue=""
            control={control}
          />
          <Controller
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                id="address"
                label="Address"
                type="text"
                className={classes.textFieldStyle}
                error={errors.Address}
                helperText={errors.Address ? errors.Address.message : ""}
                {...field}
              />
            )}
            name="Address"
            rules={{ required: "Please populate Address field to continue" }}
            defaultValue=""
            control={control}
          />
          <Controller
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                className={classes.textFieldStyle}
                error={errors.Email}
                helperText={errors.Email ? errors.Email.message : ""}
                {...field}
              />
            )}
            name="Email"
            rules={{
              required: "Please populate Email field to continue",
              pattern: {
                value: /^\S+@\S+$/,
                message: "Please enter regular Email",
              },
            }}
            defaultValue=""
            control={control}
          />
          <Controller
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                id="telephone"
                label="Telephone"
                type="tel"
                className={classes.textFieldStyle}
                error={errors.Telephone}
                helperText={errors.Telephone ? errors.Telephone.message : ""}
                {...field}
              />
            )}
            name="Telephone"
            rules={{
              required: "Please populate Telephone field to continue",
            }}
            defaultValue=""
            control={control}
          />
          <p className={classes.infoSubtitleStyle}>Credit Card Info:</p>
          <Controller
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                id="card-holder-name"
                label="Cardholder Name"
                type="text"
                className={classes.textFieldStyle}
                error={errors.CardName}
                helperText={errors.CardName ? errors.CardName.message : ""}
                {...field}
              />
            )}
            name="CardName"
            rules={{ required: "Please populate Card Name field to continue" }}
            defaultValue=""
            control={control}
          />
          <Controller
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                id="card-number"
                label="Card Number"
                type="text"
                className={classes.textFieldStyle}
                error={errors.CardNumber}
                helperText={errors.CardNumber ? errors.CardNumber.message : ""}
                {...field}
              />
            )}
            name="CardNumber"
            rules={{
              required: "Please populate Card Number field to continue",
            }}
            defaultValue=""
            control={control}
          />
          <Controller
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                id="card-expiration-date"
                label="Card Expiration Date"
                type="text"
                className={classes.textFieldStyle}
                error={errors.CardExpDate}
                helperText={
                  errors.CardExpDate ? errors.CardExpDate.message : ""
                }
                {...field}
              />
            )}
            name="CardExpDate"
            rules={{
              required:
                "Please populate Card Expiration Date field to continue",
            }}
            defaultValue=""
            control={control}
          />
        </DialogContent>
        <DialogActions className={classes.dialogActionStyle}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(handlePay)}
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
