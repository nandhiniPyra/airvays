import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import arrow from '../../assets/arrow@2x.png';
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
  withStyles,
} from '@material-ui/core/styles';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import PriceAlertsComponent from '../PriceAlert';
import MyProfile from '../MyProfile';
import myprofileicon from '../../assets/Icon awesome-user@2x.png';
import myprofileiconb from '../../assets/Icon awesome-userb@2x.png';
import cancellationIcon from '../../assets/Cancellations & Refunds@2x.png';
import cancellationIconlue from '../../assets/Cancellations - blue@2x.png';
import logout from '../../assets/logout@2x.png';
import bookingIcon from '../../assets/Bookings@2x.png';
import bookingIconBlue from '../../assets/Bookings - blue@2x.png';
import Wishlishts from '../../assets/Icon ionic-ios-heart-empty@2x.png';
import WishlishtsBlue from '../../assets/Icon ionic-ios-heart-empty-blue@2x.png';
import PriceAlert from '../../assets/Icon ionic-ios-notifications-outline@2x.png';
import PriceAlertBlue from '../../assets/Icon ionic-ios-notifications-outline-blue@2x.png';
import WishlistComponent from '../Wishlist/index';
import BookingComponent from '../Booking/Index';
import MuiListItem from '@material-ui/core/ListItem';
import TransparentTopBar from '../../TopBar/index';
import { Grid, Paper, Typography } from '@material-ui/core';
import LogoutDialog from '../../components/LogoutIconButton/LogoutDialog';
import CancellationsRefundsComponent from '../CancellationsRefunds/CancellationsRefunds';

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // display: 'flex',
      backgroundColor: '#F0F0F0',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    // drawerPaper: {
    //   width: drawerWidth,
    //   borderRight: "none",
    // },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      overflow: 'hidden',
    },
    drawer_br: {
      width: drawerWidth,
      // flexShrink: 0,
      position:'relative',
      '.MuiDrawer-paperAnchorDockedLeft': {
        borderRight: 'none',
      },
    },
    drawerPaper: {
      width: drawerWidth,
      marginTop: '9%',
      marginLeft: '8%',
      backgroundColor: 'transparent',
      maxHeight: 500,
      overflow: 'auto',
      borderRight: 'none',
    },
    logout: { color: '#DB4437', fontFamily:'AvantGarde-Regular', fontSize:'12px' },
    listItemText: {fontFamily:'AvantGarde-Regular', fontSize:'12px'}
  }),
);

