import { useEffect, useState } from "react";
import carImg from "../../assets/Icon awesome-car-blue@2x.png";
import hotelImg from "../../assets/Icon metro-hotel-blue@2x.png";
import { _getAirports } from "../../services/api/flight";
import { FlightListRoute } from "../../Routes/RoutesConstants";
import user from "../../assets/Icon feather-user@2x.png";
import {
  Button,
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
  Popper,
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
  KeyboardDatePicker,
} from "@material-ui/pickers";
import search from "../../assets/icons8-search-30.png";
import { Autocomplete } from "@material-ui/lab";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  _ml15: {
    marginLeft: "15px",
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
    height: "150px",
    boxShadow: "3px 5px 3px #8888",
  },
  paperHotel: {
    padding: theme.spacing(2),
    boxShadow: "3px 5px 3px #8888",
    color: theme.palette.text.secondary,
    borderRadius: "9px",
    borderColor: "#FFFFFF",
    height: "100px",
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
export default function SearchComponent(props: any) {
  const classes = useStyles();
  const Navigate = useNavigate();
  const [fromOptions, setFromOptions] = useState<Array<any>>([{}]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [component, setComponent] = React.useState("flight");
  const [req, setreq] = useState(initialstate);
  const [from, setfrom] = useState("");
  const [to, setto] = useState("");

  console.log(req, "jjjj");

  const getAirportsFrom = () => {
    _getAirports({ search: from }, function (error: any, response: any) {
      if (error === null) {
        if (response.status === "200") {
          response.result && response.result.length > 0
            ? setFromOptions(response.result)
            : setFromOptions([]);
        }
      } else if (response === null) {
        console.log(error);
      }
    });
  };

  const getAirportsTo = () => {
    _getAirports({ search: to }, function (error: any, response: any) {
      if (error === null) {
        if (response.status === "200") {
          response.result && response.result.length > 0
            ? setFromOptions(response.result)
            : setFromOptions([]);
        }
      } else if (response === null) {
        console.log(error);
      }
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    Navigate(FlightListRoute, {
      state: {
        req,
      },
    });
  };

  const onChange = (key: any, value: any, nop: any) => {
    if (key === "no_of_people.adults" && nop === "+") {
      setreq((prevState: any) => {
        return {
          ...prevState,
          no_of_people: {
            ...prevState.no_of_people,
            adults: prevState.no_of_people.adults + 1,
          },
        };
      });
    }
    if (key === "no_of_people.adults" && nop === "-") {
      setreq((prevState: any) => {
        return {
          ...prevState,
          no_of_people: {
            ...prevState.no_of_people,
            adults: prevState.no_of_people.adults - 1,
          },
        };
      });
    }
    if (key === "no_of_people.children" && nop === "+") {
      setreq((prevState: any) => {
        return {
          ...prevState,
          no_of_people: {
            ...prevState.no_of_people,
            children: prevState.no_of_people.children + 1,
          },
        };
      });
    }
    if (key === "no_of_people.children" && nop === "-") {
      setreq((prevState: any) => {
        return {
          ...prevState,
          no_of_people: {
            ...prevState.no_of_people,
            children: prevState.no_of_people.children - 1,
          },
        };
      });
    }
    if (key === "no_of_people.infants" && nop === "+") {
      setreq((prevState: any) => {
        return {
          ...prevState,
          no_of_people: {
            ...prevState.no_of_people,
            infants: prevState.no_of_people.infants + 1,
          },
        };
      });
    }
    if (key === "no_of_people.infants" && nop === "-") {
      setreq((prevState: any) => {
        return {
          ...prevState,
          no_of_people: {
            ...prevState.no_of_people,
            infants: prevState.no_of_people.infants - 1,
          },
        };
      });
    }
    if (
      key === "from_date" ||
      key === "to_date" ||
      key === "from" ||
      key === "to" ||
      key === "type"
    ) {
      setreq((prevState: any) => ({
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
  useEffect(() => {
    getAirportsFrom();
    getAirportsTo();
  }, [from, to]);
  console.log("Jj", props.request);
  useEffect(() => {
    console.log(props.request, "j");
    if (props.request) {
      setreq(
        props.request.initialstate ? props.request.initialstate : props.request
      );
    }
  }, [props.request]);

  const PopperMy = (props: any) => {
    return (
      <Popper
        {...props}
        style={{ maxWidth: "fit-content" }}
        placement="bottom-start"
      />
    );
  };

  return (
    <>
      <Grid container style={{ marginTop: "3%" }}>
        <Grid xs={1}></Grid>
        <Grid xs={10}>
          <div style={{ textAlign: "center", display: "flex" }}>
            <div
              style={{
                backgroundColor:
                  component == "flight" ? "#EAF8FF" : "rgb(8 8 8 / 68%)",
                color: component == "flight" ? "#1C2460" : "#B7E7FF",
                width: "128px",
                height: "88px",
                borderRadius: "10px",
              }}
              onClick={() => setComponent("flight")}
            >
              <img
                alt=""
                src={flightImg}
                style={{
                  marginTop: "15px",
                  height: "25px",
                  width: "25px",
                }}
              ></img>
              <br />
              <div style={{ marginTop: "9px" }}>Flights</div>
            </div>
            <div
              style={{
                backgroundColor:
                  component == "hotel" ? "#EAF8FF" : "rgb(8 8 8 / 68%)",
                color: component == "hotel" ? "#1C2460" : "#B7E7FF",
                width: "128px",
                height: "88px",
                borderRadius: "10px",
                opacity: 1,
              }}
              onClick={() => setComponent("hotel")}
              className={classes._ml15}
            >
              <img
                alt=""
                src={hotelImg}
                style={{ marginTop: "15px", height: "25px", width: "25px" }}
              />
              <br />

              <div style={{ marginTop: "9px" }}>Hotels</div>
            </div>
            <div
              style={{
                backgroundColor:
                  component == "car" ? "#EAF8FF" : "rgb(8 8 8 / 68%)",
                color: component == "car" ? "#1C2460" : "#B7E7FF",
                width: "128px",
                height: "88px",
                borderRadius: "10px",
              }}
              onClick={() => setComponent("car")}
              className={classes._ml15}
            >
              <img
                alt=""
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
      {component === "flight" ? (
        <>
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
                      value="one-way"
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
                      value="return"
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
                          onChange={(event, newValue) => {
                            onChange("from", newValue.code, "");
                            setfrom(newValue);
                          }}
                          onInputChange={(event: any, value: any) => {
                            setfrom(value);
                          }}
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
                          renderOption={(option) => {
                            return (
                              <Grid container alignItems="center">
                                <Grid item xs>
                                  <span>
                                    <b>
                                      {option.name}({option.code})
                                    </b>
                                  </span>

                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    {option.country_code}
                                    <Divider />
                                  </Typography>
                                </Grid>
                              </Grid>
                            );
                          }}
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
                            alt=""
                            src={exchange}
                            style={{ width: "24px", height: "24px" }}
                          />
                        </div>
                      </Grid>
                      <Grid xs={2}>
                        <Autocomplete
                          PopperComponent={PopperMy}
                          id="to"
                          options={fromOptions}
                          getOptionLabel={(option) => option.name}
                          onChange={(event, newValue) => {
                            onChange("to", newValue.country_code, "");
                            setto(newValue);
                          }}
                          onInputChange={(event, value: any) => {
                            setto(value);
                          }}
                          renderInput={(params) => (
                            <TextField
                              style={{ top: "8px", right: "8px" }}
                              {...params}
                              name="To"
                              label="To"
                              variant="outlined"
                            />
                          )}
                          renderOption={(option) => {
                            return (
                              <Grid container alignItems="center">
                                <Grid item xs>
                                  <span>
                                    <b>
                                      {option.name}({option.code})
                                    </b>
                                  </span>

                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    {option.country_code}
                                    <Divider />
                                  </Typography>
                                </Grid>
                              </Grid>
                            );
                          }}
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
                            value={req.from_date}
                            onChange={(value: any) => {
                              let date = moment(value).format("YYYY-MM-DD");
                              onChange("from_date", date, "");
                            }}
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
                            value={req.to_date}
                            onChange={(value: any) => {
                              let date = moment(value).format("YYYY-MM-DD");
                              onChange("to_date", date, "");
                            }}
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
                          variant="outlined"
                          value={
                            req && req.no_of_people
                              ? req.no_of_people.adults +
                                req.no_of_people.children +
                                req.no_of_people.infants
                              : 0
                          }
                          onClick={handleNoP}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <img alt="" src={user}></img>
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
                                      alt=""
                                      style={{
                                        width: "65%",
                                        height: "80%",
                                        position: "relative",
                                        right: "22px",
                                      }}
                                      src={subtractPeople}
                                      onClick={() =>
                                        onChange("no_of_people.adults", "", "-")
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
                                    {req.no_of_people.adults}
                                  </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                  <Button>
                                    <img
                                      alt=""
                                      src={addPeople}
                                      onClick={() =>
                                        onChange("no_of_people.adults", "", "+")
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
                                      alt=""
                                      style={{
                                        width: "65%",
                                        height: "80%",
                                        position: "relative",
                                        right: "22px",
                                      }}
                                      src={subtractPeople}
                                      onClick={() =>
                                        onChange(
                                          "no_of_people.children",
                                          "",
                                          "-"
                                        )
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
                                    {req.no_of_people.children}
                                  </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                  <Button>
                                    <img
                                      alt=""
                                      src={addPeople}
                                      style={{
                                        width: "65%",
                                        height: "80%",
                                      }}
                                      onClick={() =>
                                        onChange(
                                          "no_of_people.children",
                                          "",
                                          "+"
                                        )
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
                                      alt=""
                                      style={{
                                        width: "65%",
                                        height: "80%",
                                        position: "relative",
                                        right: "22px",
                                      }}
                                      src={subtractPeople}
                                      onClick={() =>
                                        onChange(
                                          "no_of_people.infants",
                                          "",
                                          "-"
                                        )
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
                                    {req.no_of_people.infants}
                                  </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                  <Button>
                                    <img
                                      alt=""
                                      src={addPeople}
                                      style={{
                                        width: "65%",
                                        height: "80%",
                                      }}
                                      onClick={() =>
                                        onChange(
                                          "no_of_people.infants",
                                          "",
                                          "+"
                                        )
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
                          style={{
                            background: "#33BBFF",
                            width: "35px",
                            height: "54px",
                          }}
                          onClick={handleSubmit}
                        >
                          <img
                            alt=""
                            src={search}
                            style={{ width: "24px", height: "24px" }}
                          />
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              </Paper>
            </Grid>{" "}
          </Grid>
        </>
      ) : component === "hotel" ? (
        <>
          <Grid container style={{ marginTop: "15px" }}>
            <Grid xs={1}></Grid>
            <Grid xs={10}>
              <Paper className={classes.paperHotel}>
                <div style={{ marginTop: "5px" }}>
                  <form autoComplete="off">
                    <Grid container spacing={4}>
                      <Grid item xs={2}>
                        <TextField
                          id="email"
                          placeholder="Stay-in Place"
                          label="Stay-in Place"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            className={classes.date_picker}
                            margin="normal"
                            id="date-picker-dialog"
                            placeholder="Check-in"
                            format="MM/dd/yyyy"
                            value={req.from_date}
                            onChange={(value: any) =>
                              onChange("from_date", value, "")
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
                            placeholder="Check-out"
                            format="MM/dd/yyyy"
                            value={req.to_date}
                            onChange={(value: any) =>
                              onChange("to_date", value, "")
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
                            req.no_of_people.adults +
                            req.no_of_people.children +
                            req.no_of_people.infants
                          }
                          onClick={handleNoP}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <img alt="" src={user}></img>
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
                                      alt=""
                                      style={{
                                        width: "65%",
                                        height: "80%",
                                        position: "relative",
                                        right: "22px",
                                      }}
                                      src={subtractPeople}
                                      onClick={() =>
                                        onChange("no_of_people.adults", "", "-")
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
                                    {req.no_of_people.adults}
                                  </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                  <Button>
                                    <img
                                      alt=""
                                      src={addPeople}
                                      onClick={() =>
                                        onChange("no_of_people.adults", "", "+")
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
                                      alt=""
                                      style={{
                                        width: "65%",
                                        height: "80%",
                                        position: "relative",
                                        right: "22px",
                                      }}
                                      src={subtractPeople}
                                      onClick={() =>
                                        onChange(
                                          "no_of_people.children",
                                          "",
                                          "-"
                                        )
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
                                    {req.no_of_people.children}
                                  </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                  <Button>
                                    <img
                                      alt=""
                                      src={addPeople}
                                      style={{
                                        width: "65%",
                                        height: "80%",
                                      }}
                                      onClick={() =>
                                        onChange(
                                          "no_of_people.children",
                                          "",
                                          "+"
                                        )
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
                                      alt=""
                                      style={{
                                        width: "65%",
                                        height: "80%",
                                        position: "relative",
                                        right: "22px",
                                      }}
                                      src={subtractPeople}
                                      onClick={() =>
                                        onChange(
                                          "no_of_people.infants",
                                          "",
                                          "-"
                                        )
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
                                    {req.no_of_people.infants}
                                  </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                  <Button>
                                    <img
                                      alt=""
                                      src={addPeople}
                                      style={{
                                        width: "65%",
                                        height: "80%",
                                      }}
                                      onClick={() =>
                                        onChange(
                                          "no_of_people.infants",
                                          "",
                                          "+"
                                        )
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
                        >
                          <img
                            alt=""
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
            <Grid xs={1}></Grid>
          </Grid>
        </>
      ) : (
        <>
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
                    value="Same Drop-off"
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
                      label="Same Drop-off"
                      value="Same Drop-off"
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
                      label="Different Drop-off"
                      value="Different Drop-off"
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
                          onChange={(event, newValue) => {
                            console.log(JSON.stringify(newValue, null, " "));
                          }}
                          onInputChange={(event, value: any) => {
                            onChange(
                              "from",
                              JSON.stringify(value, null, " "),
                              ""
                            );
                          }}
                          renderInput={(params) => (
                            <TextField
                              style={{ top: "8px" }}
                              {...params}
                              name="Pickup Location"
                              label="Pickup Location"
                              variant="outlined"
                              fullWidth
                            />
                          )}
                        />
                      </Grid>
                      <Grid xs={2}>
                        <Autocomplete
                          id="to"
                          options={fromOptions}
                          style={{ marginLeft: "9px" }}
                          getOptionLabel={(option) => option.name}
                          onChange={(event, newValue) => {
                            console.log(JSON.stringify(newValue, null, " "));
                          }}
                          onInputChange={(event, value: any) => {
                            onChange(
                              "to",
                              JSON.stringify(value, null, " "),
                              ""
                            );
                          }}
                          renderInput={(params) => (
                            <TextField
                              style={{
                                top: "8px",
                              }}
                              {...params}
                              name="Drop-off Location"
                              label="Drop-off Location"
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
                            placeholder="Pickup Date"
                            format="MM/dd/yyyy"
                            value={req.from_date}
                            onChange={(value: any) =>
                              onChange("from_date", value, "")
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
                            placeholder="Drop-off Date"
                            format="MM/dd/yyyy"
                            value={req.to_date}
                            onChange={(value: any) =>
                              onChange("to_date", value, "")
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
                            req.no_of_people.adults +
                            req.no_of_people.children +
                            req.no_of_people.infants
                          }
                          onClick={handleNoP}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <img alt="" src={user}></img>
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
                                      alt=""
                                      style={{
                                        width: "65%",
                                        height: "80%",
                                        position: "relative",
                                        right: "22px",
                                      }}
                                      src={subtractPeople}
                                      onClick={() =>
                                        onChange("no_of_people.adults", "", "-")
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
                                    {req.no_of_people.adults}
                                  </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                  <Button>
                                    <img
                                      alt=""
                                      src={addPeople}
                                      onClick={() =>
                                        onChange("no_of_people.adults", "", "+")
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
                                      alt=""
                                      style={{
                                        width: "65%",
                                        height: "80%",
                                        position: "relative",
                                        right: "22px",
                                      }}
                                      src={subtractPeople}
                                      onClick={() =>
                                        onChange(
                                          "no_of_people.children",
                                          "",
                                          "-"
                                        )
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
                                    {req.no_of_people.children}
                                  </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                  <Button>
                                    <img
                                      alt=""
                                      src={addPeople}
                                      style={{
                                        width: "65%",
                                        height: "80%",
                                      }}
                                      onClick={() =>
                                        onChange(
                                          "no_of_people.children",
                                          "",
                                          "+"
                                        )
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
                                      alt=""
                                      style={{
                                        width: "65%",
                                        height: "80%",
                                        position: "relative",
                                        right: "22px",
                                      }}
                                      src={subtractPeople}
                                      onClick={() =>
                                        onChange(
                                          "no_of_people.infants",
                                          "",
                                          "-"
                                        )
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
                                    {req.no_of_people.infants}
                                  </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                  <Button>
                                    <img
                                      alt=""
                                      src={addPeople}
                                      style={{
                                        width: "65%",
                                        height: "80%",
                                      }}
                                      onClick={() =>
                                        onChange(
                                          "no_of_people.infants",
                                          "",
                                          "+"
                                        )
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
                          onClick={handleSubmit}
                        >
                          <img
                            alt=""
                            src={search}
                            style={{ width: "24px", height: "24px" }}
                          />
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              </Paper>
            </Grid>{" "}
          </Grid>
        </>
      )}
    </>
  );
}
