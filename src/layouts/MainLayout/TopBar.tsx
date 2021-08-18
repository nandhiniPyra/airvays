import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  makeStyles,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import clsx from 'clsx';
import injectWithObserver from '../../utils/injectWithObserver';
import Logo from '../../assets/Logo - white@2x.png';
import arrow from '../../assets/Icon ionic-md-arrow-dropdown@2x.png';
import Profile from '../../assets/Profile - Nav bar@2x.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: '#1C2460',
    fontFamily: 'Crimson Text',
    // height: "80px",
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
    marginLeft: '70px',
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
    margin: '10px',
  },
}));

interface TopBarProps {
  appName: string;
  stores: any;
}

const TopBar = ({ appName, stores }: TopBarProps) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar color='primary' elevation={0} className={classes.appBar}>
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
            <img alt='' style={{ padding: '10px', fontSize: '10px' }} />
            Singapore
            <img alt='' style={{ padding: '10px' }} src={arrow} />
          </Button>
          <Button
            aria-controls='simple-menu'
            aria-haspopup='true'
            color='inherit'
            className={classes.button}>
            SGD
            <img alt='' style={{ padding: '10px' }} src={arrow} />
          </Button>
          <IconButton
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            color='inherit'>
            <img alt='' style={{ padding: '10px' }} src={Profile} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default injectWithObserver(TopBar);
