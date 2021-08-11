import React from 'react';
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
import User from '../../assets/Icon awesome-user@2x.png';
import calanderPng from '../../assets/Icon feather-calendar@2x.png';
import offerPng from '../../assets/Offer@2x.png';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import parkingPng from '../../assets/Parking lot@2x.png';
import wifiPng from '../../assets/Wifi@2x.png';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import LinearProgress from '@material-ui/core/LinearProgress';

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
      // height: '400px',
      // background: 'red',
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

export default function HotelDetails() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.topCard}>
        <Grid item xs={1}></Grid>
        <Grid item xs={7}>
          <Paper className={classes.paper}>
            <div style={{ display: 'flex' }}>
              <Typography style={{ fontWeight: 500, color: '#1C2460' }}>
                Plush Penthouse With Private Plunge Pool
              </Typography>
              <Typography>Nerul, Goa</Typography>
            </div>
            <div
              style={{
                marginLeft: '10px',
                display: 'flex',
                justifyContent: 'flex-start',
              }}>
              <img
                alt=''
                src={RatingPng}
                style={{ width: '20px', height: '20px' }}></img>{' '}
              &nbsp;
              <img
                src={RatingPng}
                style={{ width: '20px', height: '20px' }}></img>{' '}
              &nbsp;
              <img
                src={RatingPng}
                style={{ width: '20px', height: '20px' }}></img>{' '}
              &nbsp;
              <img
                src={RatingPng}
                style={{ width: '20px', height: '20px' }}></img>
              &nbsp; 4.0
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
              <img
                src={hotel}
                style={{
                  height: '250px',
                  width: '350px',
                  marginLeft: '10px',
                }}></img>
              <img
                src={hotel}
                style={{
                  height: '250px',
                  width: '350px',
                  marginLeft: '10px',
                }}></img>
              <img
                src={hotel}
                style={{
                  height: '250px',
                  width: '350px',
                  marginLeft: '10px',
                }}></img>
              <img
                src={hotel}
                style={{
                  height: '250px',
                  width: '350px',
                  marginLeft: '10px',
                }}></img>
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
          <Typography>
            Our luxury Penthouse is located in the quaint village of Nerul,
            overlooking green paddy fields and Nerul River. It has a sprawling
            bedroom with stunning views and an en-suite bathroom. There is also
            a sleek and well styled kitchen with modern fixtures and is fully
            equipped with all the essentials. The best part of this Penthouse is
            the gorgeous plunge pool, for your private use, and a lovely and
            spacious terrace to enjoy those amazing sunsets. The perfect
            romantic getaway!
          </Typography>
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
                  18/05/21
                </Typography>
              </div>
              <div>
                <span style={{ fontSize: '10px' }}>
                  <img
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
                  18/05/21
                </Typography>
              </div>
              <div>
                <span style={{ fontSize: '10px' }}>
                  <img
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
                  3
                </Typography>
              </div>
            </div>
            <div style={{ marginTop: '30px' }}>
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
                <span
                  style={{
                    color: '#F02E88',
                    fontSize: '12px',
                    margin: 'auto',
                  }}>
                  30% offer
                </span>
                {/* <img src={offerPng} style={{width:'10px',height:'10px'}}> </img> */}
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
          {Array.from({ length: 3 }, (x: any, i) => (
            <Paper className={classes.paper}>
              <div style={{ justifyContent: 'start', display: 'flex' }}>
                <img
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
                    Luxury Suite, Pool View
                  </Typography>
                  <List
                    component='nav'
                    aria-label='main mailbox folders'
                    className={classes.listroot}>
                    <ListItem button>
                      <img
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
                    $399
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
                    *Excludes Taxes and Fees
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
          ))}
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
              {' '}
              Amenities
            </Typography>
            <List component='nav' aria-label='main mailbox folders'>
              <ListItem button className={classes.listroot}>
                <img
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
                  src={wifiPng}
                  style={{
                    width: '25px',
                    height: '25px',
                    marginLeft: '5px',
                  }}></img>
                <ListItemText secondary='WiFi' style={{ marginLeft: '10px' }} />
              </ListItem>
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
            <FixedSizeList height={200} width={800} itemSize={46} itemCount={8}>
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
                style={{ width: '12px', height: '12px', color: '#33BBFF' }}
              />
              <ListItemText
                secondary='Parking'
                style={{ marginLeft: '10px' }}
              />
            </ListItem>
            <ListItem button>
              <CheckCircleIcon
                style={{ width: '12px', height: '12px', color: '#33BBFF' }}
              />
              <ListItemText secondary='WiFi' style={{ marginLeft: '10px' }} />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={2}>
          <List component='nav' aria-label='main mailbox folders'>
            <ListItem button className={classes.listroot}>
              <CheckCircleIcon
                style={{ width: '12px', height: '12px', color: '#33BBFF' }}
              />
              <ListItemText
                secondary='Parking'
                style={{ marginLeft: '10px' }}
              />
            </ListItem>
            <ListItem button>
              <CheckCircleIcon
                style={{ width: '12px', height: '12px', color: '#33BBFF' }}
              />
              <ListItemText secondary='WiFi' style={{ marginLeft: '10px' }} />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={2}>
          <List component='nav' aria-label='main mailbox folders'>
            <ListItem button className={classes.listroot}>
              <CheckCircleIcon
                style={{ width: '12px', height: '12px', color: '#33BBFF' }}
              />
              <ListItemText
                secondary='Parking'
                style={{ marginLeft: '10px' }}
              />
            </ListItem>
            <ListItem button>
              <CheckCircleIcon
                style={{ width: '12px', height: '12px', color: '#33BBFF' }}
              />
              <ListItemText secondary='WiFi' style={{ marginLeft: '10px' }} />
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
                <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
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
                  Vincent Ford{' '}
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
                    src={RatingPng}
                    style={{ width: '20px', height: '20px' }}></img>{' '}
                  &nbsp;
                  <img
                    src={RatingPng}
                    style={{ width: '20px', height: '20px' }}></img>{' '}
                  &nbsp;
                  <img
                    src={RatingPng}
                    style={{ width: '20px', height: '20px' }}></img>{' '}
                  &nbsp;
                  <img
                    src={RatingPng}
                    style={{ width: '20px', height: '20px' }}></img>
                  &nbsp; 4.0
                  <Typography style={{ marginLeft: '10px' }}>
                    152 Reviews
                  </Typography>
                </div>
                <br />
                <Typography>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est.
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
    </div>
  );
}
