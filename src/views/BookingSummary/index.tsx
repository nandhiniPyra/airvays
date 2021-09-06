import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Box, Divider, Typography } from '@material-ui/core';
import download from '../../assets/Icon feather-download@2x.png';
import spicejet from '../../assets/Spicejet@2x.png';

const ReactToPdf = require('react-to-pdf');

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

  // const options = {
  //     orientation: 'landscape',
  //     unit: 'in',
  //     format: [4, 2]
  // };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={1}></Grid>
        <Grid item xs={7}>
          <Grid container spacing={3}>
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
                      style={{
                        color: '#4BAFC9',
                        fontSize: '17px',
                        alignItems: 'center',
                      }}>
                      {/* React To Pdf */}
                      <ReactToPdf
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
                      </ReactToPdf>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
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
                      <p className={classes.subTitle}>Jane Richards</p>
                    </div>
                  </Grid>
                  <Grid xs={5}>
                    <div>
                      <Typography className={classes.subHeading}>
                        E-mail address
                      </Typography>
                    </div>
                    <div>
                      <p className={classes.subTitle}>sofiajane@gmail.com</p>
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <div>
                      <Typography className={classes.subHeading}>
                        Reservation ID
                      </Typography>
                    </div>
                    <div>
                      <p className={classes.subTitle}>FL8169ID43</p>
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
                        SG-8169
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.subHeading}>
                      Departure Terminal
                    </Typography>
                    <p className={classes.subTitle}>Chennai (MAA) Terminal 1</p>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography className={classes.subHeading}>
                      Date & Time
                    </Typography>
                    <div className={classes.subTitle}>
                      18.05.21 at 09:05{' '}
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
                      <p className={classes.subTitle}>Economy</p>
                    </div>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.subHeading}>
                      Arrival Terminal
                    </Typography>
                    <div>
                      <p className={classes.subTitle}>
                        Bangalore Intl. (BLR) Terminal 3
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography className={classes.subHeading}>
                      Date & Time
                    </Typography>
                    <div className={classes.subTitle}>
                      18.05.21 at 09:45{' '}
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
                      Total : 2
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  style={{
                    padding: '10px',
                  }}
                  spacing={6}>
                  <Grid item xs={4}>
                    <Typography className={classes.subHeading}>Name</Typography>
                    <div>
                      <p className={classes.subTitle}>Jane Richards</p>
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography className={classes.subHeading}>
                      Gender
                    </Typography>
                    <div>
                      <p className={classes.subTitle}>Female</p>
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
                <Grid
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
                </Grid>
              </Paper>
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

export default BookingSummaryComponent;
