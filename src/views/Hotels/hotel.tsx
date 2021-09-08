import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import hotel from '../../assets/Blog image - 1@2x.png';
import { Button, Typography } from '@material-ui/core';
import RatingPng from '../../assets/Icon awesome-star@2x.png';
import EmptyRatingPng from '../../assets/emptyIcon awesome-star@2x.png';
import User from '../../assets/Icon awesome-user@2x.png';
import calanderPng from '../../assets/Icon feather-calendar@2x.png';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import parkingPng from '../../assets/Parking lot@2x.png';
import wifiPng from '../../assets/Wifi@2x.png';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import LinearProgress from '@material-ui/core/LinearProgress';
import TransparentTopBar from '../../TopBar/index';
import { _viewHotelRooms } from '../../services/api/hotels';
import { toJS } from 'mobx';
import { useStore } from '../../mobx/Helpers/UseStore';
import injectWithObserver from '../../utils/injectWithObserver';
import useSnackbar from '../../Hoc/useSnackbar';
import _ from 'lodash';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: '#FFFFFF',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    paper1: {
      borderRadius: '0px 20px 55px #00000015',
    },
    topCard: {
      marginTop: '5%',
    },
    listroot: {
      color: '#1C2460',
      '.MuiListItem-button:hover': {
        backgroundColor: 'none',
      },
    },
  }),
);
function renderRow(props: ListChildComponentProps) {
  const { index, style } = props;

  return (
    <ListItem button style={style} key={index}>
      <div style={{ display: 'flex' }}>
        <Brightness1Icon
          style={{
            width: '10',
            height: '10px',
            color: '#33BBFF',
            marginTop: '10px',
            marginRight: '5px',
          }}
        />
        <ListItemText
          style={{ fontSize: '12px' }}
          secondary={`We collect a security deposit, which is usually the equivalent of 1 night’s stay. This is refundable upon check out provided there is no damage or loss to the apartments and their contents.`}
        />
      </div>
    </ListItem>
  );
}

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
  }),
)(LinearProgress);

