import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import DateFnsUtils from '@date-io/date-fns';
import carImg from '../../assets/Icon awesome-car@2x.png';
import ActiveHotelImg from '../../assets/Icon metro-hotel-blue@2x.png';
import { _getAirports } from '../../services/api/flight';
import user from '../../assets/Icon feather-user@2x.png';
import {
  Button,
  Divider,
  Typography,
  makeStyles,
  Theme,
  Grid,
  Paper,
  InputAdornment,
  Popper,
  TextField,
} from '@material-ui/core';
import flightImg from '../../assets/Icon material-flight@2x 2.png';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import search from '../../assets/icons8-search-30.png';
import { Autocomplete } from '@material-ui/lab';
import moment from 'moment';
import _ from 'lodash';
import useSnackbar from '../../hooks/useSnackbar';
import injectWithObserver from '../../utils/injectWithObserver';
import { useStore } from '../../mobx/Helpers/UseStore';
import { toJS } from 'mobx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  _ml15: {
    marginLeft: '15px',
  },
  avatar: {
    height: 100,
    width: 100,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    borderRadius: '9px',
    borderColor: '#FFFFFF',
    height: '150px',
    boxShadow: '3px 5px 3px #8888',
    fontFamily: 'Avantgarde-Regular',
  },
  paperHotel: {
    padding: theme.spacing(2),
    boxShadow: '3px 5px 3px #8888',
    color: theme.palette.text.secondary,
    borderRadius: '9px',
    borderColor: '#FFFFFF',
    height: '100px',
  },
  radio: {
    color: '#33BBFF',
    size: 'medium',
    '&$checked': {
      color: '#33BBFF',
    },
  },
  checked: {
    color: '#33BBFF',
  },
  date_picker: {
    color: '#333333',
    '& .MuiInputBase-root': {
      padding: 0,
      border: '1px solid #bfb7b7',
      borderRadius: '5px',
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

      '& .MuiSvgIcon-root': {
        color: '#33bbff',
      },
      '& .MuiIconButton-root': {
        outline: 'none',
      },
    },
  },
  popOver: {
    '&. .MuiPopover-paper': {
      borderRadius: '10px',
    },
  },
}));

