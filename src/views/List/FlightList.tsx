import React, { useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Formik } from "formik";
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
import FlightBG from "../../assets/pexels-pixabay-62623.jpeg";
import flight from "../../assets/Flight Info@2x.png";
import hotel from "../../assets/Icon metro-hotel-blue@2x.png";
import car from "../../assets/Icon awesome-car-blue@2x.png";
import SortPng from "../../assets/Sort@2x.png";
import blog1 from "../../assets/Blog image - 1@2x.png";
import RatingPng from "../../assets/Icon awesome-star@2x.png";
import parkingPng from "../../assets/Parking lot@2x.png";
import wifiPng from "../../assets/Wifi@2x.png";
import entertainment from "../../assets/Entertainment - Hotel@2x.png";
import prizeAnalysis1 from "../../assets/Price Analysis - Illustration 1@2x.png";
import prizeAnalysis2 from "../../assets/Price Analysis - Illustration 2@2x.png";
import user from "../../assets/Icon feather-user@2x.png";
import { Button, InputAdornment, Typography } from "@material-ui/core";
import TrackPricesContainer from "../TrackPrices/index";
import Box from "@material-ui/core/Box";
import { Divider } from "@material-ui/core";
import Chart from "../Chart/index";
import goAir from "../../assets/Flight logo - 1@2x.png";
import SpiceJet from "../../assets/Flight logo - 3@2x.png";
import indigo from "../../assets/Flight logo - 2@2x.png";
import flightIcon from "../../assets/Icon material-flight@2x.png";
// import BottomGrid from '../Airvays info/index'
import { _searchFlights } from '../../services/api/flight'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: "1200px",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    flightTop: {
      height: "300px",
      backgroundImage: `url(${FlightBG})`,
    },
    radio: {
      color: "#33BBFF",
      size: "medium",
      "&$checked": {
        color: "#33BBFF",
      },
    },
    checked: {
      color: "#33BBFF",
    },
    _ml15: {
      marginLeft: "15px",
      // flexGrow: 1,
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
  })
);

