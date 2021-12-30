import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Picture from "../../assets/images/covid_rolling.jpg";
import "./PostCard.css";

export default function MainNewsCard({ mainData }) {

  return (
    <Card className='post-card-root main-news-card'>
      <CardActionArea className='action'>
        <CardMedia
          className='post-media main-news__media'
          image={
            mainData.imageIds[0]
              ? `http://charity.mykanoon.ir/File/Get/${mainData.imageIds[0]}`
              : Picture
          }
          title="News"
        />
        <CardContent className='post-card-content main-news-content'>
          <Typography
            className='content-title content__item'
            variant="h6"
          >
            {mainData.title}
          </Typography>

          <Typography
            gutterBottom
            className="content__item"
            variant="body1"
            component="p"
          >
            {mainData.summary}
          </Typography>
        </CardContent>
        <div className="card__overlay" />
      </CardActionArea>
    </Card>
  );
}
