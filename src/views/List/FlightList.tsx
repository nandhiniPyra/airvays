import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FlightBG from '../../assets/pexels-pixabay-62623.jpeg';
import SortPng from '../../assets/Sort@2x.png';
import parkingPng from '../../assets/Parking lot@2x.png';
import wifiPng from '../../assets/Wifi@2x.png';
import entertainment from '../../assets/Entertainment - Hotel@2x.png';
import prizeAnalysis1 from '../../assets/Price Analysis - Illustration 1@2x.png';
import prizeAnalysis2 from '../../assets/Price Analysis - Illustration 2@2x.png';
import {
  Button,
  CircularProgress,
  ListItemSecondaryAction,
  Typography,
} from '@material-ui/core';
import TrackPricesContainer from '../TrackPrices/index';
import Box from '@material-ui/core/Box';
import { Divider } from '@material-ui/core';
import Chart from '../Chart/index';
import SpiceJet from '../../assets/Flight logo - 3@2x.png';
import flightIcon from '../../assets/Icon material-flight@2x.png';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Popper, { PopperPlacementType } from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { _searchFlights } from '../../services/api/flight';
import filterdata from './Filter';
import { useLocation } from 'react-router';
import Slider from '@material-ui/core/Slider';
import FavoriteIcon from '@material-ui/icons/Favorite';
import moment from 'moment';
import SearchComponent from '../SearchComponent';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: '1200px',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    flightTop: {
      height: '300px',
      backgroundImage: `url(${FlightBG})`,
    },
    radio: {
      color: '#33BBFF',
      size: 'medium',
      '&$checked': {
        color: '#33BBFF',
      },
    },
    checked: {
      color: '#33BBFF',
    },
    _ml15: {
      marginLeft: '15px',
      // flexGrow: 1,
    },
    date_picker: {
      '& .MuiInputBase-root': {
        padding: 0,
        border: '1px solid #bfb7b7',
        borderRadius: '5px',
        width: '160px',
        bottom: '15px',
        height: '55px',
        '& .MuiButtonBase-root': {
          padding: 0,
          paddingLeft: 10,
        },
        '& .MuiInputBase-input': {
          padding: 15,
          paddingLeft: 0,
        },
        '& .MuiOutlinedInput-notchedOutline': {
          // border: 'none'
        },
        '& .MuiSvgIcon-root': {
          color: '#33bbff',
        },
      },
    },
    slider_clr: {
      marginTop: '15px',
      color: '#4BAFC9',
      '&..MuiSlider-root': {
        color: '#4BAFC9',
      },
    },
  }),
);

