import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Box, Divider, Typography } from '@material-ui/core';
import download from '../../assets/Icon feather-download@2x.png';
import spicejet from '../../assets/Spicejet@2x.png';
//import ReactToPdf from "react-to-pdf";
import doc from '../../views/BookingSummary/script';
import { toJS } from 'mobx';
import { useStore } from '../../mobx/Helpers/UseStore';
import injectWithObserver from '../../utils/injectWithObserver';
import _ from 'lodash';

// const ReactToPdf = require('react-to-pdf');
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: '#FFFFFF',
      marginTop: '40px',
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      borderRadius: '10px',
    },
    subHeading: {
      fontSize: '18px',
      color: '#333333',
      fontFamily: 'Crimson Text',
    },
    subTitle: {
      fontSize: '20px',
      fontFamily: 'Crimson Text',
      color: ' #333333',
      fontWeight: 'bold',
      marginTop: '5px',
    },
  }),
);

const BookingSummaryComponent = () => {
  const classes = useStyles();
  const ref = React.createRef();
  const store = useStore();
  const { bookingData, searchKeys } = toJS(store.FlightDetails);
  const [summaryData, setSummaryData] = useState<any>([]);
  console.log(bookingData, 'bookingData');
  const Tempdata = [
    {
      type: 'flight-order',
      id: 'eJzTd9cPD%2Fe08DUBAAuIAlY%3D',
      associatedRecords: [
        {
          reference: 'WWI8M4',
          creationDate: '2021-09-01T12:00:00.000',
          originSystemCode: 'GDS',
          flightOfferId: '1',
        },
      ],
      flightOffers: [
        {
          type: 'flight-offer',
          id: '1',
          source: 'GDS',
          nonHomogeneous: false,
          lastTicketingDate: '2021-09-01',
          itineraries: [
            {
              segments: [
                {
                  departure: {
                    iataCode: 'MAA',
                    terminal: '1',
                    at: '2021-09-01T21:05:00',
                  },
                  arrival: {
                    iataCode: 'DEL',
                    terminal: '3',
                    at: '2021-09-01T23:55:00',
                  },
                  carrierCode: 'UK',
                  number: '838',
                  aircraft: {
                    code: '320',
                  },
                  operating: {},
                  id: '4',
                  numberOfStops: 0,
                  co2Emissions: [
                    {
                      weight: 148,
                      weightUnit: 'KG',
                      cabin: 'ECONOMY',
                    },
                  ],
                },
                {
                  departure: {
                    iataCode: 'DEL',
                    terminal: '3',
                    at: '2021-09-02T02:50:00',
                  },
                  arrival: {
                    iataCode: 'FRA',
                    terminal: '1',
                    at: '2021-09-02T07:40:00',
                  },
                  carrierCode: 'LH',
                  number: '761',
                  aircraft: {
                    code: '744',
                  },
                  operating: {},
                  id: '5',
                  numberOfStops: 0,
                  co2Emissions: [
                    {
                      weight: 278,
                      weightUnit: 'KG',
                      cabin: 'ECONOMY',
                    },
                  ],
                },
                {
                  departure: {
                    iataCode: 'FRA',
                    terminal: '1',
                    at: '2021-09-02T09:00:00',
                  },
                  arrival: {
                    iataCode: 'LHR',
                    terminal: '2',
                    at: '2021-09-02T09:00:00',
                  },
                  carrierCode: 'LH',
                  number: '5002',
                  aircraft: {
                    code: '320',
                  },
                  operating: {},
                  id: '6',
                  numberOfStops: 0,
                  co2Emissions: [
                    {
                      weight: 87,
                      weightUnit: 'KG',
                      cabin: 'ECONOMY',
                    },
                  ],
                },
              ],
            },
          ],
          price: {
            currency: 'SGD',
            total: '1685.60',
            base: '894.00',
            fees: [
              {
                amount: '0.00',
                type: 'TICKETING',
              },
              {
                amount: '0.00',
                type: 'SUPPLIER',
              },
              {
                amount: '0.00',
                type: 'FORM_OF_PAYMENT',
              },
            ],
            grandTotal: '1685.60',
            billingCurrency: 'SGD',
          },
          pricingOptions: {
            fareType: ['PUBLISHED'],
            includedCheckedBagsOnly: true,
          },
          validatingAirlineCodes: ['LH'],
          travelerPricings: [
            {
              travelerId: '1',
              fareOption: 'STANDARD',
              travelerType: 'ADULT',
              price: {
                currency: 'SGD',
                total: '842.80',
                base: '447.00',
                taxes: [
                  {
                    amount: '15.90',
                    code: 'DE',
                  },
                  {
                    amount: '1.50',
                    code: 'IN',
                  },
                  {
                    amount: '36.80',
                    code: 'K3',
                  },
                  {
                    amount: '19.20',
                    code: 'P2',
                  },
                  {
                    amount: '34.80',
                    code: 'RA',
                  },
                  {
                    amount: '254.80',
                    code: 'YQ',
                  },
                  {
                    amount: '32.80',
                    code: 'YR',
                  },
                ],
                refundableTaxes: '103.20',
              },
              fareDetailsBySegment: [
                {
                  segmentId: '4',
                  cabin: 'ECONOMY',
                  fareBasis: 'VNCOWAA',
                  brandedFare: 'ECOSAVER',
                  class: 'L',
                  includedCheckedBags: {
                    quantity: 1,
                  },
                },
                {
                  segmentId: '5',
                  cabin: 'ECONOMY',
                  fareBasis: 'VNCOWAA',
                  brandedFare: 'ECOSAVER',
                  class: 'V',
                  includedCheckedBags: {
                    quantity: 1,
                  },
                },
                {
                  segmentId: '6',
                  cabin: 'ECONOMY',
                  fareBasis: 'VNCOWAA',
                  brandedFare: 'ECOSAVER',
                  class: 'V',
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
                currency: 'SGD',
                total: '842.80',
                base: '447.00',
                taxes: [
                  {
                    amount: '15.90',
                    code: 'DE',
                  },
                  {
                    amount: '1.50',
                    code: 'IN',
                  },
                  {
                    amount: '36.80',
                    code: 'K3',
                  },
                  {
                    amount: '19.20',
                    code: 'P2',
                  },
                  {
                    amount: '34.80',
                    code: 'RA',
                  },
                  {
                    amount: '254.80',
                    code: 'YQ',
                  },
                  {
                    amount: '32.80',
                    code: 'YR',
                  },
                ],
                refundableTaxes: '103.20',
              },
              fareDetailsBySegment: [
                {
                  segmentId: '4',
                  cabin: 'ECONOMY',
                  fareBasis: 'VNCOWAA',
                  brandedFare: 'ECOSAVER',
                  class: 'L',
                  includedCheckedBags: {
                    quantity: 1,
                  },
                },
                {
                  segmentId: '5',
                  cabin: 'ECONOMY',
                  fareBasis: 'VNCOWAA',
                  brandedFare: 'ECOSAVER',
                  class: 'V',
                  includedCheckedBags: {
                    quantity: 1,
                  },
                },
                {
                  segmentId: '6',
                  cabin: 'ECONOMY',
                  fareBasis: 'VNCOWAA',
                  brandedFare: 'ECOSAVER',
                  class: 'V',
                  includedCheckedBags: {
                    quantity: 1,
                  },
                },
              ],
            },
          ],
        },
      ],
      travelers: [
        {
          id: '1',
          dateOfBirth: '1982-01-16',
          gender: 'MALE',
          name: {
            firstName: 'JORGE',
            lastName: 'GONZALES',
          },
        },
        {
          id: '2',
          dateOfBirth: '2012-10-11',
          gender: 'FEMALE',
          name: {
            firstName: 'ADRIANA',
            lastName: 'GONZALES',
          },
        },
      ],
      remarks: {
        general: [
          {
            subType: 'GENERAL_MISCELLANEOUS',
            text: 'ONLINE BOOKING FROM INCREIBLE VIAJES',
          },
        ],
      },
      ticketingAgreement: {
        option: 'DELAY_TO_CANCEL',
        delay: '6D',
      },
      contacts: [
        {
          addresseeName: {
            firstName: 'Jhon Jhon',
          },
          address: {
            lines: ['20th street'],
            postalCode: '10080',
            countryCode: 'IN',
            cityName: 'New York',
          },
          purpose: 'STANDARD',
          phones: [
            {
              deviceType: 'MOBILE',
              countryCallingCode: '91',
              number: '91987654321',
            },
          ],
          emailAddress: 'mydata@tr.km',
        },
      ],
    },
  ];

  useEffect(() => {
    let data: any = [];
    data.push(bookingData);
    if (data.length) {
      let item1 =
        data &&
        data.map((item: any, index: any) => {
          {
            item.contacts.map((contact: any) => {
              item['Contact_Info'] = {
                name: contact.addresseeName.firstName,
                email: contact.emailAddress,
                flightId: 'FT-IKTH',
              };
            });
          }
          //oneway
          if (item.flightOffers[0].itineraries.length == 1) {
            item.flightOffers[0].itineraries.map((value: any, indx: any) => {
              if (value.segments[0]) {
                item['Departure_Info'] = {
                  flightnumber: 'SG-8169',
                  d_terminal: value.segments[0].departure.iataCode,
                  d_time_date: value.segments[0].departure.at,
                  Class:
                    item.flightOffers[0].travelerPricings[0]
                      .fareDetailsBySegment[0].cabin,
                  a_terminal:
                    value.segments[value.segments.length - 1].arrival.iataCode,
                  a_time_date:
                    value.segments[value.segments.length - 1].arrival.at,
                };
                value['depature'] = value.segments[0].departure.iataCode;
                value['depatureAt'] = value.segments[0].departure.at;
                value['arrival'] =
                  value.segments[value.segments.length - 1].arrival.iataCode;
                value['arrivalAt'] =
                  value.segments[value.segments.length - 1].arrival.at;
                value['stop'] = 'Direct';
                item.flightOffers[0].travelerPricings.map(
                  (val: any) =>
                    (item['totalTax'] = _.toNumber(val.price.refundableTaxes)),
                );
                item['quantity'] =
                  item.flightOffers[0].travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.quantity;
                value['from_city'] = 'MAA';
                value['to_city'] = 'BLR';
                let stops: any = new Set([]);
                value.segments.map((x: any, indx: any) => {
                  if (indx !== value.segments.length - 1) {
                    stops.add(x.arrival.iataCode);
                  }
                });
                value['via'] = [...stops];
              }
              let segments_Duration: any = [];
              value.segments.map((val: any, idx: any) => {
                segments_Duration.push({
                  arraival: val.arrival.iataCode,
                  depature: val.departure.iataCode,
                  duration: val.duration,
                });
              });
              item['duration_'] = segments_Duration;
            });
          }
          //return
          else {
            item.flightOffers[0].itineraries.map((value: any, indx: any) => {
              let length = value.segments.length - 1;
              value['depature'] = value.segments[0].departure.iataCode;
              value['depatureAt'] = value.segments[0].departure.at;
              value['arrival'] = value.segments[length].arrival.iataCode;
              value['arrivalAt'] = value.segments[length].arrival.at;
              value['stop'] = `${length} + Stops`;
              let stops: any = new Set([]);
              value.segments.map((x: any, indx: any) => {
                if (indx !== value.segments.length - 1) {
                  stops.add(x.arrival.iataCode);
                }
              });
              value['via'] = [...stops];
              item['totalTax'] = item.flightOffers[0].travelerPricings.map(
                (val: any) => _.toNumber(val.price.refundableTaxes),
              );
              item['quantity'] =
                item.flightOffers[0].travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.quantity;
              if (value.segments[0]) {
                item.flightOffers[0].itineraries[0]['from_city'] = 'MAA';
                item.flightOffers[0].itineraries[0]['to_city'] = 'BLR';
              }
              if (item.itineraries.length > 0 && value.segments[length]) {
                item.flightOffers[0].itineraries[item.itineraries.length - 1][
                  'from_city'
                ] = 'BLR';
                item.flightOffers[0].itineraries[item.itineraries.length - 1][
                  'to_city'
                ] = 'MAA';
              }
              let segments_Duration: any = [];
              value.segments.map((val: any, idx: any) => {
                segments_Duration.push({
                  arraival: val.arrival.iataCode,
                  depature: val.departure.iataCode,
                  duration: val.duration,
                });
              });
              item['duration_'] = segments_Duration;
            });
          }
          return item;
        });
      setSummaryData(item1);
    }
  }, []);

  // const options = {
  //     orientation: 'landscape',
  //     unit: 'in',
  //     format: [4, 2]
  // };

  const downloadPDF = () => {
    const input = document.getElementById('topdf');
    if (input) {
      html2canvas(input, {
        scale: 3, // use the desired scale
        allowTaint: true,
        // backgroundColor:'red',
        useCORS: true,
      }).then((canvas: any) => {
        const dataURL = canvas.toDataURL();
        const pdf = new jsPDF();
        pdf.addImage(dataURL, 'PDF', 20, 20, 180, 160);
        pdf.save('saved.pdf');
      });
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={1}></Grid>
        <Grid item xs={7}>
          <Grid container spacing={3} id={'topdf'}>
            <Grid item xs={12}>
              <Grid container spacing={3} style={{ marginBottom: '10px' }}>
                <Grid item xs={6}>
                  <Typography
                    style={{
                      textAlign: 'left',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#1C2460',
                      fontFamily: 'AvantGarde',
                    }}>
                    Booking Summary
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    component='div'
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}>
                    <Typography
                      onClick={downloadPDF}
                      style={{
                        color: '#4BAFC9',
                        fontSize: '17px',
                        alignItems: 'center',
                      }}>
                      {/* React To Pdf */}
                      {/* <ReactToPdf
                        targetRef={ref}
                        filename='Booking Summary.pdf'>
                        {({ toPdf }: any) => {
                          return (
                            <div style={{ display: 'flex' }}>
                              <img
                                src={download}
                                style={{
                                  height: '23px',
                                  marginRight: '15px',
                                  cursor: 'pointer',
                                }}
                                alt='download'
                                onClick={toPdf}
                              />
                              <p>Download PDF</p>
                            </div>
                          );
                        }}
                      </ReactToPdf> */}
                      <p>Download PDF</p>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {summaryData.map((summary: any) => (
                <Paper
                  className={classes.paper}
                  style={{ boxShadow: '0px 20px 55px #00000015' }}
                  ref={ref}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography
                        style={{
                          textAlign: 'left',
                          fontSize: '16px',
                          fontWeight: 500,
                          color: '#33BBFF',
                          paddingLeft: '10px',
                        }}>
                        Contact Info
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    style={{
                      display: 'flex',
                      padding: '10px',
                    }}>
                    <Grid xs={4}>
                      <div>
                        <Typography className={classes.subHeading}>
                          Name
                        </Typography>
                        <p className={classes.subTitle}>
                          {summary.Contact_Info.name}
                        </p>
                      </div>
                    </Grid>
                    <Grid xs={5}>
                      <div>
                        <Typography className={classes.subHeading}>
                          E-mail address
                        </Typography>
                      </div>
                      <div>
                        <p className={classes.subTitle}>
                          {summary.Contact_Info.email}
                        </p>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <div>
                        <Typography className={classes.subHeading}>
                          Reservation ID
                        </Typography>
                      </div>
                      <div>
                        <p className={classes.subTitle}>
                          {summary.Contact_Info.flightId}
                        </p>
                      </div>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <Typography
                        style={{
                          textAlign: 'left',
                          fontSize: '16px',
                          fontWeight: 500,
                          color: '#33BBFF',
                          marginTop: '10px',
                          paddingLeft: '10px',
                        }}>
                        Departure Info
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    style={{
                      display: 'flex',
                      padding: '10px',
                    }}
                    spacing={3}>
                    <Grid item xs={4}>
                      <Typography className={classes.subHeading}>
                        Flight Number
                      </Typography>
                      <div style={{ display: 'flex' }}>
                        <img
                          src={spicejet}
                          alt='spcicejet'
                          style={{ height: '41px', objectFit: 'contain' }}
                        />
                        <p
                          style={{
                            marginTop: '6px',
                            marginLeft: '5px',
                            fontSize: '20px',
                            fontFamily: 'Crimson Text',
                            color: ' #333333',
                          }}>
                          {summary.Departure_Info.flightnumber}
                        </p>
                      </div>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.subHeading}>
                        Departure Terminal
                      </Typography>
                      <p className={classes.subTitle}>
                        {summary.Departure_Info.d_terminal}
                      </p>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography className={classes.subHeading}>
                        Date & Time
                      </Typography>
                      <div className={classes.subTitle}>
                        {summary.Departure_Info.d_time_date}
                        <span style={{ fontSize: '15px' }}>EST</span>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    style={{
                      display: 'flex',
                      padding: '10px',
                      marginBottom: '10px',
                    }}
                    spacing={5}>
                    <Grid item xs={4}>
                      <Typography className={classes.subHeading}>
                        Class
                      </Typography>
                      <div>
                        <p className={classes.subTitle}>
                          {summary.Departure_Info.Class}
                        </p>
                      </div>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.subHeading}>
                        Arrival Terminal
                      </Typography>
                      <div>
                        <p className={classes.subTitle}>
                          {summary.Departure_Info.a_terminal}
                        </p>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography className={classes.subHeading}>
                        Date & Time
                      </Typography>
                      <div className={classes.subTitle}>
                        {summary.Departure_Info.a_time_date}
                        <span style={{ fontSize: '15px' }}>EST</span>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    style={{
                      display: 'flex',
                      padding: '10px',
                    }}
                    spacing={5}>
                    <Grid item xs={4}>
                      <Typography className={classes.subHeading}>
                        Status
                      </Typography>
                      <div>
                        <p className={classes.subTitle}>Confirmed</p>
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography className={classes.subHeading}>
                        Gate No.
                      </Typography>
                      <div>
                        <p className={classes.subTitle}>2143</p>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography className={classes.subHeading}>
                        Aircraft
                      </Typography>
                      <div>
                        <p className={classes.subTitle}>Turboprop</p>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography className={classes.subHeading}>
                        Confirmation Number
                      </Typography>
                      <div>
                        <p className={classes.subTitle}>SG93427JK04</p>
                      </div>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid
                    container
                    style={{
                      padding: '10px',
                      marginTop: '10px',
                    }}>
                    <Grid item xs={6}>
                      <Typography
                        style={{
                          textAlign: 'left',
                          fontSize: '16px',
                          fontWeight: 500,
                          color: '#33BBFF',
                        }}>
                        Traveller Details
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        style={{
                          textAlign: 'right',
                          fontSize: '16px',
                          fontWeight: 500,
                          color: '#33BBFF',
                        }}>
                        Total : {summary.travelers.length}
                      </Typography>
                    </Grid>
                  </Grid>
                  {summary.travelers.map((passanger: any) => (
                    <Grid
                      container
                      style={{
                        padding: '10px',
                      }}
                      spacing={6}>
                      <Grid item xs={4}>
                        <Typography className={classes.subHeading}>
                          Name
                        </Typography>
                        <div>
                          <p className={classes.subTitle}>
                            {passanger.name.firstName} {passanger.name.lastName}
                          </p>
                        </div>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography className={classes.subHeading}>
                          Gender
                        </Typography>
                        <div>
                          <p className={classes.subTitle}>{passanger.gender}</p>
                        </div>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography className={classes.subHeading}>
                          Nationality
                        </Typography>
                        <div>
                          <p className={classes.subTitle}> Indian</p>
                        </div>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography className={classes.subHeading}>
                          Extra Baggage
                        </Typography>
                        <div>
                          <p className={classes.subTitle}>15kg</p>
                        </div>
                      </Grid>
                    </Grid>
                  ))}
                  {/* <Grid
                    container
                    spacing={6}
                    style={{
                      padding: '10px',
                      marginBottom: '10px',
                    }}>
                    <Grid item xs={4}>
                      <Typography className={classes.subHeading}>Name</Typography>
                      <div>
                        <p className={classes.subTitle}>Randy Hawkins</p>
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography className={classes.subHeading}>
                        Gender
                      </Typography>
                      <div>
                        <p className={classes.subTitle}>Male</p>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography className={classes.subHeading}>
                        Nationality
                      </Typography>
                      <div>
                        <p className={classes.subTitle}>Indian</p>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography className={classes.subHeading}>
                        Extra Baggage
                      </Typography>
                      <div>
                        <p>-</p>
                      </div>
                    </Grid>
                  </Grid> */}
                </Paper>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid xs></Grid>
        <Grid
          item
          xs={3}
          style={{ marginTop: '62px', position: 'fixed', right: '150px' }}>
          <Paper
            className={classes.paper}
            style={{ boxShadow: '0px 20px 55px #00000015' }}>
            <div style={{ display: 'flex' }}>
              <Typography
                style={{
                  textAlign: 'left',
                  color: '#33BBFF',
                  fontSize: '17px',
                  fontWeight: 'bold',
                  fontFamily: 'avantgarde',
                }}>
                Fare Summary
              </Typography>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 30px 0px 0px',
              }}>
              <div>
                <Typography
                  style={{
                    fontSize: '20px',
                    color: '#333333',
                    fontFamily: 'crimson-text',
                  }}>
                  2 People
                </Typography>
              </div>
              <div>
                <Typography
                  style={{
                    fontSize: '20px',
                    color: '#333333',
                    fontFamily: 'crimson-text',
                  }}>
                  $120
                </Typography>
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
                    fontSize: '20px',
                    color: '#333333',
                    fontFamily: 'crimson-text',
                  }}>
                  2 People
                </Typography>
              </div>
              <div>
                <Typography
                  style={{
                    fontSize: '20px',
                    color: '#333333',
                    fontFamily: 'crimson-text',
                  }}>
                  $120
                </Typography>
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
                    fontSize: '20px',
                    color: '#333333',
                    fontFamily: 'crimson-text',
                  }}>
                  Total (Base Fare)
                </Typography>
              </div>
              <div>
                <Typography
                  style={{
                    fontSize: '20px',
                    color: '#333333',
                    fontFamily: 'crimson-text',
                  }}>
                  $120
                </Typography>
              </div>
            </div>
            <Divider light style={{ marginTop: '15px' }} />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 39px 0px 0px',
              }}>
              <div>
                <Typography
                  style={{
                    fontSize: '20px',
                    color: '#333333',
                    fontFamily: 'crimson-text',
                  }}>
                  Total Tax
                </Typography>
              </div>
              <div>
                <Typography
                  style={{
                    fontSize: '20px',
                    color: '#333333',
                    fontFamily: 'crimson-text',
                  }}>
                  $25
                </Typography>
              </div>
            </div>
            <Divider light style={{ marginTop: '15px' }} />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 17px 0px 0px',
              }}>
              <div>
                <Typography
                  style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    color: '#333333',
                    fontFamily: 'crimson-text',
                  }}>
                  Total
                </Typography>
              </div>
              <div>
                <Typography
                  style={{
                    fontWeight: 'bold',
                    fontSize: '25px',
                    color: '#333333',
                    fontFamily: 'crimson-text',
                  }}>
                  $145
                </Typography>
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid xs={1}></Grid>
      </Grid>
    </div>
  );
};

export default injectWithObserver(BookingSummaryComponent);