function Hotelsearch(props: any) {
  const classes = useStyles();
  const snackBar = useSnackbar();
  const navigate = useNavigate();
  const store = useStore();

  const { sethotelsearchRequest } = store.HotelDetails;
  const { hotelsearchRequest } = toJS(store.HotelDetails);
  const [fromOptions, setFromOptions] = useState<Array<any>>([{}]);

  const [from, setfrom] = useState('');
  const [reqhotel, setreqhotel] = useState(hotelsearchRequest);
  const [fromcityname, setfromcityname] = useState('');

  const getAirportsFrom = () => {
    _getAirports({ search: from }, function (error: any, response: any) {
      if (error === null) {
        if (response.status === '200') {
          response.result && response.result.length > 0
            ? setFromOptions(response.result)
            : setFromOptions([]);
        }
      }
    });
  };

  const onChange_search_hotel = (key: any, value: any, nop: any) => {
    if (
      key === 'checkInDate' ||
      key === 'checkOutDate' ||
      key === 'cityCode' ||
      key === 'adults' ||
      key === 'from'
    ) {
      setreqhotel((prevState: any) => ({
        ...prevState,
        [key]: value,
      }));
    }
  };

  const search_hotel = () => {
    if (
      (reqhotel.from !== '' || null) &&
      (reqhotel.checkInDate !== '' || null) &&
      reqhotel.checkOutDate !== null &&
      reqhotel.adults !== null
    ) {
      sethotelsearchRequest(reqhotel);
      props.search();
    } else {
      snackBar.show('Please fill all fields', 'error', undefined, true, 2000);
    }
  };

  const PopperMy = function (props: any) {
    return (
      <Popper
        {...props}
        style={{ maxWidth: 'fit-content' }}
        placement='bottom-start'
      />
    );
  };
  useEffect(() => {
    if (from !== null && from !== '') getAirportsFrom();
  }, [from]);

  const onClickFlight = () => {
    navigate('/flightList');
  };

  const onClickHotel = () => {
    navigate('/hotels');
  };
  const onClickCar = () => {
    navigate('/car');
  };

  return (
    <>
      <Grid container style={{ marginTop: '3%' }}>
        <Grid xs={12}>
          <div style={{ textAlign: 'center', display: 'flex' }}>
            <div
              style={{
                backgroundColor: 'rgb(8 8 8 / 68%)',
                color: '#B7E7FF',
                width: '128px',
                height: '88px',
                borderRadius: '10px',
                fontFamily: 'Avantgarde-Demi',
                cursor: 'pointer',
              }}
              onClick={onClickFlight}>
              <img
                alt=''
                src={flightImg}
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
                backgroundColor: '#EAF8FF',
                color: '#1C2460',
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
                src={ActiveHotelImg}
                style={{ marginTop: '20px', height: '20%', width: '20%' }}
              />

              <br />

              <div style={{ marginTop: '12px' }}>Hotels</div>
            </div>
            <div
              style={{
                backgroundColor: 'rgb(8 8 8 / 68%)',
                color: '#B7E7FF',
                width: '128px',
                height: '88px',
                borderRadius: '10px',
                fontFamily: 'Avantgarde-Demi',
                cursor: 'pointer',
              }}
              onClick={onClickCar}
              className={classes._ml15}>
              <img
                alt=''
                src={carImg}
                style={{ marginTop: '20px', height: '20%', width: '20%' }}
              />

              <br />
              <div style={{ marginTop: '12px' }}>Car Rental</div>
            </div>
          </div>
        </Grid>
      </Grid>
      <>
        <Grid container style={{ marginTop: '2%' }}>
          <Grid xs={12}>
            <Paper className={classes.paperHotel}>
              <div style={{ marginTop: '5px' }}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Autocomplete
                      id='from'
                      freeSolo={true}
                      className='country-select'
                      options={fromOptions ? fromOptions : []}
                      style={{
                        marginLeft: '9px',
                        maxWidth: '100%',
                        fontFamily: 'AvantGarde-Regular',
                      }}
                      PopperComponent={PopperMy}
                      getOptionLabel={(option) =>
                        option?.address?.cityName ? option.address.cityName : ''
                      }
                      onChange={(event, newValue) => {
                        event.preventDefault();
                        setfromcityname(_.get(newValue?.address, 'cityName'));
                        onChange_search_hotel(
                          'from',
                          _.get(newValue?.address, 'cityCode'),
                          '',
                        );
                      }}
                      onInputChange={(event: any, value: any) => {
                        event.preventDefault();
                        value.length > 2 && setfrom(value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          style={{ top: '8px' }}
                          {...params}
                          name='from'
                          placeholder='Stay-in Place'
                          variant='outlined'
                          fullWidth
                        />
                      )}
                      renderOption={(option) => {
                        if (option && option.name) {
                          return (
                            <Grid container alignItems='center'>
                              <Grid item xs>
                                <span>
                                  <b>{option.name}</b>(
                                  {option?.address?.cityCode})
                                </span>
                                <br />
                                <span> {option?.address?.cityName}</span>
                                <Typography
                                  variant='body2'
                                  color='textSecondary'>
                                  {option?.address?.countryCode}
                                  <Divider />
                                </Typography>
                              </Grid>
                            </Grid>
                          );
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        className={classes.date_picker}
                        margin='normal'
                        id='date-picker-dialog'
                        placeholder='Check-in'
                        format='dd/MM/yyyy'
                        disablePast={true}
                        value={reqhotel.checkInDate}
                        onChange={(value: any) => {
                          let date = moment(value).format('YYYY-MM-DD');
                          onChange_search_hotel('checkInDate', date, '');
                        }}
                        InputAdornmentProps={{ position: 'start' }}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        InputProps={{
                          disableUnderline: true,
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={2}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        className={classes.date_picker}
                        margin='normal'
                        id='date-picker-dialog'
                        placeholder='Check-out'
                        format='dd/MM/yyyy'
                        disablePast={true}
                        value={reqhotel.checkOutDate}
                        onChange={(value: any) => {
                          let date = moment(value).format('YYYY-MM-DD');
                          onChange_search_hotel('checkOutDate', date, '');
                        }}
                        InputAdornmentProps={{ position: 'start' }}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        InputProps={{
                          disableUnderline: true,
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={2}>
                    {/* // TODO: value should be number */}
                    <TextField
                      placeholder='Guests'
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      variant='outlined'
                      value={reqhotel.adults}
                      onChange={(e: any) => {
                        e.preventDefault();
                        console.log(e.target.value, 'KKKK');
                        onChange_search_hotel('adults', e.target.value, '');
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <img alt='' src={user}></img>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Button
                      style={{
                        background: '#33BBFF',
                        width: '35px',
                        height: '54px',
                      }}
                      onClick={() => {
                        search_hotel();
                      }}>
                      <img
                        alt=''
                        src={search}
                        style={{ width: '24px', height: '24px' }}
                      />
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </>
    </>
  );
}
export default injectWithObserver(Hotelsearch);
