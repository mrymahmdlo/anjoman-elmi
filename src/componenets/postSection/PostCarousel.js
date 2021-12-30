import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Carousel from "react-multi-carousel";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const useStyles = makeStyles(() => ({
  imgCarousel: {
    width: "100%",
    minHeight: "100%",
    height: "auto",
    margin: "0 auto",
    borderRadius: 10,
    position: "relative",
  },
  caption: {
    position: "absolute",
    color: "#fff",
    width: "80%",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    fontSize: "1.7rem",
    fontWeight: "bold",
    backgroundColor: "rgba(0,0,0,0.5)",
    top: "85%",
    left: "50%",
    transform: "translate(-50%,0%)",
    "@media (max-width: 600px)": {
      fontSize: "1em",
      width: "100%",
      top: "70%",
    },
  },
}));

export default function PostCarousel({ newsData }) {
  const classes = useStyles();

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <Carousel
          responsive={responsive}
          swipeable={false}
          draggable={false}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={6000}
          transitionDuration={1000}
          arrows={false}
        >
          {newsData.slice(7, 10).map((item) => (
            <Link to={`/News/${item.id}`} className="link" key={item.id}>
              {/* <img
                src={"http://charity.mykanoon.ir/File/Get/" + item.imageIds[0]}
                className={classes.imgCarousel}
                alt="post images"
              /> */}
              <Typography className={classes.caption}>{item.title}</Typography>
            </Link>
          ))}
        </Carousel>
      </Grid>
    </Grid>
  );
}
