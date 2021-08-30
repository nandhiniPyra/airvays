import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import baggage from '../../assets/Check-in baggage@2x.png';
import luggage from '../../assets/Cabin Baggage@2x (1).png';
import FormControl from '@material-ui/core/FormControl';
import exchange from '../../assets/exchange@2x.png';
import plus from '../../assets/Icon ionic-ios-add-circle-outline@2x.png';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Button, Divider, Popover, TextField } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import SpiceJet from '../../assets/Flight logo - 3@2x.png';
import flightIcon from '../../assets/Icon material-flight@2x.png';
import feather from '../../assets/Icon feather-check-circle@2x.png';
import TransparentTopBar from '../../TopBar/index';
import { _addBaggage, _bookFlight } from '../../services/api/flight';
import { useStore } from '../../mobx/Helpers/UseStore';
import injectWithObserver from '../../utils/injectWithObserver';
import { toJS } from 'mobx';
import { useNavigate } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: '#FFFFFF',
    },
    paper: {
      padding: '3%',
      marginTop: '2%',
      boxShadow: '0px 20px 55px #00000015',
    },
    listroot: {
      color: '#1C2460',
      '.MuiListItem-button:hover': {
        backgroundColor: 'none',
      },
    },
    formControl: {
      marginTop: theme.spacing(1),
    },
    popOver: {
      '& .MuiPaper-root': {
        left: 306,
      },
      '&. .MuiPopover-paper': {
        borderRadius: '10px',
      },
    },
    pop_over: {
      '&. .MuiPopover-paper': {
        borderRadius: '10px',
      },
    },
  }),
);

