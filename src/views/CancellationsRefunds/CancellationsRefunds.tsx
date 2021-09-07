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
import NoCancel from '../../assets/no_cancellations_illustration@2x.png';
import flight from '../../assets/Flight logo - 1@2x.png';
import flightIcon from '../../assets/Icon material-flight@2x.png';
import wifiPng from '../../assets/Wifi@2x.png';
import pool from '../../assets/Pool@2x.png';
import entertainment from '../../assets/Entertainment - Hotel@2x.png';
import parkingPng from '../../assets/Parking lot@2x.png';
import gym from '../../assets/Gym@2x.png';
import drinks from '../../assets/Drinks@2x.png';
import restaurant from '../../assets/Restaurant@2x.png';
import Button from '@material-ui/core/Button';
import hotel1 from '../../assets/hotel_image@2x.png';
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
      backgroundColor: '#FFFFFF',
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      width: '73%',
      marginLeft: '50px',
      marginTop: '65px',
    },
    tab: {
      outline: 'none !important',
      fontFamily: 'AvantGarde-Demi',
      color: '#1C2460',
    },
    card: {
      '&:hover': {
        background: '#fff',
        border: '1px solid #4BAFC9',
        boxShadow: '0px 20px 55px #0000001F',
      },
    },
  }),
);

export default function CancellationsRefundsComponent() {
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
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Tabs
            value={value}
            onChange={handleChange}
            style={{
              borderBottom: '1px solid #E5E5E5'
            }}
            aria-label='full width tabs example'>
            <Tab style={{ minWidth: '11%' }} className={classes.tab} label='Flights' {...a11yProps(0)} />
            <Tab style={{ minWidth: '11%', marginLeft:'6%' }} className={classes.tab} label='Hotels' {...a11yProps(1)} />
            <Tab style={{ minWidth: '11%', marginLeft:'6%' }} className={classes.tab} label='Car Rentals' {...a11yProps(2)} />
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
                        padding: '10px',
                        backgroundColor: 'white',
                        border: '1px solid #E5E5E5',
                      }}
                      className={classes.card}>
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
                                    }}>
                                    Chennai
                                  </Typography>
                                  <Typography
                                    style={{
                                      fontFamily: 'CrimsonText-Regular',
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
                                      fontFamily:'CrimsonText-Regular'
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
                                      fontFamily:'CrimsonText-Regular'
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
                                    }}>
                                    Bengaluru Intl 
                                  </Typography>
                                  <Typography
                                    style={{
                                      fontFamily: 'CrimsonText-Regular',
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
                          <Button
                            variant='contained'
                            style={{
                              background: '#FFF0EF',
                              color: '#DB4437',
                              fontFamily:'AvantGarde-Regular',
                              fontSize:'9px',
                              marginTop:'10%',
                              marginLeft:'5%'
                            }}>
                            Cancellation on Process
                          </Button>
                        </div>
                        </Grid>
                            </Grid>
                      </Grid>

                      <Grid
                      container
                      style={{
                        display: 'flex',
                        padding: '10px',
                        backgroundColor: 'white',
                        border: '1px solid #E5E5E5',
                        marginTop:'3%'
                      }}
                      className={classes.card}>
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
                                    }}>
                                    Chennai
                                  </Typography>
                                  <Typography
                                    style={{
                                      fontFamily: 'CrimsonText-Regular',
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
                                      fontFamily:'CrimsonText-Regular'
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
                                      fontFamily:'CrimsonText-Regular'
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
                                    }}>
                                    Bengaluru Intl 
                                  </Typography>
                                  <Typography
                                    style={{
                                      fontFamily: 'CrimsonText-Regular',
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
                          <Button
                            variant='contained'
                            style={{
                              background: '#E5FFFC',
                              color: '#00C3AC',
                              fontFamily:'AvantGarde-Regular',
                              fontSize:'9px',
                              marginTop:'10%',
                              marginLeft:'5%'
                            }}>
                           Refund Applied
                          </Button>
                        </div>
                        </Grid>
                            </Grid>
                      </Grid>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
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
                          textAlign:'center',
                          borderLeft: '1px solid #EDEDED'
                        }}>
                        <div>
                          <Button
                            variant='contained'
                            style={{
                              background: '#E5FFFC',
                              color: '#00C3AC',
                              fontFamily:'AvantGarde-Regular',
                              fontSize:'9px',
                              marginTop:'29%',
                              marginLeft:'5%'
                            }}>
                           Refund Applied
                          </Button>
                        </div>
                        </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <div
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                  marginTop: '10%',
                }}>
                <img
                  alt=''
                  src={NoCancel}
                  style={{ width: '350px', height: '250px' }}></img>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  textAlign: 'center',
                  marginTop: '20px',
                }}>
                <Typography style={{ color: '#1C2460', fontFamily:'CrimsonText-Regular' }}>
                  No Cancellations
                </Typography>
              </div>
            </TabPanel>
          </SwipeableViews>
        </Grid>
      </Grid>
    </div>
  );
}
