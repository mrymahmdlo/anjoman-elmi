import { React } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "./PhiloCard.css";
import ToFarsiNumber from "../common-components/Converter";

export default function PhiloCard({ id, philoData }) {
  const fullName =
    philoData.lastName !== null
      ? philoData.firstName + " " + philoData.lastName
      : philoData.firstName;

  const contrItem = (title, number) => {
    return (
      <div className={"contrs_item"}>
        <Typography variant="body2" component="p" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" component="p">
          {number}
        </Typography>
      </div>
    );
  };

  const contributions = () => {
    return (
      <div className="contrs">
        {contrItem("مبلغ اهدا شده", ToFarsiNumber(philoData.sparedFund))}
        {contrItem("تعداد پروژه", ToFarsiNumber(philoData.projectCounts))}
      </div>
    );
  };

  return (
    <div className='root'>
      <Paper className='card1' elevation={2}>
        {/* <div className='large circle1'>
          <img
            alt={philoData.firstName}
            src={`http://charity.mykanoon.ir/File/Get/${philoData.imageId}`}
            className='image1'
          />
        </div> */}
        <Typography style={{ fontSize: "1.1em" }} variant="body1" gutterBottom>
          {fullName}
        </Typography>
        <Typography
          variant="body2"
          color="textPrimary"
          component="p"
          gutterBottom
        >
          تهران
        </Typography>
        {contributions()}
        <div className='card-overlay'>
          <Link to={`/Philanthropists/${id}`}>
            <Button variant="contained">اطلاعات بیشتر</Button>
          </Link>
        </div>
      </Paper>
    </div>
  );
}
