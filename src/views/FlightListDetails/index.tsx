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
      {...other}
    >
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
  })
);

const flightkey = {
  data: {
    type: 'flight-offer',
    id: '1',
    source: 'GDS',
    instantTicketingRequired: false,
    nonHomogeneous: false,
    oneWay: false,
    lastTicketingDate: '2021-08-14',
    numberOfBookableSeats: 8,
    itineraries: [
      {
        duration: 'PT29H2M',
        segments: [
          {
            departure: {
              iataCode: 'MAA',
              terminal: '1',
              at: '2021-08-21T17:25:00',
            },
            arrival: {
              iataCode: 'DEL',
              terminal: '3',
              at: '2021-08-21T20:10:00',
            },
            carrierCode: 'UA',
            number: '7738',
            aircraft: {
              code: '320',
            },
            operating: {
              carrierCode: 'UK',
            },
            duration: 'PT2H45M',
            id: '1',
            numberOfStops: 0,
            blacklistedInEU: false,
          },
          {
            departure: {
              iataCode: 'DEL',
              terminal: '3',
              at: '2021-08-22T02:55:00',
            },
            arrival: {
              iataCode: 'SFO',
              terminal: 'I',
              at: '2021-08-22T06:10:00',
            },
            carrierCode: 'UA',
            number: '868',
            aircraft: {
              code: '789',
            },
            operating: {
              carrierCode: 'UA',
            },
            duration: 'PT15H45M',
            id: '2',
            numberOfStops: 0,
            blacklistedInEU: false,
          },
          {
            departure: {
              iataCode: 'SFO',
              terminal: '3',
              at: '2021-08-22T08:30:00',
            },
            arrival: {
              iataCode: 'LAX',
              terminal: '7',
              at: '2021-08-22T09:57:00',
            },
            carrierCode: 'UA',
            number: '2617',
            aircraft: {
              code: '319',
            },
            operating: {
              carrierCode: 'UA',
            },
            duration: 'PT1H27M',
            id: '3',
            numberOfStops: 0,
            blacklistedInEU: false,
          },
        ],
      },
      {
        duration: 'PT29H40M',
        segments: [
          {
            departure: {
              iataCode: 'LAX',
              terminal: '7',
              at: '2021-08-28T16:00:00',
            },
            arrival: {
              iataCode: 'SFO',
              terminal: '3',
              at: '2021-08-28T17:13:00',
            },
            carrierCode: 'UA',
            number: '1548',
            aircraft: {
              code: '320',
            },
            operating: {
              carrierCode: 'UA',
            },
            duration: 'PT1H13M',
            id: '10',
            numberOfStops: 0,
            blacklistedInEU: false,
          },
          {
            departure: {
              iataCode: 'SFO',
              terminal: 'I',
              at: '2021-08-28T20:10:00',
            },
            arrival: {
              iataCode: 'DEL',
              terminal: '3',
              at: '2021-08-29T23:55:00',
            },
            carrierCode: 'UA',
            number: '867',
            aircraft: {
              code: '789',
            },
            operating: {
              carrierCode: 'UA',
            },
            duration: 'PT15H15M',
            id: '11',
            numberOfStops: 0,
            blacklistedInEU: false,
          },
          {
            departure: {
              iataCode: 'DEL',
              terminal: '3',
              at: '2021-08-30T07:20:00',
            },
            arrival: {
              iataCode: 'MAA',
              terminal: '1',
              at: '2021-08-30T10:10:00',
            },
            carrierCode: 'UA',
            number: '7763',
            aircraft: {
              code: '320',
            },
            operating: {
              carrierCode: 'UK',
            },
            duration: 'PT2H50M',
            id: '12',
            numberOfStops: 0,
            blacklistedInEU: false,
          },
        ],
      },
    ],
    price: {
      currency: 'INR',
      total: '400712.00',
      base: '248100.00',
      fees: [
        {
          amount: '0.00',
          type: 'SUPPLIER',
        },
        {
          amount: '0.00',
          type: 'TICKETING',
        },
      ],
      grandTotal: '400712.00',
    },
    pricingOptions: {
      fareType: ['PUBLISHED'],
      includedCheckedBagsOnly: true,
    },
    validatingAirlineCodes: ['UA'],
    travelerPricings: [
      {
        travelerId: '1',
        fareOption: 'STANDARD',
        travelerType: 'ADULT',
        price: {
          currency: 'INR',
          total: '200356.00',
          base: '124050.00',
        },
        fareDetailsBySegment: [
          {
            segmentId: '1',
            cabin: 'BUSINESS',
            fareBasis: 'ZNCS0U',
            class: 'Z',
            includedCheckedBags: {
              quantity: 2,
            },
          },
          {
            segmentId: '2',
            cabin: 'BUSINESS',
            fareBasis: 'ZNCS0U',
            class: 'Z',
            includedCheckedBags: {
              quantity: 2,
            },
          },
          {
            segmentId: '3',
            cabin: 'FIRST',
            fareBasis: 'ZNCS0U',
            brandedFare: 'BUSINESS',
            class: 'Z',
            includedCheckedBags: {
              quantity: 2,
            },
          },
          {
            segmentId: '10',
            cabin: 'ECONOMY',
            fareBasis: 'KNCP7V',
            class: 'K',
            includedCheckedBags: {
              quantity: 1,
            },
          },
          {
            segmentId: '11',
            cabin: 'ECONOMY',
            fareBasis: 'KNCP7V',
            class: 'K',
            includedCheckedBags: {
              quantity: 1,
            },
          },
          {
            segmentId: '12',
            cabin: 'ECONOMY',
            fareBasis: 'KNCP7V',
            brandedFare: 'ECONOMY',
            class: 'K',
            includedCheckedBags: {
              quantity: 1,
            },
          },
        ],
      },
      {
        travelerId: '2',
        fareOption: 'STANDARD',
        travelerType: 'ADULT',
        price: {
          currency: 'INR',
          total: '200356.00',
          base: '124050.00',
        },
        fareDetailsBySegment: [
          {
            segmentId: '1',
            cabin: 'BUSINESS',
            fareBasis: 'ZNCS0U',
            class: 'Z',
            includedCheckedBags: {
              quantity: 2,
            },
          },
          {
            segmentId: '2',
            cabin: 'BUSINESS',
            fareBasis: 'ZNCS0U',
            class: 'Z',
            includedCheckedBags: {
              quantity: 2,
            },
          },
          {
            segmentId: '3',
            cabin: 'FIRST',
            fareBasis: 'ZNCS0U',
            brandedFare: 'BUSINESS',
            class: 'Z',
            includedCheckedBags: {
              quantity: 2,
            },
          },
          {
            segmentId: '10',
            cabin: 'ECONOMY',
            fareBasis: 'KNCP7V',
            class: 'K',
            includedCheckedBags: {
              quantity: 1,
            },
          },
          {
            segmentId: '11',
            cabin: 'ECONOMY',
            fareBasis: 'KNCP7V',
            class: 'K',
            includedCheckedBags: {
              quantity: 1,
            },
          },
          {
            segmentId: '12',
            cabin: 'ECONOMY',
            fareBasis: 'KNCP7V',
            brandedFare: 'ECONOMY',
            class: 'K',
            includedCheckedBags: {
              quantity: 1,
            },
          },
        ],
      },
    ],
  },
};

