import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import addPeople from '../../assets/People - Add@2x.png';
import subtractPeople from '../../assets/People - subtract@2x.png';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import baggage from '../../assets/Check-in baggage@2x.png';
import luggage from '../../assets/luggage@2x.png';
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
  }),
);

function FlightBooking() {
  const classes = useStyles();
  const store = useStore();
  const navigate = useNavigate();

  const { selectedFlight, searchRequest } = toJS(store.flightDetails);
  const [checked, setChecked] = useState(false);
  const [travelers, settravelers] = useState([]);
  const [bookflightdetails, setbookflightdetails] = useState({});
  const [baggage_Info, setBaggage_Info] = useState({
    CheckinBaggage: { weight: '', weightUnit: '' },
    CabinBaggage: { weight: '', weightUnit: '' },
  });
  let req = localStorage.getItem('flightDetails');
  let payload = {};
  if (req != null) payload = JSON.parse(req).selectedFlight[0];
  console.log(baggage_Info);
  const gettravelerlist = () => {
    let travelersLength =
      searchRequest.no_of_people.adults +
      searchRequest.no_of_people.children +
      searchRequest.no_of_people.infants;
    let value: any = [];
    Array.from({ length: travelersLength }, (v, i) =>
      value.push({
        id: i + 1,
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

  const addBaggage = () => {
    _addBaggage({ data: payload }, function (error: any, response: any) {
      if (error === null) {
        if (response.status === '200') {
        }
      }
    });
  };
  const bookFlight = () => {
    _bookFlight({ data: payload }, function (error: any, response: any) {
      if (error === null) {
        if (response.status === '200') {
          setbookflightdetails(response.result.data);
          if (response.result.included) {
            let key = Object.keys(response.result.included.bags);
            // response.result.included.bags;
          }
          // response.result.data.flightOffers.map((item: any) => {
          //   item.itineraries.map((value: any) => {
          //     let baggage = {
          //       CheckinBaggage: { weight: 0, weightUnit: '' },
          //       CabinBaggage: { weight: 0, weightUnit: '' },
          //     };
          //     baggage.CheckinBaggage = {
          //       weight: value.segments[0].co2Emissions[0].weight,
          //       weightUnit: value.segments[0].co2Emissions[0].weightUnit,
          //     };
          //     baggage.CabinBaggage = {
          //       weight:
          //         value.segments[value.segments.length - 1].co2Emissions[0]
          //           .weight,
          //       weightUnit:
          //         value.segments[value.segments.length - 1].co2Emissions[0]
          //           .weightUnit,
          //     };

          //     setBaggage_Info(baggage);
          //   });
          // });
        }
      }
    });
  };

  useEffect(() => {
    addBaggage();
    bookFlight();
    gettravelerlist();
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
            {console.log(travelers)}

            <Paper className={classes.paper}>
              {travelers.map((traveler: any) => (
                <form>
                  <Typography
                    style={{
                      textAlign: 'left',
                      color: 'black',
                      fontFamily: 'CrimsonText-semibold',
                      fontSize: '18px',
                    }}>
                    Passenger 1 - Adult (age 13 or above)
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
                        value={traveler.name.firstName}
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
                        value={traveler.name.lastName}
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
                          value={traveler.gender}
                          placeholder='Select gender'>
                          <MenuItem value=''>
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>Male</MenuItem>
                          <MenuItem value={20}>Female</MenuItem>
                          <MenuItem value={30}>Others</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>{' '}
                    <Grid item xs={12} sm={6}>
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
                        variant='outlined'
                        value={traveler.dateOfBirth}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                    </Grid>
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
                        {baggage_Info.CheckinBaggage.weightUnit}
                        {baggage_Info.CheckinBaggage.weight}
                      </b>{' '}
                      /person
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
                        {baggage_Info.CabinBaggage.weightUnit}
                        {baggage_Info.CabinBaggage.weight}
                      </b>{' '}
                      /person
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
                        }}>
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
                                    marginLeft: '5px',
                                  }}
                                  inputStyle={{
                                    marginLeft: '10%',
                                    height: '60px',
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
            <div style={{ display: 'flex' }}></div>
            <div
              style={{
                display: 'flex',
                marginTop: '3%',
                justifyContent: 'space-between',
                padding: '10px 30px 0px 0px',
              }}>
              <div>
                <Typography style={{ fontFamily: 'CrimsonText-Regular' }}>
                  2 People
                </Typography>
              </div>
              <div>
                <Typography style={{ fontFamily: 'CrimsonText-Regular' }}>
                  $120
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
                  $120
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
                  $25
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
                  $145
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