function HotelDetails() {
  const classes = useStyles();
  const store = useStore();
  const snackBar = useSnackbar();
  const [hotelsData, sethotelsData] = useState<any>({});
  const [offerData, setofferData] = useState<any>([]);

  const [progress, setProgress] = useState(false);
  const { hotelsearchRequest, viewHotel } = toJS(store.HotelDetails);
  const { sethotelsearchRequest } = store.HotelDetails;
  const viewDetails = () => {
    _viewHotelRooms(viewHotel, function (error: any, response: any) {
      if (error == null) {
        if (response.status === 200 && response.result) {
          sethotelsData(response.result.hotel);
          setofferData(response.result.offers);
          setProgress(false);
        } else if (response.error) {
          setProgress(false);
          sethotelsData({});
          snackBar.show(response.message, 'error', undefined, true, 2000);
        } else {
          setProgress(false);
          sethotelsData({});
        }
      } else if (response == null) {
        setProgress(false);
        sethotelsData({});
        snackBar.show(response.message, 'error', undefined, true, 2000);
      }
    });
  };
  useEffect(() => {
    viewDetails();
  }, []);
  return (
    <>
      <div className={classes.root}>
        <TransparentTopBar
          color='textWhite'
          backgroundColor='blue'
          position='fixed'
        />
        {!_.isEmpty(hotelsData) && (
          <>
            <Grid container spacing={3} className={classes.topCard}>
              <Grid item xs={1}></Grid>
              <Grid item xs={7}>
                <Paper className={classes.paper}>
                  <div style={{ display: 'flex' }}>
                    <Typography style={{ fontWeight: 500, color: '#1C2460' }}>
                      {hotelsData.name} &nbsp; &nbsp;
                    </Typography>
                    <Typography>{hotelsData.cityName}</Typography>
                  </div>
                  <div
                    style={{
                      marginLeft: '10px',
                      display: 'flex',
                      justifyContent: 'flex-start',
                    }}>
                    {Array.from(
                      { length: parseInt(hotelsData.rating) },
                      (x: any, i) => (
                        <>
                          <img
                            alt=''
                            src={RatingPng}
                            style={{
                              width: '20px',
                              height: '20px',
                            }}
                          />
                          &nbsp;
                        </>
                      ),
                    )}
                    {Array.from(
                      { length: 5 - parseInt(hotelsData.rating) },
                      (x: any, i) => (
                        <>
                          <img
                            alt=''
                            src={EmptyRatingPng}
                            style={{
                              width: '20px',
                              height: '20px',
                            }}
                          />
                          &nbsp;
                        </>
                      ),
                    )}
                    &nbsp;
                    <span style={{ color: '#A7A7A7' }}>
                      {hotelsData.rating}
                    </span>
                    <Typography style={{ marginLeft: '10px' }}>
                      152 Reviews
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'nowrap',
                      overflowX: 'auto',
                    }}>
                    {hotelsData?.media.length > 0 &&
                      hotelsData.media.map((item: any) => {
                        return (
                          <img
                            alt=''
                            src={item.uri}
                            style={{
                              height: '250px',
                              width: '350px',
                              marginLeft: '10px',
                            }}
                          />
                        );
                      })}
                  </div>
                </Paper>
                <div style={{ marginTop: '30px', marginBottom: '15px' }}>
                  <Typography
                    style={{
                      color: '#333333',
                      fontWeight: 500,
                      fontSize: '14px',
                      textAlign: 'left',
                    }}>
                    About
                  </Typography>
                </div>
                <Typography>{hotelsData.description.text}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Paper className={classes.paper}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid #00000015',
                    }}>
                    <div>
                      <span style={{ fontSize: '10px' }}>
                        <img
                          alt=''
                          src={calanderPng}
                          style={{ width: '20px', height: '20px' }}></img>
                        Check-in
                      </span>
                      <Typography
                        style={{
                          marginLeft: '15px',
                          color: '#333333',
                          fontSize: '12px',
                          fontWeight: 500,
                        }}>
                        {hotelsearchRequest.checkInDate}
                      </Typography>
                    </div>
                    <div>
                      <span style={{ fontSize: '10px' }}>
                        <img
                          alt=''
                          src={calanderPng}
                          style={{ width: '20px', height: '20px' }}></img>
                        Check-in
                      </span>

                      <Typography
                        style={{
                          marginLeft: '15px',
                          color: '#333333',
                          fontSize: '12px',
                          fontWeight: 500,
                        }}>
                        {hotelsearchRequest.checkOutDate}
                      </Typography>
                    </div>
                    <div>
                      <span style={{ fontSize: '10px' }}>
                        <img
                          alt=''
                          src={User}
                          style={{ width: '20px', height: '20px' }}></img>
                        User
                      </span>
                      <Typography
                        style={{
                          marginLeft: '15px',
                          color: '#333333',
                          fontSize: '12px',
                          fontWeight: 500,
                        }}>
                        {hotelsearchRequest.adults}
                      </Typography>
                    </div>
                  </div>
                  <div style={{ marginTop: '30px' }}>
                    {/* TODO: set Price may start from */}
                    <Typography style={{ textAlign: 'left', fontSize: '12px' }}>
                      Price may start from
                    </Typography>
                    <br />
                    <div style={{ display: 'flex' }}>
                      <Typography style={{ textAlign: 'left' }}>
                        <s>$125</s>
                        <span
                          style={{
                            textAlign: 'left',
                            color: '#1C2460',
                            fontSize: '22px',
                          }}>
                          $120
                        </span>
                        <span style={{ fontSize: 'small' }}>per night</span>
                      </Typography>
                      {/* <span
                        style={{
                          color: '#F02E88',
                          fontSize: '12px',
                          margin: 'auto',
                        }}>
                        30% offer
                      </span> */}
                    </div>
                    <Button
                      variant='contained'
                      fullWidth
                      style={{
                        background: '#DCAB5E',
                        color: '#fff',
                        borderRadius: '5px',
                      }}>
                      Reserve Now
                    </Button>
                  </div>
                  <div
                    style={{
                      justifyContent: 'space-between',
                      display: 'flex',
                    }}>
                    <Button
                      variant='contained'
                      style={{
                        background: '#F2FFFD',
                        color: '#09B7A3',
                        borderRadius: '10px',
                        marginTop: '20px',
                        fontSize: '10px',
                      }}>
                      Free Cancellation till check-in
                    </Button>
                    <Typography
                      style={{
                        textDecoration: 'underline',
                        color: '#09B7A3',
                        fontSize: '10px',
                        margin: 'auto',
                        top: '10px',
                        position: 'relative',
                      }}>
                      View Policy
                    </Typography>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={1}></Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={1}></Grid>
              <Grid item xs={7}>
                {offerData.map((item: any) => {
                  return (
                    <Paper className={classes.paper}>
                      <div style={{ justifyContent: 'start', display: 'flex' }}>
                        <img
                          alt=''
                          src={hotel}
                          style={{ height: '200px', width: '250px' }}></img>
                        <div style={{ width: '400px' }}>
                          <Typography
                            style={{
                              marginLeft: '20px',
                              color: '#1C2460',
                              fontSize: '16px',
                              fontWeight: 500,
                              textAlign: 'left',
                            }}>
                            {item.room.typeEstimated.category}
                          </Typography>
                          <List
                            component='nav'
                            aria-label='main mailbox folders'
                            className={classes.listroot}>
                            <ListItem button>
                              <img
                                alt=''
                                src={parkingPng}
                                style={{
                                  width: '25px',
                                  height: '25px',
                                  marginLeft: '5px',
                                }}></img>
                              <ListItemText
                                secondary='Parking'
                                style={{ marginLeft: '10px' }}
                              />
                            </ListItem>
                            <ListItem button>
                              <img
                                alt=''
                                src={wifiPng}
                                style={{
                                  width: '25px',
                                  height: '25px',
                                  marginLeft: '5px',
                                }}></img>
                              <ListItemText
                                secondary='WiFi'
                                style={{ marginLeft: '10px' }}
                              />
                            </ListItem>
                          </List>
                        </div>
                        <div>
                          <Typography
                            style={{
                              fontSize: '22px',
                              fontWeight: 500,
                              color: '#1C2460',
                            }}>
                            {`${item.price.currency}  ${item.price.total}`}
                            <span
                              style={{
                                fontSize: '10px',
                                fontWeight: 0,
                                color: '#1C2460',
                              }}>
                              per night
                            </span>
                          </Typography>
                          <br />
                          <Typography style={{ color: '#1C2460' }}>
                            {item.price.taxes && item.price.taxes.length > 0
                              ? ' *Includes Taxes and Fees'
                              : ' *Excludes Taxes and Fees'}
                          </Typography>
                          <br />
                          <Button
                            variant='contained'
                            style={{
                              background: '#DCAB5E',
                              color: '#fff',
                              borderRadius: '5px',
                            }}>
                            Select Room
                          </Button>
                        </div>
                      </div>
                    </Paper>
                  );
                })}
              </Grid>
              <Grid item xs={3} className={classes.paper1}>
                <Paper className={classes.paper1}>
                  <Typography
                    style={{
                      marginLeft: '20px',
                      color: '#1C2460',
                      fontSize: '16px',
                      fontWeight: 500,
                      textAlign: 'left',
                    }}>
                    Amenities
                  </Typography>
                  <List component='nav' aria-label='main mailbox folders'>
                    {hotelsData.amenities &&
                      hotelsData.amenities.length > 0 &&
                      hotelsData.amenities.map((item: any) => {
                        return (
                          <ListItem button className={classes.listroot}>
                            <img
                              alt=''
                              src={parkingPng}
                              style={{
                                width: '25px',
                                height: '25px',
                                marginLeft: '5px',
                              }}></img>
                            <ListItemText
                              secondary={item}
                              style={{ marginLeft: '10px' }}
                            />
                          </ListItem>
                        );
                      })}
                  </List>
                  <div
                    style={{
                      textAlign: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                      color: '#4BAFC9',
                      padding: '15px 0px 15px',
                      borderTop: '1px solid #DDDDDD',
                    }}>
                    <Typography>View All</Typography>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={1}></Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={1}></Grid>
              <Grid item xs={10}>
                <Typography
                  style={{
                    textAlign: 'left',
                    fontSize: '22px',
                    fontWeight: 500,
                    color: '#1C2460',
                  }}>
                  House Rules
                </Typography>
                <div style={{ marginTop: '20px' }}>
                  <FixedSizeList
                    height={200}
                    width={800}
                    itemSize={46}
                    itemCount={8}>
                    {renderRow}
                  </FixedSizeList>
                </div>
              </Grid>
              <Grid item xs={1}></Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={1}></Grid>
              <Grid item xs={10}>
                <Typography
                  style={{
                    textAlign: 'left',
                    fontSize: '20px',
                    fontWeight: 500,
                    color: '#1C2460',
                  }}>
                  Cleanliness Policies
                </Typography>
                <Typography>
                  This property advises that enhanced cleaning and guest safety
                  measures are currently in place.
                </Typography>
              </Grid>
              <Grid item xs={1}></Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={1}></Grid>
              <Grid item xs={2}>
                <List component='nav' aria-label='main mailbox folders'>
                  <ListItem button className={classes.listroot}>
                    <CheckCircleIcon
                      style={{
                        width: '12px',
                        height: '12px',
                        color: '#33BBFF',
                      }}
                    />
                    <ListItemText
                      secondary='Parking'
                      style={{ marginLeft: '10px' }}
                    />
                  </ListItem>
                  <ListItem button>
                    <CheckCircleIcon
                      style={{
                        width: '12px',
                        height: '12px',
                        color: '#33BBFF',
                      }}
                    />
                    <ListItemText
                      secondary='WiFi'
                      style={{ marginLeft: '10px' }}
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={2}>
                <List component='nav' aria-label='main mailbox folders'>
                  <ListItem button className={classes.listroot}>
                    <CheckCircleIcon
                      style={{
                        width: '12px',
                        height: '12px',
                        color: '#33BBFF',
                      }}
                    />
                    <ListItemText
                      secondary='Parking'
                      style={{ marginLeft: '10px' }}
                    />
                  </ListItem>
                  <ListItem button>
                    <CheckCircleIcon
                      style={{
                        width: '12px',
                        height: '12px',
                        color: '#33BBFF',
                      }}
                    />
                    <ListItemText
                      secondary='WiFi'
                      style={{ marginLeft: '10px' }}
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={2}>
                <List component='nav' aria-label='main mailbox folders'>
                  <ListItem button className={classes.listroot}>
                    <CheckCircleIcon
                      style={{
                        width: '12px',
                        height: '12px',
                        color: '#33BBFF',
                      }}
                    />
                    <ListItemText
                      secondary='Parking'
                      style={{ marginLeft: '10px' }}
                    />
                  </ListItem>
                  <ListItem button>
                    <CheckCircleIcon
                      style={{
                        width: '12px',
                        height: '12px',
                        color: '#33BBFF',
                      }}
                    />
                    <ListItemText
                      secondary='WiFi'
                      style={{ marginLeft: '10px' }}
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={7}></Grid>
            </Grid>
            {Array.from({ length: 4 }, (x: any, i) => (
              <Grid container spacing={3}>
                <Grid item xs={1}></Grid>
                <Grid item xs={8}>
                  <div style={{ display: 'flex' }}>
                    <div>
                      <Avatar
                        alt='Remy Sharp'
                        src='/static/images/avatar/1.jpg'
                      />
                    </div>
                    <div style={{ width: '800px' }}>
                      <Typography
                        style={{
                          textAlign: 'left',
                          fontSize: '16px',
                          fontWeight: 500,
                          color: '#1C2460',
                          marginLeft: '10px',
                        }}>
                        Vincent Ford
                        <span
                          style={{
                            textAlign: 'left',
                            fontSize: '10px',
                            fontWeight: 0,
                          }}>
                          01, July, 2021
                        </span>
                      </Typography>
                      <div
                        style={{
                          marginLeft: '10px',
                          display: 'flex',
                          justifyContent: 'flex-start',
                        }}>
                        <Button
                          variant='contained'
                          style={{
                            background: '#F2FFFD',
                            color: '#09B7A3',
                            borderRadius: '10px',
                            fontSize: '10px',
                            height: '15px',
                            marginTop: '5px',
                          }}>
                          Cleanliness
                        </Button>
                        &nbsp;
                        <img
                          alt=''
                          src={RatingPng}
                          style={{ width: '20px', height: '20px' }}></img>
                        &nbsp;
                        <img
                          alt=''
                          src={RatingPng}
                          style={{ width: '20px', height: '20px' }}></img>
                        &nbsp;
                        <img
                          alt=''
                          src={RatingPng}
                          style={{ width: '20px', height: '20px' }}></img>
                        &nbsp;
                        <img
                          alt=''
                          src={RatingPng}
                          style={{ width: '20px', height: '20px' }}></img>
                        &nbsp; 4.0
                        <Typography style={{ marginLeft: '10px' }}>
                          152 Reviews
                        </Typography>
                      </div>
                      <br />
                      <Typography>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero
                        eos et accusam et justo duo dolores et ea rebum. Stet
                        clita kasd gubergren, no sea takimata sanctus est.
                      </Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={3}></Grid>
              </Grid>
            ))}
            <Grid container spacing={3}>
              <Grid item xs={1}></Grid>
              <Grid item xs={10}>
                <Typography
                  style={{
                    textAlign: 'left',
                    fontSize: '20px',
                    fontWeight: 500,
                    color: '#1C2460',
                  }}>
                  Reviews
                </Typography>
              </Grid>
              <Grid item xs={1}></Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={1}></Grid>
              <Grid item xs={1}>
                <Typography>Cleanliness</Typography>
              </Grid>
              <Grid item xs={2}>
                <BorderLinearProgress variant='determinate' value={20} />
              </Grid>
              <Grid item xs={1}>
                <Typography>Cleanliness</Typography>
              </Grid>
              <Grid item xs={2}>
                <BorderLinearProgress variant='determinate' value={20} />
              </Grid>
              <Grid item xs={6}></Grid>
            </Grid>
          </>
        )}
      </div>
    </>
  );
}
export default injectWithObserver(HotelDetails);
