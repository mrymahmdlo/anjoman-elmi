import {React}from 'react';
import { Bar } from 'react-chartjs-2';
import { Grid, Typography } from '@material-ui/core';

const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
export default function ProjectsChart({projectsData}) {

    const dataArray0 = projectsData[0].data.length;
    const dataArray1 = projectsData[1].data.length;
    const dataArray2 = projectsData[2].data.length;
    const dataArray3 = projectsData[3].data.length;

  

    return(
        <Grid container justifyContent="center" style={{backgroundColor: "#f8fcff"}}>
          <Grid item xs={12}>
            <Typography variant="h5" component="h5" className="greenTitle">انجمن فیزیولوژی و ورزشی ایران</Typography>
            <Typography component="p" className="blueText">اجرای بیش از صد ها پروژه موفق   </Typography>
          
          </Grid>
        </Grid>
        
    )
}