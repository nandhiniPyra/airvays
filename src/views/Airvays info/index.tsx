import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import blog1 from '../../assets/pexels-alexandr-podvalny-3278215.jpeg';
import rightArrow from '../../assets/right-arrow@2x.png';
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
  } from 'react-router-dom';
  import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import logo from '../../assets/Logo@2x.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop:'40px'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    tittle_text: {
        marginLeft: '15px',
        fontWeight: 500,
      },
      listroot: {
        color: '#1C2460',
        '.MuiListItem-button:hover': {
          backgroundColor: 'none',
        },
      },
  }),
);

interface ListItemLinkProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
  }

function ListItemLink(props: ListItemLinkProps) {
    const { icon, primary, to } = props;
  
    const renderLink = React.useMemo(
      () =>
        React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
          <RouterLink to={to} ref={ref} {...itemProps} />
        )),
      [to]
    );
    const classes = useStyles();
  
    return (
      <li>
        <ListItem component={renderLink}>
          {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
          <ListItemText primary={primary} className={classes.listroot} />
        </ListItem>
      </li>
    );
  }
export default function BottomGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
          <Grid container style={{ height: '400px' }} spacing={5}>
          <Grid item xs={1} sm={1}></Grid>
          <Grid item xs={4} sm={4}>
            <div>
              <img src={logo}></img>
              <Typography>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt et.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={2} sm={2} style={{ marginTop: '30px' }}>
            <Typography className={classes.tittle_text}>Company</Typography>
            <List aria-label='secondary mailbox folders'>
              <ListItemLink to='/trash' primary='About' />
              <ListItemLink to='/spam' primary='Terms & Conditions' />
              <ListItemLink to='/spam' primary='Privacy Policy' />
              <ListItemLink to='/spam' primary='Covid-19 Updates' />
              <ListItemLink to='/spam' primary='FAQs' />
              <ListItemLink to='/spam' primary='Support' />
            </List>
          </Grid>
          <Grid item xs={2} sm={2} style={{ marginTop: '30px' }}>
            <Typography className={classes.tittle_text}>Explore</Typography>
            <List aria-label='secondary mailbox folders'>
              <ListItemLink to='/trash' primary='Blog' />
              <ListItemLink to='/spam' primary='Maldives' />
              <ListItemLink to='/spam' primary='Paris' />
              <ListItemLink to='/spam' primary='Montenegro' />
              <ListItemLink to='/spam' primary='Italy' />
            </List>
          </Grid>
          <Grid item xs={2} sm={2} style={{ marginTop: '30px' }}>
            <Typography className={classes.tittle_text}>Product</Typography>
            <List aria-label='secondary mailbox folders'>
              <ListItemLink to='/trash' primary='Flights' />
              <ListItemLink to='/spam' primary='Hotels' />
              <ListItemLink to='/spam' primary='Car Rental' />
              <ListItemLink to='/spam' primary='Price Track' />
            </List>
          </Grid>
        </Grid>
      <div
        style={{
          border: '1px solid #DDDDDD',
          height: '70px',
          textAlign: 'center',
          marginTop: '40px',
        }}
      >
        <Typography style={{ marginTop: '25px' }}>
          © 2021 All Rights Reserved | Travel Booking
        </Typography>
      </div>
    </div>
  );
}
