import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import baggage from '../../assets/Check-in baggage@2x.png';
import luggage from '../../assets/luggage@2x.png';
import FormControl from '@material-ui/core/FormControl';
import exchange from '../../assets/exchange@2x.png';
import plus from '../../assets/Icon ionic-ios-add-circle-outline@2x.png';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Button, Divider, TextField } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import SpiceJet from '../../assets/Flight logo - 3@2x.png';
import flightIcon from '../../assets/Icon material-flight@2x.png';
import feather from '../../assets/Icon feather-check-circle@2x.png';
import TransparentTopBar from '../../TopBar/index';
import InputComp from '../../components/InputComp';
import CustomizedSelects from '../../components/CustomizedSelects';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: '#FFFFFF',
    },
    paper: {
      padding: '30px',
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
  }),
);

export default function FlightBooking() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);

  const CheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div className={classes.root}>
      <TransparentTopBar color='textWhite' backgroundColor='blue' />
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        <Grid item xs={1}></Grid>
        <Grid item xs={6}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={2} style={{ marginBottom: '10px' }}>
                <Grid item xs={6}>
                  {' '}
                  <Typography
                    style={{
                      textAlign: 'left',
                      fontSize: '16px',
                      fontWeight: 500,
                      color: '#1C2460',
                    }}>
                    Itinerary Details
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    style={{
                      textAlign: 'right',
                      fontSize: '16px',
                      fontWeight: 500,
                      color: '#4BAFC9',
                    }}>
                    <img
                      src={exchange}
                      style={{ height: '16px', marginRight: '5px' }}></img>
                    Change Flight
                  </Typography>
                </Grid>
              </Grid>

              <Paper className={classes.paper}>
                <Grid
                  container
                  style={{
                    display: 'flex',
                    padding: '10px',
                  }}>
                  <Grid container>
                    <Grid item xs={3}>
                      <div>
                        <img
                          alt=''
                          src={SpiceJet}
                          style={{ height: '50px', width: '50px' }}></img>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography style={{ marginTop: '25px' }}>
                        SpiceJet<b>SG-8169</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        style={{ textAlign: 'right', marginTop: '25px' }}>
                        Economy Class
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid
                      item
                      xs={3}
                      style={{ color: '#1C2460', fontSize: '12px' }}>
                      <div>
                        <p>09:05 Tue, 18.05.21</p>
                        <p>
                          Chennai (MAA)
                          <br />
                          Terminal 1
                        </p>
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        alignItems: 'center',
                        textAlign: 'center',
                        justifyContent: 'center',
                      }}>
                      <Typography style={{ marginRight: '18px' }}>
                        Direct
                      </Typography>
                      <div style={{ display: 'flex', color: '#4BAFC9' }}>
                        {'--------------------'}
                        <img src={flightIcon}></img>
                        {'--------------------'}
                      </div>
                      <Typography style={{ marginRight: '18px' }}>
                        0 hr 40 mins
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      style={{ color: '#1C2460', fontSize: '12px' }}>
                      <div>
                        <p>09:45 Tue, 18.05.21</p>
                        <p>
                          Bengaluru Intl (BLR)
                          <br />
                          Terminal 3
                        </p>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>

              <div
                style={{
                  background: '#FFF2DE',
                  marginTop: '50px',
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
                        fontSize: '10px',
                      }}>
                      Covid-19 information
                    </Typography>
                    <Typography
                      style={{
                        //   textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: 500,
                      }}>
                      Country/Region Entry restrictions
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      style={{
                        fontSize: '15px',
                      }}>
                      Status in Hyderabad: <b>Normal</b>. Status in Chennai:{' '}
                      <b>Normal</b>
                    </Typography>

                    <Typography
                      style={{
                        fontSize: '14px',
                        color: '#DCAB5E',
                        float: 'right',
                      }}>
                      View Details
                    </Typography>
                  </div>
                </div>
              </div>
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
                  dirty,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  handleReset,
                } = props;
                return (
                  <form
                    onSubmit={handleSubmit}
                    style={{ width: '-webkit-fill-available' }}>
                    <Grid item xs={12} style={{ marginTop: '30px' }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          {' '}
                          <Typography
                            style={{
                              textAlign: 'left',
                              fontSize: '16px',
                              fontWeight: 500,
                              color: '#1C2460',
                            }}>
                            Passenger Info
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            style={{
                              textAlign: 'right',
                              fontSize: '16px',
                              fontWeight: 500,
                              color: '#4BAFC9',
                            }}>
                            <img
                              src={plus}
                              style={{
                                height: '16px',
                                marginRight: '5px',
                              }}></img>
                            Add Extra Passenger
                          </Typography>
                        </Grid>
                      </Grid>

                      <Paper className={classes.paper}>
                        <Typography
                          style={{ textAlign: 'left', color: 'black' }}>
                          Passenger 1 - Adult (age 13 or above)
                        </Typography>
                        <Typography
                          style={{
                            textAlign: 'left',
                            fontSize: '13px',
                            marginTop: '5px',
                            marginBottom: '5px',
                          }}>
                          Use all given names and surnames exactly as they
                          appear in your passport/ID to avoid boarding
                          complications.
                        </Typography>

                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <InputComp
                              error={Boolean(errors.fullname)}
                              helperText={errors.fullname}
                              onChange={handleChange}
                              value={values.fullname}
                              variant='outlined'
                              labeldisplay={true}
                              labelValue='Client name'
                              name='fullname'
                              placeholder=''
                              textalignment='left'
                              size='small'
                              margin='normal'
                              fullWidth
                            />
                          </Grid>{' '}
                          <Grid item xs={12} sm={6}>
                            <InputComp
                              error={Boolean(errors.email)}
                              helperText={errors.email}
                              onChange={handleChange}
                              value={values.email}
                              variant='outlined'
                              labeldisplay={true}
                              labelValue='Email'
                              name='email'
                              placeholder=''
                              textalignment='left'
                              size='small'
                              margin='normal'
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            {/* <CustomizedSelects
                              options={}
                              error={Boolean(errors.council_id)}
                              helperText={errors.council_id}
                              onChange={handleChange}
                              value={values.council_id}
                              variant='outlined'
                              labeldisplay={true}
                              labelValue='Assign Local Council'
                              name='council_id'
                              placeholder=''
                              textalignment='left'
                              size='small'
                              margin='normal'
                              fullWidth
                            /> */}
                          </Grid>{' '}
                          <Grid item xs={12} sm={6}>
                            {/* <CustomizedSelects
                              options={}
                              error={Boolean(errors.council_id)}
                              helperText={errors.council_id}
                              onChange={handleChange}
                              value={values.council_id}
                              variant='outlined'
                              labeldisplay={true}
                              labelValue='Assign Local Council'
                              name='council_id'
                              placeholder=''
                              textalignment='left'
                              size='small'
                              margin='normal'
                              fullWidth
                            /> */}
                          </Grid>
                          <Grid item xs={6}>
                            {' '}
                            <TextField
                              id='date'
                              label='Birthday'
                              type='date'
                              variant='outlined'
                              value={values.dob}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              name='passportNumber'
                              placeholder='Enter valid Passport Number'
                              label='Passport Number'
                              variant='outlined'
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} style={{ marginTop: '30px' }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          {' '}
                          <Typography
                            style={{
                              textAlign: 'left',
                              fontSize: '16px',
                              fontWeight: 500,
                              color: '#1C2460',
                            }}>
                            Baggage Info
                          </Typography>
                        </Grid>
                      </Grid>
                      <Paper className={classes.paper}>
                        <div style={{ marginBottom: '10px', color: '#333333' }}>
                          <b>Adult</b>
                        </div>
                        <Grid container spacing={3}>
                          <Grid item xs={1}>
                            <img src={baggage}></img>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography
                              style={{ fontSize: '14px', color: '#333333' }}>
                              <b>Check-in Baggage</b>
                            </Typography>
                            <Typography style={{ fontSize: '14px' }}>
                              Dimensions (length + width + height) per piece
                              cannot exceed 158CM.
                            </Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <Typography style={{ fontSize: '14px' }}>
                              <b style={{ color: '#333333' }}>15 kg</b> /person
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                          <Grid item xs={1}>
                            <img src={luggage}></img>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography
                              style={{ fontSize: '14px', color: '#333333' }}>
                              <b>Cabin Baggage</b>
                            </Typography>
                            <Typography style={{ fontSize: '14px' }}>
                              Each bag cannot exceed 35*25*22CM in size.
                            </Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <Typography style={{ fontSize: '14px' }}>
                              <b style={{ color: '#333333' }}>7 kg</b> /person
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider style={{ marginTop: '25px' }} />
                        <Typography
                          style={{
                            textAlign: 'left',
                            fontSize: '16px',
                            fontWeight: 500,
                            color: '#333333',
                            marginTop: '20px',
                          }}>
                          Purchase Extra Checked Baggage
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            {' '}
                            <Typography
                              style={{
                                textAlign: 'left',
                                fontSize: '14px',
                                color: '#333333',
                                marginTop: '10px',
                              }}>
                              Passenger 1
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              style={{
                                textAlign: 'right',
                                fontSize: '14px',
                                fontWeight: 500,
                                color: '#4BAFC9',
                              }}>
                              <img
                                src={plus}
                                style={{
                                  height: '16px',
                                  marginRight: '5px',
                                }}></img>
                              Add Extra Baggage
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            {' '}
                            <Typography
                              style={{
                                textAlign: 'left',
                                fontSize: '14px',
                                color: '#333333',
                                marginTop: '10px',
                              }}>
                              Passenger 2
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              style={{
                                textAlign: 'right',
                                fontSize: '14px',
                                color: '#4BAFC9',
                              }}>
                              <img
                                src={plus}
                                style={{
                                  height: '16px',
                                  marginRight: '5px',
                                }}></img>
                              Add Extra Baggage
                            </Typography>
                          </Grid>
                        </Grid>
                        <Typography
                          style={{
                            textAlign: 'left',
                            fontSize: '14px',
                            color: '#333333',
                            marginTop: '10px',
                          }}>
                          Additional checked baggage allowance cannot be
                          refunded, transferred or changed. If you want to
                          check-in over-sized baggage, sports equipment or
                          similar, please refer to the airline’s policies.
                        </Typography>
                      </Paper>
                    </Grid>

                    <Formik
                      initialValues={{ email: '' }}
                      onSubmit={async (values) => {
                        await new Promise((resolve) =>
                          setTimeout(resolve, 500),
                        );
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
                          dirty,
                          isSubmitting,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          handleReset,
                        } = props;
                        return (
                          <form
                            onSubmit={handleSubmit}
                            style={{ width: '-webkit-fill-available' }}>
                            <Grid item xs={12} style={{ marginTop: '30px' }}>
                              <Typography
                                style={{
                                  textAlign: 'left',
                                  fontSize: '16px',
                                  fontWeight: 500,
                                  color: '#1C2460',
                                }}>
                                Contact Details
                              </Typography>
                              <Paper className={classes.paper}>
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-evenly',
                                  }}>
                                  <TextField
                                    style={{ width: '335px' }}
                                    id='email'
                                    placeholder='Full Name'
                                    label='Name'
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

                                  <ReactPhoneInput
                                    country='in'
                                    inputProps={{
                                      name: 'mobile',
                                      required: true,
                                      autoFocus: true,
                                    }}
                                    placeholder='Enter Mobile Number'
                                    containerStyle={{
                                      width: '50%',
                                      height: '60px',
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
                                </div>

                                <div
                                  style={{
                                    display: 'flex',
                                    // justifyContent: "space-evenly",
                                    marginTop: '15px',
                                  }}>
                                  <TextField
                                    style={{
                                      width: '340px',
                                      marginRight: '5px',
                                    }}
                                    id='email'
                                    placeholder='Enter your Email'
                                    label='Email'
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
                                </div>
                                <Typography
                                  style={{
                                    fontSize: 'small',
                                    marginTop: '10px',
                                  }}>
                                  Lorem ipsum dolor sit amet, consetetur
                                  sadipscing elitr, sed diam nonumy eirmod
                                  tempor invidunt ut labore et dolore.
                                </Typography>
                              </Paper>
                            </Grid>

                            <Grid item xs={12} style={{ marginTop: '30px' }}>
                              <Typography
                                style={{
                                  textAlign: 'left',
                                  fontSize: '16px',
                                  fontWeight: 500,
                                  color: '#1C2460',
                                }}>
                                Add Travel Insurance
                              </Typography>
                              <Paper className={classes.paper}>
                                <Typography
                                  style={{
                                    textAlign: 'left',
                                    color: '#333333',
                                  }}>
                                  <b>Benefits of our Insurance</b>
                                </Typography>
                                <Typography
                                  style={{
                                    fontSize: '14px',
                                    marginTop: '10px',
                                  }}>
                                  96%of our customers insure their trip. See all
                                  the benefits you get for just Rs.249
                                </Typography>
                                <Grid container>
                                  <Grid item xs={1}>
                                    {Array.from({ length: 6 }, (x: any, i) => (
                                      <>
                                        <img
                                          src={feather}
                                          style={{ marginTop: '10px' }}></img>
                                        <br />
                                      </>
                                    ))}
                                  </Grid>
                                  <Grid item xs={10}>
                                    {' '}
                                    <Typography
                                      style={{
                                        marginTop: '12px',
                                        fontSize: '14px',
                                        textAlign: 'left',
                                        color: '#333333',
                                      }}>
                                      <b style={{ marginBottom: '17px' }}>
                                        Medical expenses (including COVID-19*)
                                      </b>
                                    </Typography>
                                    <Typography
                                      style={{
                                        marginTop: '12px',
                                        fontSize: '14px',
                                        textAlign: 'left',
                                        color: '#333333',
                                      }}>
                                      <b style={{ marginBottom: '17px' }}>
                                        Trip cancellation due to your illness
                                        (incl. COVID-19*), accident, death
                                      </b>
                                    </Typography>
                                    <Typography
                                      style={{
                                        marginTop: '12px',
                                        fontSize: '14px',
                                        textAlign: 'left',
                                        color: '#333333',
                                      }}>
                                      <b style={{ marginBottom: '17px' }}>
                                        Assistance services
                                      </b>
                                    </Typography>
                                    <Typography
                                      style={{
                                        marginTop: '17px',
                                        fontSize: '14px',
                                        textAlign: 'left',
                                        color: '#333333',
                                      }}>
                                      <b style={{ marginBottom: '17px' }}>
                                        Lost baggage
                                      </b>
                                    </Typography>
                                    <Typography
                                      style={{
                                        marginTop: '15px',
                                        fontSize: 'small',
                                        textAlign: 'left',
                                        color: '#333333',
                                      }}>
                                      <b style={{ marginBottom: '17px' }}>
                                        Air travel insurance
                                      </b>
                                    </Typography>
                                    <Typography
                                      style={{
                                        marginTop: '15px',
                                        fontSize: '14px',
                                        textAlign: 'left',
                                        color: '#333333',
                                      }}>
                                      <b style={{ marginBottom: '17px' }}>
                                        Liability
                                      </b>
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
                                  }}>
                                  <Checkbox
                                    checked={checked}
                                    onChange={CheckBoxChange}
                                    style={{ color: '#DCAB5E' }}
                                    inputProps={{
                                      'aria-label':
                                        'checkbox with default color',
                                    }}
                                  />{' '}
                                  Insure My Trip
                                </Typography>
                                <Typography style={{ marginLeft: '20px' }}>
                                  By opting in, I confirm am Indian & agree to
                                  Terms and Condition and confirm all passenger
                                  are between 6 months to 70 years of age.
                                </Typography>
                              </Paper>
                            </Grid>

                            <Grid item xs={12} style={{ marginTop: '30px' }}>
                              <Paper className={classes.paper}>
                                <Typography
                                  style={{
                                    textAlign: 'left',
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    color: '#1C2460',
                                  }}>
                                  Add Promo Code
                                </Typography>
                                <Typography
                                  style={{
                                    textAlign: 'left',
                                    fontSize: '14px',
                                  }}>
                                  Enter Promo code
                                </Typography>
                                <div style={{ display: 'flex' }}>
                                  <TextField
                                    style={{
                                      width: '340px',
                                      marginRight: '5px',
                                    }}
                                    id='email'
                                    placeholder='To'
                                    label='To'
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
                                    style={{
                                      marginLeft: '20px',
                                      background: '#F7F7F7',
                                      borderRadius: '5px',
                                      height: '25px',
                                      marginTop: '15px',
                                    }}>
                                    Apply
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
                              }}
                              disabled={isSubmitting}>
                              Confirm and Make Payment
                            </Button>
                          </form>
                        );
                      }}
                    </Formik>
                  </form>
                );
              }}
            </Formik>
          </Grid>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <div style={{ display: 'flex', marginTop: '20px' }}>
              <Typography
                style={{
                  textAlign: 'left',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#1C2460',
                }}>
                Price Details
              </Typography>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 30px 0px 0px',
              }}>
              <div>
                <Typography>2 People</Typography>
              </div>
              <div>
                <Typography>$120</Typography>
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
                <Typography>Total (Base Fare)</Typography>
              </div>
              <div>
                <Typography>$120</Typography>
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
                <Typography>Total Tax</Typography>
              </div>
              <div>
                <Typography>$25</Typography>
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
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#1C2460',
                  }}>
                  Total
                </Typography>
              </div>
              <div>
                <Typography
                  style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#1C2460',
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
