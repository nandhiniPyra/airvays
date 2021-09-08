import React, { useState, useRef } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import blog1 from '../../assets/pexels-alexandr-podvalny-3278215.jpeg';
import blog4 from '../../assets/pexels-tom-fisk-2169857.jpeg';
import rightArrow from '../../assets/right-arrow@2x.png';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import blog1 from '../../assets/Blog image - 1@2x.png';
import blog2 from '../../assets/Blog image - 2@2x.png';
import blog3 from '../../assets/Blog image - 3@2x.png';
import logo from '../../assets/Logo@2x.png';
import BottomGrid from '../Airvays info/index';
import Divider from '@material-ui/core/Divider';
import Carousel from 'react-bootstrap/Carousel';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      // background: '#FFFFFF',
    },

    innerbox: {
      background: '#4BAFC9',
      color: '#FFFF',
      textAlign: 'left',
    },
    tittle_text: {
      marginLeft: '15px',
      fontWeight: 500,
    },
    paper: {
      //   padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

export default function BlogComponent() {
  const classes = useStyles();
  const [index, setIndex] = useState(1);
  const ref = useRef<any>();
  const handleSelect = (selectedIndex: any, e: any) => {
    setIndex(selectedIndex);
  };

  // const onPrevClick = () => {
  //   ref.current.prev();
  // };

  const onNextClick = () => {
    if ((ref && ref !== null) || undefined) {
      ref.current.next();
    }
  };

  console.log(ref.current, 'ref', index);
  return (
    <div className={classes.root}>
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <Typography style={{ fontWeight: 600, fontSize: '24px' }}>
          Always say yes to new adventures.
        </Typography>
        <Typography>Plan your adventure with us !</Typography>
      </div>
      <div style={{ background: '#FFFFFF' }}>
        <Grid container style={{ height: '250px', marginTop: '40px' }}>
          <Grid item xs={1}></Grid>
          <Grid
            item
            xs={10}
            style={
              {
                // position: 'relative',
              }
            }>
            <Paper className={classes.paper}>
              <Grid container>
                <Grid item xs={4} className={classes.innerbox}>
                  <div
                    style={{
                      marginTop: '40px',
                      marginBottom: '40px',
                    }}>
                    <Typography
                      style={{
                        marginLeft: '15px',
                        fontWeight: 500,
                        width: '150px',
                        fontSize: 'larger',
                      }}>
                      Latest stories to Get Inspired
                    </Typography>

                    <div
                      style={{
                        marginTop: '25px',
                        width: '250px',
                        marginLeft: '15px',
                      }}>
                      <Typography>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero
                        eos et accusam et justo duo dolores et ea rebum.
                      </Typography>
                    </div>
                  </div>
                </Grid>

                <Grid
                  item
                  xs={8}
                  style={{
                    justifyContent: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                  }}>
                  <div
                    style={{
                      position: 'absolute',
                      float: 'right',
                      top: '5px',
                      right: '0px',
                      marginRight: '25px',
                    }}>
                    {index == 0 ? 3 : index}/3 &nbsp;
                    <img
                      src={rightArrow}
                      style={{ width: '20px', height: '10px' }}
                      onClick={() => onNextClick()}
                      // onClick={onNextClick}
                    ></img>
                  </div>

                  <Grid
                    container
                    style={{
                      position: 'absolute',
                      marginRight: '115px',
                      background: '#FFFFFF',
                      boxShadow: ' 0px 20px 55px #00000029',
                    }}>
                    <Carousel
                      activeIndex={index}
                      onSelect={handleSelect}
                      indicators={false}
                      controls={false}
                      ref={ref}
                      interval={null}>
                      <Carousel.Item
                        style={{
                          display: index == 0 ? 'flex' : 'none',
                        }}>
                        <Grid
                          item
                          xs={3}
                          style={{
                            marginTop: '15px',
                            display: 'flex',
                            marginBottom: '15px',
                          }}>
                          <div style={{ marginLeft: '15px' }}>
                            <img
                              src={blog1}
                              style={{
                                width: '170px',
                                height: '180px',
                                borderRadius: '5px',
                              }}></img>
                          </div>
                        </Grid>
                        <Grid
                          item
                          xs={9}
                          style={{ marginTop: '15px', textAlign: 'start' }}>
                          <Typography style={{ fontWeight: 500 }}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing
                            elitr, nonumy.
                          </Typography>
                          <br />
                          <Typography paragraph={true}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing
                            elitr, sed diam nonumy eirmod tempor invidunt ut
                            labore et dolore magna aliquyam erat, sed diam
                            voluptua. At vero eos et accusam et justo duo
                            dolores et ea rebum. Stet clita kasd gubergren, no
                            sea takimata sanctus est Lorem ipsum dolor sit amet.
                          </Typography>
                        </Grid>
                      </Carousel.Item>
                      <Carousel.Item
                        style={{
                          display: index == 1 ? 'flex' : 'none',
                        }}>
                        <Grid
                          item
                          xs={3}
                          style={{
                            marginTop: '15px',
                            display: 'flex',
                            marginBottom: '15px',
                          }}>
                          <div style={{ marginLeft: '15px' }}>
                            <img
                              src={blog2}
                              style={{
                                width: '170px',
                                height: '180px',
                                borderRadius: '5px',
                              }}></img>
                          </div>
                        </Grid>
                        <Grid
                          item
                          xs={9}
                          style={{ marginTop: '15px', textAlign: 'start' }}>
                          <Typography style={{ fontWeight: 500 }}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing
                            elitr, nonumy.
                          </Typography>
                          <br />
                          <Typography paragraph={true}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing
                            elitr, sed diam nonumy eirmod tempor invidunt ut
                            labore et dolore magna aliquyam erat, sed diam
                            voluptua. At vero eos et accusam et justo duo
                            dolores et ea rebum. Stet clita kasd gubergren, no
                            sea takimata sanctus est Lorem ipsum dolor sit amet.
                          </Typography>
                        </Grid>
                      </Carousel.Item>
                      <Carousel.Item
                        style={{
                          display: index == 2 ? 'flex' : 'none',
                        }}>
                        <Grid
                          item
                          xs={3}
                          style={{
                            marginTop: '15px',
                            display: 'flex',
                            marginBottom: '15px',
                          }}>
                          <div style={{ marginLeft: '15px' }}>
                            <img
                              src={blog3}
                              style={{
                                width: '170px',
                                height: '180px',
                                borderRadius: '5px',
                              }}></img>
                          </div>
                        </Grid>
                        <Grid
                          item
                          xs={9}
                          style={{ marginTop: '15px', textAlign: 'start' }}>
                          <Typography style={{ fontWeight: 500 }}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing
                            elitr, nonumy.
                          </Typography>
                          <br />
                          <Typography paragraph={true}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing
                            elitr, sed diam nonumy eirmod tempor invidunt ut
                            labore et dolore magna aliquyam erat, sed diam
                            voluptua. At vero eos et accusam et justo duo
                            dolores et ea rebum. Stet clita kasd gubergren, no
                            sea takimata sanctus est Lorem ipsum dolor sit amet.
                          </Typography>
                        </Grid>
                      </Carousel.Item>
                    </Carousel>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <div style={{ marginTop: '100px' }}>
          <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <Grid item xs={12}>
                <div style={{ marginBottom: '30px' }}>
                  <Typography style={{ fontWeight: 'bold' }}>
                    Recent Articles
                  </Typography>
                </div>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={4}>
                  {/* <div className={classes.paper}> */}
                  <img style={{ height: '250', width: '350px' }} src={blog2} />
                  <br />
                  <p className={classes.paper}>Maldives - May 03, 2020</p>
                  <br />
                  <Typography style={{ fontWeight: 'bold' }}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                    nonumy.
                  </Typography>
                  <br />
                  <Typography style={{ letterSpacing: 0, textAlign: 'left' }}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum
                  </Typography>
                  {/* </div> */}
                </Grid>
                <Grid item xs={4} sm={4}>
                  {/* <div className={classes.paper}> */}
                  <img style={{ height: '250', width: '350px' }} src={blog2} />
                  <br />
                  <p className={classes.paper}>Maldives - May 03, 2020</p>
                  <br />
                  <Typography style={{ fontWeight: 'bold' }}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                    nonumy.
                  </Typography>
                  <br />
                  <Typography style={{ letterSpacing: 0, textAlign: 'left' }}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum
                  </Typography>
                  {/* </div> */}
                </Grid>
                <Grid item xs={4} sm={4}>
                  {/* <div className={classes.paper}> */}
                  <img style={{ height: '250', width: '350px' }} src={blog3} />
                  <br />
                  <p className={classes.paper}>Maldives - May 03, 2020</p>
                  <br />
                  <Typography style={{ fontWeight: 'bold' }}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                    nonumy.
                  </Typography>
                  <br />
                  <Typography style={{ letterSpacing: 0, textAlign: 'left' }}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum
                  </Typography>
                  {/* </div> */}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
          <Divider style={{ marginTop: '20px' }} />
          <BottomGrid />
        </div>
      </div>
    </div>
  );
}
