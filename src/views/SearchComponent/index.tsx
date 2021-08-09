import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import carImg from "../../assets/Icon awesome-car-blue@2x.png";
import hotelImg from "../../assets/Icon metro-hotel-blue@2x.png";
import { _getAirports } from "../../services/api/flight";
import { ErrorMessage, Field, Formik } from "formik";
import { FlightListRoute } from "../../Routes/RoutesConstants";
import user from "../../assets/Icon feather-user@2x.png";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles,
  Theme,
  Grid,
  Paper,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  Popover,
} from "@material-ui/core";
import exchange from "../../assets/exchange@2x.png";
import flightImg from "../../assets/Flight Info@2x.png";
import React from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import addPeople from "../../assets/People - Add@2x.png";
import subtractPeople from "../../assets/People - subtract@2x.png";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker,
} from "@material-ui/pickers";
import search from "../../assets/icons8-search-30.png";
import { Autocomplete } from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  _ml15: {
    marginLeft: "15px",
    // flexGrow: 1,
  },
  avatar: {
    height: 100,
    width: 100,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    borderRadius: "9px",
    borderColor: "#FFFFFF",
    height: "140px",
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
  date_picker: {
    color: "#333333",
    "& .MuiInputBase-root": {
      padding: 0,
      border: "1px solid #bfb7b7",
      borderRadius: "5px",
      //   width: "160px",
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
  popOver: {
    "&. .MuiPopover-paper": {
      borderRadius: "10px",
    },
  },
}));

