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
      

      <div className='images-box'>
        <h2 style={{ margin: "0em auto" }}>عکس های پروژه</h2>
        <Grid lg={4} sm={6} xs={12}>
         
        </Grid>
      </div>
    </div>
  );
};

export default ProjectDetails;
