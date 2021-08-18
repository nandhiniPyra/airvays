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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Whishlistflight from '../../assets/Wishlists - Flight illustration@2x.png';
import flight from '../../assets/Flight logo - 1@2x.png';
import flightIcon from '../../assets/Icon material-flight@2x.png';
import Button from '@material-ui/core/Button';
import hotel1 from '../../assets/pexels-tom-fisk-2169857.jpeg';
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
      flexGrow: 1,
      backgroundColor: '#FFFFFF',
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      width: '73%',
      marginLeft: '50px',
      marginTop: '65px',
    },
  }),
);

export default function CancellationsRefundsComponent() {
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
      <Grid container spacing={3} style={{ width: '100vw' }}>
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor='primary'
                textColor='primary'
                variant='fullWidth'
                aria-label='full width tabs example'>
                <Tab label='Flights' {...a11yProps(0)} />
                <Tab label='Hotels' {...a11yProps(1)} />
                <Tab label='Car Rentals' {...a11yProps(2)} />
              </Tabs>
              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}>
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <Grid container style={{ border: '1px solid #E5E5E5' }}>
                    <Grid
                      item
                      xs={10}
                      style={{ marginTop: '10px', marginBottom: '10px' }}>
                      <Grid container style={{ marginTop: '10px' }}>
                        <Grid item xs={2}>
                          <div>
                            <img
                              alt=''
                              src={flight}
                              style={{ marginLeft: '10px' }}></img>
                          </div>
                          <Typography
                            style={{
                              fontSize: '14px',
                              color: '#1C2460',
                              opacity: '40%',
                              marginLeft: '10px',
                            }}>
                            GoAir
                          </Typography>
                        </Grid>

                        <Grid item xs={2} style={{ color: '#1C2460' }}>
                          <div>
                            <p>09:05</p>
                            <p>
                              Chennai
                              <br />
                              MAA
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
                          }}>
                          <Typography>Direct</Typography>
                          <div style={{ display: 'flex' }}>
                            {'-------------------------'}
                            <img alt='' src={flightIcon}></img>
                            {'-------------------------'}
                          </div>
                          <Typography>0 hr 40 mins</Typography>
                        </Grid>
                        <Grid item xs={2} style={{ color: '#1C2460' }}>
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
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                      }}>
                      <div>
                        <Button
                          size='small'
                          style={{
                            textTransform: 'none',
                            color: '#DB4437',
                            backgroundColor: '#FFF3F2',
                          }}>
                          Cancellation on Process
                        </Button>
                      </div>
                    </Grid>
                  </Grid>

                  <Grid container style={{ border: '1px solid #E5E5E5' }}>
                    <Grid
                      item
                      xs={10}
                      style={{ marginTop: '10px', marginBottom: '10px' }}>
                      <Grid container style={{ marginTop: '10px' }}>
                        <Grid item xs={2}>
                          <div>
                            <img
                              alt=''
                              src={flight}
                              style={{ marginLeft: '10px' }}></img>
                          </div>
                          <Typography
                            style={{
                              fontSize: '14px',
                              color: '#1C2460',
                              opacity: '40%',
                              marginLeft: '10px',
                            }}>
                            GoAir
                          </Typography>
                        </Grid>

                        <Grid item xs={2} style={{ color: '#1C2460' }}>
                          <div>
                            <p>09:05</p>
                            <p>
                              Chennai
                              <br />
                              MAA
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
                          }}>
                          <Typography>Direct</Typography>
                          <div style={{ display: 'flex' }}>
                            {'-------------------------'}
                            <img alt='' src={flightIcon}></img>
                            {'-------------------------'}
                          </div>
                          <Typography>0 hr 40 mins</Typography>
                        </Grid>
                        <Grid item xs={2} style={{ color: '#1C2460' }}>
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
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                      }}>
                      <div>
                        <Button
                          style={{
                            textTransform: 'none',
                            color: '#00C3AC',
                            backgroundColor: '#E5FFFC',
                          }}>
                          Refund Applied
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <Grid
                    container
                    spacing={3}
                    style={{ border: '1px solid #E5E5E5' }}>
                    <Grid item xs={2}>
                      <img
                        alt=''
                        src={hotel1}
                        style={{
                          width: '170px',
                          height: '150px',
                          borderRadius: '5px',
                        }}></img>
                    </Grid>
                    <Grid item xs={8}>
                      <div style={{ textAlign: 'start', marginLeft: '10px' }}>
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
                      }}>
                      <div>
                        <Button
                          style={{
                            textTransform: 'none',
                            color: '#00C3AC',
                            backgroundColor: '#E5FFFC',
                          }}>
                          Refund Applied
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  <div
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                      marginTop: '40px',
                    }}>
                    <img
                      alt=''
                      src={Whishlistflight}
                      style={{ width: '350px', height: '350px' }}></img>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      textAlign: 'center',
                      marginTop: '20px',
                    }}>
                    <Typography style={{ color: '#1C2460' }}>
                      No Cancellations
                    </Typography>
                  </div>
                </TabPanel>
              </SwipeableViews>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
}
