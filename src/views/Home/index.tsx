import React, { useEffect, useState } from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import search from "../../assets/icons8-search-30.png";
import exchange from "../../assets/exchange@2x.png";
import flight from "../../assets/Flight Info@2x.png";
import hotel from "../../assets/Icon metro-hotel-blue@2x.png";
import car from "../../assets/Icon awesome-car-blue@2x.png";
import bgImage from "../../assets/809525.jpg";
import logo from "../../assets/Logo@2x.png";
import flightillustration from "../../assets/Illustration@2x.png";
import cloudillustration1 from "../../assets/Illustration 2@2x.png";
import cloudillustration2 from "../../assets/illustration 1@2x.png";
import blog1 from "../../assets/Blog image - 1@2x.png";
import blog2 from "../../assets/Blog image - 2@2x.png";
import blog3 from "../../assets/Blog image - 3@2x.png";
import addPeople from "../../assets/People - Add@2x.png";
import subtractPeople from "../../assets/People - subtract@2x.png";
import LoginContainer from "../Login/Login";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import { Route, MemoryRouter, useNavigate, useLocation } from "react-router";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { Omit } from "@material-ui/types";
import { classicNameResolver } from "typescript";
import styled from "styled-components";
import { FlightListRoute } from "../../Routes/RoutesConstants";
import { Autocomplete } from "@material-ui/lab";
import { parseWithOptions } from "date-fns/fp";
import { _getAirports } from "../../services/api/flight";
import { InputAdornment, Popover } from "@material-ui/core";
import user from "../../assets/Icon feather-user@2x.png";
import { subtract } from "lodash";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // flexGrow: 1,
      height: 1056,
      backgroundImage: `url(${bgImage})`,
    },
    _rowHead: {
      marginTop: "15px",
    },

    grow: {
      display: "flex",
      // flexGrow: 1,
    },
    _ml15: {
      marginLeft: "15px",
      // flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    date_picker: {
      "& .MuiInputBase-root": {
        padding: 0,
        border: "1px solid #bfb7b7",
        borderRadius: "5px",
        width: "160px",
        bottom: "15px",
        height: "55px",
        "& .MuiButtonBase-root": {
          padding: 0,
          paddingLeft: 10,
        },
        "& .MuiInputBase-input": {
          padding: 15,
          paddingLeft: 0,
        },
        "& .MuiOutlinedInput-notchedOutline": {
          // border: 'none'
        },
        "& .MuiSvgIcon-root": {
          color: "#33bbff",
        },
      },
    },
    grid_root: {
      display: "flex",
      flexWrap: "wrap",
      // justifyContent: 'space-around',
      overflow: "hidden",
      marginTop: "50px",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
    mid_div: {
      background: "#64AAC6",
      height: "332px",
    },
    listroot: {
      color: "#1C2460",
      ".MuiListItem-button:hover": {
        backgroundColor: "none",
      },
    },
    tittle_text: {
      marginLeft: "15px",
      fontWeight: 500,
    },
  })
);

const tileData = [
  {
    img: `url(${bgImage})`,
    title: "Breakfast",
    author: "jill111",
    featured: true,
  },
  {
    img: `url(${bgImage})`,
    title: "Tasty burger",
    author: "director90",
  },
  {
    img: `url(${bgImage})`,
    title: "Camera",
    author: "Danson67",
  },
  {
    img: `url(${bgImage})`,
    title: "Morning",
    author: "fancycrave1",
    featured: true,
  },
  {
    img: `url(${bgImage})`,
    title: "Hats",
    author: "Hans",
  },
  {
    img: `url(${bgImage})`,
    title: "Honey",
    author: "fancycravel",
  },
];
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