let initialstate = {
  from: '',
  to: '',
  currencyCode: 'INR',
  type: 'One-way',
  startDate: null,
  endDate: null,
  noOfPeople: {
    adults: 0,
    children: 0,
    infants: 0,
  },
  class: 'ECONOMY',
};
export default function HotelsList() {
  const classes = useStyles();
  const { state }: any = useLocation();
  const [filtersData, setFiltersData] = useState([]);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<PopperPlacementType>();
  const [anchorEl1, setAnchorEl1] = useState<HTMLButtonElement | null>(null);
  const [anchorEl2, setAnchorEl2] = useState<HTMLButtonElement | null>(null);
  const [anchorEl3, setAnchorEl3] = useState<HTMLButtonElement | null>(null);
  const [anchorEl4, setAnchorEl4] = useState<HTMLButtonElement | null>(null);
  const [openpricerange, setOpenpricerange] = useState(false);
  const [pricevalue, setpriceValue] = React.useState<number[]>([150, 200]);
  const [outBoundValue, setOutBoundValue] = React.useState<number>(30);
  const [returnValue, setReturnValue] = React.useState<number>(30);
  const [outBoundTimeValue, setOutBoundTimeValue] =
    React.useState<any>('23:59');
  const [returnTimeValue, setReturnTimeValue] = React.useState<any>('23:59');
  const [openStop, setOpenStop] = useState(false);
  const [progress, setProgress] = useState(false);
  const [openDuration, setOpenDuration] = useState(false);
  const [searchFlightDetails, setSearchFlightDetails] = useState([{}]);
  const [flightsData, setFlightsData] = useState([
    {
      id: 1,
      code: 'ALL',
      name: 'ALL',
      isChecked: false,
      price: '',
    },
    {
      id: 2,
      code: 'AC',
      name: 'AIR CANADA',
      isChecked: false,
      price: '',
    },
    {
      id: 3,
      code: 'AI',
      name: 'AIR INDIA',
      isChecked: false,
      price: '',
    },
    {
      id: 4,
      code: 'LH',
      name: 'LUFTHANSA',
      isChecked: false,
      price: '',
    },
    {
      id: 5,
      code: 'UK',
      name: 'VISTARA',
      isChecked: false,
      price: '',
    },
    {
      id: 6,
      code: '6E',
      name: 'IndiGo',
      isChecked: false,
      price: '',
    },
  ]);
  const handleDuration =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl4(event.currentTarget);
      setOpenDuration((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  const handleStop =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl3(event.currentTarget);
      setOpenStop((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  const handleOutbound = (event: any, newValue: number | number[]) => {
    setOutBoundValue(newValue as number);
    setOutBoundTimeValue(formatTime(newValue));
  };

  let formatTime = (n: any) => {
    let time = `${(n / 60) ^ 0}:` + (n % 60);
    return time;
  };

  const handleReturn = (event: any, newValue: number | number[]) => {
    setReturnValue(newValue as number);
    setReturnTimeValue(formatTime(newValue));
  };
  const handleChangeprice = (event: any, newValue: number | number[]) => {
    setpriceValue(newValue as number[]);
  };
  function valuetext(value: number) {
    return `${value}`;
  }
  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl1(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };
  const handleClickpricerage =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl2(event.currentTarget);
      setOpenpricerange((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  const searchFlights = () => {
    setProgress(true);
    _searchFlights(searchFlightDetails, function (error: any, response: any) {
      if (error == null) {
        if (response.status == 200) {
          setFiltersData(response.result.data);
          setProgress(false);
        }
      } else if (response == null) {
        setProgress(false);
      }
    });
  };

  const handleTime = (time: any) => {
    const Timing = moment(time).format('LT');
    return Timing;
  };

  const handleToggle = (value: any) => () => {
    if (value == 'ALL') {
      let flights = flightsData.map((x) => {
        x.isChecked = !x.isChecked;
        return x;
      });
      setFlightsData(flights);
    }
    const data = flightsData.map((x) => {
      if (x.name == value) {
        x.isChecked = !x.isChecked;
      }
      return x;
    });
    setFlightsData(data);
  };
  const handleTogglePrice = (value: any) => () => {};

  const closeAirline = () => {
    // setOpen(false)
    let flights = flightsData.map((x) => {
      x.isChecked = false;
      return x;
    });
    setFlightsData(flights);
  };

  const applyAirlineFilter = () => {
    const selected = flightsData.filter((x) => x.isChecked == true);
    const flightsKey = selected.map((item) => item.code);
    console.log(flightsKey, 'flightsKey');
  };

  useEffect(() => {
    if (state) {
      const listItems = state;
      setSearchFlightDetails(listItems);
    }
  }, []);

  useEffect(() => {
    searchFlights();
  }, [searchFlightDetails]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.flightTop}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <SearchComponent request={searchFlightDetails} />
          <Grid container spacing={3} style={{ marginTop: '20px' }}>
            <Grid item xs={12} container>
              <Grid item xs={6}>
                <Typography
                  style={{
                    textAlign: 'left',
                    fontSize: '20px',
                    fontWeight: 500,
                    color: '#1C2460',
                  }}>
                  Price Analysis
                </Typography>
              </Grid>
              <Grid item xs={6} style={{ textAlign: 'right' }}>
                <TrackPricesContainer request={searchFlightDetails} />
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={3} style={{ marginTop: '20px' }}>
            <Grid item xs={12} container>
              <Grid item xs={1}></Grid>
              <Grid container xs={10}>
                <Grid item xs={2}>
                  <img
                    alt=''
                    style={{ width: '120px' }}
                    src={prizeAnalysis1}></img>
                </Grid>
                <Grid item xs={8}>
                  <Box
                    borderColor='#FFF2DE'
                    border={5}
                    style={{
                      padding: '20px',
                      textAlign: 'center',
                      marginTop: '50px',
                      marginRight: '30px',
                    }}>
                    <b style={{ textDecoration: 'underline #DCAB5E' }}>
                      SGD $150
                    </b>
                    is the best available price right now!
                    <br /> The current prices are lower than usual. You'll save
                    money of $27 to $32
                  </Box>
                </Grid>
                <Grid item xs={2} style={{ marginTop: '30px' }}>
                  <img
                    alt=''
                    style={{ width: '120px' }}
                    src={prizeAnalysis2}></img>
                </Grid>
              </Grid>
              <Grid item xs={1}></Grid>
            </Grid>
          </Grid>

          {/* Chart */}
          <Grid container style={{ marginTop: '80px' }} xs={12}>
            <Grid item xs={12}>
              <Chart />
            </Grid>
          </Grid>

          {/* serach results */}
          <div style={{ background: '#E4F4FC' }}>
            <Grid container>
              <Grid container spacing={3} style={{ marginTop: '20px' }}>
                <Grid item xs={12}>
                  <Typography
                    style={{
                      textAlign: 'left',
                      fontSize: '20px',
                      fontWeight: 500,
                    }}>
                    Search Results
                  </Typography>
                  <Typography style={{ textAlign: 'right' }}>
                    23 of 165 Flights
                  </Typography>
                  <Typography style={{ color: '#4BAFC9' }}>
                    Filter By
                  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={3} style={{ marginTop: '20px' }}>
                <Grid item xs={10} style={{ display: 'flex' }}>
                  {/* <ClickAwayListener onClickAway={() => setOpen(false)}> */}
                  <Button
                    style={{
                      color: '#FFF',
                      background: '#4BAFC9',
                      borderRadius: '20px',
                    }}
                    onClick={handleClick('bottom-start')}>
                    Airlines : All
                  </Button>
                  {/* </ClickAwayListener> */}

                  <Popper
                    style={{ width: '250px', marginTop: '15px' }}
                    open={open}
                    anchorEl={anchorEl1}
                    placement={placement}
                    transition>
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
                                  onClick={handleToggle(v.name)}>
                                  <Grid container>
                                    <Grid item xs={2}>
                                      <ListItemIcon>
                                        <Checkbox
                                          edge='start'
                                          checked={v.isChecked}
                                          tabIndex={-1}
                                          disableRipple
                                          inputProps={{
                                            'aria-labelledby': labelId,
                                          }}
                                          style={{
                                            color: '#4BAFC9',
                                          }}
                                        />
                                      </ListItemIcon>
                                    </Grid>
                                    <Grid item xs={8}>
                                      <ListItemText
                                        id={labelId}
                                        primary={v.name}
                                      />
                                    </Grid>
                                    <Grid item xs={2}>
                                      <ListItemText
                                        id={labelId}
                                        primary={v.price}
                                      />
                                    </Grid>
                                  </Grid>
                                </ListItem>
                              );
                            })}
                            <Divider />{' '}
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                              }}>
                              <div>
                                <Button onClick={closeAirline}>clear</Button>
                              </div>
                              <div>
                                <Button
                                  onClick={() => {
                                    // setFiltersData(filterdata(filtersData));
                                    applyAirlineFilter();
                                  }}
                                  variant='contained'
                                  style={{
                                    backgroundColor: '#4BAFC9',
                                    color: '#fff',
                                    borderRadius: '50px',
                                    height: '30px',
                                    marginTop: '5px',
                                  }}>
                                  Apply
                                </Button>
                              </div>{' '}
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
                      color: '#FFF',
                      background: '#4BAFC9',
                      borderRadius: '20px',
                      marginLeft: '15px',
                    }}
                    onClick={handleClickpricerage('bottom-start')}>
                    Price Range : $150 to $200
                  </Button>
                  {/* </ClickAwayListener> */}
                  <Popper
                    style={{ width: '20%', marginTop: '15px' }}
                    open={openpricerange}
                    anchorEl={anchorEl2}
                    placement={placement}
                    transition>
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <Paper style={{ padding: '20px' }}>
                          <Grid container spacing={10}>
                            <Grid item xs={12}>
                              <Typography id='range-slider' gutterBottom>
                                {`${pricevalue[0]} to ${pricevalue[1]}`}
                              </Typography>
                              <Slider
                                className={classes.slider_clr}
                                value={pricevalue}
                                onChange={handleChangeprice}
                                valueLabelDisplay='auto'
                                aria-labelledby='range-slider'
                                getAriaValueText={valuetext}
                                min={1}
                                max={1000}
                              />
                            </Grid>
                          </Grid>
                          <Divider />
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                            }}>
                            <div>
                              <Button>Reset</Button>
                            </div>
                            <div>
                              <Button
                                onClick={() => {
                                  setFiltersData(filterdata(filtersData));
                                }}
                                variant='contained'
                                style={{
                                  backgroundColor: '#4BAFC9',
                                  color: '#fff',
                                  borderRadius: '50px',
                                  marginTop: '5px',
                                }}>
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
                      color: '#FFF',
                      background: '#4BAFC9',
                      borderRadius: '20px',
                      marginLeft: '15px',
                    }}>
                    Class : Economy
                  </Button>
                  <Button
                    onClick={handleDuration('bottom-start')}
                    style={{
                      color: '#333333',
                      background: '#F7F7F7',
                      borderRadius: '20px',
                      marginLeft: '15px',
                    }}>
                    Duration
                  </Button>
                  {/* duration filter */}

                  <Popper
                    style={{ width: '20%', marginTop: '15px' }}
                    open={openDuration}
                    anchorEl={anchorEl4}
                    placement={placement}
                    transition>
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <Paper style={{ padding: '20px' }}>
                          <Grid container spacing={10}>
                            {/* <Grid item xs={12}>
                            
                            </Grid> */}
                            <Grid item xs={12}>
                              <div>
                                <Typography id='range-slider' gutterBottom>
                                  {'00:00'} - {outBoundTimeValue}
                                </Typography>
                                <Slider
                                  className={classes.slider_clr}
                                  value={outBoundValue}
                                  onChange={handleOutbound}
                                  valueLabelDisplay='auto'
                                  aria-labelledby='range-slider'
                                  getAriaValueText={valuetext}
                                  min={1}
                                  max={1000}
                                />
                              </div>
                              <div>
                                <Typography id='range-slider' gutterBottom>
                                  {'00:00'} - {returnTimeValue}
                                </Typography>
                                <Slider
                                  className={classes.slider_clr}
                                  value={returnValue}
                                  onChange={handleReturn}
                                  valueLabelDisplay='auto'
                                  aria-labelledby='range-slider'
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
                              display: 'flex',
                              justifyContent: 'flex-end',
                            }}>
                            <div>
                              <Button>Reset</Button>
                            </div>
                            <div>
                              <Button
                                onClick={() => {
                                  setFiltersData(filterdata(filtersData));
                                }}
                                variant='contained'
                                style={{
                                  backgroundColor: '#4BAFC9',
                                  color: '#fff',
                                  borderRadius: '50px',
                                  marginTop: '5px',
                                }}>
                                Apply
                              </Button>
                            </div>
                          </div>
                        </Paper>
                      </Fade>
                    )}
                  </Popper>
                  <Button
                    onClick={handleStop('bottom-start')}
                    style={{
                      color: '#333333',
                      background: '#F7F7F7',
                      borderRadius: '20px',
                      marginLeft: '15px',
                    }}>
                    No. Of Stops
                  </Button>

                  <Popper
                    style={{ width: '20%', marginTop: '15px' }}
                    open={openStop}
                    anchorEl={anchorEl3}
                    placement={placement}
                    transition>
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <Paper style={{ background: '' }}>
                          <div>
                            <Typography
                              variant='h5'
                              style={{ marginLeft: '5px' }}>
                              {'stops'}
                            </Typography>
                          </div>
                          <Typography
                            style={{ marginLeft: '15px', marginTop: '15px' }}>
                            {'Direct'}
                          </Typography>

                          <div style={{ marginTop: '15px' }}>
                            <List>
                              {[
                                { name: '1 stop', price: '68,888' },
                                { name: '2+ stop', price: '66,888' },
                              ].map((value) => {
                                const labelId = `checkbox-list-label-${value}`;
                                return (
                                  <ListItem
                                    // key={v.id}
                                    role={undefined}
                                    dense
                                    button
                                    onClick={handleTogglePrice(value.name)}>
                                    <ListItemIcon>
                                      <Checkbox
                                        edge='start'
                                        // checked={}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{
                                          'aria-labelledby': labelId,
                                        }}
                                      />
                                    </ListItemIcon>
                                    <ListItemText
                                      id={labelId}
                                      primary={value.name}
                                    />
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
                  style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div>
                    <img
                      alt=''
                      src={SortPng}
                      style={{ width: '25px', height: '35px' }}></img>
                  </div>
                </Grid>
              </Grid>
              <Grid container>
                {progress ? (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress
                      size={40}
                      style={{ color: 'rgb(75, 175, 201)' }}
                    />
                  </div>
                ) : (
                  <>
                    {filtersData.length > 0 &&
                      filtersData.map((x: any) => (
                        <Grid
                          container
                          style={{
                            display: 'flex',
                            marginTop: '40px',
                            backgroundColor: 'white',
                            padding: '10px',
                          }}>
                          {x.itineraries[0].segments.map((item: any) => (
                            <>
                              <Grid
                                container
                                item
                                xs={10}
                                style={{
                                  color: '#1C2460',
                                  marginTop: '15px',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                }}>
                                <div>
                                  <div>
                                    <img
                                      alt=''
                                      style={{ marginLeft: '30px' }}
                                      src={SpiceJet}></img>
                                  </div>
                                  <Typography
                                    style={{
                                      fontSize: '14px',
                                      color: '#1C2460',
                                      opacity: '40%',
                                      marginLeft: '35px',
                                    }}>
                                    SpiceJet
                                  </Typography>
                                </div>

                                <div>
                                  {handleTime(item.departure.at)}
                                  <br />
                                  <Typography style={{ marginTop: '5px' }}>
                                    Chennai
                                  </Typography>
                                  <br />
                                  {item.departure.iataCode}
                                </div>
                                <div>
                                  <Typography style={{ textAlign: 'center' }}>
                                    Direct
                                  </Typography>
                                  <div style={{ display: 'flex' }}>
                                    {'-------------------------'}
                                    <img alt='' src={flightIcon}></img>
                                    {'-------------------------'}
                                  </div>
                                  <Typography
                                    style={{
                                      marginTop: '5px',
                                      textAlign: 'center',
                                    }}>
                                    {x.itineraries[0].duration}
                                  </Typography>
                                </div>
                                <div>
                                  {handleTime(item.arrival.at)}
                                  <Typography style={{ marginTop: '5px' }}>
                                    Bengaluru Intl
                                  </Typography>
                                  <br />
                                  {item.arrival.iataCode}
                                </div>
                              </Grid>
                            </>
                          ))}

                          <Grid
                            item
                            xs={2}
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              display: 'flex',
                              borderLeft: '1px solid #EDEDED',
                            }}>
                            <div
                              style={{
                                position: 'relative',
                                left: '75%',
                                bottom: '150px',
                              }}>
                              <FavoriteIcon style={{ color: 'red' }} />
                            </div>
                            <div>
                              <Typography>
                                <span
                                  style={{
                                    fontSize: '22px',
                                    fontWeight: 500,
                                    color: '#1C2460',
                                  }}>
                                  {x.price.currency}
                                  {x.price.base}
                                </span>
                              </Typography>
                              <br />
                              <Button
                                variant='contained'
                                style={{
                                  background: '#DCAB5E',
                                  color: '#fff',
                                }}>
                                View Details
                              </Button>
                            </div>
                          </Grid>
                          {/* </Grid> */}
                        </Grid>
                      ))}
                  </>
                )}
              </Grid>

              <Grid item xs={1}></Grid>
            </Grid>
          </div>

          {/* <BottomGrid /> */}
        </Grid>
      </Grid>
    </div>
  );
}
