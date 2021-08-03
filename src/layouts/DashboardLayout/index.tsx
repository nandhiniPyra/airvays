import React, { useState, useLayoutEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { makeStyles, CssBaseline } from '@material-ui/core';
import { User } from 'firebase';

import NavBar from './NavBar';
import TopBar from './TopBar';
import { AuthStateChangeListener } from '../../utils/firebaseUtils';
import PageLoader from '../../components/PageLoader';
import { SigninRoute } from '../../Routes/RoutesConstants';
import injectWithObserver from '../../utils/injectWithObserver';
import { getUser } from '../../utils/storeSelector';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

interface DashboardLayoutProps {
  appName: string;
  stores: any;
}

const DashboardLayout = ({ appName, stores }: DashboardLayoutProps) => {
  // States
  const [user, setUser] = useState<User | null>(null);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  // Effects
  useLayoutEffect(() => {
    AuthStateChangeListener(authStateChange);
  }, []);

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { changeUser } = getUser(stores);

  const authStateChange = (user: User | null) => {
    changeUser(user);
    if (user) setUser(user);
    else navigate(SigninRoute);
  };

  const classes = useStyles();

  return user ? (
    <div className={classes.root}>
      {/* <TopBar
        appName={appName}
        onMobileNavOpen={() => setMobileNavOpen(true)}
      /> */}
      {/* <NavBar
        user={user}
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      /> */}
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <CssBaseline />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <PageLoader />
  );
};

export default injectWithObserver(DashboardLayout);
