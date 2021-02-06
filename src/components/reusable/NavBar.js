import React, { useState } from "react";
// react router NavLink import
import { NavLink } from "react-router-dom";
// redux import
import { connect } from "react-redux";
// custom style functions from materialUI import
import { makeStyles, withStyles } from "@material-ui/core/styles";
// materialUI components imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
// materialUI icons imports
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import OrderHistoryIcon from "@material-ui/icons/Receipt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

// custom styles for the component pieces
// here we specify display value for desktop and mobile breakpoints(before md it shows desktop navbar section and bellow md breakpoint we have 'hamburger')
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBarStyle: {
    borderBottom: "5px solid #394959",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
      position: "fixed",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      width: "100%",
      justifyContent: "center",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  navLink: {
    color: "#fff",
    margin: "0px 20px",
    "&:hover": {
      color: "#ff94ba",
      textDecoration: "none",
    },
  },
  mobileNavLink: {
    width: "100%",
    "&:hover": {
      textDecoration: "none",
    },
  },
}));

// styled menu that is shown on smaller screen devices
const StyledMenu = withStyles({
  paper: {
    width: "100%",
    border: "1px solid #d3d4d5",
    position: "fixed",
    top: "0 !important",
    left: "0 !important",
    maxWidth: "100%",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));
// start of the component
function NavBar(props) {
  const classes = useStyles();
  // state value and set function for showing mobile navbar('hamburger)
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);
  // value that shows is the mobile menu open
  const isMobileMenuOpen = Boolean(mobileAnchorEl);
  // function for closing mobile menu
  const handleMobileMenuClose = () => {
    setMobileAnchorEl(null);
  };
  // function for opening mobile menu
  const handleMobileMenuOpen = (event) => {
    setMobileAnchorEl(event.currentTarget);
  };
  // mobile menu Id value for connecting button('hamburger') with the menu
  const mobileMenuId = "mobile-menu";
  // destructured redux state props
  const { selectedProducts } = props;
  // app used variables
  const selectedProductsCount = selectedProducts.length;
  // styled mobile menu
  const renderMobileMenu = (
    <StyledMenu
      anchorEl={mobileAnchorEl}
      id={mobileMenuId}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <NavLink to="/Home" className={classes.mobileNavLink}>
          <IconButton aria-label="home" color="inherit">
            <HomeIcon />
          </IconButton>
          Home
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="/checkout" className={classes.mobileNavLink}>
          <IconButton aria-label="checkout" color="inherit">
            <Badge badgeContent={selectedProductsCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          Checkout
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="/order-history" className={classes.mobileNavLink}>
          <IconButton aria-label="order-history" color="inherit">
            <OrderHistoryIcon />
          </IconButton>
          Order History
        </NavLink>
      </MenuItem>
    </StyledMenu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBarStyle}>
        <Toolbar>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
          <Typography className={classes.title} variant="h6" noWrap>
            Shoe-store-app
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <NavLink to="/Home" className={classes.navLink}>
              <IconButton aria-label="home" color="inherit">
                <HomeIcon />
              </IconButton>
              Home
            </NavLink>
            <NavLink to="/checkout" className={classes.navLink}>
              <IconButton aria-label="checkout" color="inherit">
                <Badge badgeContent={selectedProductsCount} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              Checkout
            </NavLink>
            <NavLink to="/order-history" className={classes.navLink}>
              <IconButton aria-label="order-history" color="inherit">
                <OrderHistoryIcon />
              </IconButton>
              Order History
            </NavLink>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}
// redux state prop function
const mapStateToProps = (state /* , ownProps*/) => {
  return {
    selectedProducts: state.appReducer.selectedProducts,
  };
};
// redux actions function object
const mapDispatchToProps = {};

// default export of the component with redux connect

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