const ListItem = withStyles({
  root: {
    '&$selected': {
      backgroundColor: 'transparent',
      '& .MuiListItemIcon-root': {},
    },
    '&$selected:hover': {
      backgroundColor: 'transparent',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  selected: {},
})(MuiListItem);

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [component, setComponent] = React.useState('myProfile');
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const [open, setOpen] = React.useState<boolean>(false);
  const toggleDialog = () => {
    setOpen((val) => !val);
  };
  const handleComponent = () => {
    if (component === 'myProfile') {
      return <MyProfile />;
    }
    if (component === 'Wishlishts') {
      return <WishlistComponent />;
    }
    if (component === 'Bookings') {
      return <BookingComponent />;
    }

    if (component === 'PriceAlerts') {
      return <PriceAlertsComponent />;
    }
    if (component === 'cancellations & Refunds') {
      return <CancellationsRefundsComponent />
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <TransparentTopBar color='textWhite' backgroundColor='blue' />
     <Grid item xs={2}></Grid>
      <div className={classes.root}>
        {/* <CssBaseline /> */}
        <Grid container spacing={2}>
          <Grid item xs={1}></Grid>
          <Grid item xs={2}>
        <nav className={classes.drawer} aria-label='mailbox folders'>
          <Hidden smUp implementation='css'>
            <Drawer
              BackdropProps={{ invisible: true }}
              className={classes.drawer_br}
              //  variant="permanent"
              classes={{
                paper: classes.drawerPaper,
              }}
              container={container}
              variant='temporary'
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}>
              <List component='nav' aria-label='main mailbox folders'>
                <ListItem
                  button
                  selected={false}
                  onClick={(event) => {
                    setComponent('myProfile');
                    handleListItemClick(event, 0);
                  }}>
                  <ListItemIcon>
                    <PermIdentityIcon
                      style={{
                        fontSize: '20px',
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary='My Profile' />
                </ListItem>
                <ListItem button selected={selectedIndex === 1}>
                  <ListItemIcon>
                    <img alt='' src={PriceAlert} />
                  </ListItemIcon>
                  <ListItemText primary='Price Alerts' />
                </ListItem>
                <ListItem
                  button
                  selected={selectedIndex === 2}
                  onClick={(event) => {
                    setComponent('Wishlishts');
                    handleListItemClick(event, 2);
                  }}>
                  <ListItemIcon>
                    <img alt='' src={Wishlishts} />
                  </ListItemIcon>
                  <ListItemText primary='Wishlishts' />
                </ListItem>
                <ListItem button selected={selectedIndex === 3}>
                  <ListItemIcon>
                    <img alt='' src={bookingIcon} />
                  </ListItemIcon>
                  <ListItemText primary='My Bookings' />
                </ListItem>
                <ListItem button selected={selectedIndex === 4}>
                  <ListItemIcon>
                    <img alt='' src={bookingIcon} />
                  </ListItemIcon>
                  <ListItemText  primary='My Bookings' />
                </ListItem>
                <ListItem button selected={selectedIndex === 4}>
                  <ListItemIcon>
                    <img alt='' src={cancellationIcon} />
                  </ListItemIcon>
                  <ListItemText
                    style={{ fontFamily: 'AvantGarde-Regular' }}
                    primary='Cancellations & Refunds'
                  />
                </ListItem>
              </List>
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation='css'>
            <Drawer
              className={classes.drawer}
              classes={{
                paper: classes.drawerPaper,
              }}
              variant='permanent'
              open>
              {/* {drawer} */}
              <List component='nav' aria-label='main mailbox folders'>
              <Grid container>
                      <Grid>
                      {selectedIndex === 0 ? (<><img style={{ color: '#33BBFF', marginTop:'10px' }} alt='' src={arrow} /></>): null }
                      </Grid>
                      <Grid style={{marginLeft:"1%"}}>
                <ListItem
                  selected={selectedIndex === 0}
                  style={selectedIndex === 0 ? { color: '#33BBFF', padding:'2px', fontFamily:'AvantGarde-Demi', fontWeight:'bold' } : {}}
                  button
                  onClick={(event) => {
                    setComponent('myProfile');
                    handleListItemClick(event, 0);
                  }}>
                  <ListItemIcon>
                    {selectedIndex === 0 ? (
                      <><span>
                            <img
                              alt=''
                              src={myprofileicon} />
                          </span></>
                    ) : (
                      <img alt='' src={myprofileiconb} />
                    )}
                  </ListItemIcon>
                  <ListItemText  primary={<span className={classes.listItemText} style={selectedIndex === 0 ? { fontFamily:'AvantGarde-Demi',fontSize:'14px'} : {}}>My Profile</span>} />
                </ListItem>
                </Grid>
              </Grid>
              <Grid container style={{marginTop:'2%'}}>
              <Grid>
                      {selectedIndex === 1 ? (<><img style={{ color: '#33BBFF', marginTop:'10px' }} alt='' src={arrow} /></>): null }
                      </Grid>
              
              <Grid style={{marginLeft:"1%"}}>
                <ListItem
                  button
                  selected={selectedIndex === 1}
                  style={selectedIndex === 1 ? { color: '#33BBFF',padding:'2px' } : {}}
                  onClick={(event) => {
                    setComponent('PriceAlerts');
                    handleListItemClick(event, 1);
                  }}>
                  <ListItemIcon>
                    {selectedIndex === 1 ? (
                      <span>
                        <img
                          alt=''
                          src={PriceAlertBlue}
                        />
                      </span>
                    ) : (
                      <img alt='' src={PriceAlert} />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={<span style={selectedIndex === 1 ? { fontFamily:'AvantGarde-Demi',fontSize:'14px'} : {}} className={classes.listItemText}>Price Alerts</span>} />
                </ListItem>
                </Grid>
                </Grid>
                <Grid container>
                <Grid>
                      {selectedIndex === 2 ? (<><img style={{ color: '#33BBFF', marginTop:'10px' }} alt='' src={arrow} /></>): null }
                      </Grid>
                      <Grid style={{marginLeft:"1%"}}>
                <ListItem
                  button
                  selected={selectedIndex === 2}
                  style={selectedIndex === 2 ? { color: '#33BBFF',  padding:'2px' } : {}}>
                  <ListItemIcon>
                    {selectedIndex === 2 ? (
                      <span>
                        <img
                          alt=''
                          src={WishlishtsBlue}
                        />
                      </span>
                    ) : (
                      <img alt='' src={Wishlishts} />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={<span style={selectedIndex === 2 ? { fontFamily:'AvantGarde-Demi',fontSize:'14px'} : {}} className={classes.listItemText}>Wishlishts</span>}
                    onClick={(event) => {
                      setComponent('Wishlishts');
                      handleListItemClick(event, 2);
                    }}
                  />
                </ListItem>
               </Grid>
                </Grid>
                <Grid container style={{marginTop:'2%'}}>
                <Grid>
                      {selectedIndex === 3 ? (<><img style={{ color: '#33BBFF', marginTop:'10px' }} alt='' src={arrow} /></>): null }
                      </Grid>
                      <Grid style={{marginLeft:"1%"}}>
                <ListItem
                  button
                  selected={selectedIndex === 3}
                  style={selectedIndex === 3 ? { color: '#33BBFF', padding:'2px' } : {}}>
                  <ListItemIcon>
                    {selectedIndex === 3 ? (
                      <span>
                        <img
                          alt=''
                          src={bookingIconBlue}
                        />
                      </span>
                    ) : (
                      <img alt='' src={bookingIcon} />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={<span style={selectedIndex === 3 ? { fontFamily:'AvantGarde-Demi',fontSize:'14px'} : {}} className={classes.listItemText}>My Bookings</span>}
                    onClick={(event) => {
                      setComponent('Bookings');
                      handleListItemClick(event, 3);
                    }}
                  />
                </ListItem>
                </Grid>
                </Grid>
                <Grid container style={{marginTop:'2%'}}>
                <Grid>
                      {selectedIndex === 4 ? (<><img style={{ color: '#33BBFF', marginTop:'10px' }} alt='' src={arrow} /></>): null }
                      </Grid>
                      <Grid style={{marginLeft:"1%"}}>
                <ListItem
                  button
                  selected={selectedIndex === 4}
                  style={selectedIndex === 4 ? { color: '#33BBFF',padding:'2px' } : {}}>
                  <ListItemIcon>
                    {selectedIndex === 4 ? (
                      <span>
                        <img
                          alt=''
                          src={cancellationIconlue}
                        />
                      </span>
                    ) : (
                      <img alt='' src={cancellationIcon} />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={<span style={selectedIndex === 4 ? { fontFamily:'AvantGarde-Demi',fontSize:'14px'} : {}} className={classes.listItemText}>Cancellations & Refunds</span>}
                    onClick={(event) => {
                      setComponent('cancellations & Refunds');
                      handleListItemClick(event, 4);
                    }}
                  />
                </ListItem>
                </Grid>
                </Grid>
                <Grid container style={{marginTop:'2px'}}>
                <Grid>
                      {selectedIndex === 5 ? (<><img style={{ color: '#33BBFF', marginTop:'10px' }} alt='' src={arrow} /></>): null }
                      </Grid>
              <Grid style={{marginLeft:"1%"}}> 
                <ListItem
                  button
                  selected={selectedIndex === 5}
                  style={selectedIndex === 5 ? { color: '#33BBFF', padding:'2%' } : {}}>
                  <ListItemIcon>
                    {selectedIndex === 5 ? (
                      <span>
                        <img
                          alt=''
                          src={logout}
                        />
                      </span>
                    ) : (
                      <img alt='' src={logout} />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={<span className={classes.logout}>Logout</span>}
                    onClick={(event) => {
                      setOpen(true);
                    }}
                  />
                </ListItem>
                </Grid>
                </Grid>
              </List>
            </Drawer>
          </Hidden>
        </nav>
        </Grid>
        <Grid item xs={8}>
          <Paper style={{  borderRadius: '10px',
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      opacity: 1,
      marginLeft:'3%',
      marginTop:'4%',
      width: '97%',
      height: '100%',}}>
        <main className={classes.content}>{handleComponent()}</main>
        </Paper>
        </Grid>
        <Grid item xs={1}></Grid>
        </Grid>
      </div>
      <LogoutDialog open={open} toggleDialog={toggleDialog} />
    </>
  );
}
