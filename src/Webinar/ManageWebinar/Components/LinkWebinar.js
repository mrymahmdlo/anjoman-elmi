import React, {useEffect, useState} from "react";
import { CCard, CCardHeader, CContainer, CInput, CButton } from "@coreui/react";
import {PostDataBroad} from "src/Service/APIBroadCast";

const LinkWebinar = ({ obj, setModal }) => {
  
  console.log(obj);
  const [data, setData] = useState();

 const showLink=(item) => {
    PostDataBroad("Webinar/GetStatus", {
      webinarId: obj.webinarId,
      userId: item.userId,
      userFullName: item.name,
      isProvider: true,
    }).then((res) => {
      setData(res.data);
    });
  };

  return (
    <div className="App">
      <CContainer fluid>
        <CCard>
          <CCardHeader>لینک همایش</CCardHeader>
          <div style={{ width: 200 }}>
          
            {obj?.productProvider.map((item) => (
              <>
                <p>
                  {`${item.name}  ${item.lastName}`}
                  <CButton
                    className="mr-1"
                    color="primary"
                    onClick={(item) => showLink(item)}
                  >لینک</CButton>
                 {data? <CInput
                    disabled
                    value={data.webinarLink}
                   
                  />:null}
                </p>
              </>
            ))}
          </div>
        </CCard>
      </CContainer>
    </div>
  );
};

export default LinkWebinar;
