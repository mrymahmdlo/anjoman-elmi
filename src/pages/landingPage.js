import {React, useState, useEffect }from 'react';
import ProjectCarousel from '../componenets/projectSection/ProjectCarousel';
import ProjectsChart from '../componenets/projectSection/ProjectsChart';
import PostCarousel from '../componenets/postSection/PostCarousel';
import AboutCard from '../componenets/aboutSection/AboutCard';
import TwoPosts from '../componenets/postSection/PostsTwo';
import ApCarousel from '../componenets/aboutSection/ApCarousel';
import { CircularProgress } from '@material-ui/core';
import Additional from '../componenets/StaticSection/Static';
import HelpNav from '../componenets/common-components/HelpNav';
import { GetData } from "../services/APIengine";
import PhiloCarousel from '../componenets/philoSection/PhiloCarousel';

export default function LandingPage() {

  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  
  useEffect(() => {
      GetData(`Tehran/Home`).then(res => setData(res))
  }, []); 

  useEffect(() => {
    GetData(`Tehran/Statics`).then(res => setData2(res))
  }, []); 


    return(
        <>
            { data ? (
              <div>
                <PostCarousel newsData={data.postSection.posts} />
                <AboutCard />
                {/* <HelpNav /> */}
                <PhiloCarousel philoData={data.philanthropistSection[0]} />
                <ProjectsChart projectsData={data.projectSection} />
                <ProjectCarousel projectsData={data.projectSection[0]} />
                {/* <Additional staticData={data2} /> */}
                <ApCarousel />
                <TwoPosts postsData={data.postSection.posts} />
            </div>
            ) : (
              <CircularProgress />
            )
            }
        </>
    );
}