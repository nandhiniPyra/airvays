import React, { useEffect, useState } from 'react';
import {
  createStyles,
  Theme,
  makeStyles,
  useTheme,
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import EditProfileContainer from '../EditProfile/EditProfile';
import image from '../../assets/Profile illustration@2x.png';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import goAir from '../../assets/Flight logo - 1@2x.png';
import flightIcon from '../../assets/Icon material-flight@2x.png';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import flight from '../../assets/Flight Info@2x.png';
import seat from '../../assets/Seat @2x.png';
import entertainment from '../../assets/Entertainment@2x.png';
import meal from '../../assets/Food@2x.png';
import feather from '../../assets/Icon feather-check-circle@2x.png';
import baggage from '../../assets/Check-in baggage@2x.png';
import luggage from '../../assets/Cabin Baggage@2x (1).png';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import BottomGrid from '../Airvays info/index';
import { _flightDetails } from '../../services/api/flight';
import _ from 'lodash';
import { useLocation } from 'react-router';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import { useStore } from '../../mobx/Helpers/UseStore';
import { toJS } from 'mobx';
import injectWithObserver from '../../utils/injectWithObserver';
import TransparentTopBar from '../../TopBar/index';

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
      background: '#FFFFFF',
      marginTop: '5%',
      overflowX: 'hidden',
    },
    tab: {
      outline: 'none !important',
      fontFamily: 'AvantGarde-Regular',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

const FlightListDetails = () => {
  const classes = useStyles();
  const theme = useTheme();
  const store = useStore();
  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);
  const { selectedFlight } = toJS(store.FlightDetails);
  const [flightsListData, setflightsData] = useState<any>([]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  useEffect(() => {
    setflightsData(selectedFlight);
  }, []);

  const handleTime = (time: any) => {
    const Timing = moment(time).format('LT');
    return Timing;
  };

  const totalDuration = () => {};

  return (
    <>
      <TransparentTopBar
        color='textWhite'
        backgroundColor='blue'
        position='fixed'
      />
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            {flightsListData &&
              flightsListData.length > 0 &&
              flightsListData.map((x: any) => (
                <Grid
                  container
                  style={{
                    display: 'flex',
                    marginTop: '40px',
                    backgroundColor: '#EFFAFF',
                    padding: '10px',
                  }}>
                  <>
                    {x.itineraries.map((item: any) => (
                      <Grid
                        container
                        item
                        xs={10}
                        style={{
                          color: '#1C2460',
                          marginTop: '15px',
                          display: 'flex',
                          justifyContent: 'space-around',
                        }}>
                        <div>
                          <div>
                            <img
                              alt=''
                              style={{ marginLeft: '30px' }}
                              src={goAir}></img>
                          </div>
                          <Typography
                            style={{
                              fontSize: '14px',
                              color: '#1C2460',
                              opacity: '40%',
                              marginLeft: '35px',
                            }}>
                            goAir
                          </Typography>
                        </div>

                        <div>
                          {handleTime(item.depatureAt)}
                          <br />
                          <Typography style={{ marginTop: '5px' }}>
                            {/* Chennai */}
                            {item.from_city}
                          </Typography>
                          <Typography>{item.depature}</Typography>
                        </div>
                        <div>
                          {/* <Tooltip title={item.via} placement="top"> */}
                          <Typography style={{ textAlign: 'center' }}>
                            {x.itineraries[0].segments.length - 1 == 1
                              ? '1 stop'
                              : x.itineraries[0].segments.length -
                                1 +
                                'stop'}{' '}
                            {`via ${item.via.map((x: any) => x)}`}
                          </Typography>
                          {/* </Tooltip> */}
                          <div style={{ display: 'flex', color: '#33BBFF' }}>
                            {'- - - - - - - - - - -'}
                            <img alt='' src={flightIcon}></img>
                            {'- - - - - - - - - - -'}
                          </div>
                          <Typography
                            style={{
                              marginTop: '5px',
                              textAlign: 'center',
                            }}>
                            {item.duration}
                          </Typography>

                          {x.duration_.map((t: any) => (
                            <Typography
                              style={{
                                marginTop: '5px',
                                textAlign: 'center',
                              }}>
                              {t.depature}-{t.arraival}:{t.duration.slice(2, 8)}
                            </Typography>
                          ))}
                        </div>
                        <div>
                          {handleTime(item.arrivalAt)}
                          <Typography style={{ marginTop: '5px' }}>
                            {/* Bengaluru Intl */}
                            {item.to_city}
                          </Typography>
                          <br />
                          {item.arrival}
                        </div>
                      </Grid>
                    ))}
                  </>

                  <Grid
                    item
                    xs={2}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                    }}>
                    <div
                      style={{
                        position: 'relative',
                        left: '75%',
                        bottom: '150px',
                      }}>
                      {/* <FavoriteIcon style={{ color: 'red' }} /> */}
                    </div>
                    <div>
                      <Typography>
                        <span
                          style={{
                            fontSize: '22px',
                            fontWeight: 500,
                            color: '#1C2460',
                          }}>
                          {x.price.currency}
                          {x.price.base}
                        </span>
                      </Typography>
                      <br />
                      <Button
                        onClick={() => navigate('/flightBooking')}
                        variant='contained'
                        style={{
                          background: '#DCAB5E',
                          color: '#fff',
                        }}>
                        Book Now
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              ))}

            {/* Tab Container */}
            <Grid container spacing={3} style={{ marginTop: '20px' }}>
              <Grid item xs={12}>
                {/* <AppBar position="static" color="default"> */}
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor='secondary'
                  textColor='secondary'
                  // variant='fullWidth'
                  aria-label='full width tabs example'>
                  <Tab
                    className={classes.tab}
                    label='Flight Information'
                    {...a11yProps(0)}
                  />
                  <Tab
                    className={classes.tab}
                    label='Fare & Baggage Details'
                    {...a11yProps(1)}
                  />
                  <Tab
                    className={classes.tab}
                    label='Cancellation Rules'
                    {...a11yProps(2)}
                  />
                </Tabs>
                {/* </AppBar> */}
                <SwipeableViews
                  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                  index={value}
                  onChangeIndex={handleChangeIndex}>
                  <TabPanel value={value} index={0} dir={theme.direction}>
                    <Grid
                      container
                      spacing={2}
                      style={{ border: '1px solid #E5E5E5', padding: '10px' }}>
                      <Grid item xs={6} style={{ padding: '10px' }}>
                        <Typography
                          style={{
                            fontFamily: 'CrimsonText-SemiBold',
                            color: '#1C2460',
                            fontSize: 18,
                          }}>
                          Economy Class
                        </Typography>
                        <Grid container style={{ margin: '10px' }}>
                          <Grid item xs={1}>
                            <Typography>
                              {' '}
                              <img
                                src={flight}
                                style={{
                                  marginTop: '2%',
                                  width: '50%',
                                }}></img>
                            </Typography>
                          </Grid>
                          <Grid item xs={11}>
                            <Typography
                              style={{ fontFamily: 'CrimsonText-Regular' }}>
                              De Havilland (Bombardier) DHC-8 Dash 8 (Turboprop
                              plane)
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container style={{ margin: '10px' }}>
                          <Grid item xs={1}>
                            <Typography>
                              {' '}
                              <img
                                style={{
                                  width: '50%',
                                }}
                                src={seat}></img>
                            </Typography>
                          </Grid>
                          <Grid item xs={11}>
                            <Typography
                              style={{ fontFamily: 'CrimsonText-Regular' }}>
                              76cm seat pitch
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container style={{ margin: '10px' }}>
                          <Grid item xs={1}>
                            <Typography>
                              {' '}
                              <img
                                style={{
                                  width: '50%',
                                }}
                                src={entertainment}></img>
                            </Typography>
                          </Grid>
                          <Grid item xs={11}>
                            <Typography
                              style={{ fontFamily: 'CrimsonText-Regular' }}>
                              Personal device entertainment
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container style={{ margin: '10px' }}>
                          <Grid item xs={1}>
                            <Typography>
                              {' '}
                              <img
                                style={{
                                  width: '50%',
                                }}
                                src={meal}></img>
                            </Typography>
                          </Grid>
                          <Grid item xs={11}>
                            <Typography
                              style={{ fontFamily: 'CrimsonText-Regular' }}>
                              Light meal (fee)
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        style={{ borderLeft: '1px solid #E5E5E5' }}>
                        <Typography
                          style={{
                            fontFamily: 'CrimsonText-SemiBold',
                            color: '#1C2460',
                            fontSize: 18,
                            marginLeft: '2%',
                          }}>
                          SpiceJet Policies
                        </Typography>
                        <Grid container style={{ margin: '10px' }}>
                          <Grid item xs={1}>
                            <Typography>
                              {' '}
                              <img
                                style={{
                                  width: '45%',
                                }}
                                src={feather}></img>
                            </Typography>
                          </Grid>
                          <Grid item xs={11}>
                            <Typography
                              style={{ fontFamily: 'CrimsonText-Regular' }}>
                              Pre-flight temperature check or thermal screening.
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container style={{ margin: '10px' }}>
                          <Grid item xs={1}>
                            <Typography>
                              {' '}
                              <img
                                style={{
                                  width: '45%',
                                }}
                                src={feather}></img>
                            </Typography>
                          </Grid>
                          <Grid item xs={11}>
                            <Typography
                              style={{ fontFamily: 'CrimsonText-Regular' }}>
                              Pre-flight cleaning, installation of cabin HEPA
                              Filters.
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container style={{ margin: '10px' }}>
                          <Grid item xs={1}>
                            <Typography>
                              {' '}
                              <img
                                style={{
                                  width: '45%',
                                }}
                                src={feather}></img>
                            </Typography>
                          </Grid>
                          <Grid item xs={11}>
                            <Typography
                              style={{ fontFamily: 'CrimsonText-Regular' }}>
                              Masks required on board.
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </TabPanel>

                  <TabPanel value={value} index={1} dir={theme.direction}>
                    <Grid
                      container
                      item
                      xs={9}
                      spacing={2}
                      style={{
                        border: '1px solid #E5E5E5',
                        padding: '10px',
                      }}>
                      <Grid item xs={6}>
                        <Typography
                          style={{
                            fontFamily: 'CrimsonText-SemiBold',
                            color: '#1C2460',
                            fontSize: 18,
                          }}>
                          Fare Breakdown
                        </Typography>
                        <Grid
                          container
                          spacing={2}
                          style={{
                            marginTop: '10px',
                          }}>
                          <Grid item xs={9}>
                            <Typography
                              style={{ fontFamily: 'CrimsonText-Regular' }}>
                              {flightsListData[0]?.travelerPricings.length}{' '}
                              People
                            </Typography>
                          </Grid>
                          <Grid item xs={3} style={{ textAlign: 'right' }}>
                            <Typography
                              style={{ fontFamily: 'CrimsonText-bold' }}>
                              {flightsListData[0]?.price.base}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          style={{
                            marginTop: '2%',
                            color: '#E5E5E5',
                          }}></Divider>
                        <Grid
                          container
                          spacing={2}
                          style={{
                            marginTop: '10px',
                          }}>
                          <Grid item xs={10}>
                            <Typography
                              style={{ fontFamily: 'CrimsonText-Regular' }}>
                              Total (Base Fare)
                            </Typography>
                          </Grid>
                          <Grid item xs={2} style={{ textAlign: 'right' }}>
                            {' '}
                            <Typography
                              style={{ fontFamily: 'CrimsonText-bold' }}>
                              {flightsListData[0]?.price.base}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          style={{
                            marginTop: '2%',
                            color: '#E5E5E5',
                          }}></Divider>
                        <Grid
                          container
                          spacing={2}
                          style={{
                            marginTop: '10px',
                          }}>
                          <Grid item xs={10}>
                            <Typography
                              style={{ fontFamily: 'CrimsonText-Regular' }}>
                              Total Tax
                            </Typography>
                          </Grid>
                          <Grid item xs={2} style={{ textAlign: 'right' }}>
                            {' '}
                            <Typography
                              style={{ fontFamily: 'CrimsonText-bold' }}>
                              {flightsListData[0]?.totalTax}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          style={{
                            marginTop: '2%',
                            color: '#E5E5E5',
                          }}></Divider>
                        <Grid
                          container
                          spacing={2}
                          style={{
                            marginTop: '10px',
                          }}>
                          <Grid item xs={10}>
                            <Typography
                              style={{
                                fontFamily: 'CrimsonText-Regular',
                                color: '#333333',
                                opacity: 50,
                              }}>
                              Total (Fee & Surcharge)
                            </Typography>
                          </Grid>
                          <Grid item xs={2} style={{ textAlign: 'right' }}>
                            {' '}
                            <Typography
                              style={{ fontFamily: 'CrimsonText-bold' }}>
                              hello{flightsListData[0]?.price.total}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        style={{ borderLeft: '1px solid #E5E5E5' }}>
                        <Typography
                          style={{
                            fontFamily: 'CrimsonText-SemiBold',
                            color: '#1C2460',
                            fontSize: 18,
                            marginLeft: '11%',
                          }}>
                          Baggage Info
                        </Typography>
                        <Grid
                          container
                          style={{ marginTop: '15px', marginLeft: '2%' }}>
                          <Grid item xs={1}></Grid>
                          <Grid item xs={1}>
                            <Typography>
                              {' '}
                              <img style={{ width: '50%' }} src={baggage}></img>
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              style={{ fontFamily: 'CrimsonText-Regular' }}>
                              Check-in Baggage
                            </Typography>
                          </Grid>
                          <Grid item xs={3} style={{ textAlign: 'right' }}>
                            <Typography
                              style={{ fontFamily: 'CrimsonText-semibold' }}>
                              {flightsListData[0]?.quantity
                                ? flightsListData[0]?.quantity + 'Kg'
                                : '7 kg'}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container style={{ marginTop: '15px' }}>
                          <Grid item xs={1}></Grid>
                          <Grid item xs={1} style={{ marginLeft: '2%' }}>
                            <Typography>
                              {' '}
                              <img style={{ width: '60%' }} src={luggage}></img>
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              style={{
                                fontFamily: 'CrimsonText-Regular',
                                marginLeft: '2%',
                              }}>
                              Cabin Baggage
                            </Typography>
                          </Grid>
                          <Grid item xs={3} style={{ textAlign: 'right' }}>
                            <Typography
                              style={{ fontFamily: 'CrimsonText-semibold' }}>
                              {flightsListData[0]?.quantity
                                ? flightsListData[0]?.quantity + 'kg'
                                : '7kg'}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel value={value} index={2} dir={theme.direction}>
                    <Grid
                      container
                      item
                      xs={12}
                      spacing={2}
                      style={{
                        border: '1px solid #E5E5E5',
                        padding: '10px',
                      }}>
                      <Grid item xs={6}>
                        <Button
                          style={{
                            textTransform: 'none',
                            color: '#F02E88',
                            backgroundColor: '#FFEFF6',
                          }}>
                          Non-Refundable
                        </Button>
                        <Grid container style={{ marginTop: '10px' }}>
                          <Grid item xs={8}>
                            <Typography
                              style={{
                                fontFamily: 'CrimsonText-semibold',
                                color: '#1C2460',
                                fontSize: '17px',
                              }}>
                              Time Frame to Cancel
                            </Typography>
                            <Typography
                              style={{
                                fontFamily: 'CrimsonText-Regular',
                                fontSize: '15px',
                              }}>
                              Cancel before 4 hrs of departure time
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography
                              style={{
                                fontFamily: 'CrimsonText-semibold',
                                color: '#1C2460',
                                fontSize: '17px',
                              }}>
                              {' '}
                              Airvays Fees{' '}
                            </Typography>
                            <Typography
                              style={{ fontFamily: 'CrimsonText-semibold' }}>
                              {' '}
                              $50{' '}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container style={{ marginTop: '8%' }}>
                          <Grid item xs={8}>
                            <Typography
                              style={{
                                fontFamily: 'CrimsonText-semibold',
                                color: '#1C2460',
                                fontSize: '17px',
                              }}>
                              Time Frame to Reschedule
                            </Typography>
                            <Typography
                              style={{
                                fontFamily: 'CrimsonText-Regular',
                                fontSize: '15px',
                              }}>
                              Reschedule before 4 hours of departure time.
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography
                              style={{
                                fontFamily: 'CrimsonText-semibold',
                                color: '#1C2460',
                                fontSize: '17px',
                              }}>
                              {' '}
                              Airvays Fees{' '}
                            </Typography>
                            <Typography
                              style={{ fontFamily: 'CrimsonText-semibold' }}>
                              {' '}
                              $50{' '}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Typography
                          style={{
                            marginTop: '33%',
                            color: '#707070',
                            fontFamily: 'CrimsonText-Regular',
                          }}>
                          Note: Airline Fees will be deducted as per airlines
                          policy
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        style={{ borderLeft: '1px solid #EDEDED' }}>
                        <Typography
                          style={{
                            fontFamily: 'CrimsonText-semibold',
                            color: '#1C2460',
                            fontSize: '17px',
                            margin: '3%',
                          }}>
                          Terms and Conditions
                        </Typography>
                        <Grid container style={{ margin: '3%' }}>
                          <Grid item xs={1}>
                            <FiberManualRecordIcon
                              style={{
                                color: '#33BBFF',
                                fontSize: '17px',
                                marginTop: '2px',
                              }}
                            />
                          </Grid>
                          <Grid item xs={11}>
                            <Typography
                              style={{
                                fontFamily: 'CrimsonText-Regular',
                                fontSize: '15px',
                              }}>
                              Total Rescheduling Charges = Airlines Rescheduling
                              fees + Fare Difference (if applicable) + Airvays
                              Fees.
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container style={{ margin: '3%' }}>
                          <Grid item xs={1}>
                            <FiberManualRecordIcon
                              style={{
                                color: '#33BBFF',
                                fontSize: '17px',
                                marginTop: '2px',
                              }}
                            />
                          </Grid>
                          <Grid item xs={11}>
                            <Typography
                              style={{
                                fontFamily: 'CrimsonText-Regular',
                                fontSize: '15px',
                              }}>
                              The airline cancel/reschedule fees is indicative
                              and can be changed without any prior notice by the
                              airlines.
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container style={{ margin: '3%' }}>
                          <Grid item xs={1}>
                            <FiberManualRecordIcon
                              style={{
                                color: '#33BBFF',
                                fontSize: '17px',
                                marginTop: '2px',
                              }}
                            />
                          </Grid>
                          <Grid item xs={11}>
                            <Typography
                              style={{
                                fontFamily: 'CrimsonText-Regular',
                                fontSize: '15px',
                              }}>
                              Partial cancellation is not allowed on the flight
                              tickets which are book under special round-trip
                              discounted fares.
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container style={{ margin: '3%' }}>
                          <Grid item xs={1}>
                            <FiberManualRecordIcon
                              style={{
                                color: '#33BBFF',
                                fontSize: '17px',
                                marginTop: '2px',
                              }}
                            />
                          </Grid>
                          <Grid item xs={11}>
                            <Typography
                              style={{
                                fontFamily: 'CrimsonText-Regular',
                                fontSize: '15px',
                              }}>
                              Airlines doesn’t allow any additional baggage
                              allowance for any infant added in the booking.
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container style={{ margin: '3%' }}>
                          <Grid item xs={1}>
                            <FiberManualRecordIcon
                              style={{
                                color: '#33BBFF',
                                fontSize: '17px',
                                marginTop: '2px',
                              }}
                            />
                          </Grid>
                          <Grid item xs={11}>
                            <Typography
                              style={{
                                fontFamily: 'CrimsonText-Regular',
                                fontSize: '15px',
                              }}>
                              In certain situations of restricted cases, no
                              amendments and cancellation is allowed.
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container style={{ margin: '3%' }}>
                          <Grid item xs={1}>
                            <FiberManualRecordIcon
                              style={{
                                color: '#33BBFF',
                                fontSize: '17px',
                                marginTop: '2px',
                              }}
                            />
                          </Grid>
                          <Grid item xs={11}>
                            <Typography
                              style={{
                                fontFamily: 'CrimsonText-Regular',
                                fontSize: '15px',
                              }}>
                              Airlines cancel/reschedule should be reconfirmed
                              before requesting for a cancellation or amendment.
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </TabPanel>
                </SwipeableViews>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={1}></Grid>
        </Grid>
        {/* Bottom Grid */}
        <Divider />
        <Grid>
          <BottomGrid />
        </Grid>
      </div>
    </>
  );
};
export default injectWithObserver(FlightListDetails);
