import React, { useEffect, useState } from "react";
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
import { Badge, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CreateIcon from "@material-ui/icons/Create";
import user from "../../assets/user3.png";
import { _getUserProfile } from "../../services/myProfile";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    paper: {
      marginTop: "5%",
      //   marginBottom: "20px",
      // marginLeft: "50px",
      // marginRight: "60px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
      opacity: 1,
      width: "100%",
      height: "100%",
    },
    large: {
      width: theme.spacing(14),
      height: theme.spacing(14),
    },
    content: {
      marginTop: "40px",
      margin: "20px",
      marginLeft: "3%",
      color: "#1C2460",
      fontFamily: "Avantgarde-Demi",
      fontSize: "23px",
    },
    label: {
      marginTop: "10%",
      marginLeft: "10%",
      fontSize: "18px",
      fontFamily: "AvantGarde Demi",
      color: "#333333",
      opacity: "50%",
    },
    details: {
      marginTop: "10%",
      fontSize: "21px",
      fontFamily: "AvantGarde Demi",
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
  const [userName, setUserName] = useState(null);
  const [emailId, setEmailId] = useState(null);
  const [gender, setGender] = useState(null);

  const getProfileDetails = () => {
    _getUserProfile({}, function (error: any, response: any) {
      if (error === null) {
        if (response.status === "200") {
          let data = response.result;
          let name = data.displayName;
          let email = data.email;
          let gender = data.gender;
          setUserName(name);
          setEmailId(email);
          setGender(gender);
          console.log(response.result.displayName, "myprofile");
        }
      }
    });
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container>
        <Paper className={classes.paper}>
          <Typography className={classes.content}>Welcome Back,</Typography>
          <Grid container item xs={12}>
            <Grid item xs={8}>
              <Grid container>
                <Grid item xs={6}>
                  <Badge
                    overlap="circular"
                    style={{ marginLeft: "10%" }}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    badgeContent={
                      <IconButton
                        style={{
                          background: "#DCAB5E",
                          borderRadius: "50%",
                          width: "3%",
                          height: "3%",
                        }}
                      >
                        <EditIcon
                          style={{ color: "white", fontSize: "16px" }}
                        />
                      </IconButton>
                    }
                  >
                    <Avatar
                      alt="Travis Howard"
                      src={user}
                      className={classes.large}
                    />
                  </Badge>
                </Grid>
                <Grid item xs={6}>
                  <EditProfileContainer />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <Typography className={classes.label}>Name</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.details}>
                    {userName}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <Typography className={classes.label}>
                    E-mail address
                  </Typography>{" "}
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.details}>{emailId}</Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <Typography className={classes.label}>Gender</Typography>{" "}
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.details}>{gender}</Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <Typography className={classes.label}>Password</Typography>{" "}
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.details}>******</Typography>
                </Grid>
              </Grid>
              <Divider
                style={{
                  marginLeft: "5%",
                  width: "75%",
                  opacity: "50%",
                  marginTop: "4%",
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <img
                style={{
                  float: "right",
                  // width: "100%",
                  height: "70%",
                  marginRight: "10%",
                }}
                src={image}
              />
            </Grid>
          </Grid>

          <Grid item xs={6}></Grid>
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
              style={{ opacity: 1, marginTop: "5%" }}
              bgcolor="white"
              color="black"
              border="solid 1px #CCCCCC"
              p={2}
            >
              <Grid container>
                <Grid
                  xs={9}
                  style={{
                    fontSize: "18px",
                    fontFamily: "AvantGarde Demi",
                  }}
                >
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua.
                </Grid>
                <Grid xs={3} style={{ textAlign: "center" }}>
                  <Button className={classes.deleteButton}>
                    Delete Account
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
}
