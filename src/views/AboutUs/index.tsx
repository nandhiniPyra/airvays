import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import aboutHeader from "../../assets/About - Header Image@2x.png";
import aboutPath from "../../assets/About - Path@2x.png";
import aboutVision from "../../assets/map-About.png";
import logo from "../../assets/Logo@2x.png";
import { Typography } from "@material-ui/core";
import blog1 from "../../assets/Blog image - 1@2x.png";
import Divider from "@material-ui/core/Divider";
import FlightBG from "../../assets/pexels-pixabay-62623.jpeg";
// import BottomGrid from "../Airvays info/index";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: "#FFFFFF",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    aboutTop: {
      height: "300px",
      backgroundImage: `url(${FlightBG})`,
    },
  })
);

export default function AboutUs() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.aboutTop}>
        <Grid item xs={1}>
          {" "}
        </Grid>

        <Grid
          item
          xs={10}
          //   style={{
          //     backgroundImage: `url(${aboutHeader})`,
          //     height: "250px",
          //     width: "1250px",
          //   }}
        >
          {/* <img
            src={aboutHeader}
            style={{ height: "250px", width: "1250px" }}
          ></img> */}
          <div style={{ textAlign: "center", marginTop: "200px" }}>
            <Typography style={{ fontWeight: 600, fontSize: "24px" }}>
              Always say yes to new adventures.
            </Typography>
            <Typography>Plan your adventure with us !</Typography>
          </div>
        </Grid>
        <Grid item xs={2}>
          {" "}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={5} style={{ marginTop: "40px", textAlign: "left" }}>
          <Typography
            style={{ color: "#1C2460", fontWeight: 500, fontSize: "24px" }}
          >
            About Airvays
          </Typography>

          {/* {Array.from({ length: 6 }, (x: any, i) => ( */}
          <Typography
            style={{
              marginTop: "40px",
              textAlign: "start",
              fontSize: "17px",
              color: "#1C2460",
              fontFamily: "Crimson Text",
            }}
            //   id={x}
          >
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </Typography>
          <Typography
            style={{
              marginTop: "40px",
              textAlign: "start",
              fontSize: "17px",
              color: "#1C2460",
              fontFamily: "Crimson Text",
            }}
            //   id={x}
          >
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua.
          </Typography>
          {/* ))} */}
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={2}>
          <img src={logo} style={{ marginTop: "210px" }} />
        </Grid>
        <Grid item xs={2}>
          {" "}
        </Grid>
      </Grid>

      <Grid container spacing={3} style={{ marginTop: "120px" }}>
        <Grid item xs={2}>
          <img
            src={aboutPath}
            style={{
              width: "700px",
              //   marginTop: "300px",
              position: "relative",
              left: "580px",
              bottom: "365px",
            }}
          />
        </Grid>

        <Grid item xs={4}>
          <img src={aboutVision} style={{ width: "550px", height: "400px" }} />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={4}>
          <Typography
            style={{ color: "#1C2460", fontWeight: 500, fontSize: "24px" }}
          >
            Our Vision
          </Typography>
          <Typography
            style={{
              marginTop: "40px",
              textAlign: "start",
              fontSize: "17px",
              color: "#1C2460",
              fontFamily: "Crimson Text",
            }}
          >
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum.
          </Typography>
          <Typography
            style={{
              marginTop: "40px",
              textAlign: "start",
              fontSize: "17px",
              color: "#1C2460",
              fontFamily: "Crimson Text",
            }}
          >
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={3}
        style={{ position: "relative", bottom: "850px", marginTop: "100px" }}
      >
        <Grid item xs={1}>
          {" "}
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
          <Typography
            style={{ color: "#1C2460", fontWeight: 500, fontSize: "24px" }}
          >
            Our Values
          </Typography>
          <Typography
            style={{
              marginTop: "40px",
              textAlign: "start",
              fontSize: "17px",
              color: "#1C2460",
              fontFamily: "Crimson Text",
            }}
          >
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </Typography>
          <Typography
            style={{
              marginTop: "40px",
              textAlign: "start",
              fontSize: "17px",
              color: "#1C2460",
              fontFamily: "Crimson Text",
            }}
          >
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
            kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
            amet.
          </Typography>
        </Grid>
      </Grid>
      <Divider style={{ marginTop: "20px" }} />
      {/* <BottomGrid /> */}
    </div>
  );
}
