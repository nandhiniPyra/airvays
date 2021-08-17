import React, { useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FlightBG from "../../assets/pexels-pixabay-62623.jpeg";
import SortPng from "../../assets/Sort@2x.png";
import prizeAnalysis1 from "../../assets/Price Analysis - Illustration 1@2x.png";
import prizeAnalysis2 from "../../assets/Price Analysis - Illustration 2@2x.png";
import {
  Button,
  CircularProgress,
  ListItemSecondaryAction,
  Typography,
} from "@material-ui/core";
import TrackPricesContainer from "../TrackPrices/index";
import TransparentTopBar from "../../TopBar/index";
import Box from "@material-ui/core/Box";
import { Divider } from "@material-ui/core";
import Chart from "../Chart/index";
import SpiceJet from "../../assets/Flight logo - 3@2x.png";
import flightIcon from "../../assets/Icon material-flight@2x.png";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Popper, { PopperPlacementType } from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import { _searchFlights } from "../../services/api/flight";
import filterdata from "./Filter";
import { useLocation } from "react-router";
import Slider from "@material-ui/core/Slider";
import moment from "moment";
import SearchComponent from "../SearchComponent";
import _ from "lodash";
import BottomGrid from "../Airvays info";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: "1200px",
      background: "#FFFFFF",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    flightTop: {
      height: "30%",
      backgroundImage: `url(${FlightBG})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
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
    slider_clr: {
      marginTop: "15px",
      color: "#4BAFC9",
      "&..MuiSlider-root": {
        color: "#4BAFC9",
      },
    },
  })
);

let initialstate = {
  from: "",
  to: "",
  currencyCode: "INR",
  type: "one-way",
  from_date: null,
  to_date: null,
  no_of_people: {
    adults: 0,
    children: 0,
    infants: 0,
  },
  class: "ECONOMY",
};

export default function FlightList() {
  const classes = useStyles();
  const { state }: any = useLocation();
  const [filtersData, setFiltersData] = useState([]);
  const [filtersDataValue, setFiltersDataValue] = useState([]);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<PopperPlacementType>();
  const [anchorEl1, setAnchorEl1] = useState<HTMLButtonElement | null>(null);
  const [anchorEl2, setAnchorEl2] = useState<HTMLButtonElement | null>(null);
  const [anchorEl3, setAnchorEl3] = useState<HTMLButtonElement | null>(null);
  const [anchorEl4, setAnchorEl4] = useState<HTMLButtonElement | null>(null);
  const [openpricerange, setOpenpricerange] = useState(false);
  const [pricevalue, setpriceValue] = React.useState<number[]>([150, 200]);
  const [outBoundValue, setOutBoundValue] = React.useState<number[]>([
    150,
    200,
  ]);
  const [returnValue, setReturnValue] = React.useState<number[]>([150, 200]);
  const [outBoundTimeValue, setOutBoundTimeValue] = React.useState<any>([
    "00:00",
    "23:59",
  ]);
  const [returnTimeValue, setReturnTimeValue] = React.useState<any>([
    "00:00",
    "23:59",
  ]);
  const [listData, setListData] = useState([]);
  const [openStop, setOpenStop] = useState(false);
  const [progress, setProgress] = useState(false);
  const [openDuration, setOpenDuration] = useState(false);
  const [searchFlightDetails, setSearchFlightDetails] = useState(initialstate);
  const [flightsData, setFlightsData] = useState([
    {
      id: 1,
      code: "ALL",
      name: "ALL",
      isChecked: false,
      price: "",
    },
    {
      id: 2,
      code: "AC",
      name: "AIR CANADA",
      isChecked: false,
      price: "",
    },
    {
      id: 3,
      code: "AI",
      name: "AIR INDIA",
      isChecked: false,
      price: "",
    },
    {
      id: 4,
      code: "LH",
      name: "LUFTHANSA",
      isChecked: false,
      price: "",
    },
    {
      id: 5,
      code: "UK",
      name: "VISTARA",
      isChecked: false,
      price: "",
    },
    {
      id: 6,
      code: "6E",
      name: "IndiGo",
      isChecked: false,
      price: "",
    },
  ]);
  const [isAlert, setAlert] = useState(false);

  const handleDuration = (newPlacement: PopperPlacementType) => (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl4(event.currentTarget);
    setOpenDuration((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const handleStop = (newPlacement: PopperPlacementType) => (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl3(event.currentTarget);
    setOpenStop((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const handleOutbound = (event: any, newValue: number | number[]) => {
    setOutBoundValue(newValue as number[]);
    let data = [];
    let val: any = newValue;
    let time1 = `${(val[0] / 60) ^ 0}:` + (val[0] % 60);
    let time2 = `${(val[1] / 60) ^ 0}:` + (val[1] % 60);
    data.push(time1, time2);
    setOutBoundTimeValue(data);
  };

  const handleReturn = (event: any, newValue: number | number[]) => {
    setReturnValue(newValue as number[]);
    let data = [];
    let val: any = newValue;
    let time1 = `${(val[0] / 60) ^ 0}:` + (val[0] % 60);
    let time2 = `${(val[1] / 60) ^ 0}:` + (val[1] % 60);
    data.push(time1, time2);
    setReturnTimeValue(data);
  };
  const handleChangeprice = (event: any, newValue: number | number[]) => {
    setpriceValue(newValue as number[]);
  };
  function valuetext(value: number) {
    return `${value}`;
  }
  const handleClick = (newPlacement: PopperPlacementType) => (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl1(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  const handleClickpricerage = (newPlacement: PopperPlacementType) => (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl2(event.currentTarget);
    setOpenpricerange((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const searchFlights = (req: any) => {
    if (req.no_of_people.adults) {
      setProgress(true);
      _searchFlights(req, function (error: any, response: any) {
        if (error == null) {
          if (response.status == 200) {
            let data = response.result.data;
            let item1 = data.map((item: any, index: any) => {
              //oneway
              if (item.itineraries.length == 1) {
                item.itineraries.map((value: any, indx: any) => {
                  if (value.segments[0]) {
                    value["depature"] = value.segments[0].departure.iataCode;
                    value["depatureAt"] = value.segments[0].departure.at;
                    value["arrival"] =
                      value.segments[
                        value.segments.length - 1
                      ].arrival.iataCode;
                    value["arrivalAt"] =
                      value.segments[value.segments.length - 1].arrival.at;
                    value["stop"] = "Direct";
                    value["from_city"] = req.fromcity;
                    value["to_city"] = req.tocity;
                  }
                });
              }
              //return
              else {
                item.itineraries.map((value: any, indx: any) => {
                  let length = value.segments.length - 1;

                  value["depature"] = value.segments[0].departure.iataCode;
                  value["depatureAt"] = value.segments[0].departure.at;
                  value["arrival"] = value.segments[length].arrival.iataCode;
                  value["arrivalAt"] = value.segments[length].arrival.at;
                  value["stop"] = `${length} + Stops`;

                  if (value.segments[0]) {
                    item.itineraries[0]["from_city"] = req.fromcity;
                    item.itineraries[0]["to_city"] = req.tocity;
                  }
                  if (item.itineraries.length > 0 && value.segments[length]) {
                    item.itineraries[item.itineraries.length - 1]["from_city"] =
                      req.tocity;
                    item.itineraries[item.itineraries.length - 1]["to_city"] =
                      req.fromcity;
                  }
                });
              }

              return item;
            });
            setFiltersData(item1);
            setFiltersDataValue(item1);
            setListData(item1);
            setProgress(false);
          }
        } else if (response == null) {
          setProgress(false);
        }
      });
    } else {
    }
  };

  const handleTime = (time: any) => {
    const Timing = moment(time).format("LT");
    return Timing;
  };

  const handleToggle = (value: any) => () => {
    setAlert(false);
    setFiltersData(filtersDataValue);
    if (value == "ALL") {
      let flights = flightsData.map((x) => {
        x.isChecked = !x.isChecked;
        return x;
      });
      setFlightsData(flights);
    } else {
      const data = flightsData.map((x) => {
        if (x.name === value) {
          x.isChecked = !x.isChecked;
        }
        return x;
      });
      setFlightsData(data);
    }
  };
  const handleStops = (value: any) => () => {
    setAlert(false);
    setListData(filtersDataValue);
    const data = filtersData.filter(
      (item: any) => item.itineraries[0].segments.length - 1 == value
    );
    console.log(data, "filtersDataValue", filtersDataValue);
    if (data.length) {
      setListData(data);
    } else {
      setListData([]);
    }
  };

  const closeAirline = () => {
    let flights = flightsData.map((x) => {
      x.isChecked = false;
      return x;
    });
    setFlightsData(flights);
    setListData(filtersDataValue);
  };

  const applyAirlineFilter = () => {
    setAlert(false);
    const selected = flightsData.filter((x) => x.isChecked == true);
    let data: any = [];
    const flightsKey = selected.map((item) => {
      data.push({ carrierCode: item.code });
    });
    let result: any = _.filter(listData, {
      itineraries: [{ segments: data }],
    });
    if (result.length) {
      setListData(result);
    } else {
      setAlert(true);
      setListData([]);
    }
  };

  const clearDuration = () => {
    setOutBoundTimeValue(["00:00", "23:59"]);
    setReturnTimeValue(["00:00", "23:59"]);
  };
  useEffect(() => {
    if (_.some(searchFlightDetails, _.isEmpty) && state && state.stateSend) {
      let value: any = _.omitBy(state.stateSend, ["fromcity", "tocity"]);
      setSearchFlightDetails(value);
      searchFlights(value);
    }
  }, []);

  const chartData = {
    from: "MAA",
    to: "DEL",
    from_date: "2021-08-10",
    currency_code: "INR",
    oneWay: false,
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.flightTop}>
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <TransparentTopBar />
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <div style={{ marginTop: "14%" }}>
            <SearchComponent
              request={searchFlightDetails}
              currentpage={true}
              search={(value: any) => searchFlights(value)}
            />
          </div>
          <Grid container spacing={3} style={{ marginTop: "20px" }}>
            <Grid item xs={12} container>
              <Grid item xs={1}></Grid>
              <Grid item xs={5}>
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
              <Grid item xs={5} style={{ textAlign: "right" }}>
                <TrackPricesContainer request={searchFlightDetails} />
              </Grid>
              <Grid item xs={1}></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={3} style={{ marginTop: "15%" }}>
        <Grid item xs={1}></Grid>
        <Grid container xs={10}>
          <Grid item xs={2}>
            <img alt="" style={{ width: "120px" }} src={prizeAnalysis1}></img>
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
              <b style={{ textDecoration: "underline #DCAB5E" }}>SGD $150</b>
              is the best available price right now!
              <br /> The current prices are lower than usual. You'll save money
              of $27 to $32
            </Box>
          </Grid>
          <Grid item xs={2} style={{ marginTop: "30px" }}>
            <img alt="" style={{ width: "120px" }} src={prizeAnalysis2}></img>
          </Grid>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
      {/* Chart */}
      <Grid container style={{ marginTop: "80px" }} xs={12}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Chart params={chartData} />
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>

      {isAlert && (
        <div
          style={{
            textAlign: "center",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography>{"No Flights Found"}</Typography>
        </div>
      )}
      {/* serach results */}
      <div style={{ background: "#E4F4FC" }}>
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
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
              23 of 165 Flights
            </Typography>
            <Typography style={{ color: "#4BAFC9" }}>Filter By</Typography>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>

        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          <Grid item xs={1}></Grid>
          <Grid item xs={8} style={{ display: "flex" }}>
            {/* <ClickAwayListener onClickAway={() => setOpen(false)}> */}
            <Button
              style={{
                color: "#FFF",
                background: "#4BAFC9",
                borderRadius: "20px",
              }}
              onClick={handleClick("bottom-start")}
            >
              Airlines : All
            </Button>
            {/* </ClickAwayListener> */}

            <Popper
              style={{ width: "250px", marginTop: "15px" }}
              open={open}
              anchorEl={anchorEl1}
              placement={placement}
              transition
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper>
                    <List>
                      {flightsData.map((v) => {
                        const labelId = `checkbox-list-label-${v.id}`;
                        return (
                          <ListItem
                            key={v.id}
                            role={undefined}
                            dense
                            button
                            onClick={handleToggle(v.name)}
                          >
                            <Grid container>
                              <Grid item xs={2}>
                                <ListItemIcon>
                                  <Checkbox
                                    edge="start"
                                    checked={v.isChecked}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                      "aria-labelledby": labelId,
                                    }}
                                    style={{
                                      color: "#4BAFC9",
                                    }}
                                  />
                                </ListItemIcon>
                              </Grid>
                              <Grid item xs={8}>
                                <ListItemText id={labelId} primary={v.name} />
                              </Grid>
                              <Grid item xs={2}>
                                <ListItemText id={labelId} primary={v.price} />
                              </Grid>
                            </Grid>
                          </ListItem>
                        );
                      })}
                      <Divider />{" "}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <div>
                          <Button onClick={closeAirline}>clear</Button>
                        </div>
                        <div>
                          <Button
                            onClick={() => {
                              // setFiltersData(filterdata(filtersData));
                              applyAirlineFilter();
                            }}
                            variant="contained"
                            style={{
                              backgroundColor: "#4BAFC9",
                              color: "#fff",
                              borderRadius: "50px",
                              height: "30px",
                              marginTop: "5px",
                            }}
                          >
                            Apply
                          </Button>
                        </div>{" "}
                      </div>
                    </List>
                  </Paper>
                </Fade>
              )}
            </Popper>

            {/* <ClickAwayListener
                    onClickAway={() => setOpenpricerange(false)}> */}
            <Button
              style={{
                color: "#FFF",
                background: "#4BAFC9",
                borderRadius: "20px",
                marginLeft: "15px",
              }}
              onClick={handleClickpricerage("bottom-start")}
            >
              Price Range : $150 to $200
            </Button>
            {/* </ClickAwayListener> */}
            <Popper
              style={{ width: "20%", marginTop: "15px" }}
              open={openpricerange}
              anchorEl={anchorEl2}
              placement={placement}
              transition
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper style={{ padding: "20px" }}>
                    <Grid container spacing={10}>
                      <Grid item xs={12}>
                        <Typography id="range-slider" gutterBottom>
                          {`$${pricevalue[0]} to $${pricevalue[1]}`}
                        </Typography>
                        <Slider
                          className={classes.slider_clr}
                          value={pricevalue}
                          onChange={handleChangeprice}
                          valueLabelDisplay="auto"
                          aria-labelledby="range-slider"
                          getAriaValueText={valuetext}
                          min={1}
                          max={1000}
                        />
                      </Grid>
                    </Grid>
                    <Divider />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <div>
                        <Button>Reset</Button>
                      </div>
                      <div>
                        <Button
                          onClick={() => {
                            setFiltersData(filterdata(filtersData));
                          }}
                          variant="contained"
                          style={{
                            backgroundColor: "#4BAFC9",
                            color: "#fff",
                            borderRadius: "50px",
                            marginTop: "5px",
                          }}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  </Paper>
                </Fade>
              )}
            </Popper>

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
              onClick={handleDuration("bottom-start")}
              style={{
                color: "#333333",
                background: "#F7F7F7",
                borderRadius: "20px",
                marginLeft: "15px",
              }}
            >
              Duration
            </Button>
            {/* duration filter */}

            <Popper
              style={{ width: "20%", marginTop: "15px" }}
              open={openDuration}
              anchorEl={anchorEl4}
              placement={placement}
              transition
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper style={{ padding: "20px" }}>
                    <Grid container spacing={10}>
                      {/* <Grid item xs={12}>
                            
                            </Grid> */}
                      <Grid item xs={12}>
                        <div>
                          <Typography style={{ fontSize: "16px" }}>
                            {"Outbound"}
                          </Typography>
                          <Typography
                            id="range-slider"
                            gutterBottom
                            style={{ color: "#4BAFC9" }}
                          >
                            {`${outBoundTimeValue[0]} - ${outBoundTimeValue[1]}`}
                          </Typography>
                          <Slider
                            className={classes.slider_clr}
                            value={outBoundValue}
                            onChange={handleOutbound}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            getAriaValueText={valuetext}
                            min={1}
                            max={1000}
                          />
                        </div>
                        <div>
                          <Typography style={{ fontSize: "16px" }}>
                            {"Return"}
                          </Typography>
                          <Typography
                            id="range-slider"
                            gutterBottom
                            style={{ color: "#4BAFC9" }}
                          >
                            {`${returnTimeValue[0]} - ${returnTimeValue[1]}`}
                          </Typography>
                          <Slider
                            className={classes.slider_clr}
                            value={returnValue}
                            onChange={handleReturn}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            getAriaValueText={valuetext}
                            min={1}
                            max={1000}
                          />
                        </div>
                      </Grid>
                    </Grid>
                    <Divider />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <div>
                        <Button onClick={clearDuration}>Reset</Button>

                        <Button
                          onClick={() => {
                            setFiltersData(filterdata(filtersData));
                          }}
                          variant="contained"
                          style={{
                            backgroundColor: "#4BAFC9",
                            color: "#fff",
                            borderRadius: "50px",
                            marginTop: "5px",
                          }}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  </Paper>
                </Fade>
              )}
            </Popper>
            <Button
              onClick={handleStop("bottom-start")}
              style={{
                color: "#333333",
                background: "#F7F7F7",
                borderRadius: "20px",
                marginLeft: "15px",
              }}
            >
              No. Of Stops
            </Button>

            <Popper
              style={{ width: "20%", marginTop: "15px" }}
              open={openStop}
              anchorEl={anchorEl3}
              placement={placement}
              transition
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper style={{ background: "" }}>
                    <div>
                      <Typography variant="h5" style={{ marginLeft: "5px" }}>
                        {"stops"}
                      </Typography>
                    </div>
                    <Typography
                      style={{ marginLeft: "15px", marginTop: "15px" }}
                    >
                      {"Direct"}
                    </Typography>

                    <div style={{ marginTop: "15px" }}>
                      <List>
                        {[
                          { name: "1 stop", price: "68,888", value: 1 },
                          { name: "2+ stop", price: "66,888", value: 2 },
                        ].map((value) => {
                          const labelId = `checkbox-list-label-${value}`;
                          return (
                            <ListItem
                              // key={v.id}
                              role={undefined}
                              dense
                              button
                              onClick={handleStops(value.value)}
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  // checked={}
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps={{
                                    "aria-labelledby": labelId,
                                  }}
                                />
                              </ListItemIcon>
                              <ListItemText id={labelId} primary={value.name} />
                              <ListItemSecondaryAction>
                                {value.price}
                              </ListItemSecondaryAction>
                            </ListItem>
                          );
                        })}
                      </List>
                    </div>
                  </Paper>
                </Fade>
              )}
            </Popper>
          </Grid>
          <Grid
            item
            xs={2}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <div>
              <img alt="" src={SortPng} style={{ height: "35px" }}></img>
            </div>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>

        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={10} style={{ marginBottom: "5%" }}>
            {progress ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress
                  size={40}
                  style={{ color: "rgb(75, 175, 201)" }}
                />
              </div>
            ) : (
              <>
                {listData.length > 0 ? (
                  listData.map((x: any) => (
                    <Grid
                      container
                      style={{
                        display: "flex",
                        marginTop: "40px",
                        backgroundColor: "white",
                        padding: "10px",
                      }}
                    >
                      <>
                        {x.itineraries.map((item: any) => (
                          <Grid
                            container
                            item
                            xs={10}
                            style={{
                              color: "#1C2460",
                              marginTop: "15px",
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                            //  onClick={()=>handleFlightDetails(item)}
                          >
                            <div>
                              <div>
                                <img
                                  alt=""
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
                            </div>

                            <div>
                              {handleTime(item.depatureAt)}
                              <br />
                              <Typography style={{ marginTop: "5px" }}>
                                {/* Chennai */}
                                {item.from_city}
                                {console.log(item.from_city, "OOOO", item)}
                              </Typography>
                              <br />
                              {item.depature}
                            </div>
                            <div>
                              <Typography style={{ textAlign: "center" }}>
                                {x.itineraries[0].segments.length - 1 == 1
                                  ? "1 STOP"
                                  : x.itineraries[0].segments.length -
                                    1 +
                                    "STOPS"}
                              </Typography>
                              <div style={{ display: "flex" }}>
                                {"-------------------------"}
                                <img alt="" src={flightIcon}></img>
                                {"-------------------------"}
                              </div>
                              <Typography
                                style={{
                                  marginTop: "5px",
                                  textAlign: "center",
                                }}
                              >
                                {item.duration}
                              </Typography>
                            </div>
                            <div>
                              {handleTime(item.arrivalAt)}
                              <Typography style={{ marginTop: "5px" }}>
                                {/* Bengaluru Intl */}
                                {item.to_city}
                              </Typography>
                              <br />
                              {item.arrival}
                            </div>
                          </Grid>
                        ))}
                      </>

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
                        <div
                          style={{
                            position: "relative",
                            left: "75%",
                            bottom: "150px",
                          }}
                        >
                          {/* <FavoriteIcon style={{ color: 'red' }} /> */}
                        </div>
                        <div>
                          <Typography>
                            <span
                              style={{
                                fontSize: "22px",
                                fontWeight: 500,
                                color: "#1C2460",
                              }}
                            >
                              {x.price.currency}
                              {x.price.base}
                            </span>
                          </Typography>
                          <br />
                          <Button
                            variant="contained"
                            style={{
                              background: "#DCAB5E",
                              color: "#fff",
                            }}
                          >
                            View Details
                          </Button>
                        </div>
                      </Grid>
                    </Grid>
                  ))
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "15px",
                    }}
                  >
                    <Typography variant="h6">{"No Flights Found"}</Typography>
                  </div>
                )}
              </>
            )}
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </div>
      <div style={{ marginTop: "5%" }}>
        <BottomGrid />
      </div>
    </div>
  );
}
