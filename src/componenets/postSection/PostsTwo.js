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
          
        </>
    );
}
