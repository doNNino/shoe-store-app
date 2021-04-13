import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
}));

export default function BasicPagination(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Pagination
        count={props.count}
        color="primary"
        page={props.page}
        onChange={(event, changePage) => props.paginate(changePage)}
      />
    </div>
  );
}