function FlightBooking() {
  const classes = useStyles();
  const store = useStore();
  const navigate = useNavigate();

  const {
    selectedFlight,
    searchRequest,
    bookFlight,
    price_details,
    extra_baggage,
  } = toJS(store.flightDetails);
  const { setprice_details } = store.flightDetails;
  const [checked, setChecked] = useState(false);
  const [travelers, settravelers] = useState([
    {
      id: 1,
      dateOfBirth: '',
      name: {
        firstName: '',
        lastName: '',
      },
      gender: 'None',
    },
  ]);
  const [baggage_Info, setBaggage_Info] = useState({
    CheckinBaggage: { weight: '', weightUnit: 'quantity' },
    CabinBaggage: { weight: '', weightUnit: 'quantity' },
  });
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  let req = localStorage.getItem('flightDetails');
  let payload = {};
  if (req != null) payload = JSON.parse(req).selectedFlight[0];

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleAddBaggage = (event: any) => {
    handlePopoverClick(event);
  };

  const handlePopoverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const gettravelerlist = () => {
    let travelersLength =
      searchRequest.no_of_people.adults +
      searchRequest.no_of_people.children +
      searchRequest.no_of_people.infants;
    let value: any = travelers;
    Array.from({ length: travelersLength - 1 }, (v, i) =>
      value.push({
        id: i + 2,
        dateOfBirth: '',
        name: {
          firstName: '',
          lastName: '',
        },
        gender: '',
      }),
    );
    settravelers(value);
  };
  const CheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const addBaggage = (bookFlight: any) => {
    _addBaggage(
      {
        data: bookFlight,
        baggage: extra_baggage,
      },
      function (error: any, response: any) {
        if (error === null) {
          if (response.status === '200') {
          }
        }
      },
    );
  };

  const handlechange_traveler = (e: any, value: any, key: any, id: any) => {
    e.preventDefault();

    settravelers((prevstate: any) => {
      let newArr = prevstate.map((item: any, i: any) => {
        if (item.id === id) {
          if (key === 'firstName' || key === 'lastName') {
            return {
              ...item,
              name: {
                [key]: value,
              },
            };
          } else {
            return {
              ...item,

              [key]: value,
            };
          }
        } else {
          return item;
        }
      });

      return newArr;
    });
  };

  useEffect(() => {
    gettravelerlist();
  }, []);
  useEffect(() => {
    if (bookFlight.included) {
      let baggage = {
        CheckinBaggage: { weight: '0', weightUnit: '' },
        CabinBaggage: { weight: '0', weightUnit: '' },
      };
      baggage.CheckinBaggage = {
        weight: bookFlight.included.bags['1'].quantity,
        weightUnit: 'quantity',
      };
      setBaggage_Info(baggage);
    }
    if (bookFlight?.data) {
      let b = {
        count: bookFlight.data.flightOffers[0].travelerPricings.length,
        base: bookFlight.data.flightOffers[0].price.base,
        currency: bookFlight.data.flightOffers[0].price.currency,
        totaltax: '',
        total: bookFlight.data.flightOffers[0].price.grandTotal,
      };
      console.log(b, 'HHHHHH');
      setprice_details(b);
    }
  }, []);
  return (
    <div className={classes.root}>
      <TransparentTopBar
        color='textWhite'
        backgroundColor='blue'
        position='fixed'
      />
      <Grid container spacing={3} style={{ marginTop: '5%' }}>
        <Grid item xs={1}></Grid>
        <Grid item xs={6}>
          <Grid container style={{ marginTop: '2%' }}>
            <Grid item xs={12}>
              <Grid container style={{ marginBottom: '10px' }}>
                <Grid item xs={6}>
                  {' '}
                  <Typography
                    style={{
                      textAlign: 'left',
                      fontSize: '16px',
                      fontWeight: 500,
                      color: '#1C2460',
                      fontFamily: 'AvantGarde-Demi',
                    }}>
                    Itinerary Details
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    onClick={() => {
                      navigate('/flightList');
                    }}>
                    {' '}
                    <Typography
                      style={{
                        textAlign: 'right',
                        fontSize: '16px',
                        fontWeight: 500,
                        color: '#4BAFC9',
                      }}>
                      <img
                        alt=''
                        src={exchange}
                        style={{ height: '16px', marginRight: '5px' }}></img>
                      Change Flight
                    </Typography>
                  </Button>
                </Grid>
              </Grid>

              <Paper className={classes.paper}>
                {selectedFlight.map((item: any) => (
                  <Grid
                    container
                    style={{
                      display: 'flex',
                    }}>
                    {console.log(item, 'itemitem')}
                    {item.itineraries.map((x: any) => (
                      <>
                        <Grid container>
                          <Grid item xs={3}>
                            <div style={{ maxWidth: 'fit-content' }}>
                              <img
                                alt=''
                                src={SpiceJet}
                                // style={{ height: "50px", width: "50px" }}
                              ></img>{' '}
                            </div>
                          </Grid>
                          <Grid item xs={1}>
                            <div
                              style={{
                                color: '#1C2460',
                                fontFamily: 'AvantGarde-Regular',
                                opacity: '40%',
                                fontSize: '12px',
                                marginTop: '22%',
                              }}>
                              SpiceJet{' '}
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div
                              style={{
                                color: '#1C2460',
                                fontFamily: 'AvantGarde-Regular',
                                opacity: '100%',
                                fontSize: '12px',
                                marginTop: '7%',
                                marginLeft: '4%',
                              }}>
                              <b>{item.source}</b>
                            </div>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography
                              style={{
                                textAlign: 'right',
                                marginTop: '3%',
                                fontFamily: 'CrimsonText-semibold',
                                color: '#1C2460',
                              }}>
                              Economy Class
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid
                            item
                            xs={3}
                            style={{
                              color: '#1C2460',
                              fontSize: '16px',
                              marginTop: '3%',
                              fontFamily: 'CrimsonText-Regular',
                            }}>
                            <p>
                              {x.depatureAt}
                              {/* 09:05 Tue, 18.05.21 */}
                              <br />
                              {x.from_city}
                              {/* Chennai (MAA) */}
                              <br />
                              Terminal 1
                            </p>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            style={{
                              alignItems: 'center',
                              textAlign: 'center',
                              justifyContent: 'center',
                              marginTop: '3%',
                            }}>
                            <Typography
                              style={{
                                marginRight: '9%',
                                fontFamily: 'CrimsonText-Regular',
                                color: '#707070',
                              }}>
                              {/* Direct */}
                              {item.itineraries[0].segments.length - 1 == 1
                                ? '1 stop'
                                : item.itineraries[0].segments.length -
                                  1 +
                                  'stop'}{' '}
                              {`via ${x.via.map((x: any) => x)}`}
                            </Typography>
                            <div style={{ display: 'flex', color: '#4BAFC9' }}>
                              {'--------------------'}
                              <img alt='' src={flightIcon}></img>
                              {'--------------------'}
                            </div>
                            <Typography
                              style={{
                                marginRight: '9%',
                                fontFamily: 'CrimsonText-Regular',
                                color: '#707070',
                              }}>
                              0 hr 40 mins
                            </Typography>
                          </Grid>
                          {console.log(x, 'gyuuuyu')}
                          <Grid
                            item
                            xs={3}
                            style={{
                              color: '#1C2460',
                              fontSize: '16px',
                              marginTop: '3%',
                              fontFamily: 'CrimsonText-Regular',
                            }}>
                            <p>
                              {x.arrivalAt}
                              {/* 09:45 Tue, 18.05.21 */}
                              <br />
                              {x.to_city}
                              {/* Bengaluru Intl (BLR) */}
                              <br />
                              Terminal {x.segments.length}
                            </p>
                          </Grid>
                        </Grid>
                      </>
                    ))}
                  </Grid>
                ))}
              </Paper>

              <div
                style={{
                  background: '#FFF2DE',
                  marginTop: '5%',
                }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px',
                  }}>
                  <div>
                    <Typography
                      style={{
                        textAlign: 'left',
                        fontSize: '12px',
                        fontFamily: 'AvantGarde-Regular',
                      }}>
                      Covid-19 information
                    </Typography>
                    <Typography
                      style={{
                        //   textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: 500,
                        fontFamily: 'AvantGarde-Demi',
                      }}>
                      Country/Region Entry restrictions
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      style={{
                        fontSize: '15px',
                        fontFamily: 'CrimsonText-Regular',
                      }}>
                      Status in Hyderabad: <b>Normal</b>. Status in Chennai:{' '}
                      <b>Normal</b>
                    </Typography>

                    <Typography
                      style={{
                        fontSize: '14px',
                        color: '#DCAB5E',
                        float: 'right',
                        fontFamily: 'AvantGarde-Demi',
                      }}>
                      View Details
                    </Typography>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} style={{ marginTop: '5%' }}>
              <Grid container>
                <Grid item xs={6}>
                  {' '}
                  <Typography
                    style={{
                      textAlign: 'left',
                      fontSize: '16px',
                      fontWeight: 500,
                      color: '#1C2460',
                      fontFamily: 'AvantGarde-Demi',
                    }}>
                    Passenger Info
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {console.log(travelers, '&^GUG')}

            <Paper className={classes.paper}>
              {travelers.map((traveler: any, i: any) => (
                <form>
                  <Typography
                    style={{
                      textAlign: 'left',
                      color: 'black',
                      fontFamily: 'CrimsonText-semibold',
                      fontSize: '18px',
                    }}>
                    Passenger {traveler.id} - Adult (age 13 or above)
                  </Typography>
                  <Typography
                    style={{
                      textAlign: 'left',
                      fontSize: '15px',
                      marginTop: '5px',
                      marginBottom: '5px',
                      fontFamily: 'CrimsonText-Regular',
                    }}>
                    Use all given names and surnames exactly as they appear in
                    your passport/ID to avoid boarding complications.
                  </Typography>

                  <Grid container spacing={2} style={{ marginTop: '2%' }}>
                    <Grid item xs={12} sm={6}>
                      <label
                        style={{
                          fontFamily: 'AvantGarde-Regular',
                          fontSize: 13,
                        }}>
                        First Name
                      </label>
                      <br />
                      <TextField
                        id='outlined-basic'
                        fullWidth
                        variant='outlined'
                        placeholder='Ex: Jane'
                        name='firstName'
                        value={travelers[i].name.firstName}
                        onChange={(e: any) =>
                          handlechange_traveler(
                            e,
                            e.target.value,
                            'firstName',
                            traveler.id,
                          )
                        }
                      />
                    </Grid>{' '}
                    <Grid item xs={12} sm={6}>
                      <label
                        style={{
                          fontFamily: 'AvantGarde-Regular',
                          fontSize: 13,
                        }}>
                        Last Name
                      </label>
                      <br />
                      <TextField
                        id='outlined-basic'
                        fullWidth
                        variant='outlined'
                        placeholder='Ex: Doe'
                        name='lastName'
                        value={travelers[i].name.lastName}
                        onChange={(e: any) =>
                          handlechange_traveler(
                            e,
                            e.target.value,
                            'lastName',
                            traveler.id,
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl variant='outlined' fullWidth>
                        <label
                          style={{
                            fontFamily: 'AvantGarde-Regular',
                            fontSize: 13,
                          }}>
                          Gender
                        </label>
                        <Select
                          labelId='demo-simple-select-outlined-label'
                          id='demo-simple-select-outlined'
                          name='gender'
                          value={
                            traveler[i]?.gender ? traveler[i].gender : 'None'
                          }
                          onChange={(e: any) => {
                            handlechange_traveler(
                              e,
                              e.target.value,
                              'gender',
                              traveler.id,
                            );
                          }}
                          placeholder='Select gender'>
                          <MenuItem value=''>
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={'MALE'}>Male</MenuItem>
                          <MenuItem value={'FEMALE'}>Female</MenuItem>
                          <MenuItem value={'OTHERS'}>Others</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>{' '}
                    {/* <Grid item xs={12} sm={6}>
                      <FormControl variant='outlined' fullWidth>
                        <label
                          style={{
                            fontFamily: 'AvantGarde-Regular',
                            fontSize: 13,
                          }}>
                          Nationality
                        </label>
                        <Select
                          labelId='demo-simple-select-outlined-label'
                          id='demo-simple-select-outlined'
                          placeholder='Select or enter first character'>
                          <MenuItem value=''>
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>Indian</MenuItem>
                          <MenuItem value={20}>American</MenuItem>
                          <MenuItem value={30}>Others</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    */}
                    <Grid item xs={12} sm={6}>
                      <label
                        style={{
                          fontFamily: 'AvantGarde-Regular',
                          fontSize: 13,
                        }}>
                        Date of Birth
                      </label>
                      <br />
                      <TextField
                        id='outlined-basic'
                        fullWidth
                        type='date'
                        variant='outlined'
                        name='dateOfBirth'
                        onChange={(e: any) => {
                          handlechange_traveler(
                            e,
                            e.target.value,
                            'dateOfBirth',
                            traveler.id,
                          );
                        }}
                        value={
                          traveler[i]?.dateOfBirth
                            ? traveler[i].dateOfBirth
                            : ''
                        }
                      />
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                      <label
                        style={{
                          fontFamily: 'AvantGarde-Regular',
                          fontSize: 13,
                        }}>
                        Passport Number
                      </label>
                      <br />
                      <TextField
                        id='outlined-basic'
                        placeholder='Enter valid number'
                        fullWidth
                        variant='outlined'
                      />
                    </Grid> */}
                  </Grid>
                </form>
              ))}
            </Paper>

            <Grid item xs={12} style={{ marginTop: '5%' }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  {' '}
                  <Typography
                    style={{
                      textAlign: 'left',
                      fontSize: '16px',
                      fontWeight: 500,
                      color: '#1C2460',
                      fontFamily: 'AvantGarde-Demi',
                    }}>
                    Baggage Info
                  </Typography>
                </Grid>
              </Grid>
              <Paper className={classes.paper}>
                <div
                  style={{
                    marginBottom: '10px',
                    color: '#333333',
                    fontFamily: 'CrimsonText-semibold',
                    fontSize: '17px',
                  }}>
                  Adult
                </div>
                <Grid container spacing={3}>
                  <Grid item xs={1}>
                    <img alt='' src={baggage}></img>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                      style={{
                        fontSize: '17px',
                        color: '#333333',
                        fontFamily: 'CrimsonText-Regular',
                      }}>
                      Check-in Baggage
                    </Typography>
                    <Typography
                      style={{
                        fontSize: '15px',
                        opacity: '50%',
                        fontFamily: 'CrimsonText-Regular',
                      }}>
                      Dimensions (length + width + height) per piece cannot
                      exceed 158CM.
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography style={{ fontSize: '14px' }}>
                      <b
                        style={{
                          color: '#333333',
                          fontFamily: 'CrimsonText-Regular',
                        }}>
                        {baggage_Info.CheckinBaggage.weightUnit}:
                        {baggage_Info.CheckinBaggage.weight}
                      </b>{' '}
                      {/* /person */}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={1}>
                    <img alt='' src={luggage}></img>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                      style={{
                        fontSize: '17px',
                        color: '#333333',
                        fontFamily: 'CrimsonText-Regular',
                      }}>
                      Cabin Baggage
                    </Typography>
                    <Typography
                      style={{
                        fontSize: '15px',
                        fontFamily: 'CrimsonText-Regular',
                        opacity: '50%',
                      }}>
                      Each bag cannot exceed 35*25*22CM in size.
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography style={{ fontSize: '14px' }}>
                      <b
                        style={{
                          color: '#333333',
                          fontFamily: 'CrimsonText-Regular',
                        }}>
                        {baggage_Info.CabinBaggage.weight !== '' &&
                          baggage_Info.CabinBaggage.weightUnit}
                        {baggage_Info.CabinBaggage.weight}
                      </b>{' '}
                      {/* /person */}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider style={{ marginTop: '5%' }} />
                <Typography
                  style={{
                    textAlign: 'left',
                    fontSize: '17px',
                    fontWeight: 500,
                    color: '#333333',
                    marginTop: '20px',
                    fontFamily: 'CrimsonText-semibold',
                  }}>
                  Purchase Extra Checked Baggage
                </Typography>
                {travelers.map((item: any) => (
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      {' '}
                      <Typography
                        style={{
                          textAlign: 'left',
                          fontSize: '17px',
                          color: '#333333',
                          marginTop: '10px',
                          fontFamily: 'CrimsonText-Regular',
                        }}>
                        Passenger {item.id}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        style={{
                          textAlign: 'right',
                          fontSize: '14px',
                          fontWeight: 500,
                          color: '#4BAFC9',
                          fontFamily: 'AvantGarde-Demi',
                          cursor: 'pointer',
                        }}
                        onClick={handleAddBaggage}>
                        <img
                          alt=''
                          src={plus}
                          style={{
                            height: '16px',
                            marginRight: '5px',
                          }}></img>
                        Add Extra Baggage
                      </Typography>
                    </Grid>
                    {/* PopOver */}
                    <Popover
                      open={Boolean(anchorEl)}
                      //  className={classes.pop_over}
                      anchorEl={anchorEl}
                      onClick={handlePopoverClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}>
                      <Grid
                        container
                        style={{
                          width: '270px',
                        }}>
                        <Grid item xs={6}>
                          <Typography
                            style={{
                              marginLeft: 10,
                              marginTop: 15,
                              fontFamily: 'CrimsonText-Regular',
                              fontWeight: 600,
                            }}>
                            +5 kg
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            style={{
                              marginRight: 10,
                              marginTop: 15,
                              float: 'right',
                              fontFamily: 'CrimsonText-Regular',
                              color: '#707070',
                            }}>
                            SG$12
                          </Typography>
                        </Grid>
                        <Divider
                          light
                          style={{ marginTop: '15px', marginBottom: '10px' }}
                        />
                      </Grid>
                      <div
                        style={{
                          backgroundColor: 'rgb(228 244 252)',
                          marginTop: '2%',
                        }}>
                        <Typography
                          style={{
                            marginLeft: 10,
                            marginRight: 20,
                            paddingTop: 10,
                            paddingBottom: 10,
                            fontFamily: 'AvantGarde-Demi',
                            fontSize: 13,
                          }}>
                          No extra checked baggage
                        </Typography>
                      </div>
                    </Popover>
                  </Grid>
                ))}
                <Typography
                  style={{
                    textAlign: 'left',
                    fontSize: '15px',
                    color: '#333333',
                    marginTop: '10px',
                    fontFamily: 'CrimsonText-Regular',
                  }}>
                  Additional checked baggage allowance cannot be refunded,
                  transferred or changed. If you want to check-in over-sized
                  baggage, sports equipment or similar, please refer to the
                  airline’s policies.
                </Typography>
              </Paper>
            </Grid>

            <Formik
              initialValues={{ email: '' }}
              onSubmit={async (values) => {
                await new Promise((resolve) => setTimeout(resolve, 500));
                alert(JSON.stringify(values, null, 2));
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().email().required('Required'),
              })}>
              {(props: any) => {
                const {
                  values,
                  touched,
                  errors,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                } = props;
                return (
                  <form
                    onSubmit={handleSubmit}
                    style={{ width: '-webkit-fill-available' }}>
                    <Grid item xs={12} style={{ marginTop: '5%' }}>
                      <Typography
                        style={{
                          textAlign: 'left',
                          fontSize: '16px',
                          fontWeight: 500,
                          color: '#1C2460',
                          fontFamily: 'AvantGarde-Demi',
                        }}>
                        Contact Details
                      </Typography>
                      {Array.from(
                        { length: searchRequest.no_of_people.adults },
                        (v, i) => (
                          <Paper className={classes.paper}>
                            {/* <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                  }}
                                > */}
                            <Grid container>
                              <Grid item xs={6}>
                                <label
                                  style={{
                                    fontFamily: 'AvantGarde-Regular',
                                    fontSize: 13,
                                  }}>
                                  Name
                                </label>
                                <br />
                                <TextField
                                  id='outlined-basic'
                                  fullWidth
                                  variant='outlined'
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <label
                                  style={{
                                    fontSize: 13,
                                    fontFamily: 'AvantGarde-Regular',
                                    marginLeft: '3%',
                                  }}>
                                  Mobile Number
                                </label>
                                <ReactPhoneInput
                                  country='in'
                                  inputProps={{
                                    name: 'mobile',
                                    required: true,
                                  }}
                                  placeholder='Enter Mobile Number'
                                  containerStyle={{
                                    marginLeft: '3%',
                                  }}
                                  inputStyle={{
                                    marginLeft: '10%',
                                    height: '55px',
                                    width: '87%',
                                    fontSize: '1.2em',
                                  }}
                                  buttonStyle={{
                                    backgroundColor: '#FFFFFF',
                                    padding: '15px',
                                  }}
                                  dropdownStyle={{
                                    color: '#666666',
                                    backgroundColor: '#FFFFFF',
                                  }}
                                  countryCodeEditable={false}
                                  enableSearch={true}
                                  value={values.mobile}
                                  autoFormat={true}
                                  onChange={(value: any, data: any) => {
                                    values.mobile = value;
                                    values.countryCode = data.dialCode;
                                    // setCountryCode(values.countryCode);
                                  }}
                                  // onChange={handleMobile}
                                  onBlur={handleBlur}
                                />
                              </Grid>
                            </Grid>

                            <div
                              style={{
                                display: 'flex',
                                // justifyContent: "space-evenly",
                                marginTop: '15px',
                              }}>
                              <Grid container>
                                <Grid item xs={6}>
                                  <label
                                    style={{
                                      fontFamily: 'AvantGarde-Regular',
                                      fontSize: 13,
                                    }}>
                                    E-mail ID
                                  </label>
                                  <br />
                                  <TextField
                                    id='outlined-basic'
                                    fullWidth
                                    variant='outlined'
                                  />

                                  {errors.email && touched.email && (
                                    <div className='input-feedback'>
                                      {errors.email}
                                    </div>
                                  )}
                                </Grid>
                              </Grid>
                            </div>
                            <Typography
                              style={{
                                fontSize: 'small',
                                marginTop: '14px',
                                fontFamily: 'CrimsonText-Regular',
                              }}>
                              Lorem ipsum dolor sit amet, consetetur sadipscing
                              elitr, sed diam nonumy eirmod tempor invidunt ut
                              labore et dolore.
                            </Typography>
                          </Paper>
                        ),
                      )}{' '}
                    </Grid>

                    <Grid item xs={12} style={{ marginTop: '5%' }}>
                      <Typography
                        style={{
                          textAlign: 'left',
                          fontSize: '16px',
                          fontWeight: 500,
                          color: '#1C2460',
                          fontFamily: 'AvantGarde-Demi',
                        }}>
                        Add Travel Insurance
                      </Typography>
                      <Paper className={classes.paper}>
                        <Typography
                          style={{
                            textAlign: 'left',
                            color: '#333333',
                            fontSize: '17px',
                            fontFamily: 'CrimsonText-semibold',
                          }}>
                          <b>Benefits of our Insurance</b>
                        </Typography>
                        <Typography
                          style={{
                            fontSize: '16px',
                            marginTop: '10px',
                            opacity: '50%',
                            fontFamily: 'CrimsonText-Regular',
                          }}>
                          96%of our customers insure their trip. See all the
                          benefits you get for just Rs.249
                        </Typography>
                        <Grid container style={{ marginTop: '1%' }}>
                          <Grid item xs={1}>
                            {Array.from({ length: 6 }, (x: any, i) => (
                              <>
                                <img
                                  alt=''
                                  src={feather}
                                  style={{
                                    marginTop: '10px',
                                  }}></img>
                                <br />
                              </>
                            ))}
                          </Grid>
                          <Grid item xs={10}>
                            {' '}
                            <Typography
                              style={{
                                marginTop: '1%',
                                fontSize: '15px',
                                textAlign: 'left',
                                color: '#333333',
                                fontFamily: 'CrimsonText-Regular',
                              }}>
                              Medical expenses (including COVID-19*)
                            </Typography>
                            <Typography
                              style={{
                                marginTop: '2%',
                                fontSize: '15px',
                                textAlign: 'left',
                                color: '#333333',
                                fontFamily: 'CrimsonText-Regular',
                              }}>
                              Trip cancellation due to your illness (incl.
                              COVID-19*), accident, death
                            </Typography>
                            <Typography
                              style={{
                                marginTop: '2%',
                                fontSize: '15px',
                                textAlign: 'left',
                                color: '#333333',
                                fontFamily: 'CrimsonText-Regular',
                              }}>
                              Assistance services
                            </Typography>
                            <Typography
                              style={{
                                marginTop: '2%',
                                fontSize: '15px',
                                textAlign: 'left',
                                color: '#333333',
                                fontFamily: 'CrimsonText-Regular',
                              }}>
                              Lost baggage
                            </Typography>
                            <Typography
                              style={{
                                marginTop: '2%',
                                fontSize: '15px',
                                textAlign: 'left',
                                color: '#333333',
                                fontFamily: 'CrimsonText-Regular',
                              }}>
                              Air travel insurance
                            </Typography>
                            <Typography
                              style={{
                                marginTop: '2%',
                                fontSize: '15px',
                                textAlign: 'left',
                                color: '#333333',
                                fontFamily: 'CrimsonText-Regular',
                              }}>
                              Liability
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          style={{
                            marginBottom: '10px',
                            marginTop: '10px',
                          }}
                        />
                        <Typography
                          style={{
                            marginTop: '15px',
                            color: '#DCAB5E',
                            fontFamily: 'CrimsonText-semibold',
                            fontSize: '17px',
                          }}>
                          <Checkbox
                            checked={checked}
                            onChange={CheckBoxChange}
                            style={{ color: '#DCAB5E' }}
                            inputProps={{
                              'aria-label': 'checkbox with default color',
                            }}
                          />{' '}
                          Insure My Trip
                        </Typography>
                        <Typography
                          style={{
                            marginLeft: '7%',
                            fontSize: '14px',
                            fontFamily: 'CrimsonText-Regular',
                          }}>
                          By opting in, I confirm am Indian & agree to Terms and
                          Condition and confirm all passenger are between 6
                          months to 70 years of age.
                        </Typography>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} style={{ marginTop: '5%' }}>
                      <Typography
                        style={{
                          textAlign: 'left',
                          fontSize: '16px',
                          fontWeight: 500,
                          color: '#1C2460',
                          fontFamily: 'AvantGarde-Demi',
                        }}>
                        Add Promo Code
                      </Typography>
                      <Paper className={classes.paper}>
                        <Typography
                          style={{
                            textAlign: 'left',
                            fontSize: '14px',
                            fontFamily: 'AvantGarde-Regular',
                          }}>
                          Enter Promo code
                        </Typography>
                        <div
                          style={{
                            display: 'flex',
                            marginTop: '1%',
                          }}>
                          <TextField
                            style={{
                              width: '340px',
                              marginRight: '5px',
                            }}
                            id='email'
                            placeholder='Ex: COUPON100'
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
                            <div className='input-feedback'>{errors.email}</div>
                          )}

                          <Button
                            style={{
                              marginLeft: '20px',
                              background: '#F7F7F7',
                              color: '#A7A7A7',
                              borderRadius: '5px',
                              height: '100%',
                              marginTop: '1%',
                            }}>
                            APPLY
                          </Button>
                        </div>
                      </Paper>
                    </Grid>

                    <Button
                      type='submit'
                      fullWidth
                      style={{
                        background: '#4BAFC9',
                        borderRadius: '5px',
                        marginTop: '20px',
                        color: '#FFFFFF',
                        fontFamily: 'AvantGarde-Demi',
                      }}
                      disabled={isSubmitting}>
                      Confirm and Make Payment
                    </Button>
                  </form>
                );
              }}
            </Formik>
          </Grid>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={3}>
          <Paper
            style={{
              position: 'fixed',
              width: '24%',
              boxShadow: '0px 20px 55px #00000015',
              marginTop: '2%',
              padding: '2%',
            }}>
            <Grid item xs={12}>
              <Typography
                style={{
                  textAlign: 'left',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#1C2460',
                  fontFamily: 'AvantGarde-Demi',
                }}>
                Price Details
              </Typography>
            </Grid>
            <div
              style={{
                display: 'flex',
                marginTop: '3%',
                justifyContent: 'space-between',
                padding: '10px 30px 0px 0px',
              }}>
              <div>
                <Typography style={{ fontFamily: 'CrimsonText-Regular' }}>
                  {price_details.count} People
                </Typography>
              </div>
              <div>
                <Typography style={{ fontFamily: 'CrimsonText-Regular' }}>
                  {' '}
                  {price_details.currency}
                </Typography>
              </div>
            </div>
            <Divider light style={{ marginTop: '15px' }} />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 30px 0px 0px',
              }}>
              <div>
                <Typography style={{ fontFamily: 'CrimsonText-Regular' }}>
                  Total (Base Fare)
                </Typography>
              </div>
              <div>
                <Typography style={{ fontFamily: 'CrimsonText-Regular' }}>
                  {price_details.currency}
                  {price_details.base}
                </Typography>
              </div>
            </div>
            <Divider light style={{ marginTop: '15px' }} />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 30px 0px 0px',
              }}>
              <div>
                <Typography style={{ fontFamily: 'CrimsonText-Regular' }}>
                  Total Tax
                </Typography>
              </div>
              <div>
                <Typography style={{ fontFamily: 'CrimsonText-Regular' }}>
                  {price_details.currency}
                  {price_details.totaltax}{' '}
                </Typography>
              </div>
            </div>
            <Divider light style={{ marginTop: '15px' }} />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 30px 0px 0px',
              }}>
              <div>
                <Typography
                  style={{
                    fontSize: '17px',
                    fontWeight: 600,
                    color: '#333333',
                    fontFamily: 'CrimsonText-Bold',
                  }}>
                  Total
                </Typography>
              </div>
              <div>
                <Typography
                  style={{
                    fontSize: '17px',
                    fontWeight: 600,
                    color: '#333333',
                    fontFamily: 'CrimsonText-Bold',
                  }}>
                  {price_details.currency}
                  {price_details.total}{' '}
                </Typography>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
export default injectWithObserver(FlightBooking);
