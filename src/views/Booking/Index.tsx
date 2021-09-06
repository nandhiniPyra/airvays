import React from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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
import hotel1 from '../../assets/hotel_image@2x.png';
import car from '../../assets/Car Image -1 @2x.png';
import luggage from '../../assets/luggage@2x.png';
import person from '../../assets/Icon awesome-user-friends@2x.png';
import manual from '../../assets/manual-transmission@2x.png';
import snow from '../../assets/Icon ionic-ios-snow@2x.png';
import cardoor from '../../assets/car-door@2x.png';
import Divider from '@material-ui/core/Divider';
import { useNavigate } from 'react-router-dom';
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
      fontFamily: 'AvantGarde-Demi',
      color:'#1C2460'
    },
    ht_Top: {
      justifyContent: 'flex-start',
      color:'#CCCCCC',
      fontFamily:'AvantGarde-Demi',
      fontSize:'13px'
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
      fontSize: '12px',
      color: '#DB4437',
      fontFamily:'AvantGarde-Regular',
      marginTop:'5%',
      marginLeft:'24%'
    },
    car_cancelbtn: {
      fontSize: '12px',
      color: '#DB4437',
      fontFamily:'AvantGarde-Regular',
      marginTop:'5%',
      marginLeft:'40%'
    },
    booking_card: {
      '&:hover': {
        background: '#fff',
        border: '1px solid #4BAFC9',
        boxShadow: '0px 20px 55px #0000001F',
      },
    },
  }),
);

