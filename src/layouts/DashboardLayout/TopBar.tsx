import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Typography,
  Menu,
  MenuItem
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import TranslateIcon from '@material-ui/icons/Translate';
import { LandingPageRoute } from '../../Routes/RoutesConstants';
import clsx from 'clsx';
import injectWithObserver from '../../utils/injectWithObserver';
import { getLang } from '../../utils/storeSelector';

const useStyles = makeStyles((theme) => ({
  root: {
    // borderBottom: `1px solid ${theme.palette.divider}`
  },
  avatar: {
    width: 60,
    height: 60
  },
  activeLang: {
    color: theme.palette.primary.main
  }
}));

interface TopBarProps {
  appName: string;
  onMobileNavOpen: any;
  stores: any;
}

const TopBar = ({ appName, onMobileNavOpen, stores }: TopBarProps) => {
  const classes = useStyles();
  const language = getLang(stores);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectLanguage = (event: any) => {
    const lang = event.target.getAttribute('property');
    language.changeLanguage(lang);
    handleClose();
  };

  return (
    <AppBar className={clsx(classes.root)} elevation={0}>
      <Toolbar>
        <Box flexGrow={1}>
          <Typography variant="h6" color="inherit" noWrap>
            <RouterLink
              to={LandingPageRoute}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {appName}
            </RouterLink>
          </Typography>
        </Box>
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          color="inherit"
        >
          <TranslateIcon color="inherit" />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={handleSelectLanguage}
            property="en"
            className={clsx({
              [classes.activeLang]: language.selectedLanguage === 'en'
            })}
          >
            English
          </MenuItem>
          <MenuItem
            onClick={handleSelectLanguage}
            property="ta"
            className={clsx({
              [classes.activeLang]: language.selectedLanguage === 'ta'
            })}
          >
            Tamil
          </MenuItem>
          <MenuItem
            onClick={handleSelectLanguage}
            property="hi"
            className={clsx({
              [classes.activeLang]: language.selectedLanguage === 'hi'
            })}
          >
            Hindi
          </MenuItem>
        </Menu>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

// TopBar.propTypes = {
//   className: PropTypes.string,
//   onMobileNavOpen: PropTypes.func
// };

export default injectWithObserver(TopBar);
