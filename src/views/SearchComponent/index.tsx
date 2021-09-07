import React from 'react';
import injectWithObserver from '../../utils/injectWithObserver';
import Hotelsearch from './Hotelsearch';
import Flightsearch from './Flightsearch';
import Carsearch from './Carsearch';
import { toJS } from 'mobx';
import { useStore } from '../../mobx/Helpers/UseStore';
import ActiveCarImg from '../../assets/Icon awesome-car-blue@2x.png';
import carImg from '../../assets/Icon awesome-car@2x.png';
import ActiveHotelImg from '../../assets/Icon metro-hotel-blue@2x.png';
import ActiveFlightImg from '../../assets/Icon material-flight-darkblue@2x.png';
import hotelImg from '../../assets/Icon metro-hotel@2x.png';
import { Theme, Grid, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router';
import flightImg from '../../assets/Icon material-flight@2x 2.png';

const useStyles = makeStyles((theme: Theme) => ({
  _ml15: {
    marginLeft: '15px',
  },
}));
function SearchComponent(props: any) {
  const classes = useStyles();
  const navigate = useNavigate();
  const store = useStore();
  const { component, currentPage } = toJS(store.Search);
  const { setComponent } = store.Search;
  const onClickFlight = () => {
    setComponent('flight');
    navigate('/flightList');
  };

  const onClickHotel = () => {
    setComponent('hotel');
    navigate('/hotels');
  };

  return (
    <>
      <Grid container style={{ marginTop: '3%' }}>
        <Grid xs={12}>
          <div style={{ textAlign: 'center', display: 'flex' }}>
            <div
              style={{
                backgroundColor:
                  component === 'flight' ? '#EAF8FF' : 'rgb(8 8 8 / 68%)',
                color: component === 'flight' ? '#1C2460' : '#B7E7FF',
                width: '128px',
                height: '88px',
                borderRadius: '10px',
                fontFamily: 'Avantgarde-Demi',
                cursor: 'pointer',
              }}
              onClick={onClickFlight}>
              <img
                alt=''
                src={component === 'flight' ? ActiveFlightImg : flightImg}
                style={{
                  marginTop: '15px',
                  height: '30%',
                  width: '30%',
                }}></img>

              <br />
              <div style={{ marginTop: '9px' }}>Flights</div>
            </div>
            <div
              style={{
                backgroundColor:
                  component === 'hotel' ? '#EAF8FF' : 'rgb(8 8 8 / 68%)',
                color: component === 'hotel' ? '#1C2460' : '#B7E7FF',
                width: '128px',
                height: '88px',
                borderRadius: '10px',
                opacity: 1,
                fontFamily: 'Avantgarde-Demi',
                cursor: 'pointer',
              }}
              onClick={onClickHotel}
              className={classes._ml15}>
              <img
                alt=''
                src={component === 'hotel' ? ActiveHotelImg : hotelImg}
                style={{ marginTop: '20px', height: '20%', width: '20%' }}
              />

              <br />

              <div style={{ marginTop: '12px' }}>Hotels</div>
            </div>
            <div
              style={{
                backgroundColor:
                  component === 'car' ? '#EAF8FF' : 'rgb(8 8 8 / 68%)',
                color: component === 'car' ? '#1C2460' : '#B7E7FF',
                width: '128px',
                height: '88px',
                borderRadius: '10px',
                fontFamily: 'Avantgarde-Demi',
                cursor: 'pointer',
              }}
              onClick={() => setComponent('car')}
              className={classes._ml15}>
              <img
                alt=''
                src={component === 'car' ? ActiveCarImg : carImg}
                style={{ marginTop: '20px', height: '20%', width: '20%' }}
              />

              <br />
              <div style={{ marginTop: '12px' }}>Car Rental</div>
            </div>
          </div>
        </Grid>
      </Grid>
      {console.log(currentPage, 'currentPage')}
      {component === 'flight' ? (
        <Flightsearch
          search={(value: any) => {
            currentPage ? props.search(value) : navigate('/flightList');
          }}
        />
      ) : component === 'hotel' ? (
        <Hotelsearch
          search={(value: any) => {
            currentPage ? props.search(value) : navigate('/hotels');
          }}
        />
      ) : (
        <Carsearch />
      )}
    </>
  );
}
export default injectWithObserver(SearchComponent);
