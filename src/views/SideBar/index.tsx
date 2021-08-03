import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
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
import cancellationIcon from "../../assets/Cancellations & Refunds@2x.png";
import bookingIcon from "../../assets/Bookings@2x.png";
import Wishlishts from "../../assets/Icon ionic-ios-heart-empty@2x.png";
import PriceAlert from "../../assets/Icon ionic-ios-notifications-outline@2x.png";
import LoginContainer from "../Login/Login";
import WishlistComponent from "../Wishlist/index";
import BookingComponent from "../Booking/Index";
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      backgroundColor: "#FFFFFF",
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
      marginTop: "140px",
      marginLeft: "50px",
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
              <ListItem button onClick={() => setComponent("myProfile")}>
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
              <ListItem button>
                <ListItemIcon>
                  <img src={PriceAlert} />
                </ListItemIcon>
                <ListItemText primary="Price Alerts" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <img src={Wishlishts} />
                </ListItemIcon>
                <ListItemText
                  primary="Wishlishts"
                  onClick={() => setComponent("Wishlishts")}
                />
              </ListItem>
              <ListItem button>
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
              <ListItem button onClick={() => setComponent("myProfile")}>
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
              <ListItem button>
                <ListItemIcon>
                  <img src={PriceAlert} />
                </ListItemIcon>
                <ListItemText primary="Price Alerts" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <img src={Wishlishts} />
                </ListItemIcon>
                <ListItemText
                  primary="Wishlishts"
                  onClick={() => setComponent("Wishlishts")}
                />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <img src={bookingIcon} />
                </ListItemIcon>
                <ListItemText
                  primary="My Bookings"
                  onClick={() => setComponent("Bookings")}
                />
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
      </nav>
      <main className={classes.content}>
        {/* <div className={classes.toolbar} /> */}
        {handleComponent()}
      </main>
    </div>
  );
}
