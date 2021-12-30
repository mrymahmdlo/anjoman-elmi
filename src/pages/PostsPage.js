import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { CircularProgress, Typography } from "@material-ui/core";
import { GetData } from "../services/APIengine";
import { Link } from "react-router-dom";
import { create } from "jss";
import rtl from "jss-rtl";
import Searchbar from "../componenets/common-components/Searchbar";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import './PostsPage.css';
import {
  withStyles,
  createStyles,
  InputBase,
  Hidden,
  createTheme,
  StylesProvider,
  ThemeProvider,
  jssPreset,
} from "@material-ui/core";

const theme = createTheme({
  direction: "rtl",
});

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const StyledInput = withStyles(() =>
  createStyles({
    root: {},
    input: {
      borderRadius: 0,
      position: "relative",
      backgroundColor: "#fff",
      border: "1px solid #fff",
      fontSize: 12,
      padding: "12px 17px",
      "&:focus": {
        backgroundColor: "#fff",
        border: `1px solid #fff !important`,
      },
    },
  })
)(InputBase);

const NewsComponent = ({ imgSrc, id, item }) => {

  return (
    <Link to={`/News/${id}`}>
      <div className='posts-news'>
        <div>
          <img src={imgSrc} alt="news" width={"100%"} height={"auto"} />
        </div>
        <Grid>
          <div
            style={{
              paddingRight: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              color: "black",
            }}
            className="text"
          >
            {item.createDate}
            <CalendarTodayIcon
              style={{ color: "#000", marginLeft: "5px" }}
              fontSize="small"
            />
          </div>
        </Grid>
        <div className="description">
          <Typography className="title">{item.title}</Typography>
        </div>
      </div>
    </Link>
  );
};

export default function NewsPage() {

  const [data, setData] = useState(null);
  useEffect(() => {
    GetData(`Tehran/PostGroup`).then((res) => setData(res));
  }, []);

  return (
    <>
      <h1 className='appr-topic'>اخبار و اطلاعیه ها</h1>
      {data ? (
        <div>
          {data ? (
            <Grid
              container
              justifyContent="space-between"
              direction="row-reverse"
              cl
              assName='posts-root'
            >
              <Searchbar />
              <Grid item xs={12} md={7} className='posts-item'>
                {data?.posts.slice(0, 10).map((item) => (
                  <Grid>
                    <NewsComponent
                      imgSrc={
                        "http://charity.mykanoon.ir/File/Get/" +
                        item.imageIds[0]
                      }
                      item={item}
                      description={"text"}
                      id={item.id}
                      key={item.id}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ) : null}
        </div>
      ) : (
        <CircularProgress style={{ marginTop: "10vh" }} />
      )}
    </>
  );
}