export default function BookingComponent() {
  const classes = useStyles();
  const theme = useTheme();
  let navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  return (
    <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} lg={12} md={12} sm={12}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='full width tabs example'
              style={{
                borderBottom: '1px solid #E5E5E5'
              }}>
              <Tab
                className={classes.tab}
                style={{ minWidth: '11%' }}
                label='Flights'
                {...a11yProps(0)}
              />
              <Tab
                className={classes.tab}
                style={{ minWidth: '11%', marginLeft:'6%' }}
                label='Hotels'
                {...a11yProps(1)}
              />
              <Tab
                className={classes.tab}
                style={{ minWidth: '11%', marginLeft:'6%' }}
                label='Car Rentals'
                {...a11yProps(2)}
              />
            </Tabs>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}>
              <TabPanel value={value} index={0} dir={theme.direction}>
                    <Grid
                      container
                      style={{
                        display: 'flex',
                        marginTop: '10px',
                        backgroundColor: 'white',
                        border: '1px solid #E5E5E5',
                        padding:0
                      }}
                      className={classes.booking_card}>
                            <div style={{ textAlign: 'left', marginLeft: '1%', marginTop:'1%', color:'#1C246052', fontFamily:'CrimsonText-Regular' }}>
                          <Typography style={{ fontSize: '14px' }}>
                            <span style={{ color: '#4BAFC9', fontFamily:'AvantGarde-Demi' }}>
                              15/06/21, Tuesday{' '}
                            </span>
                            - Inbound
                          </Typography>
                        </div>
                       <Grid
                            item
                            xs={12}
                            style={{
                              color: '#1C2460',
                              marginTop: '15px',
                              display: 'flex',
                            }}>
                               <Grid item xs={2}>
                              <div>
                                <div>
                                  <img
                                    alt=''
                                    style={{marginLeft:'10%'}}
                                    src={flight}></img>
                                </div>
                                <Typography
                                  style={{
                                    fontSize: '12px',
                                    color: '#1C2460',
                                    opacity: '40%',
                                    marginLeft: '34%',
                                    marginTop:'3%',
                                    fontFamily: 'AvantGarde-Regular',
                                  }}>
                                  GoAir 
                                </Typography>
                              </div>
                            </Grid>
                            <Grid container item xs={7}>
                              <Grid item xs={2}>
                                {' '}
                                <div>
                                  <Typography style={{ fontSize: '19px' }}>
                                    09.05
                                  </Typography>
                                  {/* <br /> */}
                                  <Typography
                                    style={{
                                      marginTop: '5%',
                                      fontFamily: 'CrimsonText-Regular',
                                      fontWeight: 'bold',
                                    }}>
                                    Chennai
                                  </Typography>
                                  <Typography
                                    style={{
                                      fontFamily: 'CrimsonText-Regular',
                                      fontWeight: 'bold',
                                    }}>
                                    MAA
                                  </Typography>
                                </div>
                              </Grid>
                              <Grid item xs={6} style={{textAlign:'center'}}>
                                {' '}
                                <div>
                                  <Typography
                                    style={{
                                      color: '#707070',
                                    }}>
                                       Direct
                                  </Typography>
                                  <div
                                    style={{
                                      color: '#E5E5E5',
                                    }}>
                                    {'- - - - - - - - -'}
                                    <img alt='' src={flightIcon}></img>
                                    {'- - - - - - - - -'}
                                  </div>
                                  <Typography
                                    style={{
                                      marginTop: '5px',
                                      color: '#707070',
                                    }}>
                                    0 hr 40 mins
                                  </Typography>
                                </div>
                              </Grid>
                              <Grid item xs={3}>
                                {' '}
                                <div>
                                  <Typography style={{ fontSize: '19px' }}>
                                    09.45
                                  </Typography>
                                  <Typography
                                    style={{
                                      marginTop: '5%',
                                      fontFamily: 'CrimsonText-Regular',
                                      fontWeight: 'bold',
                                    }}>
                                    Bengaluru Intl 
                                  </Typography>
                                  <Typography
                                    style={{
                                      fontFamily: 'CrimsonText-Regular',
                                      fontWeight: 'bold',
                                    }}>
                                     BLR
                                  </Typography>
                                </div>
                              </Grid>
                              </Grid>
                              <Grid
                        item
                        xs={3}
                        style={{
                          textAlign:'center',
                          borderLeft: '1px solid #EDEDED'
                        }}>
                        <div>
                          <Typography>
                            <span
                              style={{
                                fontSize: '13px',
                                fontWeight: 500,
                                color: '#1C2460',
                                fontFamily:'AvantGarde-Regular'
                              }}>
                              Paid <span style={{fontFamily:'CrimsonText-Semibold', fontSize:'20px'}}>$320</span>
                            </span>
                          </Typography>
                          <Button
                            variant='contained'
                            style={{
                              background: '#DCAB5E',
                              color: '#fff',
                              fontFamily:'AvantGarde-Demi'
                            }}>
                            View Summary
                          </Button>
                        </div>
                        <div style={{float:'right', color:'#DB4437', fontFamily:'AvantGarde-Regular', marginRight:'5%', position:'relative', bottom:'104px', fontSize:'12px'}}>
                        Cancel Booking
                        </div>
                        </Grid>
                            </Grid>
                      </Grid>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <div className={classes.ht_Top}>
                  <span>03/07/21</span>
                </div>
                <Grid
                  container
                  style={{ border: '1px solid #E5E5E5', borderRadius: '10px', marginTop:'1%'}}>
                  <Grid item xs={3}>
                    <div style={{padding:'10px'}}>
                    <img
                      alt=''
                      src={hotel1}
                      style={{
                        width:'99%',
                        height:'100%',
                        borderRadius: '5px',
                      }}></img>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div style={{ textAlign: 'start', paddingLeft:'2%' }}>
                      <Typography
                        style={{
                          fontWeight: 500,
                          color: '#1C2460',
                          marginTop: '14px',
                          marginBottom: '5px',
                          fontFamily:'AvantGarde-Demi'
                        }}>
                        Plush Penthouse With Private Plunge Pool
                      </Typography>
                      <Typography style={{fontFamily:'CrimsonText-Regular', color:'#1C2460'}}>
                        Nerul, Goa
                      </Typography>
                    </div>
                    <div style={{ marginTop: '10px', display: 'flex' }}>
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
                    xs={3}
                    style={{
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      borderLeft:'1px solid #D6D6D6'
                    }}>
                       <div
                      style={{
                        flexDirection: 'column',
                      }}>
                      <Typography className={classes.ht_cancelbtn}>
                        Cancel Booking
                      </Typography>
                      <Box component='div' mr={6} style={{marginTop:'15%'}}>
                        <Typography>
                          <span style={{ color: '#1C2460', fontFamily:'CrimsonText-Regular',fontSize:'15px' }}>Total</span>{' '}
                          <span
                            style={{
                              fontFamily: 'CrimsonText-Semibold',
                              fontSize: '20px',
                              color: '#1C2460',
                            }}>
                            $520
                          </span>
                        </Typography>
                      </Box>
                        <Button
                          variant='contained'
                          style={{
                            background: '#DCAB5E',
                            color: '#fff',
                            marginTop:'1%',
                            fontFamily:'AvantGarde-Demi'
                          }}>
                          View Summary
                        </Button>
                    </div>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                <Grid
                  container
                  style={{ border: '2px solid #EDEDED', borderRadius: '10px' }}>
                  <Grid item xs={3}>
                    <div>
                      <img
                        src={car}
                        alt=''
                        style={{
                          width: '99%',
                          height: '100%',
                          borderRadius: '5px',
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={6} style={{ textAlign: 'start', }}>
                    <div>
                      <Typography style={{ marginTop: '15px', color:'#A7A7A7', fontFamily:'CrimsonText-Regular' }}>
                        <span style={{ color: '#1C2460', fontFamily:'AvantGarde-Demi' }}>Suzuki Swift </span>Or
                        similar Economy{' '}
                      </Typography>
                      <Grid container  style={{marginTop:'10px'}}>
                          <Grid item xs={4}>
                          <img
                              alt=''
                              src={person}
                              style={{
                                width: '15px',
                                height: '20px',
                                margin: '5px',
                              }}></img>
                            <span
                              style={{
                                marginLeft: '5px',
                                marginRight: '10px',
                                fontFamily:'CrimsonText-Regular',
                                color:'#1C2460'
                              }}>
                              5 Passengers
                            </span>
                          </Grid>
                          <Grid item xs={4}>
                          <img
                              alt=''
                              src={luggage}
                              style={{
                                width: '15px',
                                height: '20px',
                                margin: '5px',
                              }}></img>
                            <span
                              style={{
                                marginLeft: '5px',
                                marginRight: '10px',
                                fontFamily:'CrimsonText-Regular',
                                color:'#1C2460'
                              }}>
                              2 Large Bags
                            </span>
                          </Grid>
                          <Grid item xs={4}>
                          <img
                              alt=''
                              src={cardoor}
                              style={{
                                width: '15px',
                                height: '20px',
                                margin: '5px',
                              }}></img>
                            <span
                              style={{
                                marginLeft: '5px',
                                marginRight: '10px',
                                fontFamily:'CrimsonText-Regular',
                                color:'#1C2460'
                              }}>
                              4 Doors
                            </span>
                          </Grid>
                          <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <img
                              alt=''
                              src={manual}
                              style={{
                                width: '15px',
                                height: '20px',
                                margin: '5px',
                              }}></img>
                            <span
                              style={{
                                marginLeft: '5px',
                                marginRight: '10px',
                                fontFamily:'CrimsonText-Regular',
                                color:'#1C2460'
                              }}>
                              Manual
                            </span>
                        </Grid>
                        <Grid item xs={6}>
                        <img
                              alt=''
                              src={snow}
                              style={{
                                width: '15px',
                                height: '20px',
                                margin: '5px',
                              }}></img>
                            <span
                              style={{
                                marginLeft: '10px',
                                fontFamily:'CrimsonText-Regular',
                                color:'#1C2460'
                              }}>
                              Air-Conditioning
                            </span>
                        </Grid>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                  <Divider />
                  <Grid
                    item
                    xs={3}
                    style={{
                     borderLeft:'1px solid #D6D6D6'
                    }}>
                    <Typography className={classes.car_cancelbtn}>
                      Cancel Booking
                    </Typography>
                    <div>
                      <Typography style={{textAlign:'center', marginTop:'9%'}}>
                        <span style={{ color: '#1C2460', fontFamily:'CrimsonText-Regular' }}>Total</span>{' '}
                        <span
                          style={{
                            fontFamily: 'CrimsonText-Semibold',
                            fontSize: '23px',
                            color: '#1C2460',
                          }}>
                          $520
                        </span>
                      </Typography>
                      <Button
                        variant='contained'
                        style={{ background: '#DCAB5E', color: '#fff', fontFamily:'AvantGarde-Demi', marginTop:'1%', marginLeft:'14%'}}>
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
