import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "./PhiloDetails.css";
import NumberCreator from "../common-components/NumberCreator";
import ToFarsiNumber from "../common-components/Converter";
import banknote from "../../assets/images/banknotes-icon.png";
import location from "../../assets/images/location-icon.png";
import numbers from "../../assets/images/numbers-icon (1).png";

const base = "http://charity.mykanoon.ir/api";

const PhiloDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    fetch(base + "/Tehran/Philanthropist?id=" + id).then((response) =>
      response.json().then((response) => setData(response))
    );
  }, []);

  // return (
  //   <div className='detail-content'>
  //     <div className="info-div">
  //       <h1 className="title">{`${data?.philanthropist?.firstName} ${
  //         data?.philanthropist?.lastName ? data?.philanthropist?.lastName : ""
  //       }`}</h1>
  //       <div className="info">
  //         <h3>
  //           <span>شهر : {data?.philanthropist?.cityName}</span>
  //           <img src={location} alt="cityName" className='detail-icon' />
  //         </h3>
  //         <h3>
  //           <span>تعداد پروژه ها : {data?.philanthropist?.projectCounts}</span>
  //           <img src={numbers} alt="projectCounts" className='detail-icon' />
  //         </h3>
  //         <h3>
  //           <span>
  //             مبلغ اهداء شده :{" "}
  //             {ToFarsiNumber(NumberCreator(data?.philanthropist?.sparedFund))}{" "}
  //             تومان
  //           </span>
  //           <img src={banknote} alt="sparedFund" className='detail-icon' />
  //         </h3>
  //       </div>
  //     </div>
  //     <div className="details">
  //       <div className="card">
  //         <img
  //           src={`http://charity.mykanoon.ir/File/Get/${data?.philanthropist?.imageId}`}
  //           alt="philoPic"
  //           className='detail-pic'
  //         />
  //         <div className='activity'>
  //           {data?.philanthropist?.charityActivitiesHistory}
  //         </div>
  //       </div>
  //       <div className="projects">
  //         <h2>پروژه های خیر</h2>
  //         {data?.projects.slice(0, data?.projects.length).map((item) => (
  //           <div key={item.id}>
  //             <Link
  //               to={
  //                 item.typeId === 1
  //                   ? `/HalfBuilt/${item.id}`
  //                   : item.typeId === 2
  //                   ? `/Overhauled/${item.id}`
  //                   : item.typeId === 3
  //                   ? `/Completed/${item.id}`
  //                   : `/UnderConstruction/${item.id}`
  //               }
  //             >
  //               <Button variant="contained" className='detail-button'>
  //                 <div className='detail-projects'>
  //                   <div>
  //                     <h3>{item?.title}</h3>
  //                     <div>
  //                       <span>بودجه : </span>
  //                       {ToFarsiNumber(NumberCreator(item.fund))}
  //                       <span> تومان</span>
  //                     </div>
  //                   </div>
  //                   <div className='project-pic-div'>
  //                     <img
  //                       src={`http://charity.mykanoon.ir/File/Get/${item?.imageIds}`}
  //                       alt="projectPic"
  //                       className="project-pic"
  //                     />
  //                   </div>
  //                 </div>
  //               </Button>
  //             </Link>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default PhiloDetails;
