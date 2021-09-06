import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import blogImg from '../../assets/pexels-alexandr-podvalny-3278215.jpeg';
import { Typography } from '@material-ui/core';
import blog1 from '../../assets/Blog image - 1@2x.png';
import Divider from '@material-ui/core/Divider';
import BottomGrid from '../Airvays info/index';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: '#FFFFFF',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

export default function BlogDetail() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={1}></Grid>

        <Grid item xs={10}>
          <img
            alt=''
            src={blogImg}
            style={{ height: '250px', width: '1250px' }}></img>
        </Grid>
        <Grid item xs={1}></Grid>

        <Grid item xs={2}></Grid>
        <Grid item xs={8} style={{ marginTop: '40px', textAlign: 'center' }}>
          <Typography
            style={{ color: '#333333', fontWeight: 500, fontSize: '24px' }}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, nonumy.
          </Typography>

          {Array.from({ length: 6 }, (x: any, i) => (
            <Typography
              style={{ marginTop: '40px', textAlign: 'start' }}
              id={x}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur
              sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
              et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
              accusam et justo duo dolores et ea rebum
            </Typography>
          ))}
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={1}></Grid>

        <Grid item xs={10}>
          <div
            style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto' }}>
            {Array.from({ length: 20 }, (x: any, i) => (
              <div className={classes.paper} id={x}>
                <img
                  alt=''
                  style={{ height: '250', width: '350px' }}
                  src={blog1}
                />
                <br />
                <p>Maldives - May 03, 2020</p>
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
              </div>
            ))}
          </div>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
      <Divider style={{ marginTop: '20px' }} />
      <BottomGrid />
    </div>
  );
}
