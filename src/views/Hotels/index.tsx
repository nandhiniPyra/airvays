import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import filterdata from '../../views/List/Filter';
import HotelBG from '../../assets/fernando-alvarez-rodriguez-M7GddPqJowg-unsplash.jpeg';
import SortPng from '../../assets/Sort@2x.png';
import blog1 from '../../assets/Blog image - 1@2x.png';
import RatingPng from '../../assets/Icon awesome-star@2x.png';
import parkingPng from '../../assets/Parking lot@2x.png';
import wifiPng from '../../assets/Wifi@2x.png';
import entertainment from '../../assets/Entertainment - Hotel@2x.png';
import pool from '../../assets/Pool@2x.png';
import gym from '../../assets/Gym@2x.png';
import restaurant from '../../assets/Restaurant@2x.png';
import drinks from '../../assets/Drinks@2x.png';
import share from '../../assets/share@2x.png';
import heartunselected from '../../assets/Icon feather-heart-unselected@2x.png';
import heart from '../../assets/Icon feather-heart@2x.png';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Fade from '@material-ui/core/Fade';
import Popper, { PopperPlacementType } from '@material-ui/core/Popper';
import BottomGrid from '../Airvays info/index';
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Checkbox, Slider, Typography, CircularProgress } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import SearchComponent from '../SearchComponent';
import { useLocation } from 'react-router';
import { _hotelOffersSearch } from '../../services/api/hotels';
import TransparentTopBar from '../../TopBar/index';
import { amenities } from '../../components/staticdata';
import { hotelData } from '../../components/hotelistData'
import _ from 'lodash';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: "1200px",
      background: "#FFFFFF",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      borderRadius: "10px",
    },
    hoteltop: {
      height: "30%",
      backgroundImage: `url(${HotelBG})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
    btn_flights: {
      width: "119px",
      height: "98px",
      background: "#EAF8FF",
      borderRadius: "10px",
      opacity: "1",
      backdropFilter: "blur(20px)",
    },
    btn_hotels: {
      width: "119px",
      height: "98px",
      background: "#EAF8FF",
      borderRadius: "10px",
      marginLeft: "15px",
    },
    btn_carretal: {
      width: "119px",
      height: "98px",
      background: "#EAF8FF",
      borderRadius: "10px",
      marginLeft: "15px",
    },
    date_picker: {
      "& .MuiInputBase-root": {
        padding: 0,
        border: "1px solid #bfb7b7",
        borderRadius: "5px",
        width: "160px",
        bottom: "15px",
        height: "55px",
        marginTop: "24px",
        "& .MuiButtonBase-root": {
          padding: 0,
          paddingLeft: 10,
        },
        "& .MuiInputBase-input": {
          padding: 15,
          paddingLeft: 0,
          alignItems: "center",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          // border: 'none'
        },
        "& .MuiSvgIcon-root": {
          color: "#33bbff",
        },
      },
    },
    hotelList_card: {
      border: "2px solid #EDEDED",
      borderRadius: "10px",
      background: "#fff",
      "&:hover": {
        background: "#fff",
        border: "none",
        boxShadow: "0px 20px 55px #0000001F",
      },
    },
    rating_png: {
      marginLeft: "10px",
      marginTop: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    slider_clr: {
      marginBottom: "25px",
      color: "#4BAFC9",
      "&..MuiSlider-root": {
        color: "#4BAFC9",
      },
    },
  })
);

let initialvalue_hotel = {
  adults: 0,
  checkInDate: null,
  checkOutDate: null,
  priceRange: "",
  ratings: "",
  boardType: "ROOM_ONLY",
  cityCode: "SIN",
};


declare global {
  interface Array<T> {
    diff(o: T): Array<T>;
  }
}
export default function HotelsList() {
  const { state }: any = useLocation();
  const classes = useStyles();
  const [progress, setProgress] = useState(false);
  const [hotelrequest, sethotelrequest] = useState(initialvalue_hotel);
  const [favourite, setFavourite] = React.useState<boolean>(true);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();
  const [openpricerange, setOpenpricerange] = useState<boolean>(false);
  const [openamenities, setOpenAmenities] = useState<boolean>(false);
  const [openAccomodation, setOpenAccomodation] = useState<boolean>(false);
  const [openRating, setOpenRating] = useState<boolean>(false);
  const [filtersData, setFiltersData] = React.useState([]);
  const [pricevalue, setpriceValue] = React.useState<number[]>([150, 200]);
  const [anchorEl2, setAnchorEl2] = useState<HTMLButtonElement | null>(null);
  const [anchorEl3, setAnchorEl3] = useState<HTMLButtonElement | null>(null);
  const [anchorEl4, setAnchorEl4] = useState<HTMLButtonElement | null>(null);
  const [anchorEl5, setAnchorEl5] = useState<HTMLButtonElement | null>(null);

  const [startingpricevalue, setStaringpricevalue] = React.useState<number[]>([
    150,
  ]);
  const [searchAmenities, setSearchAmenities] = useState(amenities);
  const [endpricevalue, setEndpricevalue] = React.useState<number[]>([200]);
  const [hotelsData, sethotelsData] = useState([]);
  const [accomidation, setAccomidation] = useState([
    {
      id: 1,
      code: 'ALL_INCLUSIVE',
      name: 'All',
      isChecked: false,

    },
    {
      id: 2,
      code: 'ROOM_ONLY',
      name: 'Room',
      isChecked: false,
    },
    {
      id: 3,
      code: 'BREAKFAST',
      name: 'Breakfast',
      isChecked: false,
    },
    {
      id: 4,
      code: 'HALF_BOARD',
      name: 'Half board',
      isChecked: false,
    },
    {
      id: 5,
      code: 'FULL_BOARD',
      name: 'Full board',
      isChecked: false,
    },
  ]);

  const [ratingValue, setRatingValue] = useState([
    {
      id: 1,
      code: 'Excellent',
      name: '5.0 Excellent',
      isChecked: false,
      value: 5,

    },
    {
      id: 2,
      code: 'Awesome',
      name: '4.5 Awesome',
      isChecked: false,
      value: 4,
    },
    {
      id: 3,
      code: 'Very Good',
      name: '4.0 Very Good',
      isChecked: false,
      value: 4,
    },
    {
      id: 4,
      code: 'Good',
      name: '3.5 Good',
      isChecked: false,
      value: 3,
    },
    {
      id: 5,
      code: 'Satisfactory',
      name: '3.0 Satisfactory',
      isChecked: false,
      value: 3,
    },
  ]);

  const handleClickAmenities =
    (newPlacement: PopperPlacementType) =>
      (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl3(event.currentTarget);
        setOpenAmenities((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
      };

  const handleClickAccomodation =
    (newPlacement: PopperPlacementType) =>
      (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl4(event.currentTarget);
        setOpenAccomodation((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
      };

  const handleClickRatings =
    (newPlacement: PopperPlacementType) =>
      (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl5(event.currentTarget);
        setOpenRating((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
      };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const data: any = hotelData.map((item: any) => {
      item['_cityName'] = item.hotel.address.cityName
      item['_cityCode'] = item.hotel.cityCode
      item['_hotelName'] = item.hotel.name
      item['_rating'] = item.hotel.rating
      item['_description'] = item.hotel.description.text
      item['_totalPrice'] = item.offers[0].price.total
      item['_amenities'] = item.hotel.amenities
      let amentity: any = []
      item.hotel.amenities.map((x: any) => {
        amentity.push({ 'amenities': x })
      })
      item['amenities1'] = amentity;
      return item;
    })
    // sethotelsData(data);
  }
  const searchHotels = (request: any) => {
    setProgress(true);
    _hotelOffersSearch(request, function (error: any, response: any) {
      if (error == null) {
        if (response.statusCode === 200) {
          sethotelrequest(request);
          const data = response.result.map((item: any) => {
            item['_cityName'] = item.hotel.address.cityName
            item['_cityCode'] = item.hotel.cityCode
            item['_hotelName'] = item.hotel.name
            item['_rating'] = item.hotel.rating
            item['_description'] = item.hotel.description.text
            item['_totalPrice'] = item.offers[0].price.total
            item['_amenities'] = item.hotel.amenities
            return item;
          })
          sethotelsData(data)
          setProgress(false);
        }
      } else if (response == null) {
        setProgress(false);
      }
    });
  };

  const handleChangeprice = (event: any, newValue: number | number[]) => {
    setpriceValue(newValue as number[]);
  };

  const handleChangeButtonPrice = () => {
    setOpenpricerange(false)
    setStaringpricevalue([pricevalue[0]]);
    setEndpricevalue([pricevalue[1]]);
    let req = {
      cityCode: hotelrequest.cityCode,
      checkInDate: hotelrequest.checkInDate,
      checkOutDate: hotelrequest.checkOutDate,
      adults: hotelrequest.adults,
      priceRange: pricevalue[0] - pricevalue[1],
      ratings: 5,
      boardType: 'ROOM_ONLY',
    }
    if (pricevalue.length) {
      searchHotels(req)
    }
  };
  function valuetext(value: number) {
    return `${value}`;
  }
  const handleClickpricerage =
    (newPlacement: PopperPlacementType) =>
      (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl2(event.currentTarget);
        setOpenpricerange((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
      };

  const handleAmenities = (id: Number) => {
    const filteredSearchAmenities = searchAmenities.filter((data) => {
      if (data.id === id) {
        data.isChecked = !data.isChecked;
      }
      return data;
    });
    setSearchAmenities(filteredSearchAmenities);
    console.log(id, 'filteredSearchAmenities: ', filteredSearchAmenities);
  };

  let amenitieCount = 1;


  const closeAmenities = () => {
    let Amenities = searchAmenities.map((x) => {
      x.isChecked = false;
      return x;
    });
    setSearchAmenities(Amenities);
    // setOpenAmenities(false)
  }

  const applyAmenities = () => {
    setOpenAmenities(false)
    const selected = searchAmenities.filter((x) => x.isChecked == true);
    let data: any = [];
    const hotelKey = selected.map((item) => {
      data.push(item.code);
    });
    Array.prototype.diff = function (arr2: any) {
      var ret = [];
      for (var i in this) {
        if (arr2.indexOf(this[i]) > -1) {
          ret.push(this[i]);
        }
      }
      return ret;
    };
    const result: any = []
    hotelsData.map((item: any) => {
      if (data.diff(item._amenities).length > 0) {
        result.push(item);
      }
    })
    if (result.length) {
      sethotelsData(result);
      console.log(result, "result")
    }
  }

  const handleAccomodation = (value: any) => {
    if (value == 'All') {
      let _accomidation = accomidation.map((x) => {
        x.isChecked = !x.isChecked;
        return x;
      });
      setAccomidation(_accomidation);
    } else {
      const filteredaccomidation = accomidation.map((data) => {
        if (data.name === value) {
          data.isChecked = !data.isChecked;
        }
        return data;
      });
      setAccomidation(filteredaccomidation)
    }
  }

  const closeAccomodation = () => {
    let accomidationValue = accomidation.map((x) => {
      x.isChecked = false;
      return x;
    });
    setAccomidation(accomidationValue)
  }


  const applyAccomodation = () => {
    setOpenAccomodation(false)
    let _accomidationkeys: any = []
    let data: any = accomidation.filter((x: any) => {
      if (x.isChecked == true) {
        _accomidationkeys.push(x.code)
      }
    })
    let key = _accomidationkeys.join(',')
    let req = {
      cityCode: hotelrequest.cityCode,
      checkInDate: hotelrequest.checkInDate,
      checkOutDate: hotelrequest.checkOutDate,
      adults: hotelrequest.adults,
      priceRange: pricevalue[0] - pricevalue[1],
      ratings: "",
      boardType: key,
    }
    if (_accomidationkeys.length) {
      searchHotels(req);
    }
    console.log(data, "data", _accomidationkeys.length)
  }

  const handleRating = (value: any) => {
    const filteredrating = ratingValue.map((data) => {
      if (data.id === value) {
        data.isChecked = !data.isChecked;
      }
      return data;
    });
    setRatingValue(filteredrating)
  }
  const applyRating = () => {
    setOpenRating(false)
    let _rating: any = []
    let data: any = ratingValue.map((x: any) => {
      if (x.isChecked == true) {
        _rating.push(x.value)
      }
    })
    let keys = _rating.join(',')
    let req = {
      cityCode: hotelrequest.cityCode,
      checkInDate: hotelrequest.checkInDate,
      checkOutDate: hotelrequest.checkOutDate,
      adults: hotelrequest.adults,
      priceRange: pricevalue[0] - pricevalue[1],
      ratings: keys,
      boardType: 'ROOM_ONLY',
    }
    if (data.length) {
      searchHotels(req);
    }
  }
  const clearRating = () => {
    let ratings = ratingValue.map((x) => {
      x.isChecked = false;
      return x;
    });
    setRatingValue(ratings)
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.hoteltop}>
        <Grid item xs={12}>
          <TransparentTopBar color="white" backgroundColor="transparent" />
        </Grid>

        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <div style={{ marginTop: "6%" }}>
            <SearchComponent
              hotelrequest={hotelrequest}
              type="hotel"
              currentpage={true}
              search={(value: any) => searchHotels(value)}
            />
          </div>

          <Grid container spacing={2} style={{ marginTop: "20px" }}>
            <Grid item xs={12}>
              <Typography
                style={{
                  textAlign: "left",
                  fontSize: "20px",
                  fontWeight: 500,
                }}
              >
                Search Results
              </Typography>
              {hotelsData.length > 0 &&
                <Typography style={{ textAlign: 'right' }}>
                  {hotelsData.length} of {hotelsData.length} hotels
                </Typography>
              }
              <Typography style={{ color: '#4BAFC9' }}>Filter By</Typography>
            </Grid>
          </Grid>

          <Grid container spacing={3} style={{ marginTop: "20px" }}>
            <Grid item xs={10} style={{ display: "flex" }}>

              <ClickAwayListener onClickAway={() => setOpenAccomodation(false)}>
                <div>
                  <Button
                    onClick={handleClickAccomodation('bottom-start')}
                    style={{
                      color: "#FFF",
                      background: "#4BAFC9",
                      borderRadius: "20px",
                      fontFamily: "Crimson Text",
                      boxShadow: " 3px 11px 9px -6px #4BAFC9",
                      paddingLeft: "15px",
                      paddingRight: "15px",
                    }}
                  >
                    Accommodation Type: All
                  </Button>

                  <Popper open={openAccomodation} anchorEl={anchorEl4} placement={placement} transition>
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                          <List style={{ width: '250px', marginTop: '20px' }}>
                            {accomidation.map((v) => {
                              const labelId = `checkbox-list-label-${v.id}`;
                              return (
                                <ListItem
                                  key={v.id}
                                  role={undefined}
                                  dense
                                  button
                                  onClick={() => handleAccomodation(v.name)}>
                                  <ListItemIcon>
                                    <Checkbox
                                      edge='start'
                                      checked={v.isChecked}
                                      tabIndex={-1}
                                      disableRipple
                                      inputProps={{
                                        'aria-labelledby': labelId,
                                      }}
                                      style={{
                                        color: '#4BAFC9',
                                      }}
                                    />
                                  </ListItemIcon>
                                  <ListItemText id={labelId} primary={v.name} />
                                </ListItem>
                              );
                            })}
                          </List>
                          <Divider />{' '}
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              height: '45px'
                            }}>
                            <div>
                              <Button onClick={closeAccomodation}>clear</Button>
                            </div>
                            <div>
                              <Button
                                onClick={() => {
                                  // setFiltersData(filterdata(filtersData));
                                  applyAccomodation();
                                }}
                                variant='contained'
                                style={{
                                  backgroundColor: "#09B7A3",
                                  color: "#fff",
                                  borderRadius: "10px",
                                  marginTop: "5px",
                                  marginRight: '5px'

                                }}>
                                Apply
                              </Button>
                            </div>
                          </div>
                        </Paper>
                      </Fade>
                    )}
                  </Popper>
                </div>
              </ClickAwayListener>
              {/*Price range PopUp */}
              <ClickAwayListener onClickAway={() => setOpenpricerange(false)}>
                <div>
                  <Button
                    style={{
                      color: '#FFF',
                      background: '#4BAFC9',
                      borderRadius: '20px',
                      marginLeft: '15px',
                      fontFamily: 'Crimson Text',
                      boxShadow: ' 3px 11px 9px -6px #4BAFC9',
                      paddingLeft: '15px',
                      paddingRight: '15px',
                    }}
                    onClick={handleClickpricerage('bottom-start')}>
                    <span>
                      Price Range : ${startingpricevalue[0]} to $
                      {endpricevalue[0]}
                    </span>
                  </Button>
                  <Popper
                    style={{ width: "20%", marginTop: "15px" }}
                    open={openpricerange}
                    anchorEl={anchorEl2}
                    placement={placement}
                    transition
                  >
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <Paper style={{ padding: "16px", paddingBottom: "10px" }}>
                          <Grid container>
                            <Grid item xs={12}>
                              <Typography id="range-slider" gutterBottom>
                                <span>
                                  ${pricevalue[0]} to ${pricevalue[1]}
                                </span>
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Slider
                                className={classes.slider_clr}
                                value={pricevalue}
                                onChange={handleChangeprice}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                getAriaValueText={valuetext}
                                min={1}
                                max={1000}
                              />
                            </Grid>
                          </Grid>
                          <Divider />
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              alignItems: "center",
                              marginTop: "10px",
                            }}
                          >
                            <div style={{ margin: "10px" }}>
                              <Button
                                style={{
                                  // background: "#EFFAFF",
                                  borderRadius: "10px",
                                  marginTop: "5px",
                                  marginLeft: "10px",
                                  color: "#A7A7A7",
                                }}
                                onClick={(event) => {
                                  handleChangeprice(event, [150, 200]);
                                  setStaringpricevalue([150]);
                                  setEndpricevalue([200]);
                                }}
                              >
                                Reset
                              </Button>
                            </div>
                            <div>
                              <Button
                                onClick={() => {
                                  // setFiltersData(filterdata(filtersData));
                                  handleChangeButtonPrice();
                                }}
                                variant="contained"
                                style={{
                                  backgroundColor: "#09B7A3",
                                  color: "#fff",
                                  borderRadius: "10px",
                                  marginTop: "5px",
                                  marginRight: '5px'

                                }}
                              >
                                Apply
                              </Button>
                            </div>
                          </div>
                        </Paper>
                      </Fade>
                    )}
                  </Popper>
                </div>
              </ClickAwayListener>
              <ClickAwayListener onClickAway={() => setOpenAmenities(false)}>
                <div>
                  <Button
                    style={{
                      color: "#FFF",
                      background: "#4BAFC9",
                      borderRadius: "20px",
                      marginLeft: "15px",
                      fontFamily: "Crimson Text",
                      boxShadow: " 3px 11px 9px -6px #4BAFC9",
                      paddingLeft: "15px",
                      paddingRight: "15px",
                    }}
                    onClick={handleClickAmenities("bottom-start")}
                  >
                    Amenities:{" "}
                    {searchAmenities.map((amenitie) => {
                      if (amenitieCount <= 2) {
                        if (amenitie.isChecked) {
                          amenitieCount++;
                          return <span> {amenitie.name}, &nbsp; </span>;
                        }
                      }
                    })}
                  </Button>


                  <Popper open={openamenities} anchorEl={anchorEl3} placement={placement} transition>
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <Paper>

                          <List style={{ height: '200px', overflow: 'scroll', marginTop: '20px' }}>
                            {amenities.map((v) => {
                              const labelId = `checkbox-list-label-${v.id}`;
                              return (
                                <ListItem
                                  key={v.id}
                                  role={undefined}
                                  dense
                                  button
                                  onClick={() => handleAmenities(v.id)}>
                                  <Grid container>
                                    <Grid item xs={2}>
                                      <ListItemIcon>
                                        <Checkbox
                                          edge='start'
                                          checked={v.isChecked}
                                          tabIndex={-1}
                                          disableRipple
                                          inputProps={{
                                            'aria-labelledby': labelId,
                                          }}
                                          style={{
                                            color: '#4BAFC9',
                                          }}
                                        />
                                      </ListItemIcon>
                                    </Grid>
                                    <Grid item xs={8}>
                                      <ListItemText id={labelId} primary={v.name} />
                                    </Grid>
                                    <Grid item xs={2}>
                                      <ListItemText id={labelId} primary={v.price} />
                                    </Grid>
                                  </Grid>
                                </ListItem>
                              );
                            })}
                          </List>
                          <Divider />{' '}
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              height: '45px'
                            }}>
                            <div>
                              <Button onClick={closeAmenities}>clear</Button>
                            </div>
                            <div>
                              <Button
                                onClick={() => {
                                  // setFiltersData(filterdata(filtersData));
                                  applyAmenities();
                                }}
                                variant='contained'
                                style={{
                                  backgroundColor: "#09B7A3",
                                  color: "#fff",
                                  borderRadius: "10px",
                                  marginTop: "5px",
                                  marginRight: '5px'

                                }}>
                                Apply
                              </Button>
                            </div>
                          </div>
                        </Paper>
                      </Fade>
                    )}
                  </Popper>
                </div>
              </ClickAwayListener>
              <ClickAwayListener onClickAway={() => setOpenRating(false)}>
                <div>
                  <Button
                    onClick={handleClickRatings('bottom-start')}
                    style={{
                      color: "#333333",
                      background: "#F7F7F7",
                      borderRadius: "20px",
                      marginLeft: "15px",
                      fontFamily: "Crimson Text",
                      paddingLeft: "15px",
                      paddingRight: "15px",
                    }}
                  >
                    Ratings
                  </Button>
                  <Popper open={openRating} anchorEl={anchorEl5} placement={placement} transition>
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                          <List style={{ height: '200px', overflow: 'scroll', marginTop: '20px' }}>
                            {ratingValue.map((v) => {
                              const labelId = `checkbox-list-label-${v.id}`;
                              return (
                                <ListItem
                                  key={v.id}
                                  role={undefined}
                                  dense
                                  button
                                  onClick={() => handleRating(v.id)}>

                                  <ListItemIcon>
                                    <Checkbox
                                      edge='start'
                                      checked={v.isChecked}
                                      tabIndex={-1}
                                      disableRipple
                                      inputProps={{
                                        'aria-labelledby': labelId,
                                      }}
                                      style={{
                                        color: '#4BAFC9',
                                      }}
                                    />
                                  </ListItemIcon>
                                  <ListItemText id={labelId} primary={v.name} />

                                </ListItem>
                              );
                            })}
                          </List>
                          <Divider />{' '}
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              height: '45px'
                            }}>
                            <div>
                              <Button onClick={clearRating}>clear</Button>
                            </div>
                            <div>
                              <Button
                                onClick={() => {
                                  // setFiltersData(filterdata(filtersData));
                                  applyRating();
                                }}
                                variant='contained'
                                style={{
                                  backgroundColor: "#09B7A3",
                                  color: "#fff",
                                  borderRadius: "10px",
                                  marginTop: "5px",
                                  marginRight: '5px'
                                }}>
                                Apply
                              </Button>
                            </div>
                          </div>
                        </Paper>
                      </Fade>
                    )}
                  </Popper>
                </div>
              </ClickAwayListener>
            </Grid>
            <Grid
              item
              xs={2}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <div>
                <img
                  alt=""
                  src={SortPng}
                  style={{ width: "35px", height: "30px" }}
                ></img>
              </div>
            </Grid>
          </Grid>



          {progress ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress
                size={40}
                style={{ color: 'rgb(75, 175, 201)', marginTop: '20px' }}
              />
            </div>
          ) : (
            <>
              {/* Hotel List */}

              {

                hotelsData.length > 0 ?
                  hotelsData.map((item: any) => (
                    <Paper
                      style={{ display: 'flex', marginTop: '25px' }}
                      className={classes.hotelList_card}
                    >
                      <Grid container>
                        <Grid item xs={3}>
                          <div style={{ display: 'flex', margin: '10px' }}>
                            <div>
                              <img
                                alt=''
                                style={{
                                  width: '100%',
                                  height: '250px',
                                  borderRadius: '10px',
                                }}
                                src={blog1}></img>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={6}>
                          <div>
                            <div className={classes.rating_png}>
                              <img
                                alt=''
                                src={RatingPng}
                                style={{ width: '20px', height: '20px' }}></img>{' '}
                              &nbsp;
                              <img
                                alt=''
                                src={RatingPng}
                                style={{ width: '20px', height: '20px' }}></img>{' '}
                              &nbsp;
                              <img
                                alt=''
                                src={RatingPng}
                                style={{ width: '20px', height: '20px' }}></img>{' '}
                              &nbsp;
                              <img
                                alt=''
                                src={RatingPng}
                                style={{ width: '20px', height: '20px' }}></img>
                              &nbsp; 4.0
                              <div style={{ flexGrow: 1, marginRight: '10px' }}>
                                <Typography
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    lineHeight: 0,
                                    textDecoration: 'underline',
                                  }}>
                                  152 Reviews
                                </Typography>
                              </div>
                            </div>

                            <div style={{ marginTop: '15px', marginLeft: '10px' }}>
                              <Typography style={{ fontWeight: 500, color: '#1C2460' }}>
                                {item._hotelName}
                              </Typography>
                              <Typography>{item._cityCode}{item._cityName}</Typography>
                              <div style={{ marginTop: '15px', display: 'flex' }}>
                                <img
                                  alt=''
                                  src={wifiPng}
                                  style={{
                                    width: '25px',
                                    height: '25px',
                                    margin: '5px',
                                  }}></img>
                                <img
                                  alt=''
                                  src={pool}
                                  style={{
                                    width: '25px',
                                    height: '25px',
                                    margin: '5px',
                                  }}></img>
                                <img
                                  alt=''
                                  src={entertainment}
                                  style={{
                                    width: '25px',
                                    height: '25px',
                                    margin: '5px',
                                  }}></img>
                                <img
                                  alt=''
                                  src={parkingPng}
                                  style={{
                                    width: '25px',
                                    height: '25px',
                                    margin: '5px',
                                  }}></img>
                                <img
                                  alt=''
                                  src={gym}
                                  style={{
                                    width: '25px',
                                    height: '25px',
                                    margin: '5px',
                                  }}></img>
                                <img
                                  alt=''
                                  src={drinks}
                                  style={{
                                    width: '25px',
                                    height: '25px',
                                    margin: '5px',
                                  }}></img>
                                <img
                                  alt=''
                                  src={restaurant}
                                  style={{
                                    width: '25px',
                                    height: '25px',
                                    margin: '5px',
                                  }}></img>
                              </div>

                              <Typography
                                noWrap
                                style={{ marginTop: '15px', color: '#1C2460', }}>
                                {item._description}
                              </Typography>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={3} style={{ borderLeft: '1px solid #EDEDED' }}>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              padding: '28px',
                            }}>
                            <img
                              alt=''
                              src={share}
                              style={{
                                width: '25px',
                                height: '25px',
                                marginRight: '30px',
                              }}
                            />
                            <div onClick={() => setFavourite(!favourite)}>
                              {favourite ? (
                                <img
                                  alt=''
                                  src={heartunselected}
                                  style={{ width: '25px', height: '25px' }}
                                />
                              ) : (
                                <img
                                  alt=''
                                  src={heart}
                                  style={{ width: '25px', height: '25px' }}
                                />
                              )}
                            </div>
                          </div>
                          <div
                            style={{
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              display: 'flex',
                              marginTop: '30px',
                            }}>
                            <div>
                              <Typography
                                style={{
                                  marginLeft: '20px',
                                }}>
                                <span
                                  style={{
                                    fontSize: '22px',
                                    fontWeight: 500,
                                    color: '#1C2460',
                                    marginLeft: '45px',
                                  }}>
                                  INR:{item._totalPrice}
                                </span>
                                per night
                              </Typography>
                              <br />
                              <Button
                                variant='contained'
                                style={{
                                  background: '#DCAB5E',
                                  color: '#fff',
                                  marginLeft: '41px',
                                }}>
                                Reserve Now
                              </Button>
                            </div>
                          </div>
                          <div
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              display: 'flex',
                            }}>
                            <Button
                              variant='contained'
                              style={{
                                background: '#F2FFFD',
                                color: '#09B7A3',
                                borderRadius: '10px',
                                marginTop: '20px',
                                fontSize: '10px',
                              }}>
                              Free Cancellation till check-in
                            </Button>
                          </div>
                        </Grid>
                      </Grid>
                    </Paper>
                  )
                  ) :
                  (
                    <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center' }}>
                      <Typography variant='h6'>No Hotels Found</Typography>
                    </div>
                  )
              }
            </>
          )
          }
        </Grid>
        <Grid item xs={1}>
          {" "}
        </Grid>
        <Divider style={{ marginTop: "20px" }} />
        <div style={{ width: "100%" }}>
          <BottomGrid />
        </div>
      </Grid>
    </div>
  );
}
