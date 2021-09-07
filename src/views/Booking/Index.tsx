import React, { useEffect } from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import flight from '../../assets/Flight logo - 1@2x.png';
import flightIcon from '../../assets/Icon material-flight@2x.png';
import Button from '@material-ui/core/Button';
import wifiPng from '../../assets/Wifi@2x.png';
import pool from '../../assets/Pool@2x.png';
import entertainment from '../../assets/Entertainment - Hotel@2x.png';
import parkingPng from '../../assets/Parking lot@2x.png';
import gym from '../../assets/Gym@2x.png';
import drinks from '../../assets/Drinks@2x.png';
import restaurant from '../../assets/Restaurant@2x.png';
import hotel1 from '../../assets/pexels-tom-fisk-2169857.jpeg';
import car from '../../assets/Car Image -1 @2x.png';
import luggage from '../../assets/luggage@2x.png';
import person from '../../assets/Icon awesome-user-friends@2x.png';
import manual from '../../assets/manual-transmission@2x.png';
import snow from '../../assets/Icon ionic-ios-snow@2x.png';
import cardoor from '../../assets/car-door@2x.png';
import Divider from '@material-ui/core/Divider';
import { useNavigate } from 'react-router-dom';
import {
  _getFlightBookingList
} from '../../services/api/flight';
interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(3),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      borderRadius: '10px',
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    },
    tab: {
      outline: 'none !important',
    },
    ht_Top: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    fl_cancelbtn: {
      position: 'absolute',
      fontSize: 'smaller',
      top: '13%',
      marginRight: '5%',
      right: '0',
      textAlign: 'left',
      letterSpacing: '0.3px',
      color: '#DB4437',
    },
    ht_cancelbtn: {
      fontSize: 'smaller',
      color: '#DB4437',
    },
    car_cancelbtn: {
      position: 'absolute',
      fontSize: 'smaller',
      color: '#DB4437',
      width: '100px',
    },
  }),
);

