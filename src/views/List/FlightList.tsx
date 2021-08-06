import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import search from '../../assets/icons8-search-30.png';
import exchange from '../../assets/exchange@2x.png';
import FlightBG from '../../assets/pexels-pixabay-62623.jpeg';
import flight from '../../assets/Flight Info@2x.png';
import hotel from '../../assets/Icon metro-hotel-blue@2x.png';
import car from '../../assets/Icon awesome-car-blue@2x.png';
import SortPng from '../../assets/Sort@2x.png';
import blog1 from '../../assets/Blog image - 1@2x.png';
import RatingPng from '../../assets/Icon awesome-star@2x.png';
import parkingPng from '../../assets/Parking lot@2x.png';
import wifiPng from '../../assets/Wifi@2x.png';
import entertainment from '../../assets/Entertainment - Hotel@2x.png';
import prizeAnalysis1 from '../../assets/Price Analysis - Illustration 1@2x.png';
import prizeAnalysis2 from '../../assets/Price Analysis - Illustration 2@2x.png';
import user from '../../assets/Icon feather-user@2x.png';
import { Button, InputAdornment, Popover, Typography } from '@material-ui/core';
import TrackPricesContainer from '../TrackPrices/index';
import Box from '@material-ui/core/Box';
import { Divider } from '@material-ui/core';
import Chart from '../Chart/index';
import goAir from '../../assets/Flight logo - 1@2x.png';
import SpiceJet from '../../assets/Flight logo - 3@2x.png';
import indigo from '../../assets/Flight logo - 2@2x.png';
import flightIcon from '../../assets/Icon material-flight@2x.png';
import addPeople from '../../assets/People - Add@2x.png';
import subtractPeople from '../../assets/People - subtract@2x.png';
// import BottomGrid from '../Airvays info/index'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import Popper, { PopperPlacementType } from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import _ from 'lodash';
import { _searchFlights } from '../../services/api/flight';
import { _getAirports } from '../../services/api/flight';
import { Autocomplete } from '@material-ui/lab';
import filterdata from './Filter';

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
  }),
);

