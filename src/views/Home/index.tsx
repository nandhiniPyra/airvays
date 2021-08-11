import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import bgImage from '../../assets/homeBg.png';
import logo from '../../assets/Logo@2x.png';
import flightillustration from '../../assets/Illustration@2x.png';
import cloudillustration1 from '../../assets/Illustration 2@2x.png';
import cloudillustration2 from '../../assets/illustration 1@2x.png';
import blog1 from '../../assets/Blog image - 1@2x.png';
import blog2 from '../../assets/Blog image - 2@2x.png';
import blog3 from '../../assets/Blog image - 3@2x.png';
import message from '../../assets/Message@2x.png';
import LoginContainer from '../Login/Login';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import { Omit } from '@material-ui/types';
import SearchComponent from '../SearchComponent';
import {
  Button,
  GridList,
  GridListTile,
  GridListTileBar,
  ListSubheader,
} from '@material-ui/core';
import SingaporeLogo from '../../assets/icons8-singapore-48.png';
import Giraffe from '../../assets/mo-baghdadi-FCK6ktqZWqQ-unsplash@2x.png';
import Rica from '../../assets/pexels-alexandr-podvalny-3278212@2x.png';
import NewZealand from '../../assets/pexels-alexandr-podvalny-32782152@2x.png';
import Paris from '../../assets/pexels-alexandr-podvalny-3278215@2x.png';
import Egypt from '../../assets/pexels-alexandr-podvalny-3278213@2x.png';
import rightArrow from '../../assets/right-arrow@2x.png';
import twitter from '../../assets/Twitter@2x.png';
import facebook from '../../assets/Facebook@2x.png';
import instagram from '../../assets/Instagram@2x.png';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 0,
      paddingTop: 0,
      height: 800,
      backgroundImage: `url(${bgImage})`,
      backgroundSize: ' 100%',
      backgroundRepeat: 'no-repeat',
      width: '100%',
    },
    _rowHead: {
      marginTop: '15px',
      paddingTop: 0,
    },

    grow: {
      display: 'flex',
      // flexGrow: 1,
    },
    _ml15: {
      marginLeft: '45px',
      color: '#1C2460',
      fontSize: 16,
      fontWeight: 300,
      // flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    date_picker: {
      '& .MuiInputBase-root': {
        padding: 0,
        border: '1px solid #bfb7b7',
        borderRadius: '5px',
        width: '160px',
        bottom: '15px',
        height: '55px',
        '& .MuiButtonBase-root': {
          padding: 0,
          paddingLeft: 10,
        },
        '& .MuiInputBase-input': {
          padding: 15,
          paddingLeft: 0,
        },
        '& .MuiOutlinedInput-notchedOutline': {
          // border: 'none'
        },
        '& .MuiSvgIcon-root': {
          color: '#33bbff',
        },
      },
    },
    grid_root: {
      display: 'flex',
      flexWrap: 'wrap',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
    mid_div: {
      background: '#64AAC6',
      height: '382px',
    },
    listroot: {
      color: '#1C2460',
      '.MuiListItem-button:hover': {
        backgroundColor: 'none',
      },
    },
    tittle_text: {
      marginLeft: '15px',
      fontWeight: 550,
      fontSize: 20,
    },
    imgRoot: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      marginTop: '15px',
    },
    gridListImg: {
      width: 1400,
      // height: 1000,
    },
    gridListImage: {
      width: 520,
      // height: 1000,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  }),
);
let initialstate = {
  from: '',
  to: '',
  currencyCode: 'INR',
  type: 'one-way',
  from_date: null,
  to_date: null,
  no_of_people: {
    adults: 0,
    children: 0,
    infants: 0,
  },
  class: 'ECONOMY',
};

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to],
  );
  const classes = useStyles();

  return (
    <li>
      <ListItem component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} className={classes.listroot} />
      </ListItem>
    </li>
  );
}

