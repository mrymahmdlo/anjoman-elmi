import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import './PostsTwo.css';

export default function TwoPosts({ postsData }) {

    return (
        <>
            <Typography variant="h5" component="h5" className="greenTitle">
            انجمن فیزیولوژی و ورزشی ایران
            </Typography>
            <Typography component="p" className="blueText">
                اخرین اخبار و اطلاعیه ها
            </Typography>
            {/* <Grid
                container
                spacing={4}
                style={{ textAlign: "right", marginBottom: 100 }}
            >
                <Grid item xs={12} sm={6}>
                    <div className='outer'>
                        <img
                            src={
                                "http://charity.mykanoon.ir/File/Get/" +
                                postsData[2].imageIds[0]
                            }
                            className='posts-two-media'
                            alt="post image"
                        />
                        <div className='date'>{postsData[2].createDate}</div>
                    </div>
                    <Typography
                        variant="body1"
                        component="p"
                        style={{ color: "#707b8e" }}
                    >
                        انجمن فیزیولوژی و فارماکولوژی ایران
                    </Typography>
                    <Link to={`/News/${postsData[2].id}`}>
                        <Typography variant="h5" component="h5" className='posts-two-title'>
                            {postsData[2].title}
                        </Typography>
                    </Link>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className='outer'>
                        <img
                            src={
                                "http://charity.mykanoon.ir/File/Get/" +
                                postsData[5].imageIds[0]
                            }
                            className='posts-two-media'
                            alt="post image"
                        />
                        <div className='date'>{postsData[1].createDate}</div>
                    </div>
                    <Typography
                        variant="body1"
                        component="p"
                        style={{ color: "#707b8e" }}
                    >
                      انجمن فیزیولوژی و فارماکولوژی ایران
                    </Typography>
                    <Link to={`/News/${postsData[5].id}`}>
                        <Typography variant="h5" component="h5" className='posts-two-title'>
                            {postsData[5].title}
                        </Typography>
                    </Link>
                </Grid>
            </Grid> */}
        </>
    );
}