export default function BookingComponent() {
  const classes = useStyles();
  const theme = useTheme();
  let navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [bookingList, setBookingList] = React.useState<any>([]);


  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  useEffect(() => {
    fetchData()
  }, []);
  const fetchData = () => {
    _getFlightBookingList(
      {
          "uid":"sahjhhasd-asdhsahd-044sa"
      },
      function (error: any, response: any) {
        if (error === null) {
          if (response.status === '200') {
            setBookingList(response.result)
            console.log(response, 'resppppss');
          }
        }
      },
    );
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            aria-label='full width tabs example'
            style={{
              borderBottom: '1px solid #E5E5E5',
              marginRight: '64px',
            }}>
            <Tab
              className={classes.tab}
              style={{ minWidth: '11%' }}
              label='Flights'
              {...a11yProps(0)}
            />
            <Tab
              className={classes.tab}
              style={{ minWidth: '11%' }}
              label='Hotels'
              {...a11yProps(1)}
            />
            <Tab
              className={classes.tab}
              style={{ minWidth: '11%' }}
              label='Car Rentals'
              {...a11yProps(2)}
            />
          </Tabs>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}>
            <TabPanel value={value} index={0} dir={theme.direction}>
              {bookingList && bookingList.map((x: any) => (
                <Grid
                  container
                  style={{ border: '1px solid #E5E5E5', borderRadius: '10px' }}>
                  <Grid item xs={10}>
                    <Grid container style={{ marginTop: '10px' }}>
                      <Grid item xs={4}>
                        <div style={{ textAlign: 'left', marginLeft: '15px' }}>
                          <Typography style={{ fontSize: '14px' }}>
                            <span style={{ color: '#4BAFC9' }}>
                              15/06/21, Tuesday{' '}
                            </span>
                            - Inbound
                          </Typography>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            marginTop: '10px',
                          }}>
                          <div>
                            <img alt='' src={flight}></img>
                          </div>
                          <div
                            style={{
                              fontFamily: 'Crimson Text',
                              color: '#1C2460',
                            }}>
                            <p style={{ fontSize: '28px', marginBottom: '0px' }}>
                              {x.one_way_from_time}
                            </p>
                            <p style={{ fontSize: '20px' }}>
                              {x.one_way_from}
                              <br />
                              <span style={{ marginRight: '25%' }}>{x.one_way_from}</span>
                            </p>
                          </div>
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={5}
                        style={{
                          alignItems: 'center',
                          textAlign: 'center',
                          justifyContent: 'center',
                          display: 'grid',
                          marginTop: '3%',
                        }}>
                        <Typography>Direct</Typography>
                        <div style={{ display: 'flex' }}>
                          {'--------------------------'}
                          <img alt='' src={flightIcon}></img>
                          {'--------------------------'}
                        </div>
                        <Typography>0 hr 40 mins</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <div
                          style={{
                            fontFamily: 'Crimson Text',
                            color: '#1C2460',
                            justifyContent: 'space-around',
                            marginTop: '30px',
                          }}>
                          <p
                            style={{
                              fontSize: '28px',
                              marginRight: '35%',
                              marginBottom: '0px',
                            }}>
                           {x.one_way_to_time}
                          </p>
                          <p style={{ fontSize: '20px' }}>
                            <span style={{ marginLeft: '8%' }}>
                              {x.one_way_to}
                            </span>
                            <br />
                            <span style={{ marginRight: '52%' }}> {x.one_way_to}</span>
                          </p>
                        </div>
                      </Grid>
                    </Grid>
                    <Grid container style={{ marginTop: '10px' }}>
                      <Grid item xs={5}>
                        <div style={{ textAlign: 'left', marginLeft: '15px' }}>
                          <Typography style={{ fontSize: '14px' }}>
                            <span style={{ color: '#4BAFC9' }}>
                              15/06/21, Tuesday{' '}
                            </span>
                            - Inbound
                          </Typography>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            marginTop: '10px',
                          }}>
                          <div>
                            <img alt='' src={flight}></img>
                          </div>
                          <div
                            style={{
                              fontFamily: 'Crimson Text',
                              color: '#1C2460',
                            }}>
                            <p
                              style={{
                                fontSize: '28px',
                                marginRight: '50%',
                                marginBottom: '0px',
                              }}>
                             {x.return_from_time}
                            </p>
                            <p style={{ fontSize: '20px' }}>
                              <span>{x.return_from}</span>
                              <br />
                              <span style={{ marginRight: '68%' }}>{x.return_from}</span>
                            </p>
                          </div>
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          alignItems: 'center',
                          textAlign: 'center',
                          justifyContent: 'center',
                          display: 'grid',
                          marginTop: '3%',
                        }}>
                        <Typography>Direct</Typography>
                        <div style={{ display: 'flex' }}>
                          {'------------------------'}
                          <img alt='' src={flightIcon}></img>
                          {'------------------------'}
                        </div>
                        <Typography>0 hr 40 mins</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <div
                          style={{
                            fontFamily: 'Crimson Text',
                            color: '#1C2460',
                            marginTop: '30px',
                          }}>
                          <p
                            style={{
                              fontSize: '28px',
                              marginRight: '25%',
                              marginBottom: '0px',
                            }}>
                            {x.return_to_time}
                          </p>
                          <p style={{ fontSize: '20px' }}>
                            <span style={{ marginRight: '24%' }}>{x.return_to}</span>
                            <br />
                            <span style={{ marginRight: '39%' }}>{x.return_to}</span>
                          </p>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Box component='div'>
                      <Typography
                        className={classes.fl_cancelbtn}
                        variant='h5'
                        style={{ fontSize: '15px', fontFamily: 'Avant Grade' }}>
                        Cancel Booking
                      </Typography>
                    </Box>
                    <Box component='div' mr={6}>
                      <Typography>
                        <span style={{ color: '#1C2460' }}>Paid </span>{' '}
                        <span
                          style={{
                            fontFamily: 'Crimson Text',
                            fontSize: '23px',
                            color: '#1C2460',
                          }}>
                          ${x.base_price}
                        </span>
                      </Typography>
                    </Box>
                    <br />
                    <Box component='div' mr={7} style={{ width: '100%' }}>
                      <Button
                        variant='contained'
                        style={{
                          background: '#DCAB5E',
                          color: '#fff',
                        }}
                        onClick={() => navigate('/bookingSummary')}>
                        View Summary
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              ))}
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <div className={classes.ht_Top}>
                <span style={{ marginBottom: '20px' }}>03/07/21</span>
              </div>
              <Grid
                container
                spacing={3}
                style={{ border: '1px solid #E5E5E5', borderRadius: '10px' }}>
                <Grid item xs={2}>
                  <img
                    alt=''
                    src={hotel1}
                    style={{
                      width: '110%',
                      height: '150px',
                      borderRadius: '5px',
                    }}></img>
                </Grid>
                <Grid item xs={8}>
                  <div style={{ textAlign: 'start' }}>
                    <Typography
                      style={{
                        fontWeight: 500,
                        color: '#1C2460',
                        marginTop: '14px',
                        marginLeft: '11px',
                        marginBottom: '5px',
                      }}>
                      Plush Penthouse With Private Plunge Pool
                    </Typography>
                    <Typography style={{ marginLeft: '10px' }}>
                      Nerul, Goa
                    </Typography>
                  </div>
                  <div style={{ marginTop: '15px', display: 'flex' }}>
                    <img
                      alt=''
                      src={wifiPng}
                      style={{
                        width: '35px',
                        height: '35px',
                        margin: '5px',
                      }}></img>
                    <img
                      alt=''
                      src={pool}
                      style={{
                        width: '35px',
                        height: '35px',
                        margin: '5px',
                      }}></img>
                    <img
                      alt=''
                      src={entertainment}
                      style={{
                        width: '35px',
                        height: '35px',
                        margin: '5px',
                      }}></img>
                    <img
                      alt=''
                      src={parkingPng}
                      style={{
                        width: '35px',
                        height: '35px',
                        margin: '5px',
                      }}></img>
                    <img
                      alt=''
                      src={gym}
                      style={{
                        width: '35px',
                        height: '35px',
                        margin: '5px',
                      }}></img>
                    <img
                      alt=''
                      src={drinks}
                      style={{
                        width: '35px',
                        height: '35px',
                        margin: '5px',
                      }}></img>
                    <img
                      alt=''
                      src={restaurant}
                      style={{
                        width: '35px',
                        height: '35px',
                        margin: '5px',
                      }}></img>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}>
                    <Typography className={classes.ht_cancelbtn}>
                      Cancel Booking
                    </Typography>
                    <Box component='div' mr={6}>
                      <Typography>
                        <span style={{ color: '#1C2460' }}>Total</span>{' '}
                        <span
                          style={{
                            fontFamily: 'Crimson Text',
                            fontSize: '23px',
                            color: '#1C2460',
                          }}>
                          $520
                        </span>
                      </Typography>
                    </Box>
                    <br />
                    <Box component='div' mr={10} style={{ width: '100%' }}>
                      <Button
                        variant='contained'
                        style={{
                          background: '#DCAB5E',
                          color: '#fff',
                        }}>
                        View Summary
                      </Button>
                    </Box>
                  </div>
                </Grid>
              </Grid>
              <div>
                <div className={classes.ht_Top}>
                  <span style={{ marginTop: '30px' }}>15/06/21</span>
                </div>
                <Grid
                  container
                  spacing={3}
                  style={{
                    border: '1px solid #E5E5E5',
                    borderRadius: '10px',
                    marginTop: '10px',
                  }}>
                  <Grid item xs={2}>
                    <img
                      alt=''
                      src={hotel1}
                      style={{
                        width: '110%',
                        height: '150px',
                        borderRadius: '5px',
                      }}></img>
                  </Grid>
                  <Grid item xs={8}>
                    <div style={{ textAlign: 'start' }}>
                      <Typography
                        style={{
                          fontWeight: 500,
                          color: '#1C2460',
                          marginTop: '14px',
                          marginLeft: '11px',
                          marginBottom: '5px',
                        }}>
                        Plush Penthouse With Private Plunge Pool
                      </Typography>
                      <Typography style={{ marginLeft: '10px' }}>
                        Nerul, Goa
                      </Typography>
                      <div style={{ marginTop: '15px', display: 'flex' }}>
                        <img
                          alt=''
                          src={wifiPng}
                          style={{
                            width: '35px',
                            height: '35px',
                            margin: '5px',
                          }}></img>
                        <img
                          alt=''
                          src={pool}
                          style={{
                            width: '35px',
                            height: '35px',
                            margin: '5px',
                          }}></img>
                        <img
                          alt=''
                          src={entertainment}
                          style={{
                            width: '35px',
                            height: '35px',
                            margin: '5px',
                          }}></img>
                        <img
                          alt=''
                          src={parkingPng}
                          style={{
                            width: '35px',
                            height: '35px',
                            margin: '5px',
                          }}></img>
                        <img
                          alt=''
                          src={gym}
                          style={{
                            width: '35px',
                            height: '35px',
                            margin: '5px',
                          }}></img>
                        <img
                          alt=''
                          src={drinks}
                          style={{
                            width: '35px',
                            height: '35px',
                            margin: '5px',
                          }}></img>
                        <img
                          alt=''
                          src={restaurant}
                          style={{
                            width: '35px',
                            height: '35px',
                            margin: '5px',
                          }}></img>
                      </div>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                    }}>
                    <Divider />
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                      }}>
                      <Typography className={classes.ht_cancelbtn}>
                        Cancel Booking
                      </Typography>
                      <Box component='div' mr={6}>
                        <Typography>
                          <span style={{ color: '#1C2460' }}>Total</span>{' '}
                          <span
                            style={{
                              fontFamily: 'Crimson Text',
                              fontSize: '23px',
                              color: '#1C2460',
                            }}>
                            $520
                          </span>
                        </Typography>
                      </Box>
                      <br />
                      <Box component='div' mr={10} style={{ width: '100%' }}>
                        <Button
                          variant='contained'
                          style={{
                            background: '#DCAB5E',
                            color: '#fff',
                          }}>
                          View Summary
                        </Button>
                      </Box>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <Grid
                container
                spacing={3}
                style={{ border: '2px solid #EDEDED', borderRadius: '10px' }}>
                <Grid item xs={2}>
                  <div>
                    <img
                      src={car}
                      alt=''
                      style={{
                        width: '100%',
                        height: '150px',
                        borderRadius: '5px',
                        overflow: 'hidden',
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={8} style={{ textAlign: 'start' }}>
                  <div>
                    <Typography style={{ marginTop: '15px' }}>
                      <span style={{ fontWeight: 500 }}>Suzuki Swift </span>Or
                      similar Economy{' '}
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <div style={{ marginTop: '15px' }}>
                          <img
                            alt=''
                            src={person}
                            style={{
                              width: '25px',
                              height: '25px',
                              margin: '5px',
                            }}></img>
                          <span
                            style={{
                              marginLeft: '5px',
                              marginRight: '10px',
                            }}>
                            5 Person
                          </span>
                          <img
                            alt=''
                            src={luggage}
                            style={{
                              width: '25px',
                              height: '25px',
                              margin: '5px',
                            }}></img>
                          <span
                            style={{
                              marginLeft: '5px',
                              marginRight: '10px',
                            }}>
                            2 Large Bags
                          </span>
                          <img
                            alt=''
                            src={cardoor}
                            style={{
                              width: '25px',
                              height: '25px',
                              margin: '5px',
                            }}></img>
                          <span
                            style={{
                              marginLeft: '5px',
                              marginRight: '10px',
                            }}>
                            4 Doors
                          </span>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div>
                          <img
                            alt=''
                            src={manual}
                            style={{
                              width: '25px',
                              height: '25px',
                              margin: '5px',
                            }}></img>
                          <span
                            style={{
                              marginLeft: '5px',
                              marginRight: '10px',
                            }}>
                            Manual
                          </span>
                          <img
                            alt=''
                            src={snow}
                            style={{
                              width: '25px',
                              height: '25px',
                              margin: '5px',
                            }}></img>
                          <span
                            style={{
                              marginLeft: '10px',
                              marginRight: '10px',
                            }}>
                            Air-Conditioning
                          </span>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Divider />
                <Grid
                  item
                  xs={2}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                  }}>
                  <Typography className={classes.car_cancelbtn}>
                    Cancel Booking
                  </Typography>
                  <div>
                    <Typography>
                      <span style={{ color: '#1C2460' }}>Total</span>{' '}
                      <span
                        style={{
                          fontFamily: 'Crimson Text',
                          fontSize: '23px',
                          color: '#1C2460',
                        }}>
                        $520
                      </span>
                    </Typography>
                    <br />
                    <Button
                      variant='contained'
                      style={{ background: '#DCAB5E', color: '#fff' }}>
                      View Summary
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </TabPanel>
          </SwipeableViews>
        </Grid>
      </Grid>
    </div>
  );
}