export default function HomePage() {
  const classes = useStyles();
  const Navigate = useNavigate();
  const { state }: any = useLocation();
  const [fromOptions, setFromOptions] = useState<Array<any>>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );

  const subtractAdults = () => {
    setAdults(adults - 1);
  };

  const addAdults = () => {
    setAdults(adults + 1);
  };

  const subtractChildren = () => {
    setChildren(children - 1);
  };

  const addChildren = () => {
    setChildren(children + 1);
  };

  const subtractInfants = () => {
    setInfants(infants - 1);
  };

  const addInfants = () => {
    setInfants(infants + 1);
  };

  useEffect(() => {
    getAirportsFrom();
    getAirportsTo();
  }, [from, to]);

  const getAirportsFrom = () => {
    _getAirports({ search: from }, function (error: any, response: any) {
      setFromOptions(response.result);
      if (error == null) {
        if (response.status == 200) {
        } else {
        }
      } else if (response == null) {
        console.log(error);
      }
    });
  };

  const getAirportsTo = () => {
    _getAirports({ search: to }, function (error: any, response: any) {
      setFromOptions(response.result);
      if (error == null) {
        if (response.status == 200) {
        } else {
        }
      } else if (response == null) {
        console.log(error);
      }
    });
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleNoP = (event: any) => {
    handlePopoverClick(event);
  };

  const handlePopoverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  console.log(classes.root, "rooot");
  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3} className={classes._rowHead}>
          <Grid item xs={1}></Grid>
          <Grid item xs={4}>
            <img src={logo}></img>
          </Grid>
          <Grid item xs={6}>
            <div
              className={classes.grow}
              style={{ float: "right", marginRight: "40px", marginTop: "40px" }}
            >
              <div className={classes._ml15}>Explore</div>
              <div className={classes._ml15}>Help</div>
              <div className={classes._ml15}>Singapore</div>
              <div className={classes._ml15}>SGD</div>
              <div className={classes._ml15}>
                <div
                  style={{
                    background: "#fff",
                    bottom: "10px",
                    position: "relative",
                  }}
                >
                  <LoginContainer />
                </div>
              </div>
            </div>
          </Grid>

          <Grid
            item
            xs={12}
            style={{ textAlign: "center", marginTop: "100px" }}
          >
            <Typography style={{ fontWeight: 600, fontSize: "24px" }}>
              Always say yes to new adventures.
            </Typography>
            <Typography>Plan your adventure with us !</Typography>
          </Grid>
          <Grid container>
            <Grid xs={1}></Grid>
            <Grid xs={10}>
              <div style={{ textAlign: "center", display: "flex" }}>
                <div
                  style={{
                    width: "138px",
                    height: "98px",
                    background: "#fff",
                    borderRadius: "5px",
                  }}
                >
                  <img src={flight} style={{ marginTop: "15px" }}></img>
                  <br />
                  <br />
                  Flights
                </div>
                <div
                  style={{
                    width: "138px",
                    height: "98px",
                    background: "#fff",
                    borderRadius: "5px",
                  }}
                  className={classes._ml15}
                >
                  <img src={hotel} style={{ marginTop: "15px" }} />
                  <br />
                  <br />
                  Hotels
                </div>
                <div
                  style={{
                    width: "138px",
                    height: "98px",
                    background: "#fff",
                    borderRadius: "5px",
                  }}
                  className={classes._ml15}
                >
                  <img src={car} style={{ marginTop: "15px" }} />
                  <br />
                  <br />
                  Car Rental
                </div>
              </div>
            </Grid>
            <Grid xs={1}></Grid>
          </Grid>

          <Grid container style={{ marginTop: "10px" }}>
            <Grid xs={1}></Grid>
            <Grid xs={10}>
              <Paper className={classes.paper}>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    defaultValue="top"
                  >
                    <FormControlLabel
                      value="One-way"
                      control={<Radio color="primary" />}
                      label="One-way"
                    />
                    <FormControlLabel
                      value="Return"
                      control={<Radio color="primary" />}
                      label="Return"
                    />
                  </RadioGroup>
                </FormControl>

                <div>
                  <Formik
                    initialValues={{
                      NoP: "",
                      startDate: null,
                      endDate: null,
                      from,
                      to,
                    }}
                    enableReinitialize
                    onSubmit={(values) => {
                      console.log(values);
                      Navigate(FlightListRoute, {
                        state: { values, from, to },
                      });
                    }}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validationSchema={Yup.object().shape({
                      // from: Yup.string()
                      //   .min(2, "Too Short!")
                      //   .max(70, "Too Long!")
                      //   .required("Required"),
                      // to: Yup.string()
                      //   .matches(/^[A-Za-z ]*$/, "Please enter valid name")
                      //   .max(40)
                      //   .required(),
                      startDate: Yup.date()
                        .typeError("Start Date is required")
                        .required("Start Date is required"),
                      endDate: Yup.date()
                        .typeError("End Date is required")
                        .required("End Date is required")
                        .when("startDate", (startDate: any) => {
                          if (startDate) {
                            return Yup.date()
                              .min(
                                startDate,
                                "End Date must be after Start Date"
                              )
                              .typeError("End Date is required");
                          }
                        }),
                      NoP: Yup.string()
                        .matches(/^[A-Za-z ]*$/, "Please enter valid name")
                        .max(40)
                        .required(),
                      // to: Yup.string().name().required("Required"),
                    })}
                  >
                    {(props) => {
                      props.submitCount > 0 && (props.validateOnChange = true);
                      const {
                        values,
                        touched,
                        errors,
                        dirty,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        handleReset,
                      } = props;
                      return (
                        <form onSubmit={handleSubmit}>
                          <Grid container>
                            <Grid
                              item
                              xs={5}
                              style={{
                                display: "flex",
                              }}
                              spacing={1}
                            >
                              <Autocomplete
                                id="from"
                                className="country-select"
                                options={fromOptions}
                                getOptionLabel={(option) => option.name}
                                // defaultValue={from}
                                // onChange={(event: any, newValue: string) => {
                                //   setFrom(newValue);
                                //   console.log(from, "from");
                                // }}
                                onChange={handleChange}
                                onInputChange={(event, newInputValue) => {
                                  setFrom(newInputValue);
                                  console.log(from, "from");
                                }}
                                renderInput={(params) => (
                                  <Field
                                    style={{ width: "230px" }}
                                    component={TextField}
                                    {...params}
                                    name="From"
                                    label="From"
                                    variant="outlined"
                                    fullWidth
                                  />
                                )}
                              />

                              <div
                                style={{
                                  marginTop: "10px",
                                  marginLeft: "10px",
                                  marginRight: "10px",
                                }}
                              >
                                <img
                                  src={exchange}
                                  style={{ width: "24px", height: "24px" }}
                                />
                              </div>
                              <Autocomplete
                                id="to"
                                className="country-select"
                                options={fromOptions}
                                getOptionLabel={(option) => option.name}
                                onChange={handleChange}
                                onInputChange={(event, newInputValue) => {
                                  setTo(newInputValue);
                                }}
                                renderInput={(params) => (
                                  <Field
                                    style={{ width: "230px" }}
                                    component={TextField}
                                    {...params}
                                    name="To"
                                    label="To"
                                    variant="outlined"
                                    fullWidth
                                  />
                                )}
                              />

                              {/* {errors.to && touched.to && (
                                <div className="input-feedback">
                                  {errors.to}
                                </div>
                              )} */}
                            </Grid>

                            <Grid
                              item
                              xs={7}
                              style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                              }}
                            >
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                  className={classes.date_picker}
                                  margin="normal"
                                  id="date-picker-dialog"
                                  // label='Date picker dialog'
                                  format="MM/dd/yyyy"
                                  value={values.startDate}
                                  onChange={(value) =>
                                    props.setFieldValue("startDate", value)
                                  }
                                  InputAdornmentProps={{ position: "start" }}
                                  KeyboardButtonProps={{
                                    "aria-label": "change date",
                                  }}
                                  InputProps={{
                                    disableUnderline: true,
                                  }}
                                />

                                <KeyboardDatePicker
                                  className={classes.date_picker}
                                  margin="normal"
                                  id="date-picker-dialog"
                                  // label='Date picker dialog'
                                  format="MM/dd/yyyy"
                                  value={values.endDate}
                                  onChange={(value) =>
                                    props.setFieldValue("endDate", value)
                                  }
                                  InputAdornmentProps={{ position: "start" }}
                                  KeyboardButtonProps={{
                                    "aria-label": "change date",
                                  }}
                                  InputProps={{
                                    disableUnderline: true,
                                  }}
                                />
                              </MuiPickersUtilsProvider>
                              {errors.endDate && touched.endDate && (
                                <div className="input-feedback">
                                  {errors.endDate}
                                </div>
                              )}
                              <TextField
                                id="NoP"
                                placeholder="No.of People"
                                label="No.of People"
                                variant="outlined"
                                value={values.NoP}
                                onChange={handleNoP}
                                onBlur={handleBlur}
                                className={
                                  errors.NoP && touched.NoP
                                    ? "text-input error"
                                    : "text-input"
                                }
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <img src={user}></img>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                              <Popover
                                open={Boolean(anchorEl)}
                                anchorEl={anchorEl}
                                onClick={handlePopoverClose}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "center",
                                }}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "center",
                                }}
                                // autoFocus={false}
                              >
                                <Grid
                                  container
                                  spacing={2}
                                  style={{ marginTop: "5px", padding: "3px" }}
                                >
                                  <Grid item xs={6}>
                                    <Typography
                                      style={{
                                        marginLeft: "15px",
                                      }}
                                    >
                                      Adults
                                    </Typography>
                                    <Typography
                                      style={{
                                        marginLeft: "15px",
                                        fontSize: "12px",
                                      }}
                                    >
                                      Age 13 or above
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={2}></Grid>
                                  <Grid item xs={4}>
                                    <Grid container spacing={2}>
                                      <Grid
                                        item
                                        xs={2}
                                        style={{
                                          textAlign: "center",
                                        }}
                                      >
                                        <Button>
                                          <img
                                            style={{
                                              width: "65%",
                                              height: "80%",
                                              position: "relative",
                                              right: "22px",
                                            }}
                                            src={subtractPeople}
                                            onClick={subtractAdults}
                                          ></img>
                                        </Button>
                                      </Grid>
                                      <Grid item xs={2}>
                                        <Typography
                                          style={{
                                            marginTop: "10px",
                                            marginLeft: "15px",
                                            textAlign: "center",
                                          }}
                                        >
                                          {adults}
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={2}>
                                        <Button>
                                          <img
                                            src={addPeople}
                                            onClick={addAdults}
                                            style={{
                                              width: "65%",
                                              height: "80%",
                                            }}
                                          ></img>
                                        </Button>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Divider />
                                <Grid
                                  container
                                  spacing={2}
                                  style={{ marginTop: "5px", padding: "3px" }}
                                >
                                  <Grid item xs={6}>
                                    <Typography
                                      style={{
                                        marginLeft: "15px",
                                      }}
                                    >
                                      Children
                                    </Typography>
                                    <Typography
                                      style={{
                                        marginLeft: "15px",
                                        fontSize: "12px",
                                      }}
                                    >
                                      Age 2 to 12
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={2}></Grid>
                                  <Grid item xs={4}>
                                    <Grid container spacing={2}>
                                      <Grid
                                        item
                                        xs={2}
                                        style={{
                                          textAlign: "center",
                                        }}
                                      >
                                        <Button>
                                          <img
                                            style={{
                                              width: "65%",
                                              height: "80%",
                                              position: "relative",
                                              right: "22px",
                                            }}
                                            onClick={subtractChildren}
                                          ></img>
                                        </Button>
                                      </Grid>
                                      <Grid item xs={2}>
                                        <Typography
                                          style={{
                                            marginTop: "10px",
                                            marginLeft: "15px",
                                            textAlign: "center",
                                          }}
                                        >
                                          {children}
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={2}>
                                        <Button>
                                          <img
                                            src={addPeople}
                                            style={{
                                              width: "65%",
                                              height: "80%",
                                            }}
                                            onClick={addChildren}
                                          ></img>
                                        </Button>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Divider />
                                <Grid
                                  container
                                  spacing={2}
                                  style={{ marginTop: "5px", padding: "3px" }}
                                >
                                  <Grid item xs={6}>
                                    <Typography
                                      style={{
                                        marginLeft: "15px",
                                      }}
                                    >
                                      Infants
                                    </Typography>
                                    <Typography
                                      style={{
                                        marginLeft: "15px",
                                        fontSize: "12px",
                                      }}
                                    >
                                      Under 2
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={2}></Grid>
                                  <Grid item xs={4}>
                                    <Grid container spacing={2}>
                                      <Grid
                                        item
                                        xs={2}
                                        style={{
                                          textAlign: "center",
                                        }}
                                      >
                                        <Button>
                                          <img
                                            style={{
                                              width: "65%",
                                              height: "80%",
                                              position: "relative",
                                              right: "22px",
                                            }}
                                            src={subtractPeople}
                                            onClick={subtractInfants}
                                          ></img>
                                        </Button>
                                      </Grid>
                                      <Grid item xs={2}>
                                        <Typography
                                          style={{
                                            marginTop: "10px",
                                            marginLeft: "15px",
                                            textAlign: "center",
                                          }}
                                        >
                                          {infants}
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={2}>
                                        <Button>
                                          <img
                                            src={addPeople}
                                            style={{
                                              width: "65%",
                                              height: "80%",
                                            }}
                                            onClick={addInfants}
                                          ></img>
                                        </Button>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Popover>

                              {errors.NoP && touched.NoP && (
                                <div className="input-feedback">
                                  {errors.NoP}
                                </div>
                              )}
                              <Button
                                type="submit"
                                style={{
                                  background: "#33BBFF",
                                  width: "35px",
                                  height: "54px",
                                }}
                                disabled={isSubmitting}
                                // onSubmit={() => {
                                //   handleSubmit();
                                // }}
                                // onClick={handleSubmit}
                              >
                                <img
                                  src={search}
                                  style={{ width: "24px", height: "24px" }}
                                />
                              </Button>
                            </Grid>

                            {/* <button
                          type='button'
                          className='outline'
                          onClick={handleReset}
                          disabled={!dirty || isSubmitting}
                        >
                          Reset
                        </button> */}
                          </Grid>
                        </form>
                      );
                    }}
                  </Formik>
                </div>
              </Paper>
            </Grid>
            <Grid xs={1}></Grid>
          </Grid>
        </Grid>
      </div>
      <div className={classes.grid_root}>
        {/* <GridList cellHeight={250} className={classes.gridList} cols={2}>
        {tileData.map((tile) => (
          <GridListTile key={bgImage} cols={2}>
            <img src={bgImage} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList> */}

        <Grid container spacing={3} className={classes.mid_div}>
          <Grid item xs={4} sm={4}>
            <img src={flightillustration}></img>
          </Grid>
          <Grid item xs={5} sm={5}>
            <div style={{ marginTop: "150px", marginLeft: "65px" }}>
              <Typography
                style={{ color: "#FFFFFF", fontSize: "26px", fontWeight: 400 }}
              >
                Are you waiting for the price to drop?
              </Typography>
              <br />
              <Typography style={{ color: "#FFFFFF", marginLeft: "45px" }}>
                Turn on our price alert to get notified weekly !
              </Typography>
            </div>
          </Grid>
          <Grid item xs={3} sm={3}>
            <div>
              <img
                style={{
                  width: "185px",
                  height: "100px",
                  position: "relative",
                  right: "150px",
                  float: "right",
                  top: "10px",
                }}
                src={cloudillustration2}
              ></img>
            </div>
            <div>
              <img
                style={{
                  width: "160px",
                  height: "100px",
                  position: "relative",
                  float: "right",
                  top: "100px",
                }}
                src={cloudillustration1}
              ></img>
            </div>
          </Grid>
        </Grid>
      </div>
      <div>
        <Grid container style={{ marginTop: "50px" }}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <Grid item xs={12}>
              <div>
                <Typography style={{ fontWeight: "bold", marginLeft: "15px" }}>
                  Latest Blog
                </Typography>
                <Typography
                  style={{
                    fontSize: "small",
                    textAlign: "right",
                    color: "#4BAFC9",
                  }}
                >
                  View All
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={4} sm={4}>
              <div className={classes.paper}>
                <img style={{ height: "250", width: "350px" }} src={blog1} />
                <br />
                <p>Maldives - May 03, 2020</p>
                <br />
                <Typography style={{ fontWeight: "bold" }}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                  nonumy.
                </Typography>
                <br />
                <Typography style={{ letterSpacing: 0, textAlign: "left" }}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum
                </Typography>
              </div>
            </Grid>
            <Grid item xs={4} sm={4}>
              <div className={classes.paper}>
                <img style={{ height: "250", width: "350px" }} src={blog2} />
                <br />
                <p>Maldives - May 03, 2020</p>
                <br />
                <Typography style={{ fontWeight: "bold" }}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                  nonumy.
                </Typography>
                <br />
                <Typography style={{ letterSpacing: 0, textAlign: "left" }}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum
                </Typography>
              </div>
            </Grid>
            <Grid item xs={4} sm={4}>
              <div className={classes.paper}>
                <img style={{ height: "250", width: "350px" }} src={blog3} />
                <br />
                <p>Maldives - May 03, 2020</p>
                <br />
                <Typography style={{ fontWeight: "bold" }}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                  nonumy.
                </Typography>
                <br />
                <Typography style={{ letterSpacing: 0, textAlign: "left" }}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
        <Grid container style={{ height: "400px" }} spacing={5}>
          <Grid item xs={1} sm={1}></Grid>
          <Grid item xs={4} sm={4}>
            <div>
              <img src={logo}></img>
              <Typography>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt et.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={2} sm={2} style={{ marginTop: "30px" }}>
            <Typography className={classes.tittle_text}>Company</Typography>
            <List aria-label="secondary mailbox folders">
              <ListItemLink to="/trash" primary="About" />
              <ListItemLink to="/spam" primary="Terms & Conditions" />
              <ListItemLink to="/spam" primary="Privacy Policy" />
              <ListItemLink to="/spam" primary="Covid-19 Updates" />
              <ListItemLink to="/spam" primary="FAQs" />
              <ListItemLink to="/spam" primary="Support" />
            </List>
          </Grid>
          <Grid item xs={2} sm={2} style={{ marginTop: "30px" }}>
            <Typography className={classes.tittle_text}>Explore</Typography>
            <List aria-label="secondary mailbox folders">
              <ListItemLink to="/trash" primary="Blog" />
              <ListItemLink to="/spam" primary="Maldives" />
              <ListItemLink to="/spam" primary="Paris" />
              <ListItemLink to="/spam" primary="Montenegro" />
              <ListItemLink to="/spam" primary="Italy" />
            </List>
          </Grid>
          <Grid item xs={2} sm={2} style={{ marginTop: "30px" }}>
            <Typography className={classes.tittle_text}>Product</Typography>
            <List aria-label="secondary mailbox folders">
              <ListItemLink to="/trash" primary="Flights" />
              <ListItemLink to="/spam" primary="Hotels" />
              <ListItemLink to="/spam" primary="Car Rental" />
              <ListItemLink to="/spam" primary="Price Track" />
            </List>
          </Grid>
        </Grid>
      </div>
      <div
        style={{
          border: "1px solid #DDDDDD",
          height: "70px",
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        <Typography style={{ marginTop: "25px" }}>
          © 2021 All Rights Reserved | Travel Booking
        </Typography>
      </div>
    </>
  );
}
