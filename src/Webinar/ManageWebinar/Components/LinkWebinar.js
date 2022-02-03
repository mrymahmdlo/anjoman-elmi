import React, {useEffect, useState} from "react";
import {
  CCard,
  CCardHeader,
  CContainer,
  CInput,
} from "@coreui/react";
import {PostDataBroad} from "src/Service/APIBroadCast";

const LinkWebinar = ({obj, items}) => {

  const [data, setData] = useState();

  useEffect(() => {
    PostDataBroad("Webinar/GetStatus", {
      webinarId: obj.webinarId,
      userId: items.userId,
      userFullName: items.name,
      isProvider: true,
    }).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="App">
      <CContainer fluid>
        <CCard>
          <CCardHeader>ویرایش همایش</CCardHeader>
          <div style={{width: 200}}>
            {" "}
            <CInput disabled value={data.webinarLink}/>
          </div>
        </CCard>
      </CContainer>
    </div>
  );
};

export default LinkWebinar;
