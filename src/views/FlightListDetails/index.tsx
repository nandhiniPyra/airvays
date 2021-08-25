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

// const flightkey = {
//   data: {
//     "type": "flight-offers-pricing",
//     "flightOffers": [
//       {
//         "type": "flight-offer",
//         "id": "2",
//         "source": "GDS",
//         "instantTicketingRequired": false,
//         "nonHomogeneous": false,
//         "paymentCardRequired": false,
//         "lastTicketingDate": "2021-08-25",
//         "itineraries": [
//           {
//             "segments": [
//               {
//                 "departure": {
//                   "iataCode": "MAA",
//                   "terminal": "4",
//                   "at": "2021-08-25T20:25:00"
//                 },
//                 "arrival": {
//                   "iataCode": "DEL",
//                   "terminal": "3",
//                   "at": "2021-08-26T00:40:00"
//                 },
//                 "carrierCode": "AI",
//                 "number": "1126",
//                 "aircraft": {
//                   "code": "32B"
//                 },
//                 "operating": {
//                   "carrierCode": "AI"
//                 },
//                 "duration": "PT4H15M",
//                 "stops": [
//                   {
//                     "iataCode": "HYD",
//                     "duration": "PT1H15M",
//                     "arrivalAt": "2021-08-25T21:30:00",
//                     "departureAt": "2021-08-25T22:45:00"
//                   }
//                 ],
//                 "id": "3",
//                 "numberOfStops": 1,
//                 "co2Emissions": [
//                   {
//                     "weight": 179,
//                     "weightUnit": "KG",
//                     "cabin": "ECONOMY"
//                   }
//                 ]
//               },
//               {
//                 "departure": {
//                   "iataCode": "DEL",
//                   "terminal": "3",
//                   "at": "2021-08-26T14:00:00"
//                 },
//                 "arrival": {
//                   "iataCode": "LHR",
//                   "terminal": "2",
//                   "at": "2021-08-26T19:00:00"
//                 },
//                 "carrierCode": "AI",
//                 "number": "111",
//                 "aircraft": {
//                   "code": "788"
//                 },
//                 "operating": {
//                   "carrierCode": "AI"
//                 },
//                 "duration": "PT9H30M",
//                 "id": "4",
//                 "numberOfStops": 0,
//                 "co2Emissions": [
//                   {
//                     "weight": 267,
//                     "weightUnit": "KG",
//                     "cabin": "ECONOMY"
//                   }
//                 ]
//               }
//             ]
//           }
//         ],
//         "price": {
//           "currency": "INR",
//           "total": "26828.00",
//           "base": "4600.00",
//           "fees": [
//             {
//               "amount": "0.00",
//               "type": "SUPPLIER"
//             },
//             {
//               "amount": "0.00",
//               "type": "TICKETING"
//             },
//             {
//               "amount": "0.00",
//               "type": "FORM_OF_PAYMENT"
//             }
//           ],
//           "grandTotal": "26828.00",
//           "billingCurrency": "INR"
//         },
//         "pricingOptions": {
//           "fareType": [
//             "PUBLISHED"
//           ],
//           "includedCheckedBagsOnly": true
//         },
//         "validatingAirlineCodes": [
//           "AI"
//         ],
//         "travelerPricings": [
//           {
//             "travelerId": "1",
//             "fareOption": "STANDARD",
//             "travelerType": "ADULT",
//             "price": {
//               "currency": "INR",
//               "total": "26828",
//               "base": "4600",
//               "taxes": [
//                 {
//                   "amount": "1052.00",
//                   "code": "P2"
//                 },
//                 {
//                   "amount": "82.00",
//                   "code": "IN"
//                 },
//                 {
//                   "amount": "19600.00",
//                   "code": "YQ"
//                 },
//                 {
//                   "amount": "1224.00",
//                   "code": "K3"
//                 },
//                 {
//                   "amount": "270.00",
//                   "code": "YR"
//                 }
//               ],
//               "refundableTaxes": "22228"
//             },
//             "fareDetailsBySegment": [
//               {
//                 "segmentId": "3",
//                 "cabin": "ECONOMY",
//                 "fareBasis": "TLOWBOM",
//                 "class": "K",
//                 "includedCheckedBags": {
//                   "quantity": 2
//                 }
//               },
//               {
//                 "segmentId": "4",
//                 "cabin": "ECONOMY",
//                 "fareBasis": "TLOWBOM",
//                 "class": "T",
//                 "includedCheckedBags": {
//                   "quantity": 2
//                 }
//               }
//             ]
//           }
//         ]
//       }
//     ],
//     "bookingRequirements": {
//       "travelerRequirements": [
//         {
//           "travelerId": "1",
//           "documentRequired": true
//         }
//       ]
//     }
//   }
// };

