import React, { useEffect, useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { _hotelCitySearchByKeyword } from '../../services/api/location';
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
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import search from '../../assets/icons8-search-30.png';
import { Autocomplete } from '@material-ui/lab';
import moment from 'moment';
import _ from 'lodash';
import useSnackbar from '../../Hoc/useSnackbar';
import injectWithObserver from '../../utils/injectWithObserver';
import { useStore } from '../../mobx/Helpers/UseStore';
import { toJS } from 'mobx';
import { useNavigate } from 'react-router';

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
  const store = useStore();
  const navigate = useNavigate();

  const { currentPage } = toJS(store.Search);
  const { sethotelsearchRequest } = store.HotelDetails;
  const { hotelsearchRequest } = toJS(store.HotelDetails);
  const [fromOptions, setFromOptions] = useState<Array<any>>([{}]);

  const [from, setfrom] = useState('');
  const [reqhotel, setreqhotel] = useState(hotelsearchRequest);

  const hotelCitySearchByKeyword = () => {
    _hotelCitySearchByKeyword(
      { search: from },
      function (error: any, response: any) {
        if (error === null) {
          if (response.status === 200) {
            response.result && response.result.length > 0
              ? setFromOptions(response.result)
              : setFromOptions([]);
          } else {
          }
        }
      },
    );
  };

  const onChange_search_hotel = (key: any, value: any, nop: any) => {
    console.log('key', key, 'value', value);
    if (
      key === 'checkInDate' ||
      key === 'checkOutDate' ||
      key === 'cityCode' ||
      key === 'adults'
    ) {
      setreqhotel((prevState: any) => ({
        ...prevState,
        [key]: value,
      }));
    }
  };

  const search_hotel = async () => {
    if (
      (reqhotel.cityCode !== '' || null) &&
      (reqhotel.checkInDate !== '' || null) &&
      reqhotel.checkOutDate !== null &&
      reqhotel.adults !== null
    ) {
      sethotelsearchRequest(reqhotel);
      if (currentPage) {
        props.search(reqhotel);
      } else {
        navigate('/hotels', {
          state: { reqhotel },
        });
      }
    } else {
      snackBar.show('Please fill all fields', 'error', undefined, true, 2000);
    }
  };

  const PopperMy = function (props: any) {
    return (
      <Popper
        {...props}
        style={{ maxWidth: 'fit-content', minWidth: 200 }}
        placement='bottom-start'
      />
    );
  };
  useEffect(() => {
    if (from !== null && from !== '') hotelCitySearchByKeyword();
  }, [from]);

  return (
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
                      option?.city_name ? option.city_name : ''
                    }
                    onChange={(event, newValue) => {
                      event.preventDefault();
                      onChange_search_hotel(
                        'cityCode',
                        _.get(newValue, 'city_code'),
                        '',
                      );
                    }}
                    onInputChange={(event: any, value: any) => {
                      event.preventDefault();
                      value.length > 2 && setfrom(value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder='Stay-in Place'
                        variant='outlined'
                        fullWidth
                      />
                    )}
                    renderOption={(option) => {
                      if (option && option.city_name) {
                        return (
                          <Grid container alignItems='center'>
                            <Grid item xs>
                              <span>
                                {option?.name}
                                <br />
                                <b>{option.city_name}</b>({option?.city_code})
                              </span>
                              <br />
                              <Typography variant='body2' color='textSecondary'>
                                {option?.country_code}
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
                      inputVariant='outlined'
                      margin='normal'
                      id='date-picker-dialog'
                      placeholder='Check-in'
                      format='dd/MM/yyyy'
                      disablePast={true}
                      // label='Departure'
                      style={{ fontFamily: 'AvantGarde-Regular' }}
                      value={reqhotel.checkInDate}
                      onChange={(value: any) => {
                        let date = moment(value).format('YYYY-MM-DD');
                        onChange_search_hotel('checkInDate', date, '');
                      }}
                      InputAdornmentProps={{ position: 'start' }}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        disableUnderline: true,
                      }}
                    />{' '}
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
                      if (!/[1-9]/.test(event.key)) {
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
  );
}
export default injectWithObserver(Hotelsearch);