export default function HomePage() {
  const classes = useStyles();
  const key = window.location.search;
  const urlParams = new URLSearchParams(key);
  const url_code = urlParams.get('oobCode') || '';

  return (
    <>
      <div className={classes.root}>
        <div
          style={{
            margin: 0,
            top: 'auto',
            right: 90,
            bottom: 20,
            left: 'auto',
            position: 'fixed',
          }}>
          <img alt='' style={{ height: '70%', width: '70%' }} src={message} />
        </div>
        <Grid container spacing={3} className={classes._rowHead}>
          <Grid item xs={1}></Grid>
          <Grid item xs={4}>
            <img alt='' src={logo}></img>
          </Grid>
          <Grid item xs={6}>
            <div
              className={classes.grow}
              style={{ float: 'right', marginTop: '40px' }}>
              <div className={classes._ml15}>Explore</div>
              <div className={classes._ml15}>Help</div>
              <div
                className={classes._ml15}
                style={{ bottom: '18px', position: 'relative' }}>
                {' '}
                <img
                  alt=''
                  style={{ padding: '6px', fontSize: '3px' }}
                  src={SingaporeLogo}
                />
                <span>Singapore</span>
              </div>
              <div className={classes._ml15}>SGD</div>
              <div className={classes._ml15}>
                <div
                  style={{
                    background: 'transparent',
                    bottom: '10px',
                    position: 'relative',
                  }}>
                  <LoginContainer
                    url_code={url_code}
                    resetpassword={url_code !== '' ? true : false}
                  />
                </div>
              </div>
            </div>
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              textAlign: 'center',
              marginTop: '70px',
              color: '#1C2460',
            }}>
            <Typography
              style={{
                fontWeight: 600,
                fontSize: '24px',
                fontFamily: 'AvantGarde-Demi',
              }}>
              Always say yes to new adventures.
            </Typography>
            <Typography style={{ marginTop: '12px' }}>
              Plan your adventure with us !
            </Typography>
          </Grid>
          <SearchComponent request={{ ...initialstate }} type='flight' />
        </Grid>
      </div>
      <div className={classes.grid_root}>
        <Grid container style={{ marginTop: '100px' }}>
          <Grid item xs={1}></Grid>
          <Grid
            container
            item
            xs={10}
            style={{
              color: '#1C2460',
              fontWeight: 'bold',
              fontSize: '20px',
              fontFamily: 'Demi',
            }}>
            <div>
              Best Places to Travel
              <Divider
                style={{
                  backgroundColor: '#33bbff',
                  width: '25px',
                  height: '2px',
                  marginBottom: '25px',
                }}></Divider>
            </div>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
        <Grid container style={{ marginBottom: '100px' }}>
          <Grid item xs={1}></Grid>
          <Grid container item xs={10}>
            <div className={classes.imgRoot}>
              <Grid container>
                <GridList
                  cellHeight={300}
                  spacing={30}
                  // className={classes.gridListImg}
                >
                  <GridListTile style={{ width: 700 }}>
                    <img alt='' src={Giraffe} />
                    <GridListTileBar title={'Giraffe Manor, Nairobi, Kenya'} />
                  </GridListTile>

                  <GridListTile style={{ width: 500 }}>
                    <img alt='' src={Rica} />
                    <GridListTileBar title={'Costa Rica'} />
                  </GridListTile>
                </GridList>
              </Grid>
              <Grid container>
                <GridList
                  cellHeight={300}
                  spacing={30}
                  // className={classes.gridListImage}
                >
                  <GridListTile
                    key='Subheader'
                    cols={4}
                    style={{ height: 'auto' }}>
                    <ListSubheader component='div'></ListSubheader>
                  </GridListTile>
                  <GridListTile style={{ width: 400 }}>
                    <img alt='' src={NewZealand} />
                    <GridListTileBar title={'New Zealand'} />
                  </GridListTile>
                  <GridListTile style={{ width: 400 }}>
                    <img alt='' src={Paris} />
                    <GridListTileBar title={'Paris, France'} />
                  </GridListTile>
                  <GridListTile style={{ width: 400 }}>
                    <img alt='' src={Egypt} />
                    <GridListTileBar title={'Egypt'} />
                  </GridListTile>
                </GridList>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </div>
      <div className={classes.grid_root}>
        <Grid container spacing={3} className={classes.mid_div}>
          <Grid item xs={4} sm={4}>
            <img
              alt=''
              src={flightillustration}
              style={{
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '80%',
                height: '360px',
              }}></img>
          </Grid>
          <Grid item xs={5} sm={5}>
            <div style={{ marginTop: '110px', marginLeft: '15px' }}>
              <Typography
                style={{ color: '#FFFFFF', fontSize: '26px', fontWeight: 800 }}>
                Are you waiting for the price to drop?
              </Typography>

              <Typography
                style={{
                  color: '#FFFFFF',
                  marginLeft: '45px',
                  marginTop: '10px',
                }}>
                Turn on our price alert to get notified weekly !
              </Typography>
              <br />
              <div>
                <Button
                  style={{
                    left: '150px',
                    backgroundColor: '#FFFF',
                    color: '#4BAFC9',
                    height: '30px',
                    // width: "60px",
                  }}>
                  Get Started
                </Button>
              </div>
            </div>
          </Grid>
          <Grid item xs={3} sm={3}>
            <div>
              <img
                alt=''
                style={{
                  width: '125px',
                  height: '60px',
                  position: 'relative',
                  right: '100px',
                  // float: "right",
                  top: '10px',
                }}
                src={cloudillustration2}></img>
            </div>
            <div>
              <img
                alt=''
                style={{
                  width: '100px',
                  height: '150px',
                  position: 'relative',
                  left: '170px',
                  top: '140px',
                }}
                src={cloudillustration1}></img>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className={classes.grid_root}>
        <Grid container style={{ marginTop: '50px' }}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={8}>
                  <Typography
                    style={{
                      color: '#1C2460',
                      fontWeight: 'bold',
                      fontSize: '20px',
                      fontFamily: 'Demi',
                      marginLeft: '15px',
                    }}>
                    Latest Blog
                    <Divider
                      style={{
                        backgroundColor: '#33bbff',
                        width: '25px',
                        height: '2px',
                        marginBottom: '25px',
                      }}></Divider>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <div
                    style={{
                      fontSize: '14px',
                      textAlign: 'right',
                      color: '#4BAFC9',
                      marginRight: '12px',
                      fontFamily: 'Crimson Text',
                    }}>
                    View All
                  </div>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={4} sm={4}>
                <div className={classes.paper}>
                  <img
                    alt=''
                    style={{ height: '250', width: '350px' }}
                    src={blog1}
                  />
                  <br />
                  <div style={{ marginTop: '15px', color: '#1C2460' }}>
                    Maldives - May 03, 2020
                  </div>
                  <Typography
                    style={{
                      marginTop: '7px',
                      fontSize: '22px',
                      fontWeight: 550,
                      color: '#1C2460',
                    }}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                    nonumy.
                  </Typography>

                  <Typography
                    style={{
                      letterSpacing: 0,
                      marginTop: '10px',
                      textAlign: 'left',
                      fontSize: '15px',
                      color: '#1C2460',
                    }}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum
                  </Typography>
                  <Typography
                    style={{
                      letterSpacing: 0,
                      marginTop: '10px',
                      textAlign: 'left',
                      fontSize: '15px',
                      color: '#4BAFC9',
                    }}>
                    Read More
                    <img
                      alt=''
                      style={{ paddingLeft: '8px', width: '30px' }}
                      src={rightArrow}
                    />
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={4} sm={4}>
                <div className={classes.paper}>
                  <img
                    alt=''
                    style={{ height: '250', width: '350px' }}
                    src={blog2}
                  />
                  <br />
                  <div style={{ marginTop: '15px', color: '#1C2460' }}>
                    Maldives - May 03, 2020
                  </div>
                  <Typography
                    style={{
                      marginTop: '7px',
                      fontSize: '22px',
                      fontWeight: 550,
                      color: '#1C2460',
                    }}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                    nonumy.
                  </Typography>

                  <Typography
                    style={{
                      letterSpacing: 0,
                      marginTop: '10px',
                      textAlign: 'left',
                      fontSize: '15px',
                      color: '#1C2460',
                    }}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum
                  </Typography>
                  <Typography
                    style={{
                      letterSpacing: 0,
                      marginTop: '10px',
                      textAlign: 'left',
                      fontSize: '15px',
                      color: '#4BAFC9',
                    }}>
                    Read More
                    <img
                      alt=''
                      style={{ paddingLeft: '8px', width: '30px' }}
                      src={rightArrow}
                    />
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={4} sm={4}>
                <div className={classes.paper}>
                  <img
                    alt=''
                    style={{ height: '250', width: '350px' }}
                    src={blog3}
                  />
                  <br />
                  <div style={{ marginTop: '15px', color: '#1C2460' }}>
                    Maldives - May 03, 2020
                  </div>
                  <Typography
                    style={{
                      marginTop: '7px',
                      fontSize: '22px',
                      fontWeight: 550,
                      color: '#1C2460',
                    }}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                    nonumy.
                  </Typography>

                  <Typography
                    style={{
                      letterSpacing: 0,
                      marginTop: '10px',
                      textAlign: 'left',
                      fontSize: '15px',
                      color: '#1C2460',
                    }}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum
                  </Typography>
                  <Typography
                    style={{
                      letterSpacing: 0,
                      marginTop: '10px',
                      textAlign: 'left',
                      fontSize: '15px',
                      color: '#4BAFC9',
                    }}>
                    Read More
                    <img
                      alt=''
                      style={{ paddingLeft: '8px', width: '30px' }}
                      src={rightArrow}
                    />
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>

        <Grid
          container
          style={{
            height: '400px',
            marginTop: '20px',
            marginBottom: '20px',
            marginLeft: '15px',
          }}
          // spacing={10}
        >
          <Grid item xs={1}></Grid>
          <Grid container item xs={10}>
            <Grid item xs={4}>
              <div style={{ color: '#1C2460', fontSize: '18px' }}>
                <img alt='' src={logo}></img>
                <Typography>Lorem ipsum dolor sit amet, consetetur</Typography>
                <Typography>sadipscing elitr, sed diam nonumy</Typography>
                <Typography>eirmod tempor invidunt et.</Typography>
                <Grid container>
                  <img
                    alt=''
                    style={{
                      height: '45px',
                      width: '45px',
                      marginTop: '20px',
                    }}
                    src={facebook}
                  />
                  <img
                    alt=''
                    style={{
                      height: '45px',
                      width: '45px',
                      marginTop: '20px',
                      marginLeft: '20px',
                    }}
                    src={instagram}
                  />
                  <img
                    alt=''
                    style={{
                      height: '45px',
                      width: '45px',
                      marginTop: '20px',
                      marginLeft: '20px',
                    }}
                    src={twitter}
                  />
                </Grid>
              </div>
            </Grid>
            <Grid item xs={3} style={{ marginTop: '30px', color: '#1C2460' }}>
              <Typography className={classes.tittle_text}>Company</Typography>
              <List aria-label='secondary mailbox folders'>
                <ListItemLink to='/trash' primary='About' />
                <ListItemLink to='/spam' primary='Terms & Conditions' />
                <ListItemLink to='/spam' primary='Privacy Policy' />
                <ListItemLink to='/spam' primary='Covid-19 Updates' />
                <ListItemLink to='/spam' primary='FAQs' />
                <ListItemLink to='/spam' primary='Support' />
              </List>
            </Grid>
            <Grid item xs={3} style={{ marginTop: '30px', color: '#1C2460' }}>
              <Typography className={classes.tittle_text}>Explore</Typography>
              <List aria-label='secondary mailbox folders'>
                <ListItemLink to='/trash' primary='Blog' />
                <ListItemLink to='/spam' primary='Maldives' />
                <ListItemLink to='/spam' primary='Paris' />
                <ListItemLink to='/spam' primary='Montenegro' />
                <ListItemLink to='/spam' primary='Italy' />
              </List>
            </Grid>
            <Grid item xs={2} style={{ marginTop: '30px', color: '#1C2460' }}>
              <Typography className={classes.tittle_text}>Product</Typography>
              <List aria-label='secondary mailbox folders'>
                <ListItemLink to='/trash' primary='Flights' />
                <ListItemLink to='/spam' primary='Hotels' />
                <ListItemLink to='/spam' primary='Car Rental' />
                <ListItemLink to='/spam' primary='Price Track' />
              </List>
            </Grid>
          </Grid>
          <Grid item xs={1} sm={1}></Grid>
        </Grid>
      </div>
      <div
        style={{
          border: '1px solid #DDDDDD',
          height: '70px',
          textAlign: 'center',
          backgroundColor: '#FFFFFF',
        }}>
        <Typography style={{ marginTop: '25px', color: '#1C2460' }}>
          © 2021 All Rights Reserved | Travel Booking
        </Typography>
      </div>
    </>
  );
}