const FlightListDetails = ({ stores }: any) => {
  const classes = useStyles();
  const theme = useTheme();
  const store = useStore();

  const [value, setValue] = React.useState(0);
  const [flightsListData, setflightsData] = useState<any>([]);
  const [flightsResult, setflightResult] = useState<any>();
  const { state }: any = useLocation();
  const { setsearchRequest, setflightlist, getflightbyid } =
    store.flightDetails;
  const { getAirLineList, airLineList } = toJS(stores.FlightStore);
  console.log(state, '&&&&&&&&&&&&&&&&&&&&&&');
  const cityKeys = _.pick(state.data, ['from_city', 'to_city']);
  const navigate = useNavigate();
  console.log(getflightbyid(state.id), '**************nan********');

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
    await _flightDetails(state, function (error: any, response: any) {
      if (error == null) {
        if (response.status == 200) {
          let item1 = response.result?.data.flightOffers.map(
            (item: any, index: any) => {
              //oneway
              if (item.itineraries.length == 1) {
                item.itineraries.map((value: any, indx: any) => {
                  if (value.segments[0]) {
                    value['depature'] = value.segments[0].departure.iataCode;
                    value['depatureAt'] = value.segments[0].departure.at;
                    value['arrival'] =
                      value.segments[
                        value.segments.length - 1
                      ].arrival.iataCode;
                    value['arrivalAt'] =
                      value.segments[value.segments.length - 1].arrival.at;
                    value['stop'] = 'Direct';
                    item.travelerPricings.map(
                      (val: any) =>
                        (item['totalTax'] = _.toNumber(
                          val.price.refundableTaxes,
                        )),
                    );
                    item['quantity'] =
                      item.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.quantity;
                    value['from_city'] = cityKeys.from_city;
                    value['to_city'] = cityKeys.to_city;
                  }
                });
              }
              //return
              else {
                item.itineraries.map((value: any, indx: any) => {
                  let length = value.segments.length - 1;
                  value['depature'] = value.segments[0].departure.iataCode;
                  value['depatureAt'] = value.segments[0].departure.at;
                  value['arrival'] = value.segments[length].arrival.iataCode;
                  value['arrivalAt'] = value.segments[length].arrival.at;
                  value['stop'] = `${length} + Stops`;
                  item['totalTax'] = item.travelerPricings.map((val: any) =>
                    _.toNumber(val.price.refundableTaxes),
                  );
                  item['quantity'] =
                    item.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.quantity;
                  if (value.segments[0]) {
                    item.itineraries[0]['from_city'] = cityKeys.from_city;
                    item.itineraries[0]['to_city'] = cityKeys.to_city;
                  }
                  if (item.itineraries.length > 0 && value.segments[length]) {
                    item.itineraries[item.itineraries.length - 1]['from_city'] =
                      cityKeys.to_city;
                    item.itineraries[item.itineraries.length - 1]['to_city'] =
                      cityKeys.from_city;
                  }
                });
              }
              return item;
            },
          );
          setflightsData(item1);
          // setflightResult(_.get(flightsListData, 'data.flightOffers'))
        }
      } else if (response == null) {
      }
    });
  };
  const handleTime = (time: any) => {
    const Timing = moment(time).format('LT');
    return Timing;
  };
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          {flightsListData.map((x: any) => (
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
                      <Typography style={{ textAlign: 'center' }}>
                        {x.itineraries[0].segments.length - 1 == 1
                          ? '1 STOP'
                          : x.itineraries[0].segments.length - 1 + 'STOPS'}
                      </Typography>
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
                          {_.sum(flightsListData[0]?.totalTax)}
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