export default function FlightListDetails() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [flightsListData, setflightsData] = useState<any | null>();
  const [flightsResult, setflightResult] = useState<any>();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  useEffect(() => {
    getFlightsData();
  }, []);

  const getFlightsData = async () => {
    await _flightDetails(flightkey, function (error: any, response: any) {
      if (error == null) {
        if (response.status == 200) {
          setflightsData(response.result);
          setflightResult(_.get(flightsListData, 'data.flightOffers'))
        }
      } else if (response == null) {
      }
    });
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Grid
            container
            style={{
              display: 'flex',
              marginTop: '60px',
              backgroundColor: '#EFFAFF',
              padding: '20px',
            }}
          >
              <Grid item xs={2}>
                <div>
                  <img style={{ marginLeft: '30px' }} src={goAir}></img>
                </div>
                <Typography
                  style={{
                    fontSize: '14px',
                    color: '#1C2460',
                    opacity: '40%',
                    marginLeft: '30px',
                  }}
                >
                  GoAir
                </Typography>
              </Grid>
              <Grid item xs={2} style={{ color: '#1C2460' }}>
                <div>
                  {/* <p>{item.departure.at}</p> */}
                  <p>
                    Chennai (MAA)
                    <br />
                    {/* {item.departure.iataCode} */}
                  </p>
                </div>
              </Grid>
              <Grid
                item
                xs={4}
                style={{
                  alignItems: 'center',
                  textAlign: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography style={{ marginRight: '70px' }}>
                  Direct
                </Typography>
                <div style={{ display: 'flex' }}>
                  {'-------------------------'}
                  <img src={flightIcon}></img>
                  {'-------------------------'}
                </div>
                <Typography style={{ marginRight: '70px' }}>
                  {/* {x.itineraries[0].duration} */}
                </Typography>
              </Grid>
              <Grid item xs={2} style={{ color: '#1C2460' }}>
                <div>
                  {/* <p>{item.arrival.at}</p> */}
                  <p>
                    Bengaluru Intl (BLR)
                    <br />
                    {/* {item.arrival.iataCode} */}
                  </p>
                </div>
              </Grid>

            <Grid
              item
              xs={2}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                borderLeft: '1px solid #33BBFF',
              }}
            >
              <div>
                <Typography>
                  <span
                    style={{
                      fontSize: '22px',
                      fontWeight: 500,
                      color: '#1C2460',
                    }}
                  >
                    $120{' '}
                  </span>
                </Typography>
                <br />
                <Button
                  variant='contained'
                  style={{ background: '#DCAB5E', color: '#fff' }}
                >
                  Book Now
                </Button>
              </div>
            </Grid>
          </Grid>

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
                aria-label='full width tabs example'
              >
                <Tab label='Flight Information' {...a11yProps(0)} />
                <Tab label='Fare & Baggage Details' {...a11yProps(1)} />
                <Tab label='Cancellation Rules' {...a11yProps(2)} />
              </Tabs>
              {/* </AppBar> */}
              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <Grid
                    container
                    spacing={2}
                    style={{ border: '1px solid #E5E5E5', padding: '10px' }}
                  >
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
                              }}
                            ></img>
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
                      style={{ borderLeft: '1px solid #E5E5E5' }}
                    >
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
                    }}
                  >
                    <Grid item xs={6}>
                      <Typography>Fare Breakdown</Typography>
                      <Grid
                        container
                        spacing={2}
                        style={{
                          borderBottom: '1px solid #E5E5E5',
                          marginTop: '10px',
                        }}
                      >
                        <Grid item xs={10}>
                          2 People
                        </Grid>
                        <Grid item xs={2} style={{ textAlign: 'right' }}>
                          {' '}
                          $120
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={2}
                        style={{
                          borderBottom: '1px solid #E5E5E5',
                          marginTop: '10px',
                        }}
                      >
                        <Grid item xs={10}>
                          Total (Base Fare)
                        </Grid>
                        <Grid item xs={2} style={{ textAlign: 'right' }}>
                          {' '}
                          $120
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={2}
                        style={{
                          borderBottom: '1px solid #E5E5E5',
                          marginTop: '10px',
                        }}
                      >
                        <Grid item xs={10}>
                          Total Tax
                        </Grid>
                        <Grid item xs={2} style={{ textAlign: 'right' }}>
                          {' '}
                          $25
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={2}
                        style={{
                          borderBottom: '1px solid #E5E5E5',
                          marginTop: '10px',
                        }}
                      >
                        <Grid item xs={10}>
                          Total (Fee & Surcharge)
                        </Grid>
                        <Grid item xs={2} style={{ textAlign: 'right' }}>
                          {' '}
                          $145
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{ borderLeft: '1px solid #E5E5E5' }}
                    >
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
                          <Typography>15 kg</Typography>
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
                          <Typography>7 kg</Typography>
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
                    }}
                  >
                    <Grid item xs={6}>
                      <Button
                        style={{
                          textTransform: 'none',
                          color: '#DB4437',
                          backgroundColor: '#FFF3F2',
                        }}
                      >
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
}
