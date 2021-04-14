import React, { useState } from "react";
// MaterialUI components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Switch from "@material-ui/core/Switch";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  listItemStyle: {
    boxShadow: "0px 0px 5px 0px #476d96",
    marginBottom: "20px",
    borderRadius: "5px",
  },
  listItemInfoStyle: {
    display: "flex",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
    "& p": {
      width: "30%",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
  },
}));
// main function starts here
export default function SwitchListSecondary(props) {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  // item details destructuring
  const {
    userInfo,
    selectedProducts,
    totalPrice,
    orderDate,
  } = props.orderDetails;
  const { id } = props;
  const { Name } = userInfo;
  return (
    <List className={(classes.root, classes.listItemStyle)}>
      <ListItem>
        <div className={classes.listItemInfoStyle}>
          <p className="m-0">
            <strong>Name: </strong>
            {Name}
          </p>
          <p className="m-0">
            <strong>Order Date: </strong>
            {orderDate}
          </p>
          <p className="m-0">
            <strong>Total Price: </strong>
            {new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "RSD",
            }).format(totalPrice)}
          </p>
        </div>
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={handleToggle(id)}
            checked={checked.indexOf(id) !== -1}
            inputProps={{ "aria-labelledby": "switch-list-label" }}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <div
        style={
          checked.indexOf(id) !== -1
            ? { display: "flex", flexDirection: "column" }
            : { display: "none" }
        }
      >
        <Divider light={true} variant="middle" />
        {selectedProducts.map((item, index) => (
          <ListItem key={index}>
            <div className={classes.listItemInfoStyle} key={index}>
              <span>{index + 1}.</span>
              <p>
                <strong>Name: </strong>
                {item.Name}
              </p>
              <p>
                <strong>Quantity: </strong>
                {item.Quantity}
              </p>
              <p>
                <strong>Price: </strong>
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "RSD",
                }).format(item.Price)}
              </p>
            </div>
          </ListItem>
        ))}
      </div>
    </List>
  );
}
