import React from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Whishlistflight from '../../assets/Wishlists - Flight illustration@2x.png';
import Whishlistcar from '../../assets/Wishlists - Car Rental illustration@2x.png';
import Whishlisthotel from '../../assets/Wishlists - Hotels illustration@2x.png';
import flight from '../../assets/Flight logo - 1@2x.png';
import flightIcon from '../../assets/Icon material-flight@2x.png';
import Button from '@material-ui/core/Button';
import hotel1 from '../../assets/pexels-tom-fisk-2169857.jpeg';
import car from '../../assets/Car Image -1 @2x.png';
import Divider from '@material-ui/core/Divider';
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
      flexGrow: 1,
    },

    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

export default function BookingComponent() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
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
              <Tab label='Flights' {...a11yProps(0)} />
              <Tab label='Hotels' {...a11yProps(1)} />
              <Tab label='Car Rentals' {...a11yProps(2)} />
            </Tabs>
            {/* </AppBar> */}
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <Grid container style={{ border: '1px solid #E5E5E5' }}>
                  <Grid item xs={10}>
                    <Grid container style={{ marginTop: '10px' }}>
                      <Grid item xs={4}>
                        <div style={{ textAlign: 'left', marginLeft: '15px' }}>
                          <Typography style={{ fontSize: '14px' }}>
                            <span style={{ color: '#4BAFC9' }}>
                              15/06/21, Tuesday{' '}
                            </span>
                            - Inbound
                          </Typography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
                          <div>
                            <img src={flight}></img>
                          </div>
                          <div>
                            <p>09:05</p>
                            <p>
                              Chennai
                              <br />
                              MAA
                            </p>
                          </div>
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={5}
                        style={{
                          alignItems: 'center',
                          textAlign: 'center',
                          justifyContent: 'center',
                          display: 'grid',
                        }}
                      >
                        <Typography>Direct</Typography>
                        <div style={{ display: 'flex' }}>
                          {'------------------------------'}
                          <img src={flightIcon}></img>
                          {'------------------------------'}
                        </div>
                        <Typography>0 hr 40 mins</Typography>

                      </Grid>
                      <Grid item xs={2}>
                        <div>
                          <p>09:05</p>
                          <p>
                            Bengaluru Intl
                            <br />
                            BLR
                          </p>
                        </div>
                      </Grid>

                    </Grid>
                    <Grid container style={{ marginTop: '10px' }}>
                      <Grid item xs={4}>
                        <div style={{ textAlign: 'left', marginLeft: '15px' }}>
                          <Typography style={{ fontSize: '14px' }}>
                            <span style={{ color: '#4BAFC9' }}>
                              15/06/21, Tuesday{' '}
                            </span>
                            - Inbound
                          </Typography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
                          <div>
                            <img src={flight}></img>
                          </div>
                          <div>
                            <p>09:05</p>
                            <p>
                              Chennai
                              <br />
                              MAA
                            </p>
                          </div>
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={5}
                        style={{
                          alignItems: 'center',
                          textAlign: 'center',
                          justifyContent: 'center',
                          display: 'grid',
                        }}
                      >
                        <Typography>Direct</Typography>
                        <div style={{ display: 'flex' }}>
                          {'------------------------------'}
                          <img src={flightIcon}></img>
                          {'------------------------------'}
                        </div>
                        <Typography>0 hr 40 mins</Typography>

                      </Grid>
                      <Grid item xs={2}>
                        <div>
                          <p>09:05</p>
                          <p>
                            Bengaluru Intl
                            <br />
                            BLR
                          </p>
                        </div>
                      </Grid>

                    </Grid>
                    <div style={{ display: 'flex', marginTop: '20px' }}></div>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                    }}
                  >
                    <Typography style={{ position: 'absolute', fontSize: 'smaller', top: '35px', right: '0', marginRight: '40px', color: '#DB4437' }}>Cancel Booking</Typography>

                    <div>
                      <Typography
                        style={{
                          marginLeft: '20px',
                        }}
                      >
                        Paid $320
                      </Typography>
                      <br />
                      <Button
                        variant='contained'
                        style={{ background: '#DCAB5E', color: '#fff' }}
                      >
                        View Summary
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <Grid
                  container
                  spacing={3}
                  style={{ border: '1px solid #E5E5E5' }}
                >
                  <Grid item xs={2}>
                    <img
                      src={hotel1}
                      style={{
                        width: '170px',
                        height: '150px',
                        borderRadius: '5px',
                      }}
                    ></img>
                  </Grid>
                  <Grid item xs={8}>
                    <div style={{ textAlign: 'start' }}>
                      <Typography>
                        Plush Penthouse With Private Plunge Pool
                      </Typography>
                      <Typography>Nerul, Goa</Typography>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                    }}
                  >
                    <Typography style={{ position: 'absolute', fontSize: 'smaller', top: '15px', color: '#DB4437' }}>Cancel Booking</Typography>

                    <div>
                      <Typography
                        style={{
                          marginLeft: '20px',
                        }}
                      >
                        Total $520
                      </Typography>
                      <br />
                      <Button
                        variant='contained'
                        style={{ background: '#DCAB5E', color: '#fff' }}
                      >
                        View Summary
                      </Button>
                    </div>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={3}
                  style={{ border: '1px solid #E5E5E5', marginTop: '30px' }}
                >
                  <Grid item xs={2}>
                    <img
                      src={hotel1}
                      style={{
                        width: '170px',
                        height: '150px',
                        borderRadius: '5px',
                      }}
                    ></img>
                  </Grid>
                  <Grid item xs={8}>
                    <div style={{ textAlign: 'start' }}>
                      <Typography>
                        Plush Penthouse With Private Plunge Pool
                      </Typography>
                      <Typography>Nerul, Goa</Typography>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                    }}
                  >
                    <Typography style={{ position: 'absolute', fontSize: 'smaller', top: '35px', right: '0', marginRight: '40px', color: '#DB4437' }}>Cancel Booking</Typography>
                    <div>
                      <Typography
                        style={{
                          marginLeft: '20px',
                        }}
                      >
                        Total $520
                      </Typography>
                      <br />
                      <Button
                        variant='contained'
                        style={{ background: '#DCAB5E', color: '#fff' }}
                      >
                        View Summary
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                <Grid
                  container
                  spacing={3}
                  style={{ border: '2px solid #EDEDED' }}
                >
                  <Grid item xs={2}>
                    <div>
                      <img
                        src={car}
                        alt=''
                        style={{
                          width: '170px',
                          height: '150px',
                          borderRadius: '5px',
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={8} style={{ textAlign: 'start' }}>
                    <div>
                      <Typography>
                        <span style={{ fontWeight: 500 }}>Suzuki Swift </span>Or
                        similar Economy{' '}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                  // style={{
                  //   alignItems: 'center',
                  //   justifyContent: 'center',
                  //   display: 'flex',
                  // }}
                  >
                    <div
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                      }}>
                      <Typography
                        style={{
                          marginLeft: '20px',
                        }}
                      >
                        Total $520
                      </Typography>
                      <br />
                      <Button
                        variant='contained'
                        style={{ background: '#DCAB5E', color: '#fff' }}
                      >
                        View Summary
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </TabPanel>
            </SwipeableViews>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
