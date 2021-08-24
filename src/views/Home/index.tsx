import React, { useEffect, useState } from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { ErrorMessage, Field, Formik } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import search from '../../assets/icons8-search-30.png';
import exchange from '../../assets/exchange@2x.png';
import message from '../../assets/Message@2x.png';
import hotel from '../../assets/Icon metro-hotel-blue@2x.png';
import car from '../../assets/Icon awesome-car-blue@2x.png';
import bgImage from '../../assets/homeBg.png';
import logo from '../../assets/Logo@2x.png';
import flightillustration from '../../assets/Illustration@2x.png';
import cloudillustration1 from '../../assets/Illustration 2@2x.png';
import cloudillustration2 from '../../assets/illustration 1@2x.png';
import blog1 from '../../assets/Blog image - 1@2x.png';
import blog2 from '../../assets/Blog image - 2@2x.png';
import blog3 from '../../assets/Blog image - 3@2x.png';
import Giraffe from '../../assets/mo-baghdadi-FCK6ktqZWqQ-unsplash@2x.png';
import Rica from '../../assets/pexels-alexandr-podvalny-3278212@2x.png';
import NewZealand from '../../assets/pexels-alexandr-podvalny-32782152@2x.png';
import Paris from '../../assets/pexels-alexandr-podvalny-3278215@2x.png';
import Egypt from '../../assets/pexels-alexandr-podvalny-3278213@2x.png';
import rightArrow from '../../assets/right-arrow@2x.png';
import twitter from '../../assets/Twitter@2x.png';
import facebook from '../../assets/Facebook@2x.png';
import instagram from '../../assets/Instagram@2x.png';
import LoginContainer from '../Login/Login';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import SingaporeLogo from '../../assets/icons8-singapore-48.png';
import arrow from '../../assets/Icon ionic-md-arrow-dropdown-darkblue@2x.png';
import rightquotes from '../../assets/right-quote-sign@2x.png';
import user from '../../assets/user1.png';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { Route, MemoryRouter, useNavigate, useLocation } from 'react-router';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import { Omit } from '@material-ui/types';
import { _getAirports } from '../../services/api/flight';

import SearchComponent from '../SearchComponent';
import { Avatar, GridListTileBar, ListSubheader } from '@material-ui/core';
import TransparentTopBar from '../../TopBar/index';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 0,
      paddingTop: 0,
      height: 800,
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      overflow: 'hidden',
    },
    _rowHead: {
      paddingTop: 0,
    },

    grow: {
      display: 'flex',
      // flexGrow: 1,
    },
    _ml15: {
      marginLeft: '45px',
      color: '#1C2460',
      fontSize: 18,
      fontFamily: 'CrimsonText-Regular',
      // flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      cursor: 'pointer',
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
    testimonials_root: {
      display: 'flex',
      flexWrap: 'wrap',
      overflow: 'hidden',
      backgroundColor: '#ECF9FF',
      height: '500px',
      width: '100%',
      marginTop: '60px',
      marginBottom: '30px',
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
    button: {
      display: 'inline-block',
      padding: 0,
      minHeight: 36,
      minWidth: 39,
    },
    tittle_text: {
      marginLeft: '15px',
      fontFamily: 'Avantgarde-Demi',
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
    large: {
      width: theme.spacing(8),
      height: theme.spacing(8),
    },
  }),
);

