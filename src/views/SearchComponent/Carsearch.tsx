import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import DateFnsUtils from '@date-io/date-fns';
import { _getAirports } from '../../services/api/location';
import user from '../../assets/Icon feather-user@2x.png';
import {
  Button,
  Divider,
  Typography,
  makeStyles,
  Theme,
  Grid,
  Paper,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  Popover,
  Popper,
  TextField,
} from '@material-ui/core';
import exchange from '../../assets/exchange@2x.png';
import flightImg from '../../assets/Icon material-flight@2x 2.png';

import addPeople from '../../assets/People - Add@2x.png';
import subtractPeople from '../../assets/People - subtract@2x.png';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import search from '../../assets/icons8-search-30.png';
import { Autocomplete } from '@material-ui/lab';
import moment from 'moment';
import _ from 'lodash';
import CustomizedSnackbars from '../../components/materialToast';
import useSnackbar from '../../Hoc/useSnackbar';

import injectWithObserver from '../../utils/injectWithObserver';
import { useStore } from '../../mobx/Helpers/UseStore';
import { toJS } from 'mobx';
import Hotelsearch from './Hotelsearch';
import Flightsearch from './Flightsearch';

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
let initialstate = {
  from: '',
  to: '',
  currencyCode: 'INR',
  type: 'one-way',
  from_date: null,
  to_date: null,
  no_of_people: {
    adults: 1,
    children: 0,
    infants: 0,
  },
  class: 'ECONOMY',
  fromcity: '',
  tocity: '',
};
let initialvalue_hotel = {
  adults: 1,
  checkInDate: null,
  checkOutDate: null,
  priceRange: '',
  ratings: '',
  boardType: 'ROOM_ONLY',
  cityCode: 'SIN',
  from: '',
};
function Carsearch(props: any) {
  const classes = useStyles();
  const snackBar = useSnackbar();
  const navigate = useNavigate();
  const store = useStore();

  const { setsearchRequest, setFlightType } = store.FlightDetails;
  const { sethotelsearchRequest } = store.HotelDetails;

  const [radiovalue, setRadioValue] = React.useState('one-way');
  const [fromOptions, setFromOptions] = useState<Array<any>>([{}]);
  const [toOptions, setToOptions] = useState<Array<any>>([{}]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [component, setComponent] = React.useState(
    props.type ? props.type : 'flight',
  );
  useEffect(() => {
    setFlightType(radiovalue);
  }, [radiovalue]);
  const [req, setreq] = useState(initialstate);
  const [from, setfrom] = useState('');
  const [to, setto] = useState('');
  const [reqhotel, setreqhotel] = useState(initialvalue_hotel);
  const [fromcityname, setfromcityname] = useState('');
  const [tocityname, settocityname] = useState('');

  const getAirportsFrom = () => {
    _getAirports({ search: from }, function (error: any, response: any) {
      if (error === null) {
        if (response.status === '200') {
          let toData: any = response.result.filter(
            (item: any) => item.name !== to,
          );
          response.result && response.result.length > 0
            ? setFromOptions(toData)
            : setFromOptions([]);
        }
      }
    });
  };

  const getAirportsTo = () => {
    _getAirports({ search: to }, function (error: any, response: any) {
      if (error === null) {
        if (response.status === '200') {
          let toData: any = response.result.filter(
            (item: any) => item.name != from,
          );
          response.result && response.result.length > 0
            ? setToOptions(toData)
            : setToOptions([]);
        }
      }
    });
  };

  const handleSubmit = () => {};
  const handleSearchFlight = (event: any) => {
    event.preventDefault();
    if (
      (req.from !== '' || null) &&
      (req.to !== '' || null) &&
      req.from_date !== null
    ) {
      if (req.no_of_people.adults) {
        let stateSend = {
          ...req,
          fromcity: fromcityname,
          tocity: tocityname,
        };
        if (props.currentpage) {
          setsearchRequest(stateSend);

          props.search(stateSend);
        } else {
          setsearchRequest(stateSend);

          navigate('/flightList', {
            state: { stateSend },
          });
        }
      } else {
        snackBar.show(
          'Select atleast one adult',
          'error',
          undefined,
          true,
          2000,
        );
      }
    } else {
      snackBar.show('Please fill all fields', 'error', undefined, true, 2000);
    }
  };

  const onChange = (key: any, value: any, nop: any) => {
    if (key === 'no_of_people.adults' && nop === '+') {
      setreq((prevState: any) => {
        return {
          ...prevState,
          no_of_people: {
            ...prevState.no_of_people,
            adults: prevState.no_of_people.adults + 1,
          },
        };
      });
    }
    if (key === 'no_of_people.adults' && nop === '-') {
      setreq((prevState: any) => {
        return {
          ...prevState,
          no_of_people: {
            ...prevState.no_of_people,
            adults: prevState.no_of_people.adults
              ? prevState.no_of_people.adults - 1
              : 0,
          },
        };
      });
    }
    if (key === 'no_of_people.children' && nop === '+') {
      setreq((prevState: any) => {
        return {
          ...prevState,
          no_of_people: {
            ...prevState.no_of_people,
            children: prevState.no_of_people.children + 1,
          },
        };
      });
    }
    if (key === 'no_of_people.children' && nop === '-') {
      setreq((prevState: any) => {
        return {
          ...prevState,
          no_of_people: {
            ...prevState.no_of_people,
            children: prevState.no_of_people.children
              ? prevState.no_of_people.children - 1
              : 0,
          },
        };
      });
    }
    if (key === 'no_of_people.infants' && nop === '+') {
      setreq((prevState: any) => {
        return {
          ...prevState,
          no_of_people: {
            ...prevState.no_of_people,
            infants: prevState.no_of_people.infants + 1,
          },
        };
      });
    }
    if (key === 'no_of_people.infants' && nop === '-') {
      setreq((prevState: any) => {
        return {
          ...prevState,
          no_of_people: {
            ...prevState.no_of_people,
            infants: prevState.no_of_people.infants
              ? prevState.no_of_people.infants - 1
              : 0,
          },
        };
      });
    }
    if (
      key === 'from_date' ||
      key === 'to_date' ||
      key === 'from' ||
      key === 'to' ||
      key === 'type'
    ) {
      setreq((prevState: any) => ({
        ...prevState,
        [key]: value,
      }));
    }
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleNoP = (event: any) => {
    handlePopoverClick(event);
  };

  const handlePopoverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const search_hotel = () => {
    if (
      (reqhotel.from !== '' || null) &&
      (reqhotel.checkInDate !== '' || null) &&
      reqhotel.checkOutDate !== null &&
      reqhotel.adults !== null
    ) {
      if (props.type == 'hotel') {
        sethotelsearchRequest(reqhotel);
        props.search();
      } else {
        // navigate('/hotels');
      }
    } else {
      console.log('&&&&&&&456&&&&&&', reqhotel);
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

  useEffect(() => {
    if (to !== null && to !== '') getAirportsTo();
  }, [to]);

  useEffect(() => {
    if (props.request) {
      setreq(props.request);
    } else if (props.hotelrequest) {
      setreqhotel(props.hotelrequest);
    }
  }, []);

  useEffect(() => {
    let data = localStorage.getItem('flightDetails');
    data !== null && setreq(JSON.parse(data).searchRequest);
  }, [localStorage.getItem('flightDetails')]);

  const onClickFlight = () => {
    setComponent('flight');
    navigate('/flightList');
  };

  const onClickHotel = () => {
    setComponent('hotel');
    navigate('/hotels');
  };

  return (
    <Grid container style={{ marginTop: '2%' }}>
      {/* <Grid xs={1}></Grid> */}
      <Grid xs={12}>
        <Paper className={classes.paper}>
          <FormControl component='fieldset'>
            <RadioGroup
              row
              aria-label='position'
              defaultValue='top'
              name='value'
              value='Same Drop-off'
              onChange={(e: any) => {
                onChange('type', e.target.value, '');
              }}>
              <FormControlLabel
                name='value'
                control={
                  <Radio
                    classes={{
                      root: classes.radio,
                      checked: classes.checked,
                    }}
                  />
                }
                label='Same Drop-off'
                value='Same Drop-off'
              />
              <FormControlLabel
                control={
                  <Radio
                    classes={{
                      root: classes.radio,
                      checked: classes.checked,
                    }}
                  />
                }
                label='Different Drop-off'
                value='Different Drop-off'
              />
            </RadioGroup>
          </FormControl>

          <div style={{ marginTop: '5px' }}>
            <form autoComplete='off'>
              <Grid container spacing={2}>
                <Grid xs={2}>
                  <Autocomplete
                    id='from'
                    freeSolo
                    className='country-select'
                    options={fromOptions}
                    style={{ marginLeft: '9px' }}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => {
                      console.log(JSON.stringify(newValue, null, ' '));
                    }}
                    onInputChange={(event, value: any) => {
                      event.preventDefault();
                      onChange('from', JSON.stringify(value, null, ' '), '');
                    }}
                    renderInput={(params) => (
                      <TextField
                        style={{ top: '8px' }}
                        {...params}
                        name='Pickup Location'
                        label='Pickup Location'
                        variant='outlined'
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid xs={2}>
                  <Autocomplete
                    id='to'
                    freeSolo
                    options={fromOptions}
                    style={{ marginLeft: '9px' }}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => {
                      console.log(JSON.stringify(newValue, null, ' '));
                    }}
                    onInputChange={(event, value: any) => {
                      event.preventDefault();
                      onChange('to', JSON.stringify(value, null, ' '), '');
                    }}
                    renderInput={(params) => (
                      <TextField
                        style={{
                          top: '8px',
                        }}
                        {...params}
                        name='Drop-off Location'
                        label='Drop-off Location'
                        variant='outlined'
                        //   fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={2}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className={classes.date_picker}
                      margin='normal'
                      id='date-picker-dialog'
                      placeholder='Pickup Date'
                      format='MM/dd/yyyy'
                      disablePast={true}
                      value={req.from_date}
                      onChange={(value: any) =>
                        onChange('from_date', value, '')
                      }
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
                      placeholder='Drop-off Date'
                      format='MM/dd/yyyy'
                      disablePast={true}
                      value={req.to_date}
                      onChange={(value: any) => onChange('to_date', value, '')}
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
                  <TextField
                    id='NoP'
                    placeholder='No.of People'
                    //   label="No.of People"
                    variant='outlined'
                    value={
                      req.no_of_people.adults +
                      req.no_of_people.children +
                      req.no_of_people.infants
                    }
                    onClick={handleNoP}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <img alt='' src={user}></img>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Popover
                    open={Boolean(anchorEl)}
                    className={classes.popOver}
                    anchorEl={anchorEl}
                    onClick={handlePopoverClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                    style={{ overflow: 'hidden' }}
                    // autoFocus={false}
                  >
                    <Grid
                      container
                      spacing={2}
                      style={{
                        marginTop: '5px',
                        padding: '3px',
                        borderRadius: '30px',
                      }}>
                      <Grid item xs={6}>
                        <Typography
                          style={{
                            marginLeft: '15px',
                          }}>
                          Adults
                        </Typography>
                        <Typography
                          style={{
                            marginLeft: '15px',
                            fontSize: '12px',
                          }}>
                          Age 13 or above
                        </Typography>
                      </Grid>
                      <Grid item xs={2}></Grid>
                      <Grid item xs={4}>
                        <Grid container spacing={2}>
                          <Grid
                            item
                            xs={2}
                            style={{
                              textAlign: 'center',
                            }}>
                            <Button>
                              <img
                                alt=''
                                style={{
                                  width: '65%',
                                  height: '80%',
                                  position: 'relative',
                                  right: '22px',
                                }}
                                src={subtractPeople}
                                onClick={() =>
                                  onChange('no_of_people.adults', '', '-')
                                }></img>
                            </Button>
                          </Grid>
                          <Grid item xs={2}>
                            <Typography
                              style={{
                                marginTop: '10px',
                                marginLeft: '15px',
                                textAlign: 'center',
                              }}>
                              {req.no_of_people.adults}
                            </Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <Button>
                              <img
                                alt=''
                                src={addPeople}
                                onClick={() =>
                                  onChange('no_of_people.adults', '', '+')
                                }
                                style={{
                                  width: '65%',
                                  height: '80%',
                                }}></img>
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Divider />
                    <Grid
                      container
                      spacing={2}
                      style={{ marginTop: '5px', padding: '3px' }}>
                      <Grid item xs={6}>
                        <Typography
                          style={{
                            marginLeft: '15px',
                          }}>
                          Children
                        </Typography>
                        <Typography
                          style={{
                            marginLeft: '15px',
                            fontSize: '12px',
                          }}>
                          Age 2 to 12
                        </Typography>
                      </Grid>
                      <Grid item xs={2}></Grid>
                      <Grid item xs={4}>
                        <Grid container spacing={2}>
                          <Grid
                            item
                            xs={2}
                            style={{
                              textAlign: 'center',
                            }}>
                            <Button>
                              <img
                                alt=''
                                style={{
                                  width: '65%',
                                  height: '80%',
                                  position: 'relative',
                                  right: '22px',
                                }}
                                src={subtractPeople}
                                onClick={() =>
                                  onChange('no_of_people.children', '', '-')
                                }></img>
                            </Button>
                          </Grid>
                          <Grid item xs={2}>
                            <Typography
                              style={{
                                marginTop: '10px',
                                marginLeft: '15px',
                                textAlign: 'center',
                              }}>
                              {req.no_of_people.children}
                            </Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <Button>
                              <img
                                alt=''
                                src={addPeople}
                                style={{
                                  width: '65%',
                                  height: '80%',
                                }}
                                onClick={() =>
                                  onChange('no_of_people.children', '', '+')
                                }></img>
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Divider />
                    <Grid
                      container
                      spacing={2}
                      style={{ marginTop: '5px', padding: '3px' }}>
                      <Grid item xs={6}>
                        <Typography
                          style={{
                            marginLeft: '15px',
                          }}>
                          Infants
                        </Typography>
                        <Typography
                          style={{
                            marginLeft: '15px',
                            fontSize: '12px',
                          }}>
                          Under 2
                        </Typography>
                      </Grid>
                      <Grid item xs={2}></Grid>
                      <Grid item xs={4}>
                        <Grid container spacing={2}>
                          <Grid
                            item
                            xs={2}
                            style={{
                              textAlign: 'center',
                            }}>
                            <Button>
                              <img
                                alt=''
                                style={{
                                  width: '65%',
                                  height: '80%',
                                  position: 'relative',
                                  right: '22px',
                                }}
                                src={subtractPeople}
                                onClick={() =>
                                  onChange('no_of_people.infants', '', '-')
                                }></img>
                            </Button>
                          </Grid>
                          <Grid item xs={2}>
                            <Typography
                              style={{
                                marginTop: '10px',
                                marginLeft: '15px',
                                textAlign: 'center',
                              }}>
                              {req.no_of_people.infants}
                            </Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <Button>
                              <img
                                alt=''
                                src={addPeople}
                                style={{
                                  width: '65%',
                                  height: '80%',
                                }}
                                onClick={() =>
                                  onChange('no_of_people.infants', '', '+')
                                }></img>
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Popover>
                </Grid>
                <Grid item xs={1}>
                  <Button
                    type='submit'
                    style={{
                      background: '#33BBFF',
                      width: '35px',
                      height: '54px',
                    }}
                    onClick={handleSubmit}>
                    <img
                      alt=''
                      src={search}
                      style={{ width: '24px', height: '24px' }}
                    />
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}
export default injectWithObserver(Carsearch);
