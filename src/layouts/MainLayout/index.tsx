import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  makeStyles,
  CssBaseline,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core';
import TopBar from './TopBar';
import createTypography from '@material-ui/core/styles/createTypography';
import createPalette from '@material-ui/core/styles/createPalette';

const theme = createMuiTheme({
  typography: createTypography(createPalette({}), {
    fontFamily: 'AvantGarde',
    button: {
      textTransform: 'none',
    },
  }),
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    // paddingTop: 64,
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
  },
}));

interface MainLayoutProps {
  appName: string;
}

const MainLayout = ({ appName }: MainLayoutProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}
      {/* <TopBar appName={appName} /> */}
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>{<Outlet />}</div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
