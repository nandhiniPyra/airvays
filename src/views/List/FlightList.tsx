import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FlightBG from '../../assets/pexels-pixabay-62623.jpeg';
import SortPng from '../../assets/Sort@2x.png';
import prizeAnalysis1 from '../../assets/Price Analysis - Illustration 1@2x.png';
import prizeAnalysis2 from '../../assets/Price Analysis - Illustration 2@2x.png';
import {
  Button,
  CircularProgress,
  ListItemSecondaryAction,
  Typography,
} from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
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
import { _searchFlights } from '../../services/api/flight';
import filterdata from './Filter';
import { useLocation } from 'react-router';
import Slider from '@material-ui/core/Slider';
import moment from 'moment';
import SearchComponent from '../SearchComponent';
import _ from 'lodash';
import BottomGrid from '../Airvays info';
import TransparentTopBar from '../../TopBar/index';
import { useNavigate } from 'react-router';
import heart from '../../assets/Icon feather-heart@2x.png';
import heartunselected from '../../assets/Icon feather-heart-unselected@2x.png';
import injectWithObserver from '../../utils/injectWithObserver';
import { useStore } from '../../mobx/Helpers/UseStore';
import { toJS } from 'mobx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: '1200px',
      background: '#FFFFFF',
      maxWidth: '100%',
      overflowX: 'hidden',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    flightTop: {
      height: '30%',
      backgroundImage: `url(${FlightBG})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
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
    flight_card: {
      '&:hover': {
        background: '#fff',
        border: '1px solid #4BAFC9',
        boxShadow: '0px 20px 55px #0000001F',
      },
    },
  }),
);

const FlightList = () => {
  const store = useStore();
  const { searchRequest, flightlist } = toJS(store.flightDetails);
  const { setsearchRequest, setflightlist, getflightbyid } =
    store.flightDetails;
  const classes = useStyles();
  const navigate = useNavigate();
  const { state }: any = useLocation();
  const [filtersData, setFiltersData] = useState([]);
  const [airvaysData, setairvaysData] = useState<any>([]);
  const [filtersDataValue, setFiltersDataValue] = useState([]);
  const [open, setOpen] = useState(false);
  const [favourite, setFavourite] = React.useState<boolean>(true);
  const [placement, setPlacement] = useState<PopperPlacementType>();
  const [anchorEl1, setAnchorEl1] = useState<HTMLButtonElement | null>(null);
  const [anchorEl2, setAnchorEl2] = useState<HTMLButtonElement | null>(null);
  const [anchorEl3, setAnchorEl3] = useState<HTMLButtonElement | null>(null);
  const [anchorEl4, setAnchorEl4] = useState<HTMLButtonElement | null>(null);
  const [openpricerange, setOpenpricerange] = useState(false);
  const [pricevalue, setpriceValue] = React.useState<number[]>([150, 200]);
  const [selectedpricevalue, setselectedpricevalue] = React.useState<number[]>([
    150, 200,
  ]);
  const [outBoundValue, setOutBoundValue] = React.useState<number[]>([
    150, 200,
  ]);
  const [returnValue, setReturnValue] = React.useState<number[]>([150, 200]);
  const [outBoundTimeValue, setOutBoundTimeValue] = React.useState<any>([
    '00:00',
    '23:59',
  ]);
  const [returnTimeValue, setReturnTimeValue] = React.useState<any>([
    '00:00',
    '23:59',
  ]);
  const [listData, setListData] = useState([]);
  const [openStop, setOpenStop] = useState(false);
  const [progress, setProgress] = useState(false);
  const [openDuration, setOpenDuration] = useState(false);
  const [searchFlightDetails, setSearchFlightDetails] = useState(searchRequest);
  const [carriersList, setcarriersList] = useState([
    {
      id: 1,
      code: 'ALL',
      name: 'ALL',
      isChecked: true,
      price: '',
    },
  ]);
  const [flightavaliable, setflightavaliable] = useState(false);
  const [airlinesCount, setairlinesCount] = useState('All');

  const resetPrice = () => {
    setpriceValue([150, 200]);
  };
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

  const searchFlights = (req: any) => {
    if (req.no_of_people.adults) {
      setProgress(true);
      _searchFlights(req, function (error: any, response: any) {
        if (error === null) {
          if (response.status === 200) {
            response.result && setairvaysData(response.result.data);
            response &&
              response.result &&
              response.result.data &&
              setflightlist(response.result.data);
            // stores.FlightStore.SetAirLineList(response.result.data);
            let obj = response.result.dictionaries.carriers;
            let List: any = [];
            Object.keys(obj).forEach(function (key) {
              var value = obj[key];
              List.push({
                id: carriersList.length + 1,
                code: key,
                name: value,
                isChecked: true,
                price: '',
              });
            });
            setcarriersList((prevState: any) => {
              let newData = prevState;
              newData.push(...List);
              return newData;
            });
            const data = response.result.data;
            const item1 = data.map((item: any, index: any) => {
              //oneway
              if (item.itineraries.length === 1) {
                item.itineraries.map((value: any, indx: any) => {
                  if (value.segments[0]) {
                    value['depature'] = value.segments[0].departure.iataCode;
                    value['depatureAt'] = value.segments[0].departure.at;
                    value['arrival'] =
                      value.segments[
                        value.segments.length - 1
                      ].arrival.iataCode;
                    value['arrivalAt'] =
                      value.segments[value.segments.length - 1].arrival.at;
                    value['stop'] = 'Direct';
                    value['from_city'] = req.fromcity;
                    value['to_city'] = req.tocity;
                  }
                  item['from_city'] = req.fromcity;
                  item['to_city'] = req.tocity;
                });
              }
              //return
              else {
                item.itineraries.map((value: any, indx: any) => {
                  let length = value.segments.length - 1;

                  value['depature'] = value.segments[0].departure.iataCode;
                  value['depatureAt'] = value.segments[0].departure.at;
                  value['arrival'] = value.segments[length].arrival.iataCode;
                  value['arrivalAt'] = value.segments[length].arrival.at;
                  value['stop'] = `${length} + Stops`;
                  item['from_city'] = req.fromcity;
                  item['to_city'] = req.tocity;
                  if (value.segments[0]) {
                    item.itineraries[0]['from_city'] = req.fromcity;
                    item.itineraries[0]['to_city'] = req.tocity;
                  }
                  if (item.itineraries.length > 0 && value.segments[length]) {
                    item.itineraries[item.itineraries.length - 1]['from_city'] =
                      req.tocity;
                    item.itineraries[item.itineraries.length - 1]['to_city'] =
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
        } else if (response === null) {
          setProgress(false);
        }
      });
    }
  };

  console.log(airvaysData, 'airvaysData1');
  const handleTime = (time: any) => {
    const Timing = moment(time).format('LT');
    return Timing;
  };

  const handleToggle = (value: any) => () => {
    setflightavaliable(false);
    const datakey = carriersList.filter((item: any) => item.isChecked === true);
    setFiltersData(filtersDataValue);
    if (value === 'ALL') {
      let flights = carriersList.map((x) => {
        x.isChecked = !x.isChecked;
        return x;
      });
      setcarriersList(flights);
    } else {
      const data = carriersList.map((x) => {
        if (x.name === value) {
          x.isChecked = !x.isChecked;
        }
        return x;
      });
      setcarriersList(data);
    }
  };
  const handleStops = (value: any) => () => {
    setflightavaliable(false);
    setListData(filtersDataValue);
    const data = filtersData.filter(
      (item: any) => item.itineraries[0].segments.length - 1 === value,
    );
    if (data.length) {
      setListData(data);
    } else {
      setListData([]);
    }
  };

  const closeAirline = () => {
    let flights = carriersList.map((x) => {
      x.isChecked = false;
      return x;
    });
    setcarriersList(flights);
    setListData(filtersDataValue);
  };
  const applyAirlineFilter = () => {
    setflightavaliable(false);
    const selected = carriersList.filter((x) => x.isChecked === true);
    let data: any = [];
    const flightsKey = selected.map((item) => {
      data.push({ carrierCode: item.code });
    });
    let result: any = _.filter(listData, {
      itineraries: [{ segments: data }],
    });
    if (result.length > 0) {
      setListData(result);
    } else {
      setflightavaliable(true);
      setListData([]);
    }
    if (_.some(searchFlightDetails, _.isEmpty) && state && state.stateSend) {
      let value: any = state.stateSend;
      // _.omitBy(state.stateSend, ['fromcity', 'tocity']);
    }
    if (_.some(searchFlightDetails, _.isEmpty) && state && state.stateSend) {
      let value: any = state.stateSend;
      // _.omitBy(state.stateSend, ['fromcity', 'tocity']);
    }
  };

  const clearDuration = () => {
    setOutBoundTimeValue(['00:00', '23:59']);
    setReturnTimeValue(['00:00', '23:59']);
  };
  const getairlinesCount = () => {
    carriersList.filter((i) => i.isChecked === true).length ===
    carriersList.length
      ? setairlinesCount('All')
      : carriersList.filter((i) => i.isChecked === true).length <= 0
      ? setairlinesCount('')
      : setairlinesCount(
          `${carriersList.filter((i) => i.isChecked === true).length}`,
        );
  };
    useEffect(() => {
      if (_.some(searchFlightDetails, _.isEmpty) && state && state.stateSend) {
        let value: any = state.stateSend;
        // _.omitBy(state.stateSend, ['fromcity', 'tocity']);
        setSearchFlightDetails(value);
        searchFlights(value);
      }
    }, []);


  const chartData = {
    from: 'MAA',
    to: 'DEL',
    from_date: '2021-08-10',
    currency_code: 'SGD',
    oneWay: false,
  };

  const handleFlightDetails = (id: any) => {
    navigate('/flightListDetails', {
      state: { id },
    });
  };

  // console.log(stores.FlightStore, 'airvaysData');
  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.flightTop}>
        <Grid item xs={12}>
          <TransparentTopBar color='white' backgroundColor='transparent' />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <div style={{ marginTop: '6%' }}>
            <SearchComponent
              request={searchRequest}
              currentpage={true}
              search={(value: any) => searchFlights(value)}
            />
          </div>
          <Grid container spacing={3} style={{ marginTop: '5%' }}>
            <Grid item xs={12} container>
              <Grid item xs={7}>
                <Typography
                  style={{
                    textAlign: 'left',
                    fontSize: '20px',
                    fontWeight: 500,
                    color: '#1C2460',
                    fontFamily: 'AvantGarde-Demi',
                  }}>
                  Price Analysis
                  <Divider
                    style={{
                      backgroundColor: '#33bbff',
                      width: '25px',
                      height: '2px',
                      marginBottom: '25px',
                    }}
                  />
                </Typography>
              </Grid>
              <Grid item xs={5} style={{ textAlign: 'right' }}>
                <TrackPricesContainer request={searchFlightDetails} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={3} style={{ marginTop: '17%' }}>
        <Grid item xs={2}></Grid>
        <Grid item container xs={8}>
          <Grid item xs={2}>
            <img alt='' style={{ width: '120px' }} src={prizeAnalysis1}></img>
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
              <b style={{ textDecoration: 'underline #DCAB5E' }}>SGD $150</b>
              is the best available price right now!
              <br /> The current prices are lower than usual. You'll save money
              of SGD27 to SGD32
            </Box>
          </Grid>
          <Grid item xs={2} style={{ marginTop: '30px' }}>
            <img alt='' style={{ width: '120px' }} src={prizeAnalysis2}></img>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      {/* Chart */}
      <Grid item container style={{ marginTop: '80px' }} xs={12}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Chart params={chartData} />
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>

      {flightavaliable && (
        <div
          style={{
            textAlign: 'center',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Typography>{'No Flights Found'}</Typography>
        </div>
      )}
      {/* serach results */}
      <div style={{ background: '#E4F4FC' }}>
        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <Typography
              style={{
                textAlign: 'left',
                fontSize: '20px',
                fontWeight: 500,
              }}>
              Search Results
            </Typography>
            <Typography style={{ textAlign: 'right' }}>
              {listData.length} of {listData.length} Flights
            </Typography>
            <Typography style={{ color: '#4BAFC9' }}>Filter By</Typography>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>

        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          <Grid item xs={1}></Grid>
          <Grid item xs={8} style={{ display: 'flex' }}>
            <ClickAwayListener onClickAway={() => setOpen(false)}>
              <div>
                <Button
                  style={{
                    color:
                      carriersList.filter((item) => item.isChecked === true)
                        .length > 0
                        ? '#FFF'
                        : '#000',
                    background:
                      carriersList.filter((item) => item.isChecked === true)
                        .length > 0
                        ? '#4BAFC9'
                        : '#F7F7F7',
                    borderRadius: '20px',
                  }}
                  onClick={handleClick('bottom-start')}>
                  Airlines {airlinesCount}
                </Button>
                {open ? (
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
                            {carriersList &&
                              carriersList.length > 0 &&
                              carriersList.map((v) => {
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
                            <Divider />
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
                                    getairlinesCount();
                                    setOpen(false); // setFiltersData(filterdata(filtersData));
                                    applyAirlineFilter();
                                  }}
                                  variant='contained'
                                  style={{
                                    backgroundColor: '#00C3AC',
                                    color: '#fff',
                                    borderRadius: '50px',
                                    height: '30px',
                                    marginTop: '5px',
                                  }}>
                                  Apply
                                </Button>
                              </div>
                            </div>
                          </List>
                        </Paper>
                      </Fade>
                    )}
                  </Popper>
                ) : null}
              </div>
            </ClickAwayListener>
            <ClickAwayListener onClickAway={() => setOpenpricerange(false)}>
              <div>
                <Button
                  style={{
                    color: '#FFF',
                    background: '#4BAFC9',
                    borderRadius: '20px',
                    marginLeft: '15px',
                  }}
                  onClick={handleClickpricerage('bottom-start')}>
                  Price Range :{' '}
                  {`SGD${selectedpricevalue[0]} to SGD${selectedpricevalue[1]}`}
                </Button>
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
                              {`SGD${pricevalue[0]} to SGD${pricevalue[1]}`}
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
                            <Button onClick={resetPrice}>Reset</Button>
                          </div>
                          <div>
                            <Button
                              onClick={() => {
                                setOpenpricerange(false);
                                setselectedpricevalue(pricevalue);
                                setFiltersData(filterdata(filtersData));
                              }}
                              variant='contained'
                              style={{
                                backgroundColor: '#00C3AC',
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
              </div>
            </ClickAwayListener>
            <Button
              style={{
                color: '#FFF',
                background: '#4BAFC9',
                borderRadius: '20px',
                marginLeft: '15px',
              }}>
              Class : Economy
            </Button>
            <ClickAwayListener onClickAway={() => setOpenDuration(false)}>
              <div>
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
                          <Grid item xs={12}>
                            <div>
                              <Typography style={{ fontSize: '16px' }}>
                                {'Outbound'}
                              </Typography>
                              <Typography
                                id='range-slider'
                                gutterBottom
                                style={{ color: '#4BAFC9' }}>
                                {`${outBoundTimeValue[0]} - ${outBoundTimeValue[1]}`}
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
                              <Typography style={{ fontSize: '16px' }}>
                                {'Return'}
                              </Typography>
                              <Typography
                                id='range-slider'
                                gutterBottom
                                style={{ color: '#4BAFC9' }}>
                                {`${returnTimeValue[0]} - ${returnTimeValue[1]}`}
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
                            <Button onClick={clearDuration}>Reset</Button>

                            <Button
                              onClick={() => {
                                setFiltersData(filterdata(filtersData));
                              }}
                              variant='contained'
                              style={{
                                backgroundColor: '#00C3AC',
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
              </div>
            </ClickAwayListener>
            <ClickAwayListener onClickAway={() => setOpenStop(false)}>
              <div>
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
                        <Typography style={{ marginLeft: '5px' }}>
                          {'stops'}
                        </Typography>
                        <Typography
                          style={{ marginLeft: '15px', marginTop: '15px' }}>
                          {'Direct'}
                        </Typography>
                        <div style={{ marginTop: '15px' }}>
                          <List>
                            {[
                              { name: '1 stop', price: '68,888', value: 1 },
                              { name: '2+ stop', price: '66,888', value: 2 },
                            ].map((value) => {
                              const labelId = `checkbox-list-label-${value}`;
                              return (
                                <ListItem
                                  // key={v.id}
                                  role={undefined}
                                  dense
                                  button
                                  onClick={handleStops(value.value)}>
                                  <ListItemIcon>
                                    <Checkbox
                                      edge='start'
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
              </div>
            </ClickAwayListener>
          </Grid>
          <Grid
            item
            xs={2}
            style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div>
              <img alt='' src={SortPng} style={{ height: '35px' }}></img>
            </div>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>

        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={10} style={{ marginBottom: '5%' }}>
            {progress ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '10px',
                }}>
                <CircularProgress
                  size={40}
                  style={{ color: 'rgb(75, 175, 201)' }}
                />
              </div>
            ) : (
              <>
                {listData.length > 0 ? (
                  listData.map((x: any) => (
                    <Grid
                      container
                      style={{
                        display: 'flex',
                        marginTop: '40px',
                        backgroundColor: 'white',
                        padding: '10px',
                      }}
                      className={classes.flight_card}>
                      <>
                        {x.itineraries.map((item: any) => (
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
                                  fontFamily: 'AvantGarde-Regular',
                                }}>
                                SpiceJet
                              </Typography>
                            </div>

                            <div>
                              {handleTime(item.depatureAt)}
                              <br />
                              <Typography
                                style={{
                                  marginTop: '5px',
                                  fontFamily: 'CrimsonText-Regular',
                                }}>
                                {item.from_city}
                              </Typography>
                              <br />
                              {item.depature}
                            </div>
                            <div>
                              <Typography style={{ textAlign: 'center' }}>
                                {x.itineraries[0].segments.length - 1 === 1
                                  ? '1 STOP'
                                  : x.itineraries[0].segments.length -
                                    1 +
                                    'STOPS'}
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
                                {item.duration}
                              </Typography>
                            </div>
                            <div>
                              {handleTime(item.arrivalAt)}
                              <Typography
                                style={{
                                  marginTop: '5px',
                                  fontFamily: 'CrimsonText-Regular',
                                }}>
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
                          }}></div>
                        <div>
                          <Typography>
                            <span
                              style={{
                                fontSize: '22px',
                                fontWeight: 500,
                                color: '#1C2460',
                              }}>
                              {/* {x.price.currency} */}
                              {'SGD '}
                              {x.price.base}
                            </span>
                          </Typography>
                          <br />
                          <Button
                            onClick={() => handleFlightDetails(x.id)}
                            variant='contained'
                            style={{
                              background: '#DCAB5E',
                              color: '#fff',
                            }}>
                            View Details
                          </Button>
                        </div>
                        <div
                          style={{ float: 'right' }}
                          onClick={() => setFavourite(!favourite)}>
                          {favourite ? (
                            <img
                              alt=''
                              src={heartunselected}
                              style={{
                                width: '20px',
                                height: '20px',
                                position: 'relative',
                                left: '14px',
                                marginBottom: '87px',
                              }}
                            />
                          ) : (
                            <img
                              alt=''
                              src={heart}
                              style={{
                                width: '20px',
                                height: '20px',
                                position: 'relative',
                                left: '14px',
                                marginBottom: '87px',
                              }}
                            />
                          )}
                        </div>
                      </Grid>
                    </Grid>
                  ))
                ) : (
                  <div
                    style={{
                      textAlign: 'center',
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '15px',
                    }}>
                    <Typography variant='h6'>{'No Flights Found'}</Typography>
                  </div>
                )}
              </>
            )}
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </div>
      <div style={{ marginTop: '5%' }}>
        <BottomGrid />
      </div>
    </div>
  );
};
export default injectWithObserver(FlightList);