export default function SearchComponent() {
  const classes = useStyles();
  const Navigate = useNavigate();
  const [fromOptions, setFromOptions] = useState<Array<any>>([{}]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [flight, setFlight] = useState(false);
  const [hotel, setHotel] = useState(false);
  const [car, setCar] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [type, setType] = React.useState();
  const [nop, setNop] = useState(0);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  let initialstate = {
    from: "",
    to: "",
    type: "One-way",
    startDate: null,
    endDate: null,
    noOfPeople: {
      adults: 0,
      children: 0,
      infants: 0,
    },
  };
  const [req, setreq] = useState(initialstate);

  console.log(req, "req");

  useEffect(() => {
    getAirportsFrom();
    getAirportsTo();
  }, [from, to]);

  const getAirportsFrom = () => {
    _getAirports({ search: from }, function (error: any, response: any) {
      setFromOptions(response.result);
      // data.map((d: any) => setFromCode(d.code));
      // let listItems = data.map((d: any) => setFromCode(d.code));
      // console.log(listItems);
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
      let data = response.result;
      // let listItems = data.map((d: any) => setToCode(d.code));
      // console.log(listItems);
      if (error == null) {
        if (response.status == 200) {
        } else {
        }
      } else if (response == null) {
        console.log(error);
      }
    });
  };

  const onChange = (key: any, value: any, nop: any) => {
    if (key == "adults" && nop == "+") {
      setreq((prevState) => {
        return {
          ...prevState,
          [key]: prevState.noOfPeople.adults + 1,
        };
      });
    }
    if (key == "adults" && nop == "-") {
      setreq((prevState) => {
        return {
          ...prevState,
          [key]: prevState.noOfPeople.adults + 1,
        };
      });
    }
    if (key == "children" && nop == "+") {
      setreq((prevState) => {
        return {
          ...prevState,
          [key]: prevState.noOfPeople.children + 1,
        };
      });
    }
    if (key == "children" && nop == "-") {
      setreq((prevState) => {
        return {
          ...prevState,
          [key]: prevState.noOfPeople.children + 1,
        };
      });
    }
    if (key == "infants" && nop == "+") {
      setreq((prevState) => {
        return {
          ...prevState,
          [key]: prevState.noOfPeople.infants + 1,
        };
      });
    }
    if (key == "infants" && nop == "-") {
      setreq((prevState) => {
        return {
          ...prevState,
          [key]: prevState.noOfPeople.infants + 1,
        };
      });
    }
    if (
      key == "startDate" ||
      key == "endDate" ||
      key == "from" ||
      key == "to" ||
      key == "type"
    ) {
      setreq((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    }
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

  return (
    <>
      <Grid container style={{ marginTop: "7%" }}>
        <Grid xs={1}></Grid>
        <Grid xs={10}>
          <div style={{ textAlign: "center", display: "flex" }}>
            <div
              style={{
                backgroundColor: flight ? "transparent" : "#EAF8FF",
                color: flight ? "#B7E7FF" : "#1C2460",
                width: "128px",
                height: "88px",
                borderRadius: "10px",
              }}
              onClick={() => setFlight(!flight)}
            >
              <img
                src={flightImg}
                style={{ marginTop: "15px", height: "25px", width: "25px" }}
              ></img>
              <br />
              <div style={{ marginTop: "9px" }}>Flights</div>
            </div>
            <div
              style={{
                backgroundColor: hotel ? "transparent" : "#EAF8FF",
                color: hotel ? "#B7E7FF" : "#1C2460",
                width: "128px",
                height: "88px",
                borderRadius: "10px",
              }}
              onClick={() => setHotel(!hotel)}
              className={classes._ml15}
            >
              <img
                src={hotelImg}
                style={{ marginTop: "15px", height: "25px", width: "25px" }}
              />
              <br />

              <div style={{ marginTop: "9px" }}>Hotels</div>
            </div>
            <div
              style={{
                backgroundColor: car ? "transparent" : "#EAF8FF",
                color: car ? "#B7E7FF" : "#1C2460",
                width: "128px",
                height: "88px",
                borderRadius: "10px",
              }}
              onClick={() => setCar(!car)}
              className={classes._ml15}
            >
              <img
                src={carImg}
                style={{ marginTop: "15px", height: "25px", width: "25px" }}
              />
              <br />
              <div style={{ marginTop: "9px" }}>Car Rental</div>
            </div>
          </div>
        </Grid>
        <Grid xs={1}></Grid>
      </Grid>
      <Grid container style={{ marginTop: "15px" }}>
        <Grid xs={1}></Grid>
        <Grid xs={10}>
          <Paper className={classes.paper}>
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="position"
                defaultValue="top"
                name="value"
                value={req.type}
                onChange={(e: any) => {
                  onChange("type", e.target.value, "");
                }}
              >
                <FormControlLabel
                  name="value"
                  control={
                    <Radio
                      classes={{
                        root: classes.radio,
                        checked: classes.checked,
                      }}
                    />
                  }
                  label="One-way"
                  value="One-way"
                />
                <FormControlLabel
                  control={
                    <Radio
                      classes={{
                        root: classes.radio,
                        checked: classes.checked,
                      }}
                    />
                  }
                  label="Return"
                  value="Return"
                />
              </RadioGroup>
            </FormControl>

            <div style={{ marginTop: "5px" }}>
              <form autoComplete="off">
                <Grid container spacing={2}>
                  <Grid xs={2}>
                    <Autocomplete
                      id="from"
                      className="country-select"
                      options={fromOptions}
                      style={{ marginLeft: "9px" }}
                      getOptionLabel={(option) => option.name}
                      // defaultValue={from}
                      // onChange={(event: any, newValue: string) => {
                      //   setFrom(newValue);
                      //   console.log(from, "from");
                      // }}
                      //   onChange={handleChange}
                      //   onInputChange={(event, newInputValue) => {
                      //     setFrom(newInputValue);
                      //   }}
                      //   onChange={(value: any) => {
                      //     onChange("from", value, "");
                      //   }}
                      renderInput={(params) => (
                        <TextField
                          style={{ top: "8px" }}
                          {...params}
                          name="From"
                          label="From"
                          variant="outlined"
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <div
                      style={{
                        marginTop: "10px",
                        marginLeft: "23px",
                        marginRight: "10px",
                      }}
                    >
                      <img
                        src={exchange}
                        style={{ width: "24px", height: "24px" }}
                      />
                    </div>
                  </Grid>
                  <Grid xs={2}>
                    <Autocomplete
                      id="to"
                      options={fromOptions}
                      getOptionLabel={(option) => option.name}
                      onChange={(value: any) => {
                        onChange("to", value, "");
                      }}
                      renderInput={(params) => (
                        <TextField
                          style={{ top: "8px", right: "8px" }}
                          {...params}
                          name="To"
                          label="To"
                          variant="outlined"
                          //   fullWidth
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        className={classes.date_picker}
                        margin="normal"
                        id="date-picker-dialog"
                        placeholder="Departure"
                        format="MM/dd/yyyy"
                        value={req.startDate}
                        onChange={(value: any) =>
                          onChange("startDate", value, "")
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
                  </Grid>
                  <Grid item xs={2}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        className={classes.date_picker}
                        margin="normal"
                        id="date-picker-dialog"
                        placeholder="Arrival"
                        format="MM/dd/yyyy"
                        value={req.endDate}
                        onChange={(value: any) =>
                          onChange("endDate", value, "")
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
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      id="NoP"
                      placeholder="No.of People"
                      //   label="No.of People"
                      variant="outlined"
                      value={
                        req.noOfPeople.adults +
                        req.noOfPeople.children +
                        req.noOfPeople.infants
                      }
                      onClick={handleNoP}
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
                      className={classes.popOver}
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
                      style={{ overflow: "hidden" }}
                      // autoFocus={false}
                    >
                      <Grid
                        container
                        spacing={2}
                        style={{
                          marginTop: "5px",
                          padding: "3px",
                          borderRadius: "30px",
                        }}
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
                                  onClick={() =>
                                    onChange("noOfPeople.adults", "", "-")
                                  }
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
                                {console.log(req.noOfPeople.adults, "adults")}
                                {req.noOfPeople.adults}
                              </Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <Button>
                                <img
                                  src={addPeople}
                                  onClick={() =>
                                    onChange("noOfPeople.adults", "", "+")
                                  }
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
                                  src={subtractPeople}
                                  onClick={() =>
                                    onChange("noOfPeople.children", "", "-")
                                  }
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
                                {req.noOfPeople.children}
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
                                  onClick={() =>
                                    onChange("noOfPeople.children", "", "+")
                                  }
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
                                  onClick={() =>
                                    onChange("noOfPeople.infants", "", "-")
                                  }
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
                                {req.noOfPeople.infants}
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
                                  onClick={() =>
                                    onChange("noOfPeople.infants", "", "+")
                                  }
                                ></img>
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Popover>
                  </Grid>
                  <Grid item xs={1}>
                    <Button
                      type="submit"
                      style={{
                        background: "#33BBFF",
                        width: "35px",
                        height: "54px",
                      }}
                      //   disabled={isSubmitting}
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
                </Grid>
              </form>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
