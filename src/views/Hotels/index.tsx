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
import BottomGrid from '../Airvays info/index'
import { Button, Typography } from '@material-ui/core';
import { Divider } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: '1200px',
      background:'#FFFFFF',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    hoteltop: {
      height: '300px',
      backgroundImage: `url(${HotelBG})`,
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
          color: '#33bbff'
        }
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
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54')
  );

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
                <div
                  style={{
                    width: '138px',
                    height: '98px',
                    background: '#fff',
                    borderRadius: '5px',
                  }}
                >
                  <img src={flight} style={{ marginTop: '15px' }}></img>
                  <br />
                  <br />
                  Flights
                </div>
                <div
                  style={{
                    width: '138px',
                    height: '98px',
                    background: '#EAF8FF',
                    borderRadius: '5px',
                  }}
                  className={classes._ml15}
                >
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
                  className={classes._ml15}
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


          <Grid container style={{ marginTop: '40px' }}>
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

          <Grid container spacing={3} style={{ marginTop: '20px' }}>
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
              <Button style={{ color: '#FFF', background: '#4BAFC9', borderRadius: '20px' }}>
                Accommodation Type: All
              </Button>
              <Button style={{ color: '#FFF', background: '#4BAFC9', borderRadius: '20px', marginLeft: '15px' }}>
                Price Range : $150 to $200
              </Button>
              <Button style={{ color: '#FFF', background: '#4BAFC9', borderRadius: '20px', marginLeft: '15px' }}>
                Amenities: Wi-fi, Air Cond..
              </Button>
              <Button style={{ color: '#333333', background: '#F7F7F7', borderRadius: '20px', marginLeft: '15px' }}>
                Ratings
              </Button>
            </Grid>
            <Grid item xs={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div >
                <img src={SortPng} style={{ width: '25px', height: '35px' }}></img>
              </div>
            </Grid>
          </Grid>


          {Array.from({ length: 10 }, (x: any, i) => (
            <Paper style={{ display: 'flex', marginTop: '40px' }} id={x}>
              <Grid container>
                <Grid item xs={3}>
                  <div style={{ display: 'flex' }}>
                    <div>
                      <img style={{ width: '300px', height: '250px' }} src={blog1}>
                      </img>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div>
                    <div style={{ marginLeft: '10px' }}>
                      <img src={RatingPng} style={{ width: '20px', height: '20px' }}></img>  &nbsp;
                      <img src={RatingPng} style={{ width: '20px', height: '20px' }}></img>  &nbsp;
                      <img src={RatingPng} style={{ width: '20px', height: '20px' }}></img>  &nbsp;
                      <img src={RatingPng} style={{ width: '20px', height: '20px' }}></img>
                      &nbsp; 4.0
                      <Typography style={{ display: 'flex', justifyContent: 'flex-end', lineHeight: 0 }} >
                        152 Reviews
                      </Typography>
                    </div>

                    <div style={{ marginTop: '15px', marginLeft: '10px' }}>
                      <Typography style={{ fontWeight: 500, color: '#1C2460' }}>
                        Plush Penthouse With Private Plunge Pool
                      </Typography>
                      <Typography>Nerul, Goa</Typography>

                      <div style={{ marginTop: '15px',display:'flex'}}>
                        {/* {Amenities.map((x: any) => ( */}
                          <img src={parkingPng} style={{ width: '25px', height: '25px', marginLeft: '5px' }}>
                          </img>
                          <img src={wifiPng} style={{ width: '25px', height: '25px', marginLeft: '5px' }}>
                          </img>
                      </div>
                      <Typography style={{ marginTop: '15px', color: '#1C2460' }}>
                        Our luxury Penthouse is located in the quaint village of Nerul, overlooking green paddy fields and Nerul River. It has a sprawling bedroom with stunning views and an en-suite bathroom. There is also a sleek…
                      </Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={3} style={{ borderLeft: ' 1px solid #EDEDED' }}>
                  <div
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                      marginTop:'30px'
                    }}>
                    <div>
                      <Typography
                        style={{
                          marginLeft: '20px',
                        }}
                      >
                        <span style={{ fontSize: '22px', fontWeight: 500, color: '#1C2460' }}>$120  </span>per night
                      </Typography>
                      <br />
                      <Button
                        variant='contained'
                        style={{ background: '#DCAB5E', color: '#fff' }}
                      >
                        Reserve Now
                      </Button>
                    </div>
                  </div>
                  <div style={{alignItems:'center',justifyContent:'center',display:'flex'}}>
                  <Button
                    variant='contained'
                    style={{ background: '#F2FFFD', color: '#09B7A3', borderRadius: '10px' ,marginTop:'20px', fontSize:'10px' }}
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
    </div>
  );
}
