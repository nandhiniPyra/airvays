import React, { useState } from 'react';
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
import filterdata from '../../views/List/Filter'
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
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Fade from '@material-ui/core/Fade';
import Popper, { PopperPlacementType } from '@material-ui/core/Popper'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import BottomGrid from '../Airvays info/index'
import { Button, Slider, Typography } from '@material-ui/core';
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
    },
    slider_clr: {
      marginBottom: '25px',
      color: '#4BAFC9',
      '&..MuiSlider-root': {
        color: '#4BAFC9'
      }
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
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();
  const [openpricerange, setOpenpricerange] = useState<boolean>(false)
  const [openamenities, setOpenAmenities] = useState<boolean>(false)
  const [filtersData, setFiltersData] = React.useState([]);
  const [pricevalue, setpriceValue] = React.useState<number[]>([150, 200]);
  const [anchorEl1, setAnchorEl1] = useState<HTMLButtonElement | null>(null);
  const [anchorEl2, setAnchorEl2] = useState<HTMLButtonElement | null>(null);
  const [anchorEl3, setAnchorEl3] = useState<HTMLButtonElement | null>(null);
  const [startingpricevalue, setStaringpricevalue] = React.useState<number[]>([150])
  const [endpricevalue, setEndpricevalue] = React.useState<number[]>([200])

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleChangeprice = (event: any, newValue: number | number[]) => {
    // console.log('newValue: ', newValue);
    setpriceValue(newValue as number[]);
  };


  const handleChangeButtonPrice = () => {
    setStaringpricevalue([pricevalue[0]])
    setEndpricevalue([pricevalue[1]])
  }
  function valuetext(value: number) {
    return `${value}`;
  }
  const handleClickpricerage =
    (newPlacement: PopperPlacementType) =>
      (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl2(event.currentTarget);
        setOpenpricerange((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
      };

  const handleClickAmenities =
    (newPlacement: PopperPlacementType) =>
      (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl3(event.currentTarget);
        setOpenAmenities((prev) => placement !== newPlacement || !prev)
        setPlacement(newPlacement);

      }

  // const handleToggle = ((id:number)=>{
  //   if
  // })

  const [searchAmenities, setSearchAmenities] = useState([
    {
      id: 1,
      code: "Internet",
      name: "Wifi",
      isChecked: false,
      price: '2314'
    },
    {
      id: 2,
      code: "Internet",
      name: "Air Conditioner",
      isChecked: false,
      price: '318'
    },
    {
      id: 3,
      code: "Car",
      name: "Parking",
      isChecked: false,
      price: '123'
    },
    {
      id: 4,
      code: "Gym",
      name: "Fitness Centre",
      isChecked: false,
      price: '80'
    },
    {
      id: 5,
      code: "Water",
      name: "Swimming Pool",
      isChecked: false,
      price: '100'
    },
    {
      id: 6,
      code: "Beauty",
      name: "Spa",
      isChecked: false,
      price: '123'
    },
  ])



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
              <Button
                style={{
                  color: '#FFF',
                  background: '#4BAFC9',
                  borderRadius: '20px',
                  fontFamily: 'Crimson Text',
                  boxShadow: ' 3px 11px 9px -6px #4BAFC9',
                  paddingLeft: '15px',
                  paddingRight: '15px'
                }}>
                Accommodation Type: All
              </Button>

              {/*Price range PopUp */}
              <ClickAwayListener
                onClickAway={() => setOpenpricerange(false)}
              >
                <Button
                  style={{
                    color: '#FFF',
                    background: '#4BAFC9',
                    borderRadius: '20px',
                    marginLeft: '15px',
                    fontFamily: 'Crimson Text',
                    boxShadow: ' 3px 11px 9px -6px #4BAFC9',
                    paddingLeft: '15px',
                    paddingRight: '15px'
                  }}
                  onClick={handleClickpricerage('bottom-start')}
                >
                  {/* {
                    pricevalue ?
                      (<span>Price Range : ${pricevalue[0]} to ${pricevalue[1]}</span>)
                      :
                      `Price Range ${startingpricevalue[0]} to ${endpricevalue[1]} `
                  } */}

                  <span>Price Range : ${startingpricevalue[0]} to ${endpricevalue[0]}</span>
                </Button>
              </ClickAwayListener>
              <Popper
                style={{ width: '20%', marginTop: '15px' }}
                open={openpricerange}
                anchorEl={anchorEl2}
                placement={placement}
                transition
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper style={{ padding: '16px', paddingBottom: '10px' }}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography id='range-slider' gutterBottom>
                            <span>${pricevalue[0]} to ${pricevalue[1]}</span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
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
                      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: "10px" }}>
                        <div style={{ margin: '10px' }}>
                          <Button style={{
                            background: "#EFFAFF",
                            borderRadius: "10px",
                            marginTop: '5px',
                            marginLeft: "10px",
                            color: '#A7A7A7'
                          }}
                            onClick={(event) => {
                              handleChangeprice(event, [150, 200]);
                              setStaringpricevalue([150])
                              setEndpricevalue([200])
                            }}
                          >Reset</Button>
                        </div>
                        <div>
                          <Button
                            onClick={() => {
                              setFiltersData(filterdata(filtersData));
                              handleChangeButtonPrice()
                            }}
                            variant='contained'
                            style={{
                              backgroundColor: '#09B7A3',
                              color: '#fff',
                              borderRadius: '10px',
                              marginTop: '5px'
                            }}>
                            Apply
                          </Button>
                        </div>
                      </div>
                    </Paper>
                  </Fade>
                )}
              </Popper>
              <Button style={{
                color: '#FFF',
                background: '#4BAFC9',
                borderRadius: '20px',
                marginLeft: '15px',
                fontFamily: 'Crimson Text',
                boxShadow: ' 3px 11px 9px -6px #4BAFC9',
                paddingLeft: '15px',
                paddingRight: '15px'
              }}
                onClick={handleClickAmenities('bottom-start')}
              >
                Amenities: Wi-fi, Air Cond..
              </Button>

              <Popper style={{ width: '250px', marginTop: '15px' }}
                open={openamenities}
                anchorEl={anchorEl3}
                placement={placement}
                transition
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper style={{ padding: '15px', paddingBottom: '10px' }}>
                      <List>
                        {
                          searchAmenities.map((currentList) => {

                            const labelId = `checkbox-list-label-${currentList.id}`;

                            return (
                              <ListItem
                                key={currentList.id}
                                role={undefined}
                                dense
                                button
                              // onClick={() => handleToggle(currentList.id)}
                              >
                                <Grid container>
                                  <Grid item xs={2}>
                                    <ListItemIcon>
                                      <Checkbox
                                        edge="start"
                                        checked={currentList.isChecked}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                      />
                                    </ListItemIcon>
                                  </Grid>
                                  <Grid item xs={8}>
                                    <ListItemText
                                      id={labelId}
                                      primary={currentList.name}
                                    />
                                  </Grid>
                                  <Grid item xs={2}>
                                    <ListItemText
                                      id={labelId}
                                      primary={currentList.price}
                                    />
                                  </Grid>
                                </Grid>
                              </ListItem>
                            )
                          })}
                        <Divider />
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            marginTop: "10px"
                          }}>
                          <div style={{ margin: '10px' }}>
                            <Button
                              style={{
                                background: "#EFFAFF",
                                borderRadius: "10px",
                                marginTop: '5px',
                                marginLeft: "10px",
                                color: '#A7A7A7'
                              }}>Clear</Button>
                          </div>
                          <div>
                            <Button
                              variant='contained'
                              style={{
                                backgroundColor: '#09B7A3',
                                color: '#fff',
                                borderRadius: '10px',
                                marginTop: '5px'
                              }}
                            >
                              Apply
                            </Button>
                          </div>
                        </div>
                      </List>
                    </Paper>
                  </Fade>
                )}
              </Popper>

              <Button style={{
                color: '#333333',
                background: '#F7F7F7',
                borderRadius: '20px',
                marginLeft: '15px',
                fontFamily: 'Crimson Text',
                paddingLeft: '15px',
                paddingRight: '15px'
              }}>
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
                        <span style={{ fontSize: '22px', fontWeight: 500, color: '#1C2460', marginLeft: '45px' }}>$120  </span>per night
                      </Typography>
                      <br />
                      <Button
                        variant='contained'
                        style={{ background: '#DCAB5E', color: '#fff', marginLeft: '41px' }}
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
