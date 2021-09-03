import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import EditProfileContainer from "../EditProfile/EditProfile";
import image from "../../assets/Profile illustration@2x.png";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // display: "flex",
      flexGrow: 1,
      backgroundColor: "#FFFFFF",
    },
    paper: {
      marginTop: "50px",
      marginLeft: "50px",
      // marginRight: "60px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
      opacity: 1,
      width: "73%",
      // height: "100%",
    },
    flight: {
      // margin: "5%",
      fontSize: "15px",
      fontFamily: "AvantGarde-Demi",
      color: "#333333",
      opacity: "50%",
    },
    details: {
      fontSize: "15px",
      fontFamily: "AvantGarde-Demi",
      color: "#DCAB5E",
    },
  })
);

export default function PriceAlert() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
          <Typography
            className={classes.flight}
            style={{ margin: "10px", padding: "5px", fontFamily:'AvantGarde-Demi' }}
          >
            Flight Routes
          </Typography>
          <Grid
            container
            spacing={3}
            style={{ padding: "5px", margin:'1px' }}
          >
            <Grid item xs={6}>
              <Typography style={{fontFamily:'AvantGarde-Demi', fontSize:'15px'}}>
                Chennai <span style={{fontFamily:'AvantGarde-Regular'}}>(MAA)</span> - Bangalore International <span style={{fontFamily:'AvantGarde-Regular'}}>(BLR)</span>
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.details}>View Flights</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.flight}>Remove</Typography>
            </Grid>
          </Grid>
          <Divider style={{ marginLeft: "2%", marginRight: "2%" }} />
          <Grid
            container
            spacing={3}
            style={{ padding: "5px", margin: "1px" }}
          >
            <Grid item xs={6}>
              <Typography style={{fontFamily:'AvantGarde-Demi', fontSize:'15px'}}>
                Chennai <span style={{fontFamily:'AvantGarde-Regular'}}>(MAA)</span> - Goa International <span style={{fontFamily:'AvantGarde-Regular'}}>(GOI)</span> 
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.details}>View Flights</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.flight}>Remove</Typography>
            </Grid>
          </Grid>
          <Divider style={{ marginLeft: "2%", marginRight: "2%" }} />
          <Grid
            container
            spacing={3}
            style={{ padding: "5px", margin: "1px" }}
          >
            <Grid item xs={6}>
              <Typography style={{fontFamily:'AvantGarde-Demi', fontSize:'15px'}}>
                Chennai <span style={{fontFamily:'AvantGarde-Regular'}}>(MAA)</span> -{" "}
                Hyderabad - Rajiv Gandhi International <span style={{fontFamily:'AvantGarde-Regular'}}>(HYD)</span> 
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.details}>View Flights</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.flight}>Remove</Typography>
            </Grid>
          </Grid>
          <Divider style={{ marginLeft: "2%", marginRight: "2%" }} />
          <Grid
            container
            style={{ padding: "5px", margin: "1px" }}
            spacing={3}
          >
            <Grid item xs={6}>
              <Typography style={{fontFamily:'AvantGarde-Demi', fontSize:'15px'}}>
                Chennai <span style={{fontFamily:'AvantGarde-Regular'}}>(MAA)</span> - Coimbatore International <span style={{fontFamily:'AvantGarde-Regular'}}>(CJB)</span> 
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.details}>View Flights</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.flight}>Remove</Typography>
            </Grid>
          </Grid>
    </div>
  );
}
