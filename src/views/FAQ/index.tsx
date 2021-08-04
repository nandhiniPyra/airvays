import React, { useState } from "react";
import {
  createStyles,
  Theme,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Paper from "@material-ui/core/Paper";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import logo from "../../assets/Logo@2x.png";
import faq from "../../assets/FAQ- Illustration@2x.png";
import rightArrow from "../../assets/Icon ionic-ios-arrow-dropright-circle@2x.png";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import Link from "@material-ui/core/Link";
import * as yup from "yup";
// import BottomGrid from '../Airvays info/index'
import Box from "@material-ui/core/Box";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import SearchBar from "material-ui-search-bar ";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: "100px",
    },
    paper: {
      padding: theme.spacing(2),
      // textAlign: "center",
      marginLeft: "150px",
      marginRight: "200px",
      // color: theme.palette.text.secondary,
    },
    content: {
      marginTop: "40px",
      margin: "20px",
      marginLeft: "40px",
      color: "#1C2460",
      fontSize: "23px",
    },
    label: {
      marginTop: "25px",
      margin: "20px",
      marginLeft: "40px",
      fontSize: "18px",
      fontFamily: "AvantGarde Demi",
      color: "#333333",
      opacity: "50%",
    },
    details: {
      marginTop: "20px",
      margin: "20px",
      marginLeft: "40px",
      fontSize: "21px",
      fontFamily: "AvantGarde Demi",
    },
    editDetails: {
      marginTop: "82px",
      marginLeft: "30px",
      color: "#DCAB5E",
      fontSize: "17px",
      textTransform: "none",
      background: "none",
    },
    deleteButton: {
      textTransform: "none",
      color: "#DB4437",
      backgroundColor: "#FFF3F2",
      fontSize: "17px",
      marginTop: "5px",
    },
    tittle_text: {
      marginLeft: "15px",
      fontWeight: 500,
    },
    listroot: {
      color: "#1C2460",
      ".MuiListItem-button:hover": {
        backgroundColor: "none",
      },
    },
    formLabel: {
      fontFamily: "Crimson Text",
      color: "#1C2460",
      fontSize: "17px",
    },
    linkText: {
      color: "#4BAFC9",
      textDecoration: "underline",
      fontFamily: "Crimson Text",
    },
    boxHeading: {
      fontSize: "18px",
      padding: "5px",
      fontFamily: "Crimson Text",
      fontWeight: "bold",
    },
    boxcontent: {
      fontSize: "16px",
      padding: "5px",
      fontFamily: "Crimson Text",
    },
  })
);

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, "to">>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );
  const classes = useStyles();

  return (
    <li>
      <ListItem component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} className={classes.listroot} />
      </ListItem>
    </li>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FAQ() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [searchVal, setSearchVal] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  // const requestSearch = (searchedVal: string) => {
  //   const filteredRows = originalRows.filter((row) => {
  //     return row.name.toLowerCase().includes(searchedVal.toLowerCase());
  //   });
  //   setRows(filteredRows);
  // };

  const cancelSearch = () => {
    setSearchVal("");
    // requestSearch(searchVal);
  };

  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();

  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={3}>
          <Grid container style={{ height: "500px", padding: "10px" }}>
            {/* <Grid item xs={1} sm={1}></Grid> */}
            <Grid item xs={6} sm={4}>
              <div>
                <Typography variant="h6" style={{ color: "#1C2460" }}>
                  Frequently Asked Questions
                </Typography>
                <Typography style={{ marginTop: "20px", marginBottom: "10px" }}>
                  <SearchBar
                    value={searchVal}
                    // onRequestSearch={() => doSomethingWith(searchVal)}
                    onChange={(newValue) => setSearchVal(newValue)}
                    onCancelSearch={() => cancelSearch()}
                  />
                </Typography>
                <Typography style={{ marginTop: "20px", marginBottom: "10px" }}>
                  <Link
                    href="#"
                    className={classes.linkText}
                    onClick={preventDefault}
                  >
                    Traveling during COVID-19 times
                  </Link>
                </Typography>
                <Typography style={{ marginTop: "20px", marginBottom: "10px" }}>
                  <Link
                    href="#"
                    className={classes.linkText}
                    onClick={preventDefault}
                  >
                    How do I create Price Alert
                  </Link>
                </Typography>
                <Typography style={{ marginTop: "20px", marginBottom: "10px" }}>
                  <Link
                    href="#"
                    className={classes.linkText}
                    onClick={preventDefault}
                  >
                    Where can I see my bookings
                  </Link>
                </Typography>
                <Typography style={{ marginTop: "20px", marginBottom: "10px" }}>
                  <Link
                    href="#"
                    className={classes.linkText}
                    onClick={preventDefault}
                  >
                    How do I get refund on my booking
                  </Link>
                </Typography>
                <Typography style={{ marginTop: "20px", marginBottom: "10px" }}>
                  <Link
                    href="#"
                    className={classes.linkText}
                    onClick={preventDefault}
                  >
                    My Booking got Cancelled
                  </Link>
                </Typography>
                <Typography style={{ marginTop: "20px", marginBottom: "10px" }}>
                  <Link
                    href="#"
                    className={classes.linkText}
                    onClick={preventDefault}
                  >
                    COVID-19 Travel restrictions and Safety measures
                  </Link>
                </Typography>
              </div>
            </Grid>
            <Grid item xs={1} sm={1}></Grid>
            <Grid item xs={1} sm={1}></Grid>
            <Grid
              item
              xs={4}
              sm={2}
              style={{ marginTop: "40px", float: "right" }}
            >
              <div>
                <img src={faq} style={{ width: "400px" }}></img>
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={5}>
            <Grid item xs={10}>
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                aria-label="full width tabs example"
              >
                <Tab label="Flights" {...a11yProps(0)} />
                <Tab label="Hotels" {...a11yProps(1)} />
                <Tab label="Car Rentals" {...a11yProps(2)} />
              </Tabs>
              {/* </AppBar> */}
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <Paper elevation={3}>
                    <Grid
                      container
                      style={{
                        border: "1px solid #E5E5E5",
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <Grid item xs={10}>
                        <Grid
                          container
                          style={{ marginTop: "10px", marginBottom: "10px" }}
                        >
                          <Box style={{ padding: "10px" }}>
                            <Typography className={classes.boxHeading}>
                              Flight booking
                            </Typography>
                            <Typography className={classes.boxcontent}>
                              Lorem ipsum dolor sit amet, consetetur sadipscing
                              elitr, sed diam nonumy eirmod tempor invidunt ut
                              labore et dolore magna aliquyam erat, sed diam
                              voluptua. At vero eos et accusam et justo duo.
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={2}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          display: "flex",
                        }}
                      >
                        <div>
                          <Button>
                            <img src={rightArrow}></img>
                          </Button>
                        </div>
                      </Grid>
                    </Grid>
                  </Paper>
                  {Array.from({ length: 4 }, (x: any, i) => (
                    <Paper elevation={3}>
                      <Grid
                        container
                        style={{
                          border: "1px solid #E5E5E5",
                          marginTop: "15px",
                          marginBottom: "10px",
                        }}
                      >
                        <Grid item xs={10}>
                          <Grid container>
                            <Box
                              style={{
                                marginTop: "10px",
                                marginBottom: "10px",
                                padding: "10px",
                              }}
                            >
                              <Typography className={classes.boxHeading}>
                                Lorem ipsum
                              </Typography>
                              <Typography className={classes.boxcontent}>
                                Lorem ipsum dolor sit amet, consetetur
                                sadipscing elitr, sed diam nonumy eirmod tempor
                                invidunt ut labore et dolore magna aliquyam
                                erat, sed diam voluptua. At vero eos et accusam
                                et justo duo.
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                        <Grid
                          item
                          xs={2}
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                          }}
                        >
                          <div>
                            <Button>
                              <img src={rightArrow}></img>
                            </Button>
                          </div>
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
                </TabPanel>
                <TabPanel
                  value={value}
                  index={2}
                  dir={theme.direction}
                ></TabPanel>
              </SwipeableViews>
            </Grid>
            <Grid item xs={1} sm={1}></Grid>
          </Grid>
        </Paper>
      </div>
      <div>{/* <BottomGrid /> */}</div>
    </>
  );
}
