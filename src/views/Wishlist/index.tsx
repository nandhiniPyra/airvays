import React from 'react';
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
import Whishlistflight from '../../assets/Wishlists - Flight illustration@2x.png';
import Whishlisthotel from '../../assets/Wishlists - Hotels illustration@2x.png';
import Whishlistcar from '../../assets/Wishlists - Car Rental illustration@2x.png';
import heartpng from '../../assets/Icon feather-heart@2x.png';
import flight from '../../assets/Flight logo - 1@2x.png';
import flightIcon from '../../assets/Icon material-flight@2x.png';
import { Button } from 'react-bootstrap';
import wifiPng from '../../assets/Wifi@2x.png';
import pool from '../../assets/Pool@2x.png';
import entertainment from '../../assets/Entertainment - Hotel@2x.png';
import parkingPng from '../../assets/Parking lot@2x.png';
import gym from '../../assets/Gym@2x.png';
import drinks from '../../assets/Drinks@2x.png';
import restaurant from '../../assets/Restaurant@2x.png';
import hotel1 from '../../assets/hotel_image@2x.png';
import RatingPng from '../../assets/Icon awesome-star@2x.png';

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
      // flexGrow: 1,
    },
    tab: {
      outline: 'none !important',
      fontFamily: 'AvantGarde-Demi',
      color: '#1C2460',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    booking_card: {
      '&:hover': {
        background: '#fff',
        border: '1px solid #4BAFC9',
        boxShadow: '0px 20px 55px #0000001F',
      },
    },
    ht_cancelbtn: {
      fontSize: '12px',
      color: '#DB4437',
      fontFamily:'AvantGarde-Regular',
      marginTop:'5%',
      marginLeft:'24%'
    },
    rating_png: {
      marginTop: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }
  }),
);

