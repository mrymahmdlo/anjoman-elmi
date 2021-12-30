import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { CardActionArea } from "@material-ui/core";
import Picture from "../../assets/images/covid_rolling.jpg";
import "./PostCard.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    height: 184,
    width: "100%",
    alignItems: "flex-start",
    borderRadius: 0,
    backgroundColor: "#00303F",
    color: "#fff",
  },
  content: {
    width: "100%",
    textAlign: "right",
    padding: "0.8em",
    height: "27%",
  },
  media: {
    position: "abolute",
    top: 0,
    width: "100%",
    height: "73%",
  },
}));

export default function SideNewsCard({ sideData }) {
  const classes = useStyles();

  return (
    <Card className={classes.root + " side-news-card"}>
      <CardActionArea className={classes.root + " side-news-card"}>
        <CardMedia
          className={classes.media + " side-news-media"}
          image={
            sideData.imageIds[0]
              ? `http://charity.mykanoon.ir/File/Get/${sideData.imageIds[0]}`
              : Picture
          }
          title="Side-News"
        />
        <CardContent className={classes.content + " side-news-content"}>
          <Typography
            className="side-content__item"
            variant="body1"
            component="h6"
          >
            {sideData.title}
          </Typography>
        </CardContent>
        <div className="card__overlay" />
      </CardActionArea>
    </Card>
  );
}
