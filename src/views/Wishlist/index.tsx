import React from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Whishlistflight from '../../assets/Wishlists - Flight illustration@2x.png';
import Whishlistcar from '../../assets/Wishlists - Car Rental illustration@2x.png';
import Whishlisthotel from '../../assets/Wishlists - Hotels illustration@2x.png';
import heartpng from '../../assets/Icon feather-heart@2x.png';

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
      // flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

export default function WishlistComponent() {
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
      <Grid container>
        <Grid item xs={12} lg={12} md={12} sm={12}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            // variant='fullWidth'
            aria-label='full width tabs example'>
            <Tab label='Flights' {...a11yProps(0)} />
            <Tab label='Hotels' {...a11yProps(1)} />
            <Tab label='Car Rentals' {...a11yProps(2)} />
          </Tabs>
          {/* </AppBar> */}
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}>
            <TabPanel value={value} index={0} dir={theme.direction}>
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
                <Typography>
                  <img
                    alt=''
                    src={heartpng}
                    style={{ width: '15px', height: '15px' }}></img>
                  &nbsp; Save your flights to book later
                </Typography>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <div
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                  marginTop: '40px',
                }}>
                <img
                  alt=''
                  src={Whishlisthotel}
                  style={{ width: '350px', height: '350px' }}></img>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  textAlign: 'center',
                  marginTop: '20px',
                }}>
                <Typography>
                  <img
                    alt=''
                    src={heartpng}
                    style={{ width: '15px', height: '15px' }}></img>
                  &nbsp; Save your hotels to book later
                </Typography>
              </div>
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
                  src={Whishlistcar}
                  style={{ width: '350px', height: '350px' }}></img>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  textAlign: 'center',
                  marginTop: '20px',
                }}>
                <Typography>
                  <img
                    alt=''
                    src={heartpng}
                    style={{ width: '15px', height: '15px' }}></img>
                  &nbsp; Save your cars to book later
                </Typography>
              </div>
            </TabPanel>
          </SwipeableViews>
        </Grid>
      </Grid>
    </div>
  );
}
