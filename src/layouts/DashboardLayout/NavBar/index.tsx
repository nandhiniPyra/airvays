import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  Users as UsersIcon,
  MessageSquare as MessageIcon
} from 'react-feather';

import NavItem, { NavBarLogoutButton } from './NavItem';
import language from '../lang';
import {
  // AccountRoute,
  // CustomersRoute,
  DashboardRoute,
  // ProductsRoute,
  // SettingsRoute,
  // ChatlistRoute
} from '../../../Routes/RoutesConstants';

import injectWithObserver from '../../../utils/injectWithObserver';
import { getLang } from '../../../utils/storeSelector';

const items = [
  // {
  //   href: '/app/dashboard',
  //   icon: BarChartIcon,
  //   title: 'Dashboard'
  // },
  // {
  //   href: '/app/settings',
  //   icon: SettingsIcon,
  //   title: 'Settings'
  // },
  // {
  //   href: '/demo/app/dashboard',
  //   icon: CodeIcon,
  //   title: 'Demo'
  // }

  {
    href: DashboardRoute,
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  // {
  //   href: CustomersRoute,
  //   icon: UsersIcon,
  //   title: 'Customers'
  // },
  // {
  //   href: ProductsRoute,
  //   icon: ShoppingBagIcon,
  //   title: 'Products'
  // },
  // {
  //   href: AccountRoute,
  //   icon: UserIcon,
  //   title: 'Account'
  // },
  // {
  //   href: SettingsRoute,
  //   icon: SettingsIcon,
  //   title: 'Settings'
  // },
  // {
  //   href: ChatlistRoute,
  //   icon: MessageIcon,
  //   title: 'Chat'
  // },
  // {
  //   href: '/login',
  //   icon: LockIcon,
  //   title: 'Login'
  // },
  // {
  //   href: '/register',
  //   icon: UserPlusIcon,
  //   title: 'Register'
  // },
  {
    href: '/404',
    icon: AlertCircleIcon,
    title: 'Error'
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  },
  name: {}
}));

const NavBar = ({ user, onMobileClose, openMobile, stores }: any) => {
  const classes = useStyles();
  const location = useLocation();

  const { selectedLanguage: lang } = getLang(stores);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const getTitle = (title: any): string => {
    const obj: any = language[lang];
    return obj[title] || title;
  };

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        {/* <Link to={AccountRoute}> */}
        <Avatar className={classes.avatar} src={user?.photoURL?.toString()} />
        {/* </Link> */}
        <Box mt={1}>
          <Typography className={classes.name} color="textPrimary" variant="h5">
            {user?.displayName}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={getTitle(item.title)}
              icon={item.icon}
            />
          ))}
          <NavBarLogoutButton />
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

export default injectWithObserver(NavBar);
