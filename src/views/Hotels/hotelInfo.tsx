import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import hotel from '../../assets/Blog image - 1@2x.png';
import EditIcon from '@material-ui/icons/Edit';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RatingPng from '../../assets/Icon awesome-star@2x.png';
import parkingPng from '../../assets/Parking lot@2x.png';
import wifiPng from '../../assets/Wifi@2x.png';
import User from '../../assets/Icon awesome-user@2x.png';
import calanderPng from '../../assets/Icon feather-calendar@2x.png';
import { Button, Divider, TextField } from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TransparentTopBar from '../../TopBar/index';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: '#FFFFFF',
      marginTop: '50px',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      marginTop: '5px',
      boxShadow: '0px 20px 55px #00000015',
    },
    listroot: {
      color: '#1C2460',
      '.MuiListItem-button:hover': {
        backgroundColor: 'none',
      },
    },
  }),
);

export default function HotelInfo() {
  const classes = useStyles();
  return (
    <>
      <TransparentTopBar
        color='textWhite'
        backgroundColor='blue'
        position='fixed'
      />
      <div className={classes.root}>
        <Grid container spacing={3} style={{ marginTop: '50px' }}>
          <Grid item xs={1}></Grid>
          <Grid item xs={6}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography
                  style={{
                    textAlign: 'left',
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#1C2460',
                    marginTop: '20px',
                  }}>
                  Hotel Details
                </Typography>
                <Paper className={classes.paper}>
                  <div style={{ display: 'flex' }}>
                    <img
                      alt=''
                      src={hotel}
                      style={{
                        height: '135px',
                        width: '160px',
                        borderRadius: '5px',
                      }}></img>

                    <div style={{ width: '350px', marginLeft: '10px' }}>
                      <div style={{ display: 'flex' }}>
                        <Typography
                          style={{
                            textAlign: 'left',
                            fontSize: '16px',
                            fontWeight: 500,
                            color: '#1C2460',
                          }}>
                          Plush Penthouse With Private Plunge Pool
                        </Typography>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          fontSize: '12px',
                        }}>
                        {'Nerul, Goa'}
                        <img
                          alt=''
                          src={RatingPng}
                          style={{ width: '15px', height: '15px' }}></img>
                        &nbsp;
                        <img
                          alt=''
                          src={RatingPng}
                          style={{ width: '15px', height: '15px' }}></img>
                        &nbsp;
                        <img
                          alt=''
                          src={RatingPng}
                          style={{ width: '15px', height: '15px' }}></img>
                        &nbsp;
                        <img
                          alt=''
                          src={RatingPng}
                          style={{ width: '15px', height: '15px' }}></img>
                        &nbsp;
                        <Typography
                          style={{ marginLeft: '10px', fontSize: '12px' }}>
                          4.0
                        </Typography>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          // borderBottom: '1px solid #00000015',
                          marginTop: '20px',
                        }}>
                        <div style={{ display: 'flex' }}>
                          <span style={{ fontSize: '12px' }}>
                            <img
                              alt=''
                              src={calanderPng}
                              style={{ width: '20px', height: '20px' }}></img>
                            &nbsp; Check-in
                          </span>
                          <Typography
                            style={{
                              marginLeft: '15px',
                              color: '#333333',
                              fontSize: '12px',
                              fontWeight: 500,
                            }}>
                            18/05/21
                          </Typography>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <span style={{ fontSize: '12px' }}>
                            <img
                              alt=''
                              src={calanderPng}
                              style={{ width: '20px', height: '20px' }}></img>
                            &nbsp; Check-in
                          </span>

                          <Typography
                            style={{
                              marginLeft: '15px',
                              color: '#333333',
                              fontSize: '12px',
                              fontWeight: 500,
                            }}>
                            18/05/21
                          </Typography>
                        </div>
                      </div>
                      <div style={{ display: 'flex', marginTop: '20px' }}>
                        <span style={{ fontSize: '12px' }}>
                          <img
                            alt=''
                            src={User}
                            style={{ width: '20px', height: '20px' }}></img>
                          &nbsp; Guest
                        </span>
                        <Typography
                          style={{
                            marginLeft: '15px',
                            color: '#333333',
                            fontSize: '12px',
                            fontWeight: 500,
                          }}>
                          3
                        </Typography>
                      </div>
                    </div>
                    <div style={{ display: 'flex', marginLeft: 'auto' }}>
                      <EditIcon
                        style={{
                          width: '12px',
                          height: '12px',
                          color: '#4BAFC9',
                        }}
                      />
                      <Typography
                        style={{
                          color: '#4BAFC9',
                          fontSize: '10px',
                          marginLeft: '5px',
                        }}>
                        Edit Details
                      </Typography>
                    </div>
                  </div>
                </Paper>

                <div
                  style={{
                    background: '#FFF2DE',
                    marginTop: '20px',
                    borderRadius: '5px',
                  }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '15px 7px 15px',
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
                          color: '#1C2460',
                        }}>
                        Country/Region Entry restrictions
                      </Typography>
                    </div>
                    <div>
                      <Typography
                        style={{
                          fontSize: '10px',
                        }}>
                        Status in Goa:
                        <span
                          style={{
                            color: '#1C2460',
                            fontWeight: 500,
                            fontSize: '12px',
                          }}>
                          Normal
                        </span>
                      </Typography>

                      <Typography
                        style={{
                          fontSize: '14px',
                          color: '#DCAB5E',
                        }}>
                        View Details
                      </Typography>
                    </div>
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} style={{ marginTop: '50px' }}>
                <Typography
                  style={{
                    textAlign: 'left',
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#1C2460',
                  }}>
                  Room Details
                </Typography>
                <Paper className={classes.paper}>
                  <div style={{ display: 'flex' }}>
                    <img
                      alt=''
                      src={hotel}
                      style={{
                        height: '135px',
                        width: '160px',
                        borderRadius: '5px',
                      }}></img>

                    <div style={{ width: '350px', marginLeft: '10px' }}>
                      <Typography
                        style={{
                          textAlign: 'left',
                          fontSize: '16px',
                          fontWeight: 500,
                          color: '#1C2460',
                        }}>
                        Luxury Suite, Pool View
                      </Typography>
                      <div style={{ display: 'flex' }}>
                        <div style={{ width: '150px' }}>
                          <List
                            component='nav'
                            aria-label='main mailbox folders'
                            className={classes.listroot}>
                            <ListItem button>
                              <img
                                alt=''
                                src={parkingPng}
                                style={{
                                  width: '25px',
                                  height: '25px',
                                  marginLeft: '5px',
                                }}></img>
                              <ListItemText
                                secondary='Parking'
                                style={{ marginLeft: '10px' }}
                              />
                            </ListItem>
                            <ListItem button>
                              <img
                                alt=''
                                src={wifiPng}
                                style={{
                                  width: '25px',
                                  height: '25px',
                                  marginLeft: '5px',
                                }}></img>
                              <ListItemText
                                secondary='WiFi'
                                style={{ marginLeft: '10px' }}
                              />
                            </ListItem>
                          </List>
                        </div>
                        <div>
                          <Typography style={{ fontSize: '12px' }}>
                            Amenities Included
                          </Typography>
                          {Array.from({ length: 4 }, (x: any, i) => (
                            <img
                              alt=''
                              src={parkingPng}
                              style={{
                                width: '25px',
                                height: '25px',
                                marginLeft: '5px',
                              }}></img>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
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
                      <Grid item xs={12} style={{ marginTop: '50px' }}>
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
                            <div>
                              <Typography
                                style={{
                                  textAlign: 'left',
                                  fontSize: '14px',
                                  marginLeft: '5px',
                                }}>
                                First Name
                              </Typography>

                              <TextField
                                style={{ width: '335px' }}
                                id='email'
                                placeholder='From'
                                label='From'
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
                            </div>

                            <div>
                              <Typography
                                style={{
                                  textAlign: 'left',
                                  fontSize: '14px',
                                }}>
                                Last Name
                              </Typography>
                              <TextField
                                style={{ width: '340px' }}
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
                            </div>
                          </div>

                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              marginTop: '15px',
                            }}>
                            <div>
                              <Typography
                                style={{
                                  textAlign: 'left',
                                  fontSize: '14px',
                                  marginLeft: '5px',
                                }}>
                                Mobile Number
                              </Typography>

                              <ReactPhoneInput
                                country='in'
                                inputProps={{
                                  name: 'mobile',
                                  required: true,
                                  autoFocus: false,
                                }}
                                placeholder='Enter Mobile Number'
                                containerStyle={{
                                  width: '60%',
                                  height: '60px',
                                  marginLeft: '5px',
                                }}
                                inputStyle={{
                                  marginLeft: '20%',
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
                                // onBlur={handleBlur}
                              />
                            </div>

                            <div>
                              <Typography
                                style={{ textAlign: 'left', fontSize: '14px' }}>
                                E-mail ID
                              </Typography>

                              <TextField
                                style={{ width: '340px', marginRight: '5px' }}
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
                            </div>
                          </div>

                          <Typography
                            style={{ fontSize: 'small', marginTop: '10px' }}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing
                            elitr, sed diam nonumy eirmod tempor invidunt ut
                            labore et dolore.
                          </Typography>
                        </Paper>
                      </Grid>

                      <Grid item xs={12} style={{ marginTop: '50px' }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}>
                          <Typography
                            style={{
                              textAlign: 'left',
                              fontSize: '16px',
                              fontWeight: 500,
                              color: '#1C2460',
                            }}>
                            Cancellation Policies
                          </Typography>
                          <Typography
                            style={{
                              color: '#4BAFC9',
                              fontSize: '12px',
                            }}>
                            View More
                          </Typography>
                        </div>

                        <Paper className={classes.paper}>
                          <Typography style={{ textAlign: 'left' }}>
                            Cancel before 12:00 PM on 17 May and get a 50%
                            refund, minus the service fee
                          </Typography>

                          <Typography
                            style={{
                              marginTop: '10px',
                              fontSize: 'small',
                              textAlign: 'left',
                            }}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing
                            elitr, sed diam nonumy eirmod tempor invidunt ut
                            labore et dolore magna aliquyam erat, sed diam
                            voluptua. At vero eos et accusam et justo duo
                            dolores et ea rebum. Stet clita kasd gubergren, no
                            sea takimata sanctus est Lorem ipsum dolor sit amet.
                            Lorem ipsum dolor sit amet, consetetur sadipscing
                            elitr, sed diam nonumy eirmod tempor invidunt.
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} style={{ marginTop: '50px' }}>
                        <Typography
                          style={{
                            textAlign: 'left',
                            fontSize: '16px',
                            fontWeight: 500,
                            color: '#1C2460',
                          }}>
                          Special Requests
                        </Typography>
                        <Paper className={classes.paper}>
                          <Typography style={{ fontSize: 'small' }}>
                            Special requests are not guaranteed but the
                            accommodation will do their best to meet your needs.
                            May incur charges.
                          </Typography>
                          <TextareaAutosize
                            rowsMin={6}
                            style={{ marginTop: '15px', width: '100%' }}
                            aria-label='maximum height'
                            placeholder='Maximum 4 rows'
                            defaultValue='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                          ut labore et dolore magna aliqua.'
                          />
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
                          Add Promo Code
                        </Typography>
                        <Paper className={classes.paper}>
                          <Typography
                            style={{ textAlign: 'left', fontSize: '14px' }}>
                            Enter Promo code
                          </Typography>
                          <div style={{ display: 'flex' }}>
                            <TextField
                              style={{ width: '340px', marginRight: '5px' }}
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
            </Grid>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <div
                style={{
                  display: 'flex',
                  marginTop: '20px',
                  marginLeft: '10px',
                }}>
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
                  <Typography>1 Room *10 Nights</Typography>
                  <Typography>$120 per night</Typography>
                </div>
                <div>
                  <Typography>$780</Typography>
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
                    $140
                  </Typography>
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </div>
    </>
  );
}
