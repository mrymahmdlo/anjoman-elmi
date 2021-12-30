import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import '../common-components/CarouselStyle.css';
import ImageObj from '../../assets/images/letter of appreciations/ImageObj';

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    }
  };

export default function ApCarousel() {
    const {images} = ImageObj ;
    return(
        <Grid container style={{marginBlock: 70,backgroundColor: "#f8fcff"}}>
            <Grid item xs={12}>
            <Typography variant="h5" component="h5" className="greenTitle">
            انجمن فیزیولوژی و ورزشی ایران
            </Typography>
            <Typography component="p" className="blueText">
              <Link to="/Appreciations" className="blueText">
                افتخارات و تقدیرنامه ها
              </Link>
            </Typography>
            {/* <Carousel
                responsive={responsive}
                swipeable={true}
                draggable={true}
                autoPlay={true}
                infinite={true}
                autoPlaySpeed={3000}
                transitionDuration={1000}
                arrows={false}
                showDots={true}
            >
            {
            images.map(item =>
              <Link  to="/Appreciations">
                <img src={item.src} style={{width: "75%",height: "90%"}} alt="appreciations" key={item.id} />
              </Link>
            )
            }
            </Carousel>  */}
            </Grid>
        </Grid>
    )
}