import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import arrow from '../../assets/arrow@2x.png'
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import CancellationsRefundsComponent from "../CancellationsRefunds/CancellationsRefunds";
// import BookingComponent from "../Booking/Index";
import PriceAlertsComponent from "../PriceAlert";
import MyProfile from "../MyProfile";
import myprofileicon from "../../assets/Icon awesome-user@2x.png"
import myprofileiconb from "../../assets/Icon awesome-userb@2x.png"
import cancellationIcon from "../../assets/Cancellations & Refunds@2x.png";
import bookingIcon from "../../assets/Bookings@2x.png";
import bookingIconBlue from "../../assets/Bookings - blue@2x.png";
import Wishlishts from "../../assets/Icon ionic-ios-heart-empty@2x.png";
import WishlishtsBlue from "../../assets/Icon ionic-ios-heart-empty-blue@2x.png";
import PriceAlert from "../../assets/Icon ionic-ios-notifications-outline@2x.png";
import PriceAlertBlue from "../../assets/Icon ionic-ios-notifications-outline-blue@2x.png";
import LoginContainer from "../Login/Login";
import WishlistComponent from "../Wishlist/index";
import BookingComponent from "../Booking/Index";

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      backgroundColor: "#FFFFFF",
      // '&:hover': {
      //   color: 'blue'
      // }
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
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
      overflow: "hidden",
    },
    drawer_br: {
      width: drawerWidth,
      // flexShrink: 0,
      ".MuiDrawer-paperAnchorDockedLeft": {
        borderRight: "none",
      },
    },
    drawerPaper: {
      width: drawerWidth,
      marginTop: "50px",
      marginLeft: "48px",
      backgroundColor: "transparent",
      maxHeight: 500,
      overflow: "auto",
      borderRight: "none",
    },
  })
);

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
  const [component, setComponent] = React.useState("myProfile");
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0)

  const handleComponent = () => {
    if (component == "myProfile") {
      return <MyProfile />;
    }
    if (component == "Wishlishts") {
      return <WishlistComponent />;
    }
    if (component == "Bookings") {
      return <BookingComponent />;
    }

    if (component == "PriceAlerts") {
      return <PriceAlertsComponent />;
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    console.log('index', index)
    setSelectedIndex(index);
  }

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            BackdropProps={{ invisible: true }}
            className={classes.drawer_br}
            //  variant="permanent"

            classes={{
              paper: classes.drawerPaper,
            }}
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <List component="nav" aria-label="main mailbox folders">
              <ListItem
                button
                // selected={selectedIndex === 1}
                selected={false}
                onClick={(event) => {
                  setComponent("myProfile")
                  handleListItemClick(event, 0)
                }}>
                <ListItemIcon>
                  <PermIdentityIcon
                    style={{
                      fontSize: "30px",
                      position: "relative",
                      right: "6px",
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary="My Profile" />
              </ListItem>
              <ListItem button
                selected={selectedIndex === 1}
              >
                <ListItemIcon>
                  <img src={PriceAlert} />
                </ListItemIcon>
                <ListItemText primary="Price Alerts" />
              </ListItem>
              <ListItem
                button
                selected={selectedIndex === 2}
                onClick={(event) => {
                  setComponent("Wishlishts")
                  handleListItemClick(event, 2)
                }}
              >
                <ListItemIcon>
                  <img src={Wishlishts} />
                </ListItemIcon>
                <ListItemText
                  primary="Wishlishts"

                />
              </ListItem>
              <ListItem button
                selected={selectedIndex === 3}
              >
                <ListItemIcon>
                  <img src={bookingIcon} />
                </ListItemIcon>
                <ListItemText primary="My Bookings" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <img src={cancellationIcon} />
                </ListItemIcon>
                <ListItemText
                  style={{ fontFamily: "avant-garde" }}
                  primary="Cancellations & Refunds"
                />
              </ListItem>
            </List>
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawer}
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {/* {drawer} */}
            <List component="nav" aria-label="main mailbox folders">
              <ListItem
                selected={selectedIndex === 0}
                style={selectedIndex === 0 ? { color: '#33BBFF' } : {}}
                button
                onClick={(event) => {
                  setComponent("myProfile")
                  handleListItemClick(event, 0)
                }}
              >
                <ListItemIcon>
                  {
                    selectedIndex === 0 ? (
                      <span style={{ color: '#33BBFF' }}>
                        <img src={arrow} />
                        <img src={myprofileicon} style={{ marginLeft: '10px' }} />
                      </span>
                    ) : (
                      <img src={myprofileiconb} />
                    )
                  }

                </ListItemIcon>
                <ListItemText primary="My Profile" />
              </ListItem>
              <ListItem
                button
                selected={selectedIndex === 1}
                style={selectedIndex === 1 ? { color: '#33BBFF' } : {}}
                onClick={(event) => {
                  setComponent("PriceAlerts")
                  handleListItemClick(event, 1)
                }}
              >
                <ListItemIcon >
                  {
                    selectedIndex === 1 ? (
                      <span style={{ marginRight: '10px' }}>
                        <img src={arrow} />
                        <img src={PriceAlertBlue} style={{ marginLeft: '10px' }} />
                      </span>
                    ) : (
                      <img src={PriceAlert} />
                    )
                  }
                </ListItemIcon>
                <ListItemText primary="Price Alerts" />
              </ListItem>
              <ListItem
                button
                selected={selectedIndex === 2}
                style={selectedIndex === 2 ? { color: '#33BBFF' } : {}}
              >
                <ListItemIcon>
                  {
                    selectedIndex === 2 ? (
                      <span style={{ color: '#33BBFF' }}>
                        <img src={arrow} />
                        <img src={WishlishtsBlue} style={{ marginLeft: '10px' }} />
                      </span>
                    ) : (
                      <img src={Wishlishts} />
                    )
                  }
                </ListItemIcon>
                <ListItemText
                  primary="Wishlishts"
                  onClick={(event) => {
                    setComponent("Wishlishts")
                    handleListItemClick(event, 2)
                  }}
                />
              </ListItem>
              <ListItem button
                selected={selectedIndex === 3}
                style={selectedIndex === 3 ? { color: '#33BBFF' } : {}}
              >
                <ListItemIcon>
                  {
                    selectedIndex === 3 ? (
                      <span style={{ color: '#33BBFF' }}>
                        <img src={arrow} />
                        <img src={bookingIconBlue} style={{ marginLeft: '10px' }} />
                      </span>
                    ) : (
                      <img src={bookingIcon} />
                    )
                  }
                </ListItemIcon>
                <ListItemText
                  primary="My Bookings"
                  onClick={(event) => {
                    setComponent("Bookings")
                    handleListItemClick(event, 3)
                  }}
                />
              </ListItem>
              <ListItem button
                selected={selectedIndex === 4}
              >
                <ListItemIcon>
                  <img src={cancellationIcon} />
                </ListItemIcon>
                <ListItemText
                  style={{ fontFamily: "avant-garde" }}
                  primary="Cancellations & Refunds"

                />
              </ListItem>
            </List>
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        {/* <div className={classes.toolbar} /> */}
        {handleComponent()}
      </main>
    </div>
  );
}
