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
import luggage from '../../assets/luggage@2x.png';
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
  const { selectedFlight } = toJS(store.flightDetails);
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

  const totalDuration=()=>{

  }
  
  return (
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
                        <br />
                        {item.depature}
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
                          {'-------------------------'}
                          <img alt='' src={flightIcon}></img>
                          {'-------------------------'}
                        </div>
                        <Typography
                          style={{
                            marginTop: '5px',
                            textAlign: 'center',
                          }}>
                          {item.duration}
                        </Typography>
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
                indicatorColor='primary'
                textColor='primary'
                // variant='fullWidth'
                aria-label='full width tabs example'>
                <Tab label='Flight Information' {...a11yProps(0)} />
                <Tab label='Fare & Baggage Details' {...a11yProps(1)} />
                <Tab label='Cancellation Rules' {...a11yProps(2)} />
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
                      <Typography>Economy Class</Typography>
                      <Grid container style={{ margin: '10px' }}>
                        <Grid item xs={1}>
                          <Typography>
                            {' '}
                            <img
                              src={flight}
                              style={{
                                marginTop: '5px',
                              }}></img>
                          </Typography>
                        </Grid>
                        <Grid item xs={11}>
                          <Typography>
                            De Havilland (Bombardier) DHC-8 Dash 8 (Turboprop
                            plane)
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container style={{ margin: '10px' }}>
                        <Grid item xs={1}>
                          <Typography>
                            {' '}
                            <img src={seat}></img>
                          </Typography>
                        </Grid>
                        <Grid item xs={11}>
                          <Typography>76cm seat pitch</Typography>
                        </Grid>
                      </Grid>
                      <Grid container style={{ margin: '10px' }}>
                        <Grid item xs={1}>
                          <Typography>
                            {' '}
                            <img src={entertainment}></img>
                          </Typography>
                        </Grid>
                        <Grid item xs={11}>
                          <Typography>Personal device entertainment</Typography>
                        </Grid>
                      </Grid>
                      <Grid container style={{ margin: '10px' }}>
                        <Grid item xs={1}>
                          <Typography>
                            {' '}
                            <img src={meal}></img>
                          </Typography>
                        </Grid>
                        <Grid item xs={11}>
                          <Typography>Light meal (fee)</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{ borderLeft: '1px solid #E5E5E5' }}>
                      <Typography>SpiceJet Policies</Typography>
                      <Grid container style={{ margin: '10px' }}>
                        <Grid item xs={1}>
                          <Typography>
                            {' '}
                            <img src={feather}></img>
                          </Typography>
                        </Grid>
                        <Grid item xs={11}>
                          <Typography>
                            Pre-flight temperature check or thermal screening.
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container style={{ margin: '10px' }}>
                        <Grid item xs={1}>
                          <Typography>
                            {' '}
                            <img src={feather}></img>
                          </Typography>
                        </Grid>
                        <Grid item xs={11}>
                          <Typography>
                            Pre-flight cleaning, installation of cabin HEPA
                            Filters.
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container style={{ margin: '10px' }}>
                        <Grid item xs={1}>
                          <Typography>
                            {' '}
                            <img src={feather}></img>
                          </Typography>
                        </Grid>
                        <Grid item xs={11}>
                          <Typography>Masks required on board.</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </TabPanel>

                <TabPanel value={value} index={1} dir={theme.direction}>
                  <Grid
                    container
                    item
                    xs={10}
                    spacing={2}
                    style={{
                      border: '1px solid #E5E5E5',
                      padding: '10px',
                    }}>
                    <Grid item xs={6}>
                      <Typography>Fare Breakdown</Typography>
                      <Grid
                        container
                        spacing={2}
                        style={{
                          borderBottom: '1px solid #E5E5E5',
                          marginTop: '10px',
                        }}>
                        <Grid item xs={10}>
                          {flightsListData[0]?.travelerPricings.length} People
                        </Grid>
                        <Grid item xs={2} style={{ textAlign: 'right' }}>
                          {flightsListData[0]?.price.base}
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={2}
                        style={{
                          borderBottom: '1px solid #E5E5E5',
                          marginTop: '10px',
                        }}>
                        <Grid item xs={10}>
                          Total (Base Fare)
                        </Grid>
                        <Grid item xs={2} style={{ textAlign: 'right' }}>
                          {' '}
                          {flightsListData[0]?.price.base}
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={2}
                        style={{
                          borderBottom: '1px solid #E5E5E5',
                          marginTop: '10px',
                        }}>
                        <Grid item xs={10}>
                          Total Tax
                        </Grid>
                        <Grid item xs={2} style={{ textAlign: 'right' }}>
                          {' '}
                          {flightsListData[0]?.totalTax}
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={2}
                        style={{
                          borderBottom: '1px solid #E5E5E5',
                          marginTop: '10px',
                        }}>
                        <Grid item xs={10}>
                          Total (Fee & Surcharge)
                        </Grid>
                        <Grid item xs={2} style={{ textAlign: 'right' }}>
                          {' '}
                          {flightsListData[0]?.price.total}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{ borderLeft: '1px solid #E5E5E5' }}>
                      <Typography>Baggage Info</Typography>
                      <Grid container style={{ marginTop: '15px' }}>
                        <Grid item xs={1}>
                          <Typography>
                            {' '}
                            <img src={baggage}></img>
                          </Typography>
                        </Grid>
                        <Grid item xs={9}>
                          <Typography>Check-in Baggage</Typography>
                        </Grid>
                        <Grid item xs={2} style={{ textAlign: 'right' }}>
                          <Typography>
                            {flightsListData[0]?.quantity
                              ? flightsListData[0]?.quantity + 'Kg'
                              : '7 kg'}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container style={{ marginTop: '15px' }}>
                        <Grid item xs={1}>
                          <Typography>
                            {' '}
                            <img src={luggage}></img>
                          </Typography>
                        </Grid>
                        <Grid item xs={9}>
                          <Typography>Cabin Baggage</Typography>
                        </Grid>
                        <Grid item xs={2} style={{ textAlign: 'right' }}>
                          <Typography>
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
                          color: '#DB4437',
                          backgroundColor: '#FFF3F2',
                        }}>
                        Non-Refundable
                      </Button>
                      <Grid container style={{ marginTop: '10px' }}>
                        <Grid item xs={8}>
                          <Typography>Time Frame to Cancel</Typography>
                          <Typography>
                            Cancel before 4 hrs of departure time
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography> Airvays Fees </Typography>
                          <Typography> $50 </Typography>
                        </Grid>
                      </Grid>
                      <Grid container style={{ marginTop: '10px' }}>
                        <Grid item xs={8}>
                          <Typography>Time Frame to Reschedule</Typography>
                          <Typography>
                            Reschedule before 4 hours of departure time.
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography> Airvays Fees </Typography>
                          <Typography> $50 </Typography>
                        </Grid>
                      </Grid>
                      <Typography style={{ marginTop: '130px' }}>
                        Note: Airline Fees will be deducted as per airlines
                        policy
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>Terms and Conditions</Typography>
                      <Grid container style={{ marginTop: '10px' }}>
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
                          <Typography>
                            Total Rescheduling Charges = Airlines Rescheduling
                            fees + Fare Difference (if applicable) + Airvays
                            Fees.
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container>
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
                          <Typography>
                            The airline cancel/reschedule fees is indicative and
                            can be changed without any prior notice by the
                            airlines.
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container>
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
                          <Typography>
                            Partial cancellation is not allowed on the flight
                            tickets which are book under special round-trip
                            discounted fares.
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container>
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
                          <Typography>
                            Airlines doesn’t allow any additional baggage
                            allowance for any infant added in the booking.
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container>
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
                          <Typography>
                            In certain situations of restricted cases, no
                            amendments and cancellation is allowed.
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container>
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
                          <Typography>
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
  );
};
export default injectWithObserver(FlightListDetails);
