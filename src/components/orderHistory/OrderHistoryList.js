import React, { useState } from "react";
// MaterialUI components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  listItemStyle: {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  listProductStyle: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
  },
}));

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
    <List className={classes.root}>
      <ListItem>
        <div className={classes.listItemStyle}>
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
            {totalPrice}
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
        {selectedProducts.map((item, index) => (
          <ListItem key={index}>
            <div className={classes.listProductStyle} key={index}>
              <p>{index + 1}.</p>
              <p>
                <strong>Name: </strong>
                {item.Name}
              </p>
              <p>
                <strong>Price: </strong>
                {item.Price}
              </p>
            </div>
          </ListItem>
        ))}
      </div>
    </List>
  );
}
