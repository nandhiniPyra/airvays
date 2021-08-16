import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
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
import { LandingPageRoute } from "../Routes/RoutesConstants";
import clsx from "clsx";
import injectWithObserver from "../utils/injectWithObserver";
import { getLang } from "../utils/storeSelector";
import Logo from "../assets/Logo - white@2x.png";
import arrow from "../assets/Icon ionic-md-arrow-dropdown@2x.png";
import Profile from "../assets/Profile - Nav bar@2x.png";
import SingaporeLogo from "../assets/icons8-singapore-48.png";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    // borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: "transparent",
    fontFamily: "Crimson Text",
    // left: "5%",
    // height: "80px",
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
    marginLeft: theme.spacing(3),
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
    margin: "10px",
  },
}));

interface TopBarProps {
  appName: string;
  stores: any;
}

const TransparentTopBar = ({ appName, stores }: TopBarProps) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { selectedLanguage: language, changeLanguage } = getLang(stores);
  // const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectLanguage = (event: any) => {
    const lang = event.target.getAttribute("property");
    changeLanguage(lang);
    handleClose();
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={10}>
          <AppBar
            // position="static"
            color="primary"
            elevation={0}
            className={classes.appBar}
          >
            <Toolbar className={classes.toolbar}>
              <Typography
                variant="h6"
                color="inherit"
                noWrap
                className={classes.toolbarTitle}
              >
                <img src={Logo} alt="logo" style={{ width: "100px" }} />

                <RouterLink
                  to={LandingPageRoute}
                  style={{ textDecoration: "none", color: "inherit" }}
                ></RouterLink>
              </Typography>
              <Button className={classes.button} color="inherit">
                Explore
              </Button>
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
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
                  // onClick={handleSelectLanguage}
                  onClick={() => navigate("/faq")}
                  property="ta"
                  className={clsx({
                    [classes.activeLang]: language === "ta",
                  })}
                  style={{ color: "#1C2460", fontFamily: "Crimson Text" }}
                >
                  FAQ
                </MenuItem>
                <MenuItem
                  onClick={() => navigate("/contactUs")}
                  property="hi"
                  className={clsx({
                    [classes.activeLang]: language === "hi",
                  })}
                  style={{ color: "#1C2460", fontFamily: "Crimson Text" }}
                >
                  Contact Us
                </MenuItem>
              </Menu>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                // onClick={handleClick}
                color="inherit"
                className={classes.button}
              >
                <img
                  style={{ padding: "10px", fontSize: "10px" }}
                  // src={SingaporeLogo}
                />
                Singapore
                <img style={{ padding: "10px" }} src={arrow} />
              </Button>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                // onClick={handleClick}
                color="inherit"
                className={classes.button}
              >
                SGD
                <img style={{ padding: "10px" }} src={arrow} />
              </Button>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                // onClick={handleMenu}
                color="inherit"
              >
                <img style={{ padding: "10px" }} src={Profile} />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
};

export default injectWithObserver(TransparentTopBar);
