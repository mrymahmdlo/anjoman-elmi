import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import Tree from "../../assets/images/tree.png";
import { Hidden } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    margin: "170px auto",
    backgroundColor: "#fff",
    textAlign: "right",
    "@media (max-width: 800px)": {
      margin: "50px auto",
    },
  },
  title: {
    textAlign: "right",
    color: "#6e1010",
    fontWeight: "bolder",
  },
  text: {
    textAlign: "right !important",
    marginBottom: 5,
  },
}));

export default function AboutCard() {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row-reverse"
      className={classes.root}
      xs={12}
      spacing={2}
    >
      <Grid item xs={12} lg={7}>
        <Typography variant="h5" component="h5" className={classes.title}>
          انجمن فیزیولوژی و ورزشی ایران
        </Typography>
        
      </Grid>
    </Grid>
  );
}
