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
        {/* <Typography
          style={{
            textAlign: "right",
            lineHeight: "40px",
            color: "#64676C",
            fontSize: "1.2rem",
            marginBlock: 20,
          }}
        >
          ایده اولیه شکل گیری موسسه خیریه نیک گامان جمشید در یک جمع دوستانه و
          خانوادگی با همراهی تعدادی از مددکاران و مربیان در دیدار از کودکان
          بدسرپرست و بی سرپرست نوپای یکی از شیرخوارگاه های سازمان بهزیستی کشور
          شکل گرفت. طی آن روز با اجرای برنامه تفریحی در یکی از پارک های تهران در
          کنار این فرشتگان و مربیان دلسوزشان، فضایی تکرار نشدنی سرشار از عشق و
          محبت تجربه شد.
        </Typography>
        <Typography
          style={{
            textAlign: "right",
            lineHeight: "40px",
            color: "#64676C",
            fontSize: "1.2rem",
          }}
        >
          از آن زمان، سالها می گذرد و سرآغازی شد برای یک دهه فعالیت جدی و تخصصی
          در راستای خدمت رسانی به کودکان و نوجوانان سرزمینمان، که طی این سالها
          با همراهی مادی و معنوی داوطلبان، خیرین، نیکوکاران و همکاران موسسه،
          فعالیتهای شایان توجهی انجام شده است
        </Typography>
        <Link to="/About">
          <button
            className="btn1"
            style={{ marginRight: 0, marginTop: 20, padding: "10px 30px" }}
          >
            بیشتر بدانید
          </button>
        </Link>
      </Grid>
      <Grid item md={5}>
        <Hidden mdDown="true">
          <img
            src={Tree}
            style={{ maxWidth: "100%", height: "auto", width: "100%" }}
            alt="about us"
          ></img>
        </Hidden> */}
      </Grid>
    </Grid>
  );
}
