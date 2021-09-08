import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import injectWithObserver from '../../utils/injectWithObserver';
import { useStore } from '../../mobx/Helpers/UseStore';
import { toJS } from 'mobx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // display: "flex",
      flexGrow: 1,
      backgroundColor: '#FFFFFF',
    },
    paper: {
      marginTop: '50px',
      marginLeft: '50px',
      // marginRight: "60px",
      borderRadius: '10px',
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      opacity: 1,
      width: '73%',
      // height: "100%",
    },
    flight: {
      // margin: "5%",
      fontSize: '15px',
      fontFamily: 'AvantGarde-Demi',
      color: '#333333',
      opacity: '50%',
    },
    details: {
      fontSize: '14px',
      fontFamily: 'AvantGarde-Demi',
      color: '#DCAB5E',
    },
  }),
);

export default function PriceAlert() {
  const classes = useStyles();
  const store = useStore();
  const { searchRequest, searchKeys, flightType } = toJS(store.FlightDetails);
  const {
    setselectedFlight,
    setflightlist,
    getflightbyid,
    setsearchKeys,
    setbookFlight,
    setbaggage,
    setextra_baggage,
  } = store.FlightDetails;
  return (
    <div className={classes.root}>
      <Typography
        className={classes.flight}
        style={{
          margin: '10px',
          padding: '5px',
          fontFamily: 'AvantGarde-Demi',
        }}>
        Flight Routes
      </Typography>
      <Grid container spacing={3} style={{ padding: '5px', margin: '1px' }}>
        <Grid item xs={6}>
          <Typography
            style={{ fontFamily: 'AvantGarde-Demi', fontSize: '15px' }}>
            {searchRequest?.fromCity && searchRequest.fromCity}
            <span style={{ fontFamily: 'AvantGarde-Regular' }}>
              ( {searchRequest?.from && searchRequest.from})
            </span>
            -{searchRequest?.toCity && searchRequest.toCity}
            <span style={{ fontFamily: 'AvantGarde-Regular' }}>
              ( {searchRequest?.to && searchRequest.to})
            </span>
          </Typography>
          <Grid container spacing={3} style={{ padding: '5px', margin: '1px' }}>
            <Grid item xs={6}>
              <Typography
                style={{ fontFamily: 'AvantGarde-Demi', fontSize: '14px' }}>
                Chennai
                <span style={{ fontFamily: 'AvantGarde-Regular' }}>(MAA)</span>-
                Bangalore International
                <span style={{ fontFamily: 'AvantGarde-Regular' }}>(BLR)</span>
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.details}>View Flights</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.flight}>Remove</Typography>
            </Grid>
          </Grid>
          <Divider style={{ marginLeft: '2%', marginRight: '2%' }} />
          <Grid container spacing={3} style={{ padding: '5px', margin: '1px' }}>
            <Grid item xs={6}>
              <Typography
                style={{ fontFamily: 'AvantGarde-Demi', fontSize: '14px' }}>
                Chennai
                <span style={{ fontFamily: 'AvantGarde-Regular' }}>(MAA)</span>-
                Goa International
                <span style={{ fontFamily: 'AvantGarde-Regular' }}>(GOI)</span>
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.details}>View Flights</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.flight}>Remove</Typography>
            </Grid>
          </Grid>
          <Divider style={{ marginLeft: '2%', marginRight: '2%' }} />
          <Grid container spacing={3} style={{ padding: '5px', margin: '1px' }}>
            <Grid item xs={6}>
              <Typography
                style={{ fontFamily: 'AvantGarde-Demi', fontSize: '14px' }}>
                Chennai
                <span style={{ fontFamily: 'AvantGarde-Regular' }}>(MAA)</span>-
                Hyderabad - Rajiv Gandhi International
                <span style={{ fontFamily: 'AvantGarde-Regular' }}>(HYD)</span>
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.details}>View Flights</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.flight}>Remove</Typography>
            </Grid>
          </Grid>
          <Divider style={{ marginLeft: '2%', marginRight: '2%' }} />
          <Grid container style={{ padding: '5px', margin: '1px' }} spacing={3}>
            <Grid item xs={6}>
              <Typography
                style={{ fontFamily: 'AvantGarde-Demi', fontSize: '14px' }}>
                Chennai
                <span style={{ fontFamily: 'AvantGarde-Regular' }}>(MAA)</span>-
                Coimbatore International
                <span style={{ fontFamily: 'AvantGarde-Regular' }}>(CJB)</span>
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.details}>View Flights</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.flight}>Remove</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
