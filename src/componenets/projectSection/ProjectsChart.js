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

    // const data = {
    //   labels: ['مدارس نیمه تمام', 'مدارس بازسازی تخریبی', 'مدارس ساخته شده', 'مدارس درحال ساخت'],
    //   datasets: [
    //     {
    //       label: 'فراوانی پروژه های موسسه',
    //       data: [dataArray0, dataArray1, dataArray2, dataArray3],
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(54, 162, 235, 0.2)',
    //         'rgba(255, 206, 86, 0.2)',
    //         'rgba(75, 192, 192, 0.2)',
    //       ],
    //       borderColor: [
    //         'rgba(255, 99, 132, 1)',
    //         'rgba(54, 162, 235, 1)',
    //         'rgba(255, 206, 86, 1)',
    //         'rgba(75, 192, 192, 1)',
    //       ],
    //       borderWidth: 2,
    //     },
    //   ],
    // };

    return(
        <Grid container justifyContent="center" style={{backgroundColor: "#f8fcff"}}>
          <Grid item xs={12}>
            <Typography variant="h5" component="h5" className="greenTitle">انجمن فیزیولوژی و ورزشی ایران</Typography>
            <Typography component="p" className="blueText">اجرای بیش از صد ها پروژه موفق   </Typography>
            {/* <Bar data={data} options={options} /> */}
          </Grid>
        </Grid>
        
    )
}