export default function WishlistComponent() {
  const classes = useStyles();
  const theme = useTheme();
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
              style={{
                borderBottom: '1px solid #E5E5E5'
              }}
              // variant='fullWidth'
              aria-label='full width tabs example'>
              <Tab style={{ minWidth: '11%' }} className={classes.tab} label='Flights' {...a11yProps(0)} />
              <Tab style={{ minWidth: '11%', marginLeft:'6%' }} className={classes.tab} label='Hotels' {...a11yProps(1)} />
              <Tab style={{ minWidth: '11%', marginLeft:'6%' }} className={classes.tab} label='Car Rentals' {...a11yProps(2)} />
            </Tabs>
            {/* </AppBar> */}
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}>
              <TabPanel value={value} index={0} dir={theme.direction}>
              <div
                  style={{
                    fontFamily: 'CrimsonText-Regular',
                    color: '#1C2460',
                    textAlign:'center',
                    marginTop:'10%'
                  }}>
                  <img
                    alt=''
                    src={Whishlistflight}
                    style={{ width: '350px', height: '250px' }}></img>
                </div>
                <div
                  style={{
                    fontFamily: 'CrimsonText-Regular',
                    color: '#1C2460',
                    textAlign:'center',
                    marginTop: '20px',
                  }}>
                  <img
                    alt=''
                    src={heartpng}
                    style={{
                      width: '15px',
                      height: '15px',
                      marginBottom: '1%',
                    }}></img>
                  &nbsp; <span>Save your Flights to book later</span>
              </div>

                {/*FlightWishlist*/}
                {/* <Grid
                      container
                      style={{
                        display: 'flex',
                        marginTop: '10px',
                        backgroundColor: 'white',
                        border: '1px solid #E5E5E5',
                        padding:0
                      }}
                      className={classes.booking_card}>
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
                            <span style={{fontFamily:'CrimsonText-Semibold', fontSize:'20px'}}>$320</span>
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
                        <div style={{float:'right', color:'#DB4437', fontFamily:'AvantGarde-Regular', marginRight:'5%', position:'relative', bottom:'70px', fontSize:'12px'}}>
                        <img src={heartpng} style={{ width: '15px', height: '15px'}}></img>
                        </div>
                        </Grid>
                            </Grid>
                      </Grid> */}
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <div
                  style={{
                    fontFamily: 'CrimsonText-Regular',
                    color: '#1C2460',
                    textAlign:'center',
                    marginTop:'10%'
                  }}>
                  <img
                    alt=''
                    src={Whishlisthotel}
                    style={{ width: '350px', height: '250px' }}></img>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                    marginTop: '20px',
                  }}>
                  <Typography style={{fontFamily:'CrimsonText-Regular', color:'#1C2460'}}>
                    <img
                      alt=''
                      src={heartpng}
                      style={{ width: '15px', height: '15px', marginBottom: '2%' }}></img>
                    &nbsp; Save your hotels to book later
                  </Typography>
                </div>

                {/* Whishlisthotel */}
                {/* <Grid
                  container
                  style={{ border: '1px solid #E5E5E5', borderRadius: '10px', marginTop:'1%'}}>
                  <Grid item xs={3}>
                    <div style={{padding:'10px'}}>
                    <img
                      alt=''
                      src={hotel1}
                      style={{
                        width:'99%',
                        height:'140px',
                        borderRadius: '5px',
                      }}></img>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div style={{ textAlign: 'start', paddingLeft:'2%' }}>
                    <div className={classes.rating_png}>
                            <img
                              alt=''
                              src={RatingPng}
                              style={{
                                width: '20px',
                                height: '20px',
                              }}></img>{' '}
                            &nbsp;
                            <img
                              alt=''
                              src={RatingPng}
                              style={{
                                width: '20px',
                                height: '20px',
                              }}></img>{' '}
                            &nbsp;
                            <img
                              alt=''
                              src={RatingPng}
                              style={{
                                width: '20px',
                                height: '20px',
                              }}></img>{' '}
                            &nbsp;
                            <img
                              alt=''
                              src={RatingPng}
                              style={{ width: '20px', height: '20px' }}></img>
                            &nbsp;<span style={{ color: '#A7A7A7' }}> 4.0</span>
                            <div style={{ flexGrow: 1, marginRight: '10px' }}>
                              <Typography
                                style={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                  lineHeight: 0,
                                  textDecoration: 'underline',
                                  fontFamily: 'CrimsonText-Regular',
                                  color: '#1C2460',
                                }}>
                                152 Reviews
                              </Typography>
                            </div>
                          </div>
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
                         <div style={{marginTop:'17%'}}>
                          <Typography>
                            <span style={{fontFamily:'CrimsonText-Semibold', fontSize:'20px', color:'#1C2460'}}>$320</span>
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
                        <div style={{float:'right', fontFamily:'AvantGarde-Regular', marginLeft:'74%', position:'relative', bottom:'90px', fontSize:'12px'}}>
                        <img src={heartpng} style={{ width: '15px', height: '15px'}}></img>
                        </div>
                  </Grid>
                </Grid> */}
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
              <div
                  style={{
                    fontFamily: 'CrimsonText-Regular',
                    color: '#1C2460',
                    textAlign:'center',
                    marginTop:'10%'
                  }}>
                  <img
                    alt=''
                    src={Whishlistcar}
                    style={{ width: '350px', height: '250px' }}></img>
                </div>
                <div
                  style={{
                    fontFamily: 'CrimsonText-Regular',
                    color: '#1C2460',
                    textAlign:'center',
                    marginTop: '20px',
                  }}>
                  <img
                    alt=''
                    src={heartpng}
                    style={{
                      width: '15px',
                      height: '15px',
                      marginBottom: '1%',
                    }}></img>
                  &nbsp; <span>Save your cars to book later</span>
              </div>
            </TabPanel>
          </SwipeableViews>
        </Grid>
      </Grid>
    </div>
  );
}
