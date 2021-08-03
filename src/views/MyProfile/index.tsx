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
      display: "flex",
    },
    paper: {
      marginTop: "50px",
      //   marginBottom: "20px",
      marginLeft: "50px",
      marginRight: "60px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
      opacity: 1,
      width: "100%",
      height: "100%",
    },
    content: {
      marginTop: "40px",
      margin: "20px",
      marginLeft: "40px",
      color: "#1C2460",
      fontSize: "23px",
    },
    label: {
      marginTop: "25px",
      margin: "20px",
      marginLeft: "40px",
      fontSize: "18px",
      fontFamily: "AvantGarde Demi",
      color: "#333333",
      opacity: "50%",
    },
    details: {
      marginTop: "20px",
      margin: "20px",
      marginLeft: "40px",
      fontSize: "21px",
      fontFamily: "AvantGarde Demi",
    },
    editDetails: {
      marginTop: "82px",
      marginLeft: "30px",
      color: "#DCAB5E",
      fontSize: "17px",
      textTransform: "none",
      background: "none",
    },
    deleteButton: {
      textTransform: "none",
      color: "#DB4437",
      backgroundColor: "#FFF3F2",
      fontSize: "17px",
      marginTop: "5px",
    },
  })
);

export default function MyProfile() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography className={classes.content}>Welcome Back,</Typography>
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <Avatar
              src="/images/example.jpg"
              style={{
                marginLeft: "30px",
                width: "120px",
                height: "120px",
              }}
            />
            <Typography className={classes.label}>Name</Typography>
            <Typography className={classes.label}>E-mail address</Typography>
            <Typography className={classes.label}>Gender</Typography>
            <Typography className={classes.label}>Password</Typography>
          </Grid>
          <Grid item xs={4}>
            <EditProfileContainer />
            <Typography className={classes.details}>Jane Richards</Typography>
            <Typography className={classes.details}>
              sofiajane@gmail.com
            </Typography>
            <Typography className={classes.details}>Female</Typography>
            <Typography className={classes.details}>******</Typography>
          </Grid>
          <Grid item xs={4} style={{ marginLeft: "70px" }}>
            <img
              style={{
                float: "right",
                // width: "100%",
                height: "70%",
                marginTop: "10px",
              }}
              src={image}
            />
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Divider
            style={{
              marginLeft: "40px",
              opacity: "50%",
              marginBottom: "60px",
            }}
          />
        </Grid>
        <Grid
          item
          xs={10}
          sm={12}
          style={{
            margin: "10px",
            marginLeft: "40px",
            marginRight: "40px",
            marginBottom: "30px",
            // width: "100%",
          }}
        >
          <Box
            style={{ opacity: 1 }}
            bgcolor="white"
            color="black"
            border="solid 1px #CCCCCC"
            p={2}
          >
            <Grid container>
              <Grid
                xs={9}
                style={{ fontSize: "18px", fontFamily: "AvantGarde Demi" }}
              >
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua.
              </Grid>
              <Grid xs={3} style={{ textAlign: "center" }}>
                <Button className={classes.deleteButton}>Delete Account</Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Paper>
    </div>
  );
}