const Amenities = [
  {
    img: `url(${parkingPng})`,
    title: "Breakfast",
    author: "jill111",
    featured: true,
  },
  {
    img: `url(${wifiPng})`,
    title: "Tasty burger",
    author: "director90",
  },
  {
    img: `url(${entertainment})`,
    title: "Camera",
    author: "Danson67",
  },
];
export default function HotelsList() {
  const classes = useStyles();
  const [value, setValue] = React.useState("One-way");
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  useEffect(() => {
    searchFlights()
  }, [])
  const searchFlights = () => {
    _searchFlights({
      "from": "MAA",
      "to": "DEL",
      "currencyCode": "INR",
      "type": "one-way",
      "from_date": "2021-07-29",
      "to_date": "2021-07-31",
      "no_of_people": {
        "adults": 1,
        "children": 0,
        "infants": 0
      },
      "class": "ECONOMY",
      "filter": "fastest",
      "price_range_from": "",
      "price_range_to": ""
    }, function (error: any, response: any) {
      if (error == null) {
        if (response.status == 200) {

        } else {
        }
      } else if (response == null) {
        console.log(error);
      }
    });
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.flightTop}>
        <Grid item xs={1}>
          {" "}
        </Grid>
        <Grid item xs={10}>
          {/* icons div */}
          <Grid container style={{ marginTop: "75px" }}>
            <Grid xs={12}>
              <div style={{ textAlign: "center", display: "flex" }}>
                <div
                  style={{
                    width: "138px",
                    height: "98px",
                    background: "#EAF8FF",
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
          </Grid>
          {/* search */}

          <Grid container style={{ marginTop: "40px" }}>
            <Grid xs={12}>
              <Paper className={classes.paper}>
                <div>
                  <Formik
                    initialValues={{ email: "" }}
                    onSubmit={async (values) => {
                      await new Promise((resolve) => setTimeout(resolve, 500));
                      alert(JSON.stringify(values, null, 2));
                    }}
                    validationSchema={Yup.object().shape({
                      email: Yup.string().email().required("Required"),
                    })}
                  >
                    {(props) => {
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
                            <Grid style={{ margin: "12px" }}>
                              <RadioGroup
                                row
                                aria-label="gender"
                                name="gender1"
                                value={value}
                                onChange={handleRadioChange}
                              >
                                <FormControlLabel
                                  value="One-way"
                                  //   className={classes.formControlLabel}
                                  control={
                                    <Radio
                                      classes={{
                                        root: classes.radio,
                                        checked: classes.checked,
                                      }}
                                    />
                                  }
                                  label="One-way"
                                />
                                <FormControlLabel
                                  value="return"
                                  //   className={classes.formControlLabel}
                                  control={
                                    <Radio
                                      classes={{
                                        root: classes.radio,
                                        checked: classes.checked,
                                      }}
                                    />
                                  }
                                  label="Return"
                                />
                              </RadioGroup>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                              }}
                              spacing={1}
                            >
                              <TextField
                                id="email"
                                placeholder="From"
                                label="From"
                                variant="outlined"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                  errors.email && touched.email
                                    ? "text-input error"
                                    : "text-input"
                                }
                              />
                              <br />

                              {/* {errors.email && touched.email && (
                                <div className="input-feedback">
                                  {errors.email}
                                </div>
                              )} */}
                              <Typography>
                                <img
                                  src={exchange}
                                  style={{ marginTop: "10px" }}
                                ></img>
                              </Typography>

                              <TextField
                                id="email"
                                placeholder="To"
                                label="To"
                                variant="outlined"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                  errors.email && touched.email
                                    ? "text-input error"
                                    : "text-input"
                                }
                              />
                              <br />

                              {errors.email && touched.email && (
                                <div className="input-feedback">
                                  {errors.email}
                                </div>
                              )}

                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                  className={classes.date_picker}
                                  margin="normal"
                                  id="date-picker-dialog"
                                  // label='Date picker dialog'
                                  format="MM/dd/yyyy"
                                  value={selectedDate}
                                  onChange={handleDateChange}
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
                                  value={selectedDate}
                                  onChange={handleDateChange}
                                  InputAdornmentProps={{ position: "start" }}
                                  KeyboardButtonProps={{
                                    "aria-label": "change date",
                                  }}
                                  InputProps={{
                                    disableUnderline: true,
                                  }}
                                />
                              </MuiPickersUtilsProvider>
                              <TextField
                                id="Guests"
                                placeholder="No.of People"
                                // label="No.of People"
                                variant="outlined"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                  errors.email && touched.email
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

                              {errors.email && touched.email && (
                                <div className="input-feedback">
                                  {errors.email}
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
          </Grid>

          {/* Price analysis */}

          <Grid container spacing={3} style={{ marginTop: "20px" }}>
            <Grid item xs={12} container>
              <Grid item xs={6}>
                <Typography
                  style={{
                    textAlign: "left",
                    fontSize: "20px",
                    fontWeight: 500,
                    color: "#1C2460",
                  }}
                >
                  Price Analysis
                </Typography>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <TrackPricesContainer />
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={3} style={{ marginTop: "20px" }}>
            <Grid item xs={12} container>
              <Grid item xs={1}></Grid>
              <Grid container xs={10}>
                <Grid item xs={2}>
                  {/* <Typography> */}
                  <img style={{ width: "120px" }} src={prizeAnalysis1}></img>
                  {/* </Typography> */}
                </Grid>
                <Grid item xs={8}>
                  <Box
                    borderColor="#FFF2DE"
                    border={5}
                    style={{
                      padding: "20px",
                      textAlign: "center",
                      marginTop: "50px",
                      marginRight: "30px",
                    }}
                  >
                    <b style={{ textDecoration: "underline #DCAB5E" }}>
                      SGD $150
                    </b>{" "}
                    is the best available price right now!
                    <br /> The current prices are lower than usual. You'll save
                    money of $27 to $32
                  </Box>
                </Grid>
                <Grid item xs={2} style={{ marginTop: "30px" }}>
                  {/* <Typography> */}
                  <img style={{ width: "120px" }} src={prizeAnalysis2}></img>
                  {/* </Typography> */}
                </Grid>
              </Grid>
              <Grid item xs={1}></Grid>
            </Grid>
          </Grid>

          {/* Chart */}
          <Grid container style={{ marginTop: "80px" }} xs={12}>
            <Grid item xs={12}>
              <Chart />
            </Grid>
          </Grid>

          {/* serach results */}
          <Grid container>
            <Grid container spacing={3} style={{ marginTop: "20px" }}>
              <Grid item xs={12}>
                <Typography
                  style={{
                    textAlign: "left",
                    fontSize: "20px",
                    fontWeight: 500,
                  }}
                >
                  Search Results
                </Typography>
                <Typography style={{ textAlign: "right" }}>
                  23 of 165 hotels
                </Typography>
                <Typography style={{ color: "#4BAFC9" }}>Filter By</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={3} style={{ marginTop: "20px" }}>
              <Grid item xs={10} style={{ display: "flex" }}>
                <Button
                  style={{
                    color: "#FFF",
                    background: "#4BAFC9",
                    borderRadius: "20px",
                  }}
                >
                  Airlines : All
                </Button>
                <Button
                  style={{
                    color: "#FFF",
                    background: "#4BAFC9",
                    borderRadius: "20px",
                    marginLeft: "15px",
                  }}
                >
                  Price Range : $150 to $200
                </Button>
                <Button
                  style={{
                    color: "#FFF",
                    background: "#4BAFC9",
                    borderRadius: "20px",
                    marginLeft: "15px",
                  }}
                >
                  Class : Economy
                </Button>
                <Button
                  style={{
                    color: "#333333",
                    background: "#F7F7F7",
                    borderRadius: "20px",
                    marginLeft: "15px",
                  }}
                >
                  Duration
                </Button>
                <Button
                  style={{
                    color: "#333333",
                    background: "#F7F7F7",
                    borderRadius: "20px",
                    marginLeft: "15px",
                  }}
                >
                  No. Of Stops
                </Button>
              </Grid>
              <Grid
                item
                xs={2}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <div>
                  <img
                    src={SortPng}
                    style={{ width: "25px", height: "35px" }}
                  ></img>
                </div>
              </Grid>
            </Grid>

            {Array.from({ length: 10 }, (x: any, i) => (
              <div>
                <Grid
                  container
                  style={{
                    display: "flex",
                    marginTop: "40px",
                    backgroundColor: "white",
                    padding: "10px",
                  }}
                >
                  <Grid container>
                    <Grid item xs={2}>
                      <div>
                        <img
                          style={{ marginLeft: "30px" }}
                          src={SpiceJet}
                        ></img>
                      </div>
                      <Typography
                        style={{
                          fontSize: "14px",
                          color: "#1C2460",
                          opacity: "40%",
                          marginLeft: "35px",
                        }}
                      >
                        SpiceJet
                      </Typography>
                    </Grid>

                    <Grid item xs={1} style={{ color: "#1C2460" }}>
                      <div>
                        <p>09:05</p>
                        <p>
                          Chennai
                          <br />
                          MAA
                        </p>
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{
                        alignItems: "center",
                        textAlign: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography>Direct</Typography>
                      <div style={{ display: "flex" }}>
                        {"-------------------------"}
                        <img src={flightIcon}></img>
                        {"-------------------------"}
                      </div>
                      <Typography>0 hr 40 mins</Typography>
                    </Grid>
                    <Grid item xs={2} style={{ color: "#1C2460" }}>
                      <div>
                        <p>09:45</p>
                        <p>
                          Bengaluru Intl
                          <br />
                          BLR
                        </p>
                      </div>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    {/* <div style={{ display: "flex", marginTop: "20px" }}></div> */}
                    {/* </Grid> */}
                    <Grid
                      item
                      xs={2}
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        borderLeft: "1px solid #EDEDED",
                      }}
                    >
                      <div>
                        <Typography>
                          <span
                            style={{
                              fontSize: "22px",
                              fontWeight: 500,
                              color: "#1C2460",
                            }}
                          >
                            $120{" "}
                          </span>
                        </Typography>
                        <br />
                        <Button
                          variant="contained"
                          style={{ background: "#DCAB5E", color: "#fff" }}
                        >
                          View Details
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  container
                  style={{
                    display: "flex",
                    marginTop: "40px",
                    backgroundColor: "white",
                    padding: "10px",
                  }}
                >
                  <Grid container>
                    <Grid item xs={2}>
                      <div>
                        <img style={{ marginLeft: "30px" }} src={goAir}></img>
                      </div>
                      <Typography
                        style={{
                          fontSize: "14px",
                          color: "#1C2460",
                          opacity: "40%",
                          marginLeft: "35px",
                        }}
                      >
                        GoAir
                      </Typography>
                    </Grid>

                    <Grid item xs={1} style={{ color: "#1C2460" }}>
                      <div>
                        <p>09:05</p>
                        <p>
                          Chennai
                          <br />
                          MAA
                        </p>
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{
                        alignItems: "center",
                        textAlign: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography>Direct</Typography>
                      <div style={{ display: "flex" }}>
                        {"-------------------------"}
                        <img src={flightIcon}></img>
                        {"-------------------------"}
                      </div>
                      <Typography>0 hr 40 mins</Typography>
                    </Grid>
                    <Grid item xs={2} style={{ color: "#1C2460" }}>
                      <div>
                        <p>09:45</p>
                        <p>
                          Bengaluru Intl
                          <br />
                          BLR
                        </p>
                      </div>
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={2}>
                      <div>
                        <img style={{ marginLeft: "30px" }} src={indigo}></img>
                      </div>
                      <Typography
                        style={{
                          fontSize: "14px",
                          color: "#1C2460",
                          opacity: "40%",
                          marginLeft: "35px",
                        }}
                      >
                        Indigo
                      </Typography>
                    </Grid>

                    <Grid item xs={1} style={{ color: "#1C2460" }}>
                      <div>
                        <p>19:055</p>
                        <p>
                          Chennai
                          <br />
                          MAA
                        </p>
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{
                        alignItems: "center",
                        textAlign: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography>Direct</Typography>
                      <div style={{ display: "flex" }}>
                        {"-------------------------"}
                        <img src={flightIcon}></img>
                        {"-------------------------"}
                      </div>
                      <Typography>0 hr 40 mins</Typography>
                    </Grid>
                    <Grid item xs={2} style={{ color: "#1C2460" }}>
                      <div>
                        <p>20:55</p>
                        <p>
                          Bengaluru Intl
                          <br />
                          BLR
                        </p>
                      </div>
                    </Grid>
                    <Grid item xs={1}></Grid>

                    {/* <div style={{ display: "flex", marginTop: "20px" }}></div> */}
                    {/* </Grid> */}
                    <Grid
                      item
                      xs={2}
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        borderLeft: "1px solid #EDEDED",
                      }}
                    >
                      <div>
                        <Typography>
                          <span
                            style={{
                              fontSize: "22px",
                              fontWeight: 500,
                              color: "#1C2460",
                            }}
                          >
                            $120{" "}
                          </span>
                        </Typography>
                        <br />
                        <Button
                          variant="contained"
                          style={{ background: "#DCAB5E", color: "#fff" }}
                        >
                          View Details
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            ))}
            <Grid item xs={1}>
              {" "}
            </Grid>
          </Grid>
          {/* <BottomGrid /> */}
        </Grid>
      </Grid>
    </div>
  );
}
