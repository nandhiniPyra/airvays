import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Box, Divider, Typography } from '@material-ui/core';
import download from '../../assets/Icon feather-download@2x.png';
import injectWithObserver from '../../utils/injectWithObserver';
import _ from 'lodash';
import TransparentTopBar from '../../TopBar/index';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: '#FFFFFF',
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      borderRadius: '10px',
    },
    subHeading: {
      fontSize: '15px',
      color: '#333333',
      opacity:'50%',
      fontFamily: 'CrimsonText-Regular',
    },
    subTitle: {
      fontSize: '17px',
      fontFamily: 'CrimsonText-Regular',
      color: ' #333333',
      marginTop: '5px',
    },
  }),
);

const HotelSummary = () => {
    const classes = useStyles();

    return (
      <>
      <TransparentTopBar color='textWhite' backgroundColor='blue' />
        <div className={classes.root}>
        <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={6}>
          <Grid container spacing={3} id={'topdf'}>
            <Grid item xs={12}>
              <Grid container spacing={3} style={{marginBottom:'10px'}}>
                <Grid item xs={6}>
                  <Typography
                    style={{
                      textAlign: 'left',
                      fontSize: '15px',
                      fontWeight: 'bold',
                      color: '#1C2460',
                      fontFamily: 'AvantGarde-Demi',
                      marginTop:'15%'
                    }}>
                    Booking Summary
                  </Typography>
                </Grid>
                <Grid item xs={6} style={{textAlign:'right'}}>
                    <div
                      style={{
                        color: '#4BAFC9',
                        fontSize: '13px',
                        alignItems: 'center',
                        marginTop:'15%'
                      }}>
                              <img
                                src={download}
                                style={{
                                  height: '19px',
                                  marginRight: '9px',
                                  cursor: 'pointer',
                                }}
                                alt='download'
                              />
                              <span style={{fontFamily:'AvantGarde-Demi'}}>Download PDF</span>
                    </div>
                </Grid>
              </Grid>
              <Paper
                  className={classes.paper}
                  style={{ boxShadow: '0px 20px 55px #00000015' }}
                  >
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography
                        style={{
                          textAlign: 'left',
                          fontSize: '15px',
                          fontWeight: 500,
                          color: '#33BBFF',
                          paddingLeft: '10px',
                          fontFamily:'AvantGarde-Demi'
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
                        Jane Richards
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
                        sofiajane@gmail.com
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
                        FL8169ID43
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
                          fontSize: '15px',
                          color: '#33BBFF',
                          marginTop: '10px',
                          paddingLeft: '10px',
                          fontFamily:'AvantGarde-Demi'
                        }}>
                        Accommodation Info
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
                    <Grid item xs={6}>
                      <Typography className={classes.subHeading}>
                      Accommodation Name
                      </Typography>
                      <p className={classes.subTitle}>
                      Plush Penthouse With Private Plunge Pool
                        </p>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className={classes.subHeading}>
                      Check-in
                      </Typography>
                      <p className={classes.subTitle}>
                      18.05.21 at 09:00 am
                      </p>
                    </Grid>
                    </Grid>
                    <Grid
                    container
                    style={{
                      display: 'flex',
                      padding: '10px',
                    }}
                    spacing={3}>
                    <Grid item xs={6}>
                      <Typography className={classes.subHeading}>
                      Accommodation Type
                      </Typography>
                      <p className={classes.subTitle}>
                      Penthouse
                        </p>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className={classes.subHeading}>
                      Check-out
                      </Typography>
                      <p className={classes.subTitle}>
                      28.05.21 at 09:00 am
                      </p>
                    </Grid>
                    </Grid>      
                    <Grid
                    container
                    style={{
                      display: 'flex',
                      padding: '10px',
                    }}
                    spacing={3}>
                    <Grid item xs={6}>
                      <Typography className={classes.subHeading}>
                      Status
                      </Typography>
                      <p className={classes.subTitle}>
                      Confirmed
                        </p>
                    </Grid>
                    <Grid item xs={6} container>
                     <Grid item xs={6}>
                      <Typography className={classes.subHeading}>
                      Room Number
                      </Typography>
                      <p className={classes.subTitle}>
                      -
                      </p>
                      </Grid>
                      <Grid item xs={6}>
                      <Typography className={classes.subHeading}>
                      No. Of Guests
                      </Typography>
                      <p className={classes.subTitle}>
                      4
                      </p>
                      </Grid>
                    </Grid>
                    </Grid> 
            </Paper>
            </Grid>
            </Grid>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid
          item
          xs={3}
          style={{ marginTop: '7%' }}>
          <Paper
            className={classes.paper}
            style={{ boxShadow: '0px 20px 55px #00000015' }}>
            <div>
              <Typography
                style={{
                  textAlign: 'left',
                  color: '#33BBFF',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  fontFamily: 'AvantGarde-Demi',
                }}>
                Price Details
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
                    fontSize: '15px',
                    color: '#333333',
                    fontFamily: 'CrimsonText-Regular',
                  }}>
                  1 Room *10 Nights
                  <div style={{color:'#707070', fontFamily:'CrimsonText-Regular', fontSize:'12px'}}>$120 per night</div>
                </Typography>
              </div>
              <div>
                <Typography
                  style={{
                    fontSize: '15px',
                    color: '#333333',
                    fontFamily: 'CrimsonText-Regular',
                  }}>
                  $780
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
                    fontSize: '15px',
                    color: '#333333',
                    fontFamily: 'CrimsonText-Regular',
                  }}>
                  Total Tax
                </Typography>
              </div>
              <div>
                <Typography
                  style={{
                    fontSize: '15px',
                    color: '#333333',
                    fontFamily: 'CrimsonText-Regular',
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
                    fontSize: '15px',
                    color: '#333333',
                    fontFamily: 'CrimsonText-bold',
                  }}>
                  Total
                </Typography>
              </div>
              <div>
                <Typography
                  style={{
                    fontSize: '15px',
                    color: '#333333',
                    fontFamily: 'CrimsonText-bold',
                  }}>
                  $145
                </Typography>
              </div>
            </div>
          </Paper>
        </Grid>
            </Grid>
            </div>
           </> )
};

export default injectWithObserver(HotelSummary);