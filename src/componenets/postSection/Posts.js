import { React, useState } from "react";
import { Grid } from "@material-ui/core";
import MainNewsCard from "./PostCard";
import SideNewsCard from "./SidePostCard";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import "./PostCard.css";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "row-reverse",
    height: "auto",
  },
  item: {
    display: "flex",
    height: "400px",
    margin: 0,
  },
}));

export default function Posts({ newsData }) {
  const classes = useStyles();

  const [spacing] = useState(2);
  return (
    <Grid
      container
      className={classes.root}
      spacing={2}
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      <Grid
        item
        xs={12}
        md={6}
        className={classes.item + " main-news-container"}
      >
        <Link to={"/News/" + newsData[0].id} className="link">
          <MainNewsCard mainData={newsData[0]} />
        </Link>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        className={classes.item + " side-news-container"}
      >
        <Grid container spacing={spacing}>
          {newsData.slice(1, 5).map((item) => (
            <Grid item className="side-news" xs={12} sm={6} key={item.id}>
              <Link to={`/News/${item.id}`} className="link">
                <SideNewsCard sideData={item} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