const Amenities = [
  {
    img: `url(${parkingPng})`,
    title: 'Breakfast',
    author: 'jill111',
    featured: true,
  },
  {
    img: `url(${wifiPng})`,
    title: 'Tasty burger',
    author: 'director90',
  },
  {
    img: `url(${entertainment})`,
    title: 'Camera',
    author: 'Danson67',
  },
];
export default function HotelsList() {
  const classes = useStyles();
  const [value, setValue] = React.useState('One-way');
  const [filtersData, setFiltersData] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();
  const [fromOptions, setFromOptions] = useState<Array<any>>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [anchorEl1, setAnchorEl1] = useState<HTMLButtonElement | null>(null);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl1(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: any) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  const searchFlights = () => {
    _searchFlights(
      {
        from: 'MAA',
        to: 'LON',
        currencyCode: 'INR',
        type: 'one-way',
        from_date: '2021-08-21',
        to_date: '2021-08-31',
        no_of_people: {
          adults: 1,
          children: 0,
          infants: 0,
        },
        class: 'ECONOMY',
      },
      function (error: any, response: any) {
        if (error == null) {
          if (response.status == 200) {
            setFiltersData(response.result.data);
          } else {
          }
        } else if (response == null) {
          console.log(error);
        }
      },
    );
  };
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

  const handlePopoverClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    searchFlights();
  }, []);
  useEffect(() => {
    getAirportsFrom();
    getAirportsTo();
  }, [from, to]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.flightTop}>
        <Grid item xs={1}>
          {' '}
        </Grid>
        <Grid item xs={10}>
          {/* icons div */}
          <Grid container style={{ marginTop: '75px' }}>
            <Grid xs={12}>
              <div style={{ textAlign: 'center', display: 'flex' }}>
                <div
                  style={{
                    width: '138px',
                    height: '98px',
                    background: '#EAF8FF',
                    borderRadius: '5px',
                  }}>
                  <img src={flight} style={{ marginTop: '15px' }}></img>
                  <br />
                  <br />
                  Flights
                </div>
                <div
                  style={{
                    width: '138px',
                    height: '98px',
                    background: '#fff',
                    borderRadius: '5px',
                  }}
                  className={classes._ml15}>
                  <img src={hotel} style={{ marginTop: '15px' }} />
                  <br />
                  <br />
                  Hotels
                </div>
                <div
                  style={{
                    width: '138px',
                    height: '98px',
                    background: '#fff',
                    borderRadius: '5px',
                  }}
                  className={classes._ml15}>
                  <img src={car} style={{ marginTop: '15px' }} />
                  <br />
                  <br />
                  Car Rental
                </div>
              </div>
            </Grid>
          </Grid>
          {/* search */}

          <Grid container style={{ marginTop: '40px' }}>
            <Grid xs={12}>
              <Paper className={classes.paper}>
                <div>
                  <Formik
                    initialValues={{
                      NoP: '',
                      startDate: null,
                      endDate: null,
                      from,
                      to,
                    }}
                    enableReinitialize
                    onSubmit={async (values) => {
                      await new Promise((resolve) => setTimeout(resolve, 500));
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
                        .typeError('Start Date is required')
                        .required('Start Date is required'),
                      endDate: Yup.date()
                        .typeError('End Date is required')
                        .required('End Date is required')
                        .when('startDate', (startDate: any) => {
                          if (startDate) {
                            return Yup.date()
                              .min(
                                startDate,
                                'End Date must be after Start Date',
                              )
                              .typeError('End Date is required');
                          }
                        }),
                      NoP: Yup.string()
                        .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
                        .max(40)
                        .required(),
                      // to: Yup.string().name().required("Required"),
                    })}>
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
                            <Grid style={{ margin: '12px' }}>
                              <RadioGroup
                                row
                                aria-label='gender'
                                name='gender1'
                                value={value}
                                onChange={handleRadioChange}>
                                <FormControlLabel
                                  value='One-way'
                                  //   className={classes.formControlLabel}
                                  control={
                                    <Radio
                                      classes={{
                                        root: classes.radio,
                                        checked: classes.checked,
                                      }}
                                    />
                                  }
                                  label='One-way'
                                />
                                <FormControlLabel
                                  value='return'
                                  //   className={classes.formControlLabel}
                                  control={
                                    <Radio
                                      classes={{
                                        root: classes.radio,
                                        checked: classes.checked,
                                      }}
                                    />
                                  }
                                  label='Return'
                                />
                              </RadioGroup>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                              }}
                              spacing={1}>
                              <Autocomplete
                                id='from'
                                className='country-select'
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
                                  console.log(from, 'from');
                                }}
                                renderInput={(params) => (
                                  <Field
                                    style={{ width: '230px' }}
                                    component={TextField}
                                    {...params}
                                    name='From'
                                    label='From'
                                    variant='outlined'
                                    fullWidth
                                  />
                                )}
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
                                  style={{ marginTop: '10px' }}></img>
                              </Typography>

                              <Autocomplete
                                id='to'
                                className='country-select'
                                options={fromOptions}
                                getOptionLabel={(option) => option.name}
                                onChange={handleChange}
                                onInputChange={(event, newInputValue) => {
                                  setTo(newInputValue);
                                }}
                                renderInput={(params) => (
                                  <Field
                                    style={{ width: '230px' }}
                                    component={TextField}
                                    {...params}
                                    name='To'
                                    label='To'
                                    variant='outlined'
                                    fullWidth
                                  />
                                )}
                              />
                              <br />

                              {/* {errors.email && touched.email && (
                                <div className="input-feedback">
                                  {errors.email}
                                </div>
                              )} */}

                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                  className={classes.date_picker}
                                  margin='normal'
                                  id='date-picker-dialog'
                                  // label='Date picker dialog'
                                  format='MM/dd/yyyy'
                                  value={values.startDate}
                                  onChange={(value) =>
                                    props.setFieldValue('startDate', value)
                                  }
                                  InputAdornmentProps={{ position: 'start' }}
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                                  InputProps={{
                                    disableUnderline: true,
                                  }}
                                />

                                <KeyboardDatePicker
                                  className={classes.date_picker}
                                  margin='normal'
                                  id='date-picker-dialog'
                                  // label='Date picker dialog'
                                  format='MM/dd/yyyy'
                                  value={values.endDate}
                                  onChange={(value) =>
                                    props.setFieldValue('endDate', value)
                                  }
                                  InputAdornmentProps={{ position: 'start' }}
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                                  InputProps={{
                                    disableUnderline: true,
                                  }}
                                />
                              </MuiPickersUtilsProvider>
                              {errors.endDate && touched.endDate && (
                                <div className='input-feedback'>
                                  {errors.endDate}
                                </div>
                              )}
                              <TextField
                                id='NoP'
                                placeholder='No.of People'
                                label='No.of People'
                                variant='outlined'
                                value={values.NoP}
                                onChange={handleNoP}
                                onBlur={handleBlur}
                                className={
                                  errors.NoP && touched.NoP
                                    ? 'text-input error'
                                    : 'text-input'
                                }
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position='start'>
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
                                  vertical: 'bottom',
                                  horizontal: 'center',
                                }}
                                transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'center',
                                }}
                                // autoFocus={false}
                              >
                                <Grid
                                  container
                                  spacing={2}
                                  style={{ marginTop: '5px', padding: '3px' }}>
                                  <Grid item xs={6}>
                                    <Typography
                                      style={{
                                        marginLeft: '15px',
                                      }}>
                                      Adults
                                    </Typography>
                                    <Typography
                                      style={{
                                        marginLeft: '15px',
                                        fontSize: '12px',
                                      }}>
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
                                          textAlign: 'center',
                                        }}>
                                        <Button>
                                          <img
                                            style={{
                                              width: '65%',
                                              height: '80%',
                                              position: 'relative',
                                              right: '22px',
                                            }}
                                            src={subtractPeople}></img>
                                        </Button>
                                      </Grid>
                                      <Grid item xs={2}>
                                        <Typography
                                          style={{
                                            marginTop: '10px',
                                            marginLeft: '15px',
                                            textAlign: 'center',
                                          }}>
                                          0
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={2}>
                                        <Button>
                                          <img
                                            src={addPeople}
                                            style={{
                                              width: '65%',
                                              height: '80%',
                                            }}></img>
                                        </Button>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Divider />
                                <Grid
                                  container
                                  spacing={2}
                                  style={{ marginTop: '5px', padding: '3px' }}>
                                  <Grid item xs={6}>
                                    <Typography
                                      style={{
                                        marginLeft: '15px',
                                      }}>
                                      Children
                                    </Typography>
                                    <Typography
                                      style={{
                                        marginLeft: '15px',
                                        fontSize: '12px',
                                      }}>
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
                                          textAlign: 'center',
                                        }}>
                                        <Button>
                                          <img
                                            style={{
                                              width: '65%',
                                              height: '80%',
                                              position: 'relative',
                                              right: '22px',
                                            }}
                                            src={subtractPeople}></img>
                                        </Button>
                                      </Grid>
                                      <Grid item xs={2}>
                                        <Typography
                                          style={{
                                            marginTop: '10px',
                                            marginLeft: '15px',
                                            textAlign: 'center',
                                          }}>
                                          0
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={2}>
                                        <Button>
                                          <img
                                            src={addPeople}
                                            style={{
                                              width: '65%',
                                              height: '80%',
                                            }}></img>
                                        </Button>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Divider />
                                <Grid
                                  container
                                  spacing={2}
                                  style={{ marginTop: '5px', padding: '3px' }}>
                                  <Grid item xs={6}>
                                    <Typography
                                      style={{
                                        marginLeft: '15px',
                                      }}>
                                      Infants
                                    </Typography>
                                    <Typography
                                      style={{
                                        marginLeft: '15px',
                                        fontSize: '12px',
                                      }}>
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
                                          textAlign: 'center',
                                        }}>
                                        <Button>
                                          <img
                                            style={{
                                              width: '65%',
                                              height: '80%',
                                              position: 'relative',
                                              right: '22px',
                                            }}
                                            src={subtractPeople}></img>
                                        </Button>
                                      </Grid>
                                      <Grid item xs={2}>
                                        <Typography
                                          style={{
                                            marginTop: '10px',
                                            marginLeft: '15px',
                                            textAlign: 'center',
                                          }}>
                                          0
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={2}>
                                        <Button>
                                          <img
                                            src={addPeople}
                                            style={{
                                              width: '65%',
                                              height: '80%',
                                            }}></img>
                                        </Button>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Popover>
                              {errors.NoP && touched.NoP && (
                                <div className='input-feedback'>
                                  {errors.NoP}
                                </div>
                              )}
                              <Button
                                type='submit'
                                style={{
                                  background: '#33BBFF',
                                  width: '35px',
                                  height: '54px',
                                }}
                                disabled={isSubmitting}>
                                <img
                                  src={search}
                                  style={{ width: '24px', height: '24px' }}
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
                <TrackPricesContainer />
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={3} style={{ marginTop: '20px' }}>
            <Grid item xs={12} container>
              <Grid item xs={1}></Grid>
              <Grid container xs={10}>
                <Grid item xs={2}>
                  {/* <Typography> */}
                  <img style={{ width: '120px' }} src={prizeAnalysis1}></img>
                  {/* </Typography> */}
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
                    </b>{' '}
                    is the best available price right now!
                    <br /> The current prices are lower than usual. You'll save
                    money of $27 to $32
                  </Box>
                </Grid>
                <Grid item xs={2} style={{ marginTop: '30px' }}>
                  {/* <Typography> */}
                  <img style={{ width: '120px' }} src={prizeAnalysis2}></img>
                  {/* </Typography> */}
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
                    23 of 165 hotels
                  </Typography>
                  <Typography style={{ color: '#4BAFC9' }}>
                    Filter By
                  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={3} style={{ marginTop: '20px' }}>
                <Grid item xs={10} style={{ display: 'flex' }}>
                  <ClickAwayListener onClickAway={() => setOpen(false)}>
                    <Button
                      style={{
                        color: '#FFF',
                        background: '#4BAFC9',
                        borderRadius: '20px',
                      }}
                      onClick={handleClick('bottom-start')}>
                      Airlines : All
                    </Button>
                  </ClickAwayListener>

                  <Popper
                  style={{width:'250px'}}
                    open={open}
                    anchorEl={anchorEl1}
                    placement={placement}
                    transition>
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                          <List>
                            {[
                              {
                                id: 0,
                                name: 'All',
                                value: 'all',
                                price: '',
                              },
                              {
                                id: 1,
                                name: 'IndiGo',
                                value: 'TG',
                                price: '$120',
                              },
                              {
                                id: 2,
                                name: 'SpiceJet',
                                value: 'SJ',
                                price: '$145',
                              },
                              {
                                id: 3,
                                name: 'Vistara',
                                value: 'UK',
                                price: '$200',
                              },
                              {
                                id: 4,
                                name: 'Air India',
                                value: 'AP',
                                price: '$145',
                              },
                              {
                                id: 5,
                                name: 'Go Air',
                                value: 'GA',
                                price: '$132',
                              },
                            ].map((v) => {
                              const labelId = `checkbox-list-label-${v.id}`;
                              return (
                                <ListItem
                                  key={v.id}
                                  role={undefined}
                                  dense
                                  button
                                  onClick={handleToggle(v.id)}>
                                  <Grid container>
                                    <Grid item xs={2}>
                                      <ListItemIcon>
                                        <Checkbox
                                          edge='start'
                                          checked={checked.indexOf(v.id) !== -1}
                                          tabIndex={-1}
                                          disableRipple
                                          inputProps={{
                                            'aria-labelledby': labelId,
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
                                      {' '}
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
                            <div style={{display:'flex',justifyContent:'flex-end'}}>
                              <div>
                                <Button onClick={() => setOpen(false)}>clear</Button>
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
                                    borderRadius:'50px',
                                    height:'30px',
                                    marginTop:'5px'
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

                  <Button
                    style={{
                      color: '#FFF',
                      background: '#4BAFC9',
                      borderRadius: '20px',
                      marginLeft: '15px',
                    }}>
                    Price Range : $150 to $200
                  </Button>
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
                    style={{
                      color: '#333333',
                      background: '#F7F7F7',
                      borderRadius: '20px',
                      marginLeft: '15px',
                    }}>
                    Duration
                  </Button>
                  <Button
                    style={{
                      color: '#333333',
                      background: '#F7F7F7',
                      borderRadius: '20px',
                      marginLeft: '15px',
                    }}>
                    No. Of Stops
                  </Button>
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
                    {/* <Grid container> */}

                    {x.itineraries[0].segments.map((item: any) => (
                      <>
                        {/* <Grid item xs={2}>
                 
                    </Grid> */}
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
                            {item.departure.at}
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
                              <img src={flightIcon}></img>
                              {'-------------------------'}
                            </div>
                            <Typography
                              style={{ marginTop: '5px', textAlign: 'center' }}>
                              {x.itineraries[0].duration}
                            </Typography>
                          </div>
                          <div>
                            {item.arrival.at}
                            <Typography style={{ marginTop: '5px' }}>
                              {' '}
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
                          style={{ background: '#DCAB5E', color: '#fff' }}>
                          View Details
                        </Button>
                      </div>
                    </Grid>
                    {/* </Grid> */}
                  </Grid>
                ))}

              <Grid item xs={1}>
                {' '}
              </Grid>
            </Grid>
          </div>

          {/* <BottomGrid /> */}
        </Grid>
      </Grid>
    </div>
  );
}