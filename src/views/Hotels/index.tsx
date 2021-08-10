import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Formik } from 'formik';
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
import HotelBG from '../../assets/fernando-alvarez-rodriguez-M7GddPqJowg-unsplash.jpeg';
import flight from '../../assets/Flight Info@2x.png';
import hotel from '../../assets/Icon metro-hotel-blue@2x.png';
import car from '../../assets/Icon awesome-car-blue@2x.png';
import SortPng from '../../assets/Sort@2x.png';
import blog1 from '../../assets/Blog image - 1@2x.png'
import RatingPng from '../../assets/Icon awesome-star@2x.png'
import parkingPng from '../../assets/Parking lot@2x.png'
import wifiPng from '../../assets/Wifi@2x.png'
import entertainment from '../../assets/Entertainment - Hotel@2x.png'
import pool from '../../assets/Pool@2x.png'
import gym from '../../assets/Gym@2x.png'
import restaurant from '../../assets/Restaurant@2x.png'
import drinks from '../../assets/Drinks@2x.png'
import share from '../../assets/share@2x.png'
import heartunselected from '../../assets/Icon feather-heart-unselected@2x.png'
import heart from '../../assets/Icon feather-heart@2x.png'

import BottomGrid from '../Airvays info/index'
import { Button, Typography } from '@material-ui/core';
import { Divider } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: '1200px',
      background: '#FFFFFF',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      borderRadius: "10px"
    },
    hoteltop: {
      height: '300px',
      backgroundImage: `url(${HotelBG})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    },
    btn_flights: {
      width: '119px',
      height: '98px',
      background: '#EAF8FF',
      borderRadius: '10px',
      opacity: '1',
      backdropFilter: 'blur(20px)'
    },
    btn_hotels: {
      width: '119px',
      height: '98px',
      background: '#EAF8FF',
      borderRadius: '10px',
      marginLeft: '15px',
    },
    btn_carretal: {
      width: '119px',
      height: '98px',
      background: '#EAF8FF',
      borderRadius: '10px',
      marginLeft: '15px',
    },
    date_picker: {
      '& .MuiInputBase-root': {
        padding: 0,
        border: '1px solid #bfb7b7',
        borderRadius: '5px',
        width: '160px',
        bottom: '15px',
        height: '55px',
        marginTop: '24px',
        '& .MuiButtonBase-root': {
          padding: 0,
          paddingLeft: 10,
        },
        '& .MuiInputBase-input': {
          padding: 15,
          paddingLeft: 0,
          alignItems: "center"
        },
        '& .MuiOutlinedInput-notchedOutline': {
          // border: 'none'
        },
        '& .MuiSvgIcon-root': {
          color: '#33bbff'
        }
      },
    },
    hotelList_card: {
      border: '2px solid #EDEDED',
      borderRadius: '10px',
      background: "#fff",
      '&:hover': {
        background: "#fff",
        border: "none",
        boxShadow: '0px 20px 55px #0000001F',
      }
    },
    rating_png: {
      marginLeft: '10px',
      marginTop: '10px',
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }
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
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54')
  );

  const [favourite, setFavourite] = React.useState<boolean>(true)

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.hoteltop}>
        <Grid item xs={1}> </Grid>
        <Grid item xs={10}>
          {/* icons div */}
          <Grid container style={{ marginTop: '75px' }}>
            <Grid xs={12}>
              <div style={{ textAlign: 'center', display: 'flex' }}>
                <div className={classes.btn_flights} >
                  <img src={flight} style={{ marginTop: '15px' }}></img>
                  <br />
                  <br />
                  Flights
                </div>
                <div
                  className={classes.btn_hotels}
                >
                  <img src={hotel} style={{ marginTop: '15px' }} />
                  <br />
                  <br />
                  Hotels
                </div>
                <div
                  className={classes.btn_carretal}
                >
                  <img src={car} style={{ marginTop: '15px' }} />
                  <br />
                  <br />
                  Car Rental
                </div>
              </div>
            </Grid>
          </Grid>
          {/* search */}


          <Grid container style={{ marginTop: '60px' }}>
            <Grid xs={12}>
              <Paper className={classes.paper}>
                <div>
                  <Formik
                    initialValues={{ email: '' }}
                    onSubmit={async (values) => {
                      await new Promise((resolve) => setTimeout(resolve, 500));
                      alert(JSON.stringify(values, null, 2));
                    }}
                    validationSchema={Yup.object().shape({
                      email: Yup.string().email().required('Required'),
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
                            <Grid
                              item
                              xs={11}
                              style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                                alignItems: "center"
                              }}
                              spacing={1}
                            >
                              <TextField
                                id='email'
                                placeholder='Stay-in Place'
                                label='Stay-in Place'
                                variant='outlined'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                  errors.email && touched.email
                                    ? 'text-input error'
                                    : 'text-input'
                                }
                              />
                              <br />

                              {errors.email && touched.email && (
                                <div className='input-feedback'>
                                  {errors.email}
                                </div>
                              )}

                              {/* </Grid> */}

                              {/* <Grid
                              item
                              xs={7}
                              style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                              }}
                            > */}
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                  className={classes.date_picker}
                                  margin='normal'
                                  id='date-picker-dialog'
                                  // label='Date picker dialog'
                                  format='MM/dd/yyyy'
                                  value={selectedDate}
                                  onChange={handleDateChange}
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
                                  value={selectedDate}
                                  onChange={handleDateChange}
                                  InputAdornmentProps={{ position: 'start' }}
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                                  InputProps={{
                                    disableUnderline: true,
                                  }}
                                />
                              </MuiPickersUtilsProvider>
                              <TextField
                                id='Guests'
                                placeholder='Guests'
                                label='Guests'
                                variant='outlined'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                  errors.email && touched.email
                                    ? 'text-input error'
                                    : 'text-input'
                                }
                              />

                              {errors.email && touched.email && (
                                <div className='input-feedback'>
                                  {errors.email}
                                </div>
                              )}
                              <Button
                                type='submit'
                                style={{
                                  background: '#33BBFF',
                                  width: '35px',
                                  height: '54px',
                                }}
                                disabled={isSubmitting}
                              >
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


          {/* serach results */}

          <Grid container spacing={2} style={{ marginTop: '20px' }}>
            <Grid item xs={12} >
              <Typography style={{ textAlign: 'left', fontSize: '20px', fontWeight: 500 }}>
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


          <Grid container spacing={3} style={{ marginTop: '20px', }}>
            <Grid item xs={10} style={{ display: 'flex' }}>
              <Button style={{ color: '#FFF', background: '#4BAFC9', borderRadius: '20px', fontFamily: 'Crimson Text' }}>
                Accommodation Type: All
              </Button>
              <Button style={{ color: '#FFF', background: '#4BAFC9', borderRadius: '20px', marginLeft: '15px', fontFamily: 'Crimson Text' }}>
                Price Range : $150 to $200
              </Button>
              <Button style={{ color: '#FFF', background: '#4BAFC9', borderRadius: '20px', marginLeft: '15px', fontFamily: 'Crimson Text' }}>
                Amenities: Wi-fi, Air Cond..
              </Button>
              <Button style={{ color: '#333333', background: '#F7F7F7', borderRadius: '20px', marginLeft: '15px', fontFamily: 'Crimson Text' }}>
                Ratings
              </Button>
            </Grid>
            <Grid item xs={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div >
                <img src={SortPng} style={{ width: '35px', height: '30px' }}></img>
              </div>
            </Grid>
          </Grid>


          {Array.from({ length: 10 }, (x: any, i) => (
            <Paper style={{ display: 'flex', marginTop: '25px' }} className={classes.hotelList_card} id={x}>
              <Grid container>
                <Grid item xs={3}>
                  <div style={{ display: 'flex', margin: "10px" }}>
                    <div >
                      <img style={{ width: '100%', height: '250px', borderRadius: "10px" }} src={blog1}>
                      </img>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div>
                    <div className={classes.rating_png}>
                      <img src={RatingPng} style={{ width: '20px', height: '20px' }}></img>  &nbsp;
                      <img src={RatingPng} style={{ width: '20px', height: '20px' }}></img>  &nbsp;
                      <img src={RatingPng} style={{ width: '20px', height: '20px' }}></img>  &nbsp;
                      <img src={RatingPng} style={{ width: '20px', height: '20px' }}></img>
                      &nbsp; 4.0
                      <div style={{ flexGrow: 1, marginRight: "10px" }}>
                        <Typography style={{ display: 'flex', justifyContent: 'flex-end', lineHeight: 0, textDecoration: 'underline' }} >
                          152 Reviews
                        </Typography>
                      </div>
                    </div>

                    <div style={{ marginTop: '15px', marginLeft: '10px' }}>
                      <Typography style={{ fontWeight: 500, color: '#1C2460' }}>
                        Plush Penthouse With Private Plunge Pool
                      </Typography>
                      <Typography>Nerul, Goa</Typography>

                      <div style={{ marginTop: '15px', display: 'flex' }}>
                        {/* {Amenities.map((x: any) => ( */}

                        <img src={wifiPng} style={{ width: '25px', height: '25px', margin: '5px' }}>
                        </img>
                        <img src={pool} style={{ width: '25px', height: '25px', margin: '5px' }}>
                        </img>
                        <img src={entertainment} style={{ width: '25px', height: '25px', margin: '5px' }}>
                        </img>
                        <img src={parkingPng} style={{ width: '25px', height: '25px', margin: '5px' }}>
                        </img>
                        <img src={gym} style={{ width: '25px', height: '25px', margin: '5px' }}>
                        </img>
                        <img src={drinks} style={{ width: '25px', height: '25px', margin: '5px' }}>
                        </img>
                        <img src={restaurant} style={{ width: '25px', height: '25px', margin: '5px' }}>
                        </img>

                      </div>
                      <Typography style={{ marginTop: '15px', color: '#1C2460' }}>
                        Our luxury Penthouse is located in the quaint village of Nerul, overlooking green paddy fields and Nerul River. It has a sprawling bedroom with stunning views and an en-suite bathroom. There is also a sleek…
                      </Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={3} style={{ borderLeft: '1px solid #EDEDED' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '28px' }}>
                    <img src={share} style={{ width: '25px', height: '25px', marginRight: '30px' }} />
                    <div onClick={() => setFavourite(!favourite)}>
                      {
                        favourite ?
                          <img src={heartunselected} style={{ width: '25px', height: '25px' }} />
                          : <img src={heart} style={{ width: '25px', height: '25px' }} />
                      }
                    </div>
                  </div>
                  <div
                    style={{
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      display: 'flex',
                      marginTop: '30px'
                    }}>
                    <div>
                      <Typography
                        style={{
                          marginLeft: '20px',
                        }}
                      >
                        <span style={{ fontSize: '22px', fontWeight: 500, color: '#1C2460', marginLeft: '35px' }}>$120  </span>per night
                      </Typography>
                      <br />
                      <Button
                        variant='contained'
                        style={{ background: '#DCAB5E', color: '#fff', marginLeft: '20px' }}
                      >
                        Reserve Now
                      </Button>
                    </div>
                  </div>
                  <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                    <Button
                      variant='contained'
                      style={{ background: '#F2FFFD', color: '#09B7A3', borderRadius: '10px', marginTop: '20px', fontSize: '10px' }}
                    >
                      Free Cancellation till check-in
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Grid>
        <Grid item xs={1}> </Grid>
        <Divider style={{ marginTop: '20px' }} />
        <BottomGrid />
      </Grid>
    </div >
  );
}
