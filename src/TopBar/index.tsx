import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  makeStyles,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Grid,
} from "@material-ui/core";
import styled from "styled-components";
import TranslateIcon from "@material-ui/icons/Translate";
import clsx from "clsx";
import injectWithObserver from "../utils/injectWithObserver";
import { getLang } from "../utils/storeSelector";
import whiteLogo from "../assets/Logo - white@2x.png";
import blueLogo from "../assets/Logo@2x.png";
import WhiteArrow from "../assets/Icon ionic-md-arrow-dropdown@2x.png";
import blueArrow from "../assets/Icon ionic-md-arrow-dropdown-darkblue@2x.png";
import Profile from "../assets/Profile - Nav bar@2x.png";
import SingaporeLogo from "../assets/icons8-singapore-48.png";
import { useNavigate } from "react-router-dom";
import LoginContainer from "../views/Login/Login";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBarTransparent: {
    // borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: "transparent",
    fontFamily: "Crimson Text",
    // right: "5%",
  },
  toolbar: {
    flexWrap: "wrap",
    padding: 0,
    margin: 0,
  },
  toolbarTitle: {
    flexGrow: 1,
    // marginRight: theme.spacing(3),
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  activeLang: {
    color: theme.palette.primary.main,
  },
  button: {
    fontFamily: "Crimson Text",
    fontSize: "20px",
    textTransform: "none",
    // margin: "20px",
  },
  iconButton: {
    fontFamily: "Crimson Text",
    fontSize: "20px",
    margin: "1%",
    marginLeft: "2%",
  },
}));

interface TopBarProps {
  appName: string;
  stores: any;
}

const TransparentTopBar = (props: any) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const key = window.location.search;
  const urlParams = new URLSearchParams(key);
  const url_code = urlParams.get("oobCode") || "";

  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(false);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    let user = localStorage.getItem("userName");
    if (user !== null) {
      setUser(true);
    }
  }, []);

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        color="primary"
        elevation={0}
        style={{
          backgroundColor:
            props.backgroundColor == "transparent" ? "transparent" : "#1C2460",
          padding: 0,
          height: "10%",
        }}
      >
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={10} style={{ padding: 0, margin: 0 }}>
            {/* <Container> */}
            <Toolbar className={classes.toolbar}>
              <Typography
                variant="h6"
                color="inherit"
                noWrap
                className={classes.toolbarTitle}
              >
                {props.color == "textBlue" ? (
                  <img src={blueLogo} alt="logo" style={{ width: "15%" }} />
                ) : (
                  <img src={whiteLogo} alt="logo" style={{ width: "15%" }} />
                )}
              </Typography>
              <Button
                className={classes.button}
                style={{
                  color: props.color == "textBlue" ? "#1C2460" : "#FFFFFF",
                }}
                color="inherit"
              >
                Explore
              </Button>
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={{
                  color: props.color == "textBlue" ? "#1C2460" : "#FFFFFF",
                }}
                className={classes.iconButton}
              >
                Help
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => navigate("/faq")}
                  property="ta"
                  style={{ color: "#1C2460", fontFamily: "Crimson Text" }}
                >
                  FAQ
                </MenuItem>
                <MenuItem
                  onClick={() => navigate("/contactUs")}
                  property="hi"
                  style={{ color: "#1C2460", fontFamily: "Crimson Text" }}
                >
                  Contact Us
                </MenuItem>
              </Menu>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                // onClick={handleClick}
                style={{
                  color: props.color == "textBlue" ? "#1C2460" : "#FFFFFF",
                }}
                className={classes.button}
              >
                <img
                  alt=""
                  style={{ padding: "2%", fontSize: "10px" }}
                  src={SingaporeLogo}
                />
                Singapore
                {props.color == "textBlue" ? (
                  <img style={{ padding: "2%" }} src={blueArrow} />
                ) : (
                  <img style={{ padding: "2%" }} src={WhiteArrow} />
                )}
              </Button>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                style={{
                  color: props.color == "textBlue" ? "#1C2460" : "#FFFFFF",
                  margin: "1%",
                  marginLeft: "2%",
                }}
                // onClick={handleClick}
                color="inherit"
                className={classes.button}
              >
                SGD
                {props.color == "textBlue" ? (
                  <img style={{ padding: "2%" }} src={blueArrow} />
                ) : (
                  <img style={{ padding: "2%" }} src={WhiteArrow} />
                )}
              </Button>

              {user === false ? (
                <LoginContainer
                  url_code={url_code}
                  resetpassword={url_code !== "" ? true : false}
                />
              ) : (
                <div style={{ textAlign: "center" }}>
                  <img style={{ padding: "2%" }} src={Profile} />
                </div>
              )}
            </Toolbar>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </AppBar>
    </div>
  );
};

export default injectWithObserver(TransparentTopBar);