const tileData = [
  {
    img: `url(${bgImage})`,
    title: 'Breakfast',
    author: 'jill111',
    featured: true,
  },
  {
    img: `url(${bgImage})`,
    title: 'Tasty burger',
    author: 'director90',
  },
  {
    img: `url(${bgImage})`,
    title: 'Camera',
    author: 'Danson67',
  },
  {
    img: `url(${bgImage})`,
    title: 'Morning',
    author: 'fancycrave1',
    featured: true,
  },
  {
    img: `url(${bgImage})`,
    title: 'Hats',
    author: 'Hans',
  },
  {
    img: `url(${bgImage})`,
    title: 'Honey',
    author: 'fancycravel',
  },
];
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
let initialstate = {
  from: '',
  to: '',
  currencyCode: 'SGD',
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
          <Grid item xs={12} style={{ marginTop: '1%' }}>
            {' '}
            <TransparentTopBar color='textBlue' backgroundColor='transparent' />
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              textAlign: 'center',
              marginTop: '10%',
              color: '#1C2460',
            }}>
            <Typography
              style={{
                fontWeight: 400,
                fontSize: '24px',
                fontFamily: 'Avantgarde-Demi',
              }}>
              Always say yes to new adventures.
            </Typography>
            <Typography
              style={{ marginTop: '12px', fontFamily: 'CrimsonText-Regular' }}>
              Plan your adventure with us !
            </Typography>
          </Grid>
          <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              {' '}
              <SearchComponent
                request={{ ...initialstate }}
                type='flight'
                currentpage={false}
              />
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
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
              fontSize: '20px',
              fontFamily: 'Avantgarde-Demi',
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
                  spacing={20}
                  // className={classes.gridListImg}
                >
                  <GridListTile style={{ width: '60%' }}>
                    <img alt='' src={Giraffe} />
                    <GridListTileBar
                      title={'Giraffe Manor, Nairobi, Kenya'}
                      style={{ fontFamily: 'CrimsonText-SemiBold' }}
                    />
                  </GridListTile>

                  <GridListTile style={{ width: '40%' }}>
                    <img alt='' src={Rica} />
                    <GridListTileBar
                      title={'Costa Rica'}
                      style={{ fontFamily: 'CrimsonText-SemiBold' }}
                    />
                  </GridListTile>
                </GridList>
              </Grid>
              <Grid container>
                <GridList
                  cellHeight={300}
                  spacing={20}
                  // className={classes.gridListImage}
                >
                  <GridListTile
                    key='Subheader'
                    cols={4}
                    style={{ height: 'auto' }}>
                    <ListSubheader component='div'></ListSubheader>
                  </GridListTile>
                  <GridListTile style={{ width: '33.3%' }}>
                    <img alt='' src={NewZealand} />
                    <GridListTileBar
                      title={'New Zealand'}
                      style={{ fontFamily: 'CrimsonText-SemiBold' }}
                    />
                  </GridListTile>
                  <GridListTile style={{ width: '33.3%' }}>
                    <img alt='' src={Paris} />
                    <GridListTileBar
                      title={'Paris, France'}
                      style={{ fontFamily: 'CrimsonText-SemiBold' }}
                    />
                  </GridListTile>
                  <GridListTile style={{ width: '33.3%' }}>
                    <img alt='' src={Egypt} />
                    <GridListTileBar
                      title={'Egypt'}
                      style={{ fontFamily: 'CrimsonText-SemiBold' }}
                    />
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
                style={{
                  color: '#FFFFFF',
                  fontSize: '25px',
                  fontFamily: 'Avantgarde-Demi',
                }}>
                Are you waiting for the price to drop?
              </Typography>

              <Typography
                style={{
                  color: '#FFFFFF',
                  marginLeft: '35px',
                  marginTop: '10px',
                  fontFamily: 'Avantgarde-Regular',
                }}>
                Turn on our price alert to get notified weekly !
              </Typography>
              <br />
              <div>
                <Button
                  style={{
                    left: '170px',
                    backgroundColor: '#FFFF',
                    color: '#4BAFC9',
                    height: '30px',
                    fontFamily: 'CrimsonText-SemiBold',
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
                      fontSize: '20px',
                      fontFamily: 'Avantgarde-Demi',
                      marginLeft: '15px',
                      cursor: 'pointer',
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
                      fontFamily: 'CrimsonText-SemiBold',
                      cursor: 'pointer',
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
                  <div
                    style={{
                      marginTop: '15px',
                      color: '#1C2460',
                      fontFamily: 'CrimsonText-Regular',
                    }}>
                    Maldives - May 03, 2020
                  </div>
                  <Typography
                    style={{
                      marginTop: '7px',
                      fontSize: '22px',
                      fontFamily: 'CrimsonText-SemiBold',
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
                      fontFamily: 'CrimsonText-Regular',
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
                      fontFamily: 'CrimsonText-SemiBold',
                      cursor: 'pointer',
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
                  <div
                    style={{
                      marginTop: '15px',
                      color: '#1C2460',
                      fontFamily: 'CrimsonText-Regular',
                    }}>
                    Maldives - May 03, 2020
                  </div>
                  <Typography
                    style={{
                      marginTop: '7px',
                      fontSize: '22px',
                      fontFamily: 'CrimsonText-SemiBold',
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
                      fontFamily: 'CrimsonText-Regular',
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
                      fontFamily: 'CrimsonText-SemiBold',
                      cursor: 'pointer',
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
                  <div
                    style={{
                      marginTop: '15px',
                      color: '#1C2460',
                      fontFamily: 'CrimsonText-Regular',
                    }}>
                    Maldives - May 03, 2020
                  </div>
                  <Typography
                    style={{
                      marginTop: '7px',
                      fontSize: '22px',
                      fontFamily: 'CrimsonText-SemiBold',
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
                      fontFamily: 'CrimsonText-Regular',
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
                      fontFamily: 'CrimsonText-SemiBold',
                      cursor: 'pointer',
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

        {/* Testimonials section */}
        <div className={classes.testimonials_root}>
          <Grid
            container
            style={{
              marginTop: '40px',
              padding: 0,
              height: '20px',
            }}>
            <Grid item xs={1}></Grid>
            <Grid
              container
              item
              xs={10}
              style={{
                color: '#1C2460',
              }}>
              <Grid container>
                <Grid item xs={5}></Grid>
                <div
                  style={{
                    marginLeft: '25px',
                    fontFamily: 'Avantgarde-Demi',
                    fontSize: '20px',
                  }}>
                  Testimonials
                  <Divider
                    style={{
                      backgroundColor: '#33bbff',
                      width: '25px',
                      height: '2px',
                      marginLeft: '43px',
                      marginBottom: '50px',
                    }}></Divider>
                </div>
              </Grid>
              <Grid container>
                <Grid item xs={2}>
                  <img
                    style={{ height: '65px', width: '70px' }}
                    src={rightquotes}></img>
                </Grid>
              </Grid>
              <Grid container xs={12}>
                <Grid item xs={1}></Grid>
                <Grid
                  item
                  xs={7}
                  style={{
                    fontSize: '20px',
                    marginLeft: '15px',
                    fontFamily: 'CrimsonText-Regular',
                  }}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus.
                  <div style={{ marginTop: '20px' }}>
                    <Grid container>
                      <Avatar
                        alt='Remy Sharp'
                        className={classes.large}
                        src={user}
                      />
                      <Typography
                        style={{
                          marginLeft: '17px',
                          marginTop: '10px',
                          fontFamily: 'Avantgarde-Demi',
                        }}>
                        Tom McDonald
                        <div
                          style={{
                            fontFamily: 'Avantgarde-Regular',
                            fontSize: '13px',
                          }}>
                          Co-Founder
                        </div>
                      </Typography>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={1} style={{ marginLeft: '5%' }}>
                  <Button
                    className={classes.button}
                    style={{
                      color: '#FFFF',
                      backgroundColor: '#33BBFF',
                    }}>
                    1
                  </Button>
                  <br />
                  <Button
                    className={classes.button}
                    style={{
                      color: '#FFFF',
                      backgroundColor: '#B7E7FF',
                      marginTop: '20px',
                    }}>
                    2
                  </Button>
                  <br />
                  <Button
                    className={classes.button}
                    style={{
                      color: '#FFFF',
                      backgroundColor: '#B7E7FF',
                      marginTop: '20px',
                    }}>
                    3
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        </div>

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
                    style={{
                      height: '45px',
                      width: '45px',
                      marginTop: '20px',
                    }}
                    src={facebook}
                  />
                  <img
                    style={{
                      height: '45px',
                      width: '45px',
                      marginTop: '20px',
                      marginLeft: '20px',
                    }}
                    src={instagram}
                  />
                  <img
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
            <Grid
              item
              xs={3}
              style={{
                marginTop: '30px',
                color: '#1C2460',
                fontFamily: 'CrimsonText-Regular',
              }}>
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
            <Grid
              item
              xs={3}
              style={{
                marginTop: '30px',
                color: '#1C2460',
                fontFamily: 'CrimsonText-Regular',
              }}>
              <Typography className={classes.tittle_text}>Explore</Typography>
              <List aria-label='secondary mailbox folders'>
                <ListItemLink to='/trash' primary='Blog' />
                <ListItemLink to='/spam' primary='Maldives' />
                <ListItemLink to='/spam' primary='Paris' />
                <ListItemLink to='/spam' primary='Montenegro' />
                <ListItemLink to='/spam' primary='Italy' />
              </List>
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                marginTop: '30px',
                color: '#1C2460',
                fontFamily: 'CrimsonText-Regular',
              }}>
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
        <Typography
          style={{
            marginTop: '25px',
            color: '#1C2460',
            fontFamily: 'CrimsonText-Regular',
          }}>
          © 2021 All Rights Reserved | Travel Booking
        </Typography>
      </div>
    </>
  );
}
