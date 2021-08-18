import React, { useState, useEffect } from 'react';
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
} from '@material-ui/core';
import injectWithObserver from '../utils/injectWithObserver';
import Logo from '../assets/Logo - white@2x.png';
import arrow from '../assets/Icon ionic-md-arrow-dropdown@2x.png';
import Profile from '../assets/Profile - Nav bar@2x.png';
import SingaporeLogo from '../assets/icons8-singapore-48.png';
import { useNavigate } from 'react-router-dom';
import LoginContainer from '../views/Login/Login';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBarTransparent: {
    // borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: 'transparent',
    fontFamily: 'Crimson Text',
    // right: "5%",
  },
  toolbar: {
    flexWrap: 'wrap',
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
    fontFamily: 'Crimson Text',
    fontSize: '20px',
    textTransform: 'none',
    // margin: "20px",
  },
  iconButton: {
    fontFamily: 'Crimson Text',
    fontSize: '20px',
    margin: '2%',
  },
}));

interface TopBarProps {
  appName: string;
  stores: any;
}

const TransparentTopBar = ({ appName, stores }: TopBarProps) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const key = window.location.search;
  const urlParams = new URLSearchParams(key);
  const url_code = urlParams.get('oobCode') || '';
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(false);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    let user = localStorage.getItem('userName');
    if (user !== null) {
      setUser(true);
    }
  }, []);

  return (
    <div className={classes.root}>
      <AppBar
        color='primary'
        elevation={0}
        style={{
          backgroundColor: window.scrollY > 310 ? '#1C2460' : 'transparent',
          height: '30px',
        }}>
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={10} style={{ padding: 0, margin: 0 }}>
            {/* <Container> */}
            <Toolbar className={classes.toolbar}>
              <Typography
                variant='h6'
                color='inherit'
                noWrap
                className={classes.toolbarTitle}>
                <img src={Logo} alt='logo' style={{ width: '100px' }} />
              </Typography>
              <Button className={classes.button} color='inherit'>
                Explore
              </Button>
              <IconButton
                aria-controls='simple-menu'
                aria-haspopup='true'
                onClick={handleClick}
                color='inherit'
                className={classes.iconButton}>
                Help
              </IconButton>
              <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <MenuItem
                  onClick={() => navigate('/faq')}
                  property='ta'
                  style={{ color: '#1C2460', fontFamily: 'Crimson Text' }}>
                  FAQ
                </MenuItem>
                <MenuItem
                  onClick={() => navigate('/contactUs')}
                  property='hi'
                  style={{ color: '#1C2460', fontFamily: 'Crimson Text' }}>
                  Contact Us
                </MenuItem>
              </Menu>
              <Button
                aria-controls='simple-menu'
                aria-haspopup='true'
                color='inherit'
                className={classes.button}>
                <img
                  alt=''
                  style={{ padding: '2%', fontSize: '10px' }}
                  src={SingaporeLogo}
                />
                Singapore
                <img alt='' style={{ padding: '2%' }} src={arrow} />
              </Button>
              <Button
                aria-controls='simple-menu'
                aria-haspopup='true'
                style={{ margin: '2%' }}
                color='inherit'
                className={classes.button}>
                SGD
                <img alt='' style={{ padding: '2%' }} src={arrow} />
              </Button>

              {user === false ? (
                <LoginContainer
                  url_code={url_code}
                  resetpassword={url_code !== '' ? true : false}
                />
              ) : (
                <img alt='' style={{ padding: '2%' }} src={Profile} />
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
