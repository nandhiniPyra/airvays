import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import DateFnsUtils from '@date-io/date-fns';
import carImg from '../../assets/Icon awesome-car@2x.png';
import ActiveFlightImg from '../../assets/Icon material-flight-darkblue@2x.png';
import hotelImg from '../../assets/Icon metro-hotel@2x.png';
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

function Flightsearch(props: any) {
  const classes = useStyles();
  const snackBar = useSnackbar();
  const navigate = useNavigate();
  const store = useStore();

  const { component, currentPage } = toJS(store.Search);
  const { searchRequest } = toJS(store.FlightDetails);
  const { setComponent } = store.Search;
  const { setsearchRequest, setFlightType } = store.FlightDetails;
  const [radiovalue, setRadioValue] = React.useState('one-way');
  const [fromOptions, setFromOptions] = useState<Array<any>>([{}]);
  const [toOptions, setToOptions] = useState<Array<any>>([{}]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const [req, setreq] = useState(searchRequest);
  const [from, setfrom] = useState('');
  const [to, setto] = useState('');
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
        setsearchRequest(stateSend);
        console.log(currentPage, 'currentPage');
        if (currentPage) {
          props.search(stateSend);
        } else {
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
    setFlightType(radiovalue);
  }, [radiovalue]);

  useEffect(() => {
    if (props.request) {
      setreq(props.request);
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
                src={ActiveFlightImg}
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
                src={hotelImg}
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
                src={carImg}
                style={{ marginTop: '20px', height: '20%', width: '20%' }}
              />

              <br />
              <div style={{ marginTop: '12px' }}>Car Rental</div>
            </div>
          </div>
        </Grid>
      </Grid>

      <Grid container style={{ marginTop: '2%' }}>
        <Grid xs={12}>
          <Paper className={classes.paper}>
            <FormControl component='fieldset'>
              <RadioGroup
                row
                aria-label='position'
                defaultValue={radiovalue}
                name='type'
                value={req.type}
                onChange={(e: any) => {
                  e.preventDefault();
                  onChange('type', e.target.value, '');
                  setRadioValue(e.target.value);
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
                  label={
                    <Typography
                      style={{
                        fontFamily: 'AvantGarde-Regular',
                        fontSize: '15px',
                      }}>
                      One-way
                    </Typography>
                  }
                  value='one-way'
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
                  label={
                    <Typography
                      style={{
                        fontFamily: 'AvantGarde-Regular',
                        fontSize: '15px',
                      }}>
                      Return
                    </Typography>
                  }
                  value='return'
                />
              </RadioGroup>
            </FormControl>

            <div style={{ marginTop: '5px' }}>
              <Grid container spacing={2}>
                <Grid xs={2}>
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
                      onChange(
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
                        name='From'
                        label='From'
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
                                <b>{option.name}</b>({option?.address?.cityCode}
                                )
                              </span>
                              <br />
                              <span> {option?.address?.cityName}</span>
                              <Typography variant='body2' color='textSecondary'>
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
                <Grid item xs={1} style={{ maxWidth: '5.33%' }}>
                  <div
                    style={{
                      marginTop: '25%',
                      marginLeft: '17%',
                      // marginRight: "10px",
                    }}>
                    <img alt='' src={exchange} style={{ width: '25px' }} />
                  </div>
                </Grid>
                <Grid xs={2}>
                  <Autocomplete
                    id='to'
                    freeSolo={true}
                    options={toOptions ? toOptions : []}
                    getOptionLabel={(option) =>
                      option?.address?.cityName ? option.address.cityName : ''
                    }
                    onChange={(event, newValue) => {
                      event.preventDefault();
                      settocityname(_.get(newValue?.address, 'cityName'));
                      onChange('to', _.get(newValue?.address, 'cityCode'), '');
                    }}
                    onInputChange={(event, value: any) => {
                      event.preventDefault();
                      value.length > 2 && setto(value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        style={{
                          top: '8px',
                          right: '8px',
                          fontFamily: 'AvantGarde-Regular',
                        }}
                        {...params}
                        value={req.to}
                        name='To'
                        label='To'
                        variant='outlined'
                      />
                    )}
                    PopperComponent={PopperMy}
                    renderOption={(option) => {
                      if (option && option.name) {
                        return (
                          <Grid container alignItems='center'>
                            <Grid item xs>
                              <span>
                                <b>{option.name}</b>({option?.address?.cityCode}
                                )
                              </span>
                              <br />
                              <span> {option?.address?.cityName}</span>
                              <Typography variant='body2' color='textSecondary'>
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
                      inputVariant='outlined'
                      margin='normal'
                      id='date-picker-dialog'
                      placeholder='Departure'
                      format='dd/MM/yyyy'
                      disablePast={true}
                      // label='Departure'
                      style={{ fontFamily: 'AvantGarde-Regular' }}
                      value={req.from_date}
                      onChange={(value: any) => {
                        let date = moment(value).format('YYYY-MM-DD');
                        onChange('from_date', date, '');
                      }}
                      InputAdornmentProps={{ position: 'start' }}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        disableUnderline: true,
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                {radiovalue !== 'one-way' ? (
                  <Grid item xs={2}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        className={classes.date_picker}
                        margin='normal'
                        inputVariant='outlined'
                        // label='Arrival'
                        id='date-picker-dialog'
                        placeholder='Arrival'
                        style={{ fontFamily: 'AvantGarde-Regular' }}
                        format='dd/MM/yyyy'
                        disablePast={true}
                        value={req.to_date}
                        onChange={(value: any) => {
                          let date = moment(value).format('YYYY-MM-DD');
                          onChange('to_date', date, '');
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
                ) : (
                  ''
                )}
                <Grid item xs={2}>
                  <TextField
                    id='NoP'
                    placeholder='No.of People'
                    variant='outlined'
                    value={
                      req && req.no_of_people
                        ? req.no_of_people.adults +
                          req.no_of_people.children +
                          req.no_of_people.infants
                        : 0
                    }
                    onClick={handleNoP}
                    style={{ fontFamily: 'AvantGarde-Regular' }}
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
                    style={{ overflow: 'hidden' }}>
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
                    style={{
                      background: '#33BBFF',
                      width: '35px',
                      height: '54px',
                    }}
                    onClick={(e: any) => handleSearchFlight(e)}>
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
        </Grid>{' '}
      </Grid>
    </>
  );
}
export default injectWithObserver(Flightsearch);
