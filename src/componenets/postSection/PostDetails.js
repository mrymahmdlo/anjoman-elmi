import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { GetData } from "../../services/APIengine";
import { Grid, Typography } from "@material-ui/core";
import Searchbar from "../common-components/Searchbar";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import './PostDetails.css';

const EachNews = () => {
  const { id } = useParams();

  const [data, setData] = useState(null);
  useEffect(() => {
    GetData(`Tehran/Post?id=` + id).then((res) => setData(res));
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <Grid
      container
      justifyContent="space-evenly"
      direction="row-reverse"
      className='post-root'
    >
      <Grid className='news-data'>
        <Typography component="h1" variant="" className='post-title'>
          {data?.post?.title}
        </Typography>
      </Grid>

      <Searchbar />

      <Grid xs={12} md={7} className='post-root'>
        <div style={{ backgroundColor: "#fff" }}>
          <Grid>
      
          </Grid>
          <Grid>
            <div
              style={{
                paddingRight: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
              className="text"
            >
              {data?.post?.createDate}
              <CalendarTodayIcon
                style={{ color: "#000", marginLeft: "5px" }}
                fontSize="small"
              />
            </div>
          </Grid>
          <Grid className='post-content'>
            <Typography
              style={{
                fontWeight: "600",
                fontSize: "24px",
              }}
            >
              {data?.post?.title}
            </Typography>
            <div
              style={{
                fontSize: "14px",
                lineHeight: "30px",
                textAlign: "justify",
                fontWeight: "400",
                marginTop: "20px",
              }}
              dangerouslySetInnerHTML={{ __html: data?.post?.content }}
              className="ck-content"
            ></div>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

export default EachNews;
