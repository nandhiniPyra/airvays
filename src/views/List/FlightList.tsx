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
import {
  _searchFlights,
  _flightDetails,
  _bookFlight,
  _addBaggage,
} from '../../services/api/flight';
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
import useSnackbar from '../../hooks/useSnackbar';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
let parseIsoDuration = require('parse-iso-duration');

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: '1200px',
      background: '#FFFFFF',
      maxWidth: '100%',
      overflowX: 'hidden',
      // overflowY: "hidden"
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
  const snackBar = useSnackbar();
  const { searchRequest, flightlist, searchKeys, flightType } = toJS(
    store.FlightDetails,
  );
  const {
    setselectedFlight,
    setsearchRequest,
    setflightlist,
    getflightbyid,
    setsearchKeys,
    setbookFlight,
    setbaggage,
    setextra_baggage,
  } = store.FlightDetails;
  const { setComponent } = store.Search;

  const { setCurrentPage } = store.Search;
  const classes = useStyles();
  const navigate = useNavigate();
  const { state }: any = useLocation();
  const [airvaysData, setairvaysData] = useState<any>([]);
  const [filtersDataValue, setFiltersDataValue] = useState([]);
  const [open, setOpen] = useState(false);
  const [favourite, setFavourite] = React.useState<boolean>(true);
  const [placement, setPlacement] = useState<PopperPlacementType>();
  const [anchorEl1, setAnchorEl1] = useState<HTMLButtonElement | null>(null);
  const [anchorEl2, setAnchorEl2] = useState<HTMLButtonElement | null>(null);
  const [anchorEl3, setAnchorEl3] = useState<HTMLButtonElement | null>(null);
  const [anchorEl4, setAnchorEl4] = useState<HTMLButtonElement | null>(null);
  const [anchorEl5, setAnchorEl5] = useState<HTMLButtonElement | null>(null);
  const [openpricerange, setOpenpricerange] = useState(false);
  const [pricevalue, setpriceValue] = React.useState<number[]>([150, 200]);
  const [selectedpricevalue, setselectedpricevalue] = React.useState<number[]>([
    150, 200,
  ]);
  const [outBoundValue, setOutBoundValue] = React.useState<number | number[]>(
    100,
  );
  const [returnValue, setReturnValue] = React.useState<number | number[]>(100);
  const [outBoundTimeValue, setOutBoundTimeValue] = React.useState<any>([
    '00:00',
    '47:59',
  ]);
  const [returnTimeValue, setReturnTimeValue] = React.useState<any>([
    '00:00',
    '47:59',
  ]);
  const [filtersData, setFiltersData] = useState([]);
  const [listData, setListData] = useState([]);
  const [openStop, setOpenStop] = useState(false);
  const [progress, setProgress] = useState(false);
  const [openDuration, setOpenDuration] = useState(false);
  const [searchFlightDetails, setSearchFlightDetails] = useState(searchRequest);
  const [carriersList, setcarriersList] = useState<any>([]);
  const [flightavaliable, setflightavaliable] = useState(false);
  const [airlinesCount, setairlinesCount] = useState('All');
  let request: any = {};
  const resetPrice = () => {
    setpriceValue([150, 200]);
  };
  const [outBoundMillisec, setoutBoundMilliSec] = useState();
  const [returnMillisec, setreturnMilliSec] = useState();
  const [openClass, setOpenClass] = useState(false);
  const [classData, setClassData] = useState([
    {
      id: 1,
      name: 'Economy',
      value: 'ECONOMY',
      isChecked: false,
    },
    {
      id: 2,
      name: 'Premium Economy',
      value: 'PREMIUM_ECONOMY',
      isChecked: false,
    },
    {
      id: 3,
      name: 'Business',
      value: 'BUSINESS',
      isChecked: false,
    },
    {
      id: 4,
      name: 'First',
      value: 'FIRST',
      isChecked: false,
    },
  ]);
  const [radioValue, setRadioVal] = useState<any>('Economy');

  const handleDuration =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl4(event.currentTarget);
      setOpenDuration((prev: any) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  const handleStop =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl3(event.currentTarget);
      setOpenStop((prev: any) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };
  const handleOutbound = (event: any, newValue: number | number[]) => {
    setOutBoundValue(newValue);
    let data = [];
    let val: any = newValue;
    let display = moment({}).seconds(val).format('hh:mm');
    // let time = `${(val / 60) ^ 0}:` + (val % 60);
    data.push(display, '47:59');
    setOutBoundTimeValue(data);
    let millsec: any = handlemilliseconds(display);
    let newmilli: any = moment.duration(display).asMilliseconds();
    console.log(newmilli, 'display', millsec);
    setoutBoundMilliSec(newmilli);
  };

  const handleReturn = (event: any, newValue: number | number[]) => {
    setReturnValue(newValue);
    let data = [];
    let val: any = newValue;
    let time = `${(val / 60) ^ 0}:` + (val % 60);
    data.push(time, '47:59');
    setReturnTimeValue(data);
    let millsec: any = handlemilliseconds(time);
    setreturnMilliSec(millsec);
  };

  const handlemilliseconds = (time: any) => {
    let timeParts = time.split(':');
    let mins = timeParts[0] * 60000 * 60;
    let hrs = timeParts[1] * 60000 * 60;
    let millisec = mins + hrs;
    return millisec;
  };
  const handleChangeprice = (event: any, newValue: number | number[]) => {
    setpriceValue(newValue as number[]);
  };
  function valuetext(value: number) {
    return `${value}`;
  }
  const handleClickClass =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl5(event.currentTarget);
      setOpenClass((prev: any) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };
  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl1(event.currentTarget);
      setOpen((prev: any) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };
  const handleClickpricerage =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl2(event.currentTarget);
      setOpenpricerange((prev: any) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  const searchFlights = (req: any) => {
    setsearchKeys({ fromCity: req.fromcity, toCity: req.tocity });
    if (req.no_of_people.adults) {
      setProgress(true);
      _searchFlights(req, function (error: any, response: any) {
        if (error === null) {
          if (response.status === 200) {
            clearClassFilter();
            response.result && setairvaysData(response.result.data);
            response &&
              response.result &&
              response.result.data &&
              setflightlist(response.result.data);
            // stores.FlightStore.SetAirLineList(response.result.data);
            let obj = response.result.dictionaries.carriers;
            let List: any = [];
            List.push({
              id: 1,
              code: 'ALL',
              name: 'ALL',
              isChecked: false,
              price: '',
            });
            Object.keys(obj).forEach(function (key) {
              var value = obj[key];
              List.push({
                id: carriersList.length + 1,
                code: key,
                name: value,
                isChecked: false,
                price: '',
              });
            });

            setcarriersList(List);
            // carriersList.push()

            // setcarriersList((prevState: any) => {
            //   let newData = prevState;
            //   newData.push(...List);
            //   return newData;
            // });
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
                  item['onewaytime'] = parseIsoDuration(
                    value.segments[0].duration,
                  );
                  // item['onewaytime'] = moment.duration(value.segments[0].duration)
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
            console.log(item1, 'item1item1');
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

  const handleTime = (time: any) => {
    const Timing = moment(time).format('LT');
    return Timing;
  };

  const handleToggle = (value: any) => () => {
    setflightavaliable(false);
    const datakey = carriersList.filter((item: any) => item.isChecked === true);
    setFiltersData(filtersDataValue);
    if (value == 'ALL') {
      let flights = carriersList.map((x: any) => {
        x.isChecked = !x.isChecked;
        return x;
      });
      setcarriersList(flights);
    } else {
      const data = carriersList.map((x: any) => {
        if (x.name === value) {
          x.isChecked = !x.isChecked;
          console.log(value, 'value', carriersList, x.isChecked);
        }
        return x;
      });
      setcarriersList(data);
    }
  };

  const handleStops = (value: any) => () => {
    setflightavaliable(false);
    request.stops = value;
    let result: any = filterdata(filtersData, request);
    console.log(result, 'result');
    if (result.length) {
      setListData(result);
    } else {
      setListData([]);
    }
  };

  const closeAirline = () => {
    let flights = carriersList.map((x: any) => {
      x.isChecked = false;
      return x;
    });
    setcarriersList(flights);
    setListData(filtersDataValue);
  };
  const applyAirlineFilter = () => {
    setflightavaliable(false);
    const selected = carriersList.filter((x: any) => x.isChecked === true);
    let data: any = [];
    selected.map((item: any) => {
      data.push({ carrierCode: item.code });
    });
    request.carrier = data;
    let result: any = filterdata(filtersData, request);
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

  const handlePriceRangeFilter = (val: any) => {
    request.range = { min: val[0], max: val[1] };
    let result: any = filterdata(filtersData, request);
    if (result.length > 0) {
      setListData(result);
    } else {
      setflightavaliable(true);
      setListData([]);
    }
  };
  const clearDuration = () => {
    setOutBoundTimeValue(['00:00', '23:59']);
    setReturnTimeValue(['00:00', '23:59']);
  };
  const getairlinesCount = () => {
    carriersList.filter((i: any) => i.isChecked === true).length ===
    carriersList.length
      ? setairlinesCount('All')
      : carriersList.filter((i: any) => i.isChecked === true).length <= 0
      ? setairlinesCount('')
      : setairlinesCount(
          `${carriersList.filter((i: any) => i.isChecked === true).length}`,
        );
  };
  useEffect(() => {
    // if (_.some(searchFlightDetails, _.isEmpty) && state && state.stateSend) {
    //   let value: any = state.stateSend;
    //   // _.omitBy(state.stateSend, ['fromcity', 'tocity']);
    //   setSearchFlightDetails(value);
    //   searchFlights(value);
    // }
    setComponent('flight');
  }, []);

  const chartData = {
    from: 'MAA',
    to: 'DEL',
    from_date: '2021-08-10',
    currency_code: 'SGD',
    oneWay: false,
  };
  const selectedFlightbyId = (id: any) => {
    if (airvaysData && airvaysData.length > 0) {
      const result = toJS(airvaysData.find((x: any) => x.id === id));
      return result;
    } else return {};
  };
  const book_Flight = (bookFlight: any) => {
    _bookFlight({ data: bookFlight }, function (error: any, response: any) {
      if (error === null) {
        if (response.status === '200') {
          let extra_baggage =
            response.result.data.flightOffers[0].travelerPricings.map(
              (t: any) => {
                return { travelerId: t.travelerId, quantity: 1 };
              },
            );
          setextra_baggage(extra_baggage);
          setbookFlight(response.result);
        }
      }
    });
  };

  const handleFlightDetails = (id: any) => {
    const params = { data: getflightbyid(id) };
    book_Flight(selectedFlightbyId(id));
    setbaggage(selectedFlightbyId(id));
    _flightDetails(params, function (error: any, response: any) {
      if (error == null) {
        if (response.status === '200') {
          let item1 = response.result?.data.flightOffers.map(
            (item: any, index: any) => {
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
                    item.travelerPricings.map(
                      (val: any) =>
                        (item['totalTax'] = _.toNumber(
                          val.price.refundableTaxes,
                        )),
                    );
                    item['quantity'] =
                      item.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.quantity;
                    value['from_city'] = searchKeys.fromCity;
                    value['to_city'] = searchKeys.toCity;
                    let stops: any = new Set([]);
                    value.segments.map((x: any, indx: any) => {
                      if (indx !== value.segments.length - 1) {
                        stops.add(x.arrival.iataCode);
                      }
                    });
                    value['via'] = [...stops];
                  }
                  let segments_Duration: any = [];
                  value.segments.map((val: any, idx: any) => {
                    segments_Duration.push({
                      arraival: val.arrival.iataCode,
                      depature: val.departure.iataCode,
                      duration: val.duration,
                    });
                  });
                  item['duration_'] = segments_Duration;
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
                  let stops: any = new Set([]);
                  value.segments.map((x: any, indx: any) => {
                    if (indx !== value.segments.length - 1) {
                      stops.add(x.arrival.iataCode);
                    }
                  });
                  value['via'] = [...stops];
                  item['totalTax'] = item.travelerPricings.map((val: any) =>
                    _.toNumber(val.price.refundableTaxes),
                  );
                  item['quantity'] =
                    item.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.quantity;
                  if (value.segments[0]) {
                    item.itineraries[0]['from_city'] = searchKeys.fromCity;
                    item.itineraries[0]['to_city'] = searchKeys.toCity;
                  }
                  if (item.itineraries.length > 0 && value.segments[length]) {
                    item.itineraries[item.itineraries.length - 1]['from_city'] =
                      searchKeys.toCity;
                    item.itineraries[item.itineraries.length - 1]['to_city'] =
                      searchKeys.fromCity;
                  }
                  let segments_Duration: any = [];
                  value.segments.map((val: any, idx: any) => {
                    segments_Duration.push({
                      arraival: val.arrival.iataCode,
                      depature: val.departure.iataCode,
                      duration: val.duration,
                    });
                  });
                  item['duration_'] = segments_Duration;
                });
              }
              return item;
            },
          );
          setselectedFlight(item1);
          navigate('/flightListDetails');
        }
      } else if (response == null) {
        snackBar.show('No Details Found', 'error', undefined, true, 2000);
      }
    });
  };

  const OnewayFilter = () => {
    request.Oneway = outBoundMillisec;
    let result: any = filterdata(filtersData, request);
    console.log(
      outBoundValue,
      result,
      'resultjj',
      filtersData,
      outBoundMillisec,
    );
  };
  const retunFilter = () => {};
  // console.log(stores.FlightStore, 'airvaysData');

  const handleToggleClass = (event: any) => {
    if (event.target.value === radioValue) {
      setRadioVal('');
    } else {
      setRadioVal(event.target.value);
    }
    setflightavaliable(false);
    setFiltersData(filtersDataValue);
    const data = classData.map((x: any) => {
      if (x.name === event.target.value) {
        x.isChecked = !x.isChecked;
      }
      return x;
    });
    setClassData(data);
  };

  const applyClassFilter = () => {
    const datakey = classData.filter((item: any) => item.isChecked === true);
    const data = searchFlightDetails;
    data.class = datakey[0].value;
    searchFlights(data);
    setOpenClass(false);
  };

  const clearClassFilter = () => {
    const data = classData.map((x: any) => {
      x.isChecked = false;
      return x;
    });
    setClassData(data);
    setOpenClass(false);
    setRadioVal('Economy');
  };
  useEffect(() => {
    setCurrentPage(true);
  }, []);
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
              request={searchFlightDetails}
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
                padding: '3%',
                textAlign: 'center',
                marginTop: '3%',
                marginRight: '5%',
                fontFamily: 'CrimsonText-Regular',
                fontSize: '17px',
              }}>
              <b
                style={{
                  textDecoration: 'underline #FCD598 8px',
                  fontFamily: 'CrimsonText-bold',
                  fontSize: '23px',
                }}>
                SGD $150
              </b>
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
        <Grid container spacing={3} style={{ marginTop: '4%' }}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10} style={{ marginTop: '3%' }}>
            <Grid container>
              <Grid item xs={6}>
                <Typography
                  style={{
                    textAlign: 'left',
                    fontSize: '20px',
                    fontWeight: 500,
                    fontFamily: 'AvantGarde-Demi',
                    color: '#1C2460',
                  }}>
                  Search Results
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  style={{
                    textAlign: 'right',
                    color: '#1C2460',
                    fontFamily: 'AvantGarde-Regular',
                  }}>
                  {listData.length} of {listData.length} flights
                </Typography>
              </Grid>
            </Grid>
            <Typography
              style={{
                color: '#4BAFC9',
                fontFamily: 'AvantGarde-Demi',
                marginTop: '2%',
              }}>
              Filter By
            </Typography>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={1}></Grid>
          <Grid item xs={8} style={{ display: 'flex' }}>
            <ClickAwayListener onClickAway={() => setOpen(false)}>
              <div>
                <Button
                  style={{
                    color:
                      carriersList.filter(
                        (item: any) => item.isChecked === true,
                      ).length > 0
                        ? '#FFF'
                        : '#000',
                    background:
                      carriersList.filter(
                        (item: any) => item.isChecked === true,
                      ).length > 0
                        ? '#4BAFC9'
                        : '#F7F7F7',
                    borderRadius: '20px',
                    fontFamily: 'CrimsonText-Regular',
                    fontSize: '16px',
                  }}
                  onClick={handleClick('bottom-start')}>
                  Airlines: {airlinesCount}
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
                              carriersList.map((v: any) => {
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
                                          style={{
                                            marginTop: '8%',
                                            fontFamily: 'CrimsonText-Regular',
                                          }}
                                          id={labelId}
                                          primary={v.name}
                                        />
                                      </Grid>
                                      <Grid item xs={2}>
                                        <ListItemText
                                          style={{
                                            marginTop: '8%',
                                            color: '#A7A7A7',
                                            fontFamily: 'CrimsonText-Regular',
                                          }}
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
                                marginRight: '5%',
                                marginTop: '5%',
                              }}>
                              <div>
                                <Button
                                  style={{
                                    fontFamily: 'CrimsonText-Regular',
                                    fontSize: 18,
                                  }}
                                  onClick={closeAirline}>
                                  Clear
                                </Button>
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
                                    borderRadius: '6px',
                                    height: '30px',
                                    marginTop: '5px',
                                    fontFamily: 'CrimsonText-Regular',
                                    fontSize: 18,
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
                    fontFamily: 'CrimsonText-Regular',
                    fontSize: '16px',
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
                              min={100}
                              max={10000}
                            />
                          </Grid>
                        </Grid>
                        <Divider />
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: '5%',
                          }}>
                          <div>
                            <Button
                              style={{
                                fontFamily: 'CrimsonText-Regular',
                                fontSize: 18,
                              }}
                              onClick={resetPrice}>
                              Reset
                            </Button>
                          </div>
                          <div>
                            {console.log(pricevalue, 'pricevalue')}
                            <Button
                              onClick={() => {
                                setOpenpricerange(false);
                                setselectedpricevalue(pricevalue);
                                // setFiltersData(filterdata(filtersData,));
                                handlePriceRangeFilter(pricevalue);
                              }}
                              variant='contained'
                              style={{
                                backgroundColor: '#00C3AC',
                                color: '#fff',
                                borderRadius: '6px',
                                marginTop: '5px',
                                fontFamily: 'CrimsonText-Regular',
                                fontSize: 18,
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

            <ClickAwayListener onClickAway={() => setOpenClass(false)}>
              <div>
                <Button
                  style={{
                    color:
                      classData.filter((item: any) => item.isChecked === true)
                        .length > 0
                        ? '#FFF'
                        : '#000',
                    background:
                      classData.filter((item: any) => item.isChecked === true)
                        .length > 0
                        ? '#4BAFC9'
                        : '#F7F7F7',
                    borderRadius: '20px',
                    fontFamily: 'CrimsonText-Regular',
                    fontSize: '16px',
                  }}
                  onClick={handleClickClass('bottom-start')}>
                  Class :{radioValue}
                </Button>
                {openClass ? (
                  <Popper
                    style={{ width: '250px', marginTop: '15px' }}
                    open={openClass}
                    anchorEl={anchorEl5}
                    placement={placement}
                    transition>
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                          <List>
                            {classData &&
                              classData.map((v: any) => {
                                // const labelId = `checkbox-list-label-${v.id}`;
                                return (
                                  <Grid container>
                                    <Grid item xs={1}></Grid>
                                    <Grid item xs={11}>
                                      <FormControl component='fieldset'>
                                        <RadioGroup
                                          aria-label='Class'
                                          name='Class'
                                          value={radioValue}>
                                          <FormControlLabel
                                            value={v.name}
                                            control={
                                              <Radio
                                                classes={{
                                                  root: classes.radio,
                                                  checked: classes.checked,
                                                }}
                                                onClick={handleToggleClass}
                                              />
                                            }
                                            label={v.name}
                                          />
                                        </RadioGroup>
                                      </FormControl>
                                    </Grid>
                                  </Grid>
                                );
                              })}
                            <Divider />
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginRight: '5%',
                                marginTop: '5%',
                              }}>
                              <div>
                                <Button
                                  style={{
                                    fontFamily: 'CrimsonText-Regular',
                                    fontSize: 18,
                                  }}
                                  onClick={clearClassFilter}>
                                  Close
                                </Button>
                              </div>
                              <div>
                                <Button
                                  onClick={() => {
                                    applyClassFilter();
                                    // setOpenClass(false);
                                  }}
                                  variant='contained'
                                  style={{
                                    backgroundColor: '#00C3AC',
                                    color: '#fff',
                                    borderRadius: '6px',
                                    height: '30px',
                                    marginTop: '5px',
                                    fontFamily: 'CrimsonText-Regular',
                                    fontSize: 18,
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
            <ClickAwayListener onClickAway={() => setOpenDuration(false)}>
              <div>
                <Button
                  onClick={handleDuration('bottom-start')}
                  style={{
                    color: '#333333',
                    background: '#FFFFFF',
                    borderRadius: '20px',
                    marginLeft: '15px',
                    fontFamily: 'CrimsonText-Regular',
                    fontSize: '16px',
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
                            {flightType == 'one-way' ? (
                              <div>
                                <Typography
                                  style={{
                                    fontSize: '16px',
                                    fontFamily: 'CrimsonText-Regular',
                                  }}>
                                  {'Outbound'}
                                </Typography>
                                <Typography
                                  id='range-slider'
                                  gutterBottom
                                  style={{ color: '#333333', opacity: '50%' }}>
                                  {`${outBoundTimeValue[0]} - ${outBoundTimeValue[1]}`}
                                </Typography>
                                <Slider
                                  className={classes.slider_clr}
                                  value={outBoundValue}
                                  onChange={handleOutbound}
                                  valueLabelDisplay='auto'
                                  aria-labelledby='range-slider'
                                  getAriaValueText={valuetext}
                                  min={0}
                                  max={500}
                                />
                              </div>
                            ) : (
                              <div>
                                <Typography
                                  style={{
                                    fontSize: '16px',
                                    fontFamily: 'CrimsonText-Regular',
                                  }}>
                                  {'Return'}
                                </Typography>
                                <Typography
                                  id='range-slider'
                                  gutterBottom
                                  style={{ color: '#333333', opacity: '50%' }}>
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
                            )}
                          </Grid>
                        </Grid>
                        <Divider />
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: '5%',
                          }}>
                          <div>
                            <Button
                              style={{
                                fontFamily: 'CrimsonText-Regular',
                                fontSize: 18,
                                color: '#333333',
                                opacity: '50%',
                              }}
                              onClick={clearDuration}>
                              Reset
                            </Button>

                            <Button
                              onClick={
                                flightType == 'one-way'
                                  ? OnewayFilter
                                  : retunFilter
                              }
                              variant='contained'
                              style={{
                                backgroundColor: '#00C3AC',
                                color: '#fff',
                                borderRadius: '6px',
                                marginTop: '5px',
                                fontFamily: 'CrimsonText-Regular',
                                fontSize: 18,
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
            <ClickAwayListener
              onClickAway={() => {
                setOpenStop(false);
                setListData(filtersData);
              }}>
              <div>
                <Button
                  onClick={handleStop('bottom-start')}
                  style={{
                    color: '#333333',
                    background: '#FFFFFF',
                    borderRadius: '20px',
                    marginLeft: '15px',
                    fontFamily: 'CrimsonText-Regular',
                    fontSize: '16px',
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
                                    {/* {value.price} */}
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
                            item
                            xs={10}
                            style={{
                              color: '#1C2460',
                              marginTop: '15px',
                              display: 'flex',
                              // justifyContent: "space-between",
                            }}>
                            <Grid item xs={3}>
                              <div>
                                <div>
                                  <img
                                    alt=''
                                    style={{ marginLeft: '10%' }}
                                    src={SpiceJet}></img>
                                </div>
                                <Typography
                                  style={{
                                    fontSize: '14px',
                                    color: '#1C2460',
                                    opacity: '40%',
                                    marginLeft: '20%',
                                    fontFamily: 'AvantGarde-Regular',
                                  }}>
                                  SpiceJet
                                </Typography>
                              </div>
                            </Grid>
                            <Grid container>
                              <Grid item xs={2}>
                                {' '}
                                <div>
                                  <Typography style={{ fontSize: '19px' }}>
                                    {handleTime(item.depatureAt)}
                                  </Typography>
                                  {/* <br /> */}
                                  <Typography
                                    style={{
                                      marginTop: '5%',
                                      fontFamily: 'CrimsonText-Regular',
                                      fontWeight: 'bold',
                                    }}>
                                    {item.from_city}
                                  </Typography>
                                  <Typography
                                    style={{
                                      fontFamily: 'CrimsonText-Regular',
                                      fontWeight: 'bold',
                                    }}>
                                    {item.depature}
                                  </Typography>
                                </div>
                              </Grid>
                              <Grid item xs={7}>
                                {' '}
                                <div>
                                  <Typography
                                    style={{
                                      marginLeft: '36%',
                                      color: '#707070',
                                    }}>
                                    {x.itineraries[0].segments.length - 1 === 1
                                      ? '1 STOP'
                                      : x.itineraries[0].segments.length -
                                        1 +
                                        'STOPS'}
                                  </Typography>
                                  <div
                                    style={{
                                      display: 'flex',
                                      color: '#E5E5E5',
                                    }}>
                                    {'-------------------------'}
                                    <img alt='' src={flightIcon}></img>
                                    {'-------------------------'}
                                  </div>
                                  <Typography
                                    style={{
                                      marginTop: '5px',
                                      marginLeft: '35%',
                                      color: '#707070',
                                    }}>
                                    {item.duration}
                                  </Typography>
                                </div>
                              </Grid>
                              <Grid item xs={2}>
                                {' '}
                                <div>
                                  <Typography style={{ fontSize: '19px' }}>
                                    {handleTime(item.arrivalAt)}
                                  </Typography>
                                  <Typography
                                    style={{
                                      marginTop: '5%',
                                      fontFamily: 'CrimsonText-Regular',
                                      fontWeight: 'bold',
                                    }}>
                                    {item.to_city}
                                  </Typography>
                                  <Typography
                                    style={{
                                      fontFamily: 'CrimsonText-Regular',
                                      fontWeight: 'bold',
                                    }}>
                                    {item.arrival}
                                  </Typography>
                                </div>
                              </Grid>
                              <Grid item xs={1}></Grid>
                            </Grid>
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
                        <div>
                          <Typography>
                            <span
                              style={{
                                fontSize: '20px',
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
