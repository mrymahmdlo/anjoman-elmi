import { Typography } from '@material-ui/core';
import SchoolIcon from '@material-ui/icons/School';
import Project from './Project';
import Carousel from "react-multi-carousel";
import { ThemeProvider } from '@material-ui/core/styles';
import './Project.css';
import '../common-components/CarouselStyle.css';

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    bigTablet: {
      breakpoint: { max: 1024, min: 950 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 950, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
};

export default function Projects({path, title, projects, theme}) {

  

  if(projects.data.length < 10) {
    
    for(let i = 2; i < 10; i++) {
      projects.data.push(projects.data[0]);
    }   
  }
  const backColor = ( path === 'overhauled' || path === 'under-construction' ) ? 'primary' : 'secondary';
    return(
        <ThemeProvider theme={theme}>
              <div className='add-title'>
                <Typography className='title-text' variant="h6" component="h6">
                  {title}
                </Typography>
                <SchoolIcon fontSize='large' color={backColor} />
              </div>
              <Carousel 
              responsive={responsive}
              showDots={true}
              arrows={false}
              swipeable={true}
              draggable={true}
              >
                {projects.data.slice(0,6).map(item => (
                  <Project
                    key={item.id}
                    id={item.id}
                    path={path}
                    theme={theme}
                    project={item} />
                ))}
              </Carousel>
      </ThemeProvider>
    )
}