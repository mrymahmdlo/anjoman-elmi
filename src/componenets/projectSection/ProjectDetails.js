import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ToFarsiNumber from "../common-components/Converter";
import NumberCreator from "../common-components/NumberCreator";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import "./ProjectDetails.css";
import { GetData } from "../../services/APIengine";

const ProjectDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    if (id)
      GetData("Tehran/Project?id=" + id).then((response) => setData(response));
  }, [id]);
  const sd = new Date(data?.project?.startDate);
  const startDate = sd.toLocaleDateString("fa-IR");
  const ed = new Date(data?.project?.actualEndDate);
  const endDate = ed.toLocaleDateString("fa-IR");

  return (
    <div className='project-content'>
      {/* <div className="Details">
        <div className="Card">
          <img
            src={`http://charity.mykanoon.ir/File/Get/${data?.project?.imageIds[0]}`}
            alt="ProjectPic"
            className="Pic"
          />
        </div>
        <div className="project-info">
          <h1 className="Title">{data?.project?.title}</h1>
          <h3>وقف شده توسط : </h3>
          <Link
            to={`/Philanthropists/${data?.project?.philanthropist?.id}`}
            className="flex-div"
          >
            <Button variant="contained" className="button">
              <div>
                <img
                  src={`http://charity.mykanoon.ir/File/Get/${data?.project?.philanthropist?.imageId}`}
                  alt="PhiloPic"
                  className="Philo-pic"
                  style={{
                    maxHeight: "90px",
                    width: "auto",
                    height: "100%",
                  }}
                />
              </div>
              <h2 className="Philo-name">
                {`${data?.project?.philanthropist?.firstName} ${
                  data?.project?.philanthropist?.lastName
                    ? data?.project?.philanthropist?.lastName
                    : ""
                }`}
              </h2>
            </Button>
          </Link>
          <div className="Details-div">
            <div className="Flex-div">
              <div>
                <div>
                  تاریخ انجام پروژه : {startDate} - {endDate}
                </div>
                <div>محل احداث : {data?.project?.cityName}</div>
              </div>
              <div>
                <div>
                  بودجه : {ToFarsiNumber(NumberCreator(data?.project?.fund))}{" "}
                  تومان
                </div>
                <div>نوع پروژه : {data?.project?.typeName}</div>
              </div>
            </div>
          </div>
        </div> */}
      {/* </div> */}

      <div className='images-box'>
        <h2 style={{ margin: "0em auto" }}>عکس های پروژه</h2>
        <Grid lg={4} sm={6} xs={12}>
          {/* {data?.project?.imageIds.map((item) => (
            <img
              src={`http://charity.mykanoon.ir/File/Get/${item}`}
              alt="projectPics"
              className='project-images'
              key={item.id}
            />
          ))} */}
        </Grid>
      </div>
    </div>
  );
};

export default ProjectDetails;
