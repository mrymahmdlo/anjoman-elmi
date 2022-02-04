import React, {useState} from "react";
import {CCard, CCardHeader, CContainer, CInput, CButton, CCol, CRow} from "@coreui/react";
import {PostDataBroad} from "src/Service/APIBroadCast";

const LinkWebinar = ({obj, setModal}) => {

  const [data, setData] = useState();
  const [index, setIndex] = useState();

  const showLink = (item) => {
    PostDataBroad("Webinar/GetStatus", {
      webinarId: obj.webinarId,
      userId: item.userId,
      userFullName: item.name,
      isProvider: true,
    }).then((res) => setData(res.data));
  };

  return (
    <div className="App">
      <CContainer fluid>
        <CCard>
          <CCardHeader>لینک همایش</CCardHeader>
          <div style={{margin: '0.5em'}}>
            {obj?.productProvider.map((item, i) => (
              <div style={{margin: '0.5em'}}>
                <CRow>
                  <CCol sm={3}>
                    {`${item.name}  ${item.lastName}`}
                  </CCol>
                  <CCol sm={2}>
                    <CButton
                      className="mr-1"
                      color="primary"
                      onClick={(item) => {
                        showLink(item);
                        setIndex(i);
                      }}
                    >
                      لینک
                    </CButton>
                  </CCol>
                  <CCol sm={7}>
                    {data && index === i ?
                      <CInput disabled value={`jhb${data?.webinarLink}`}/>
                      : null}
                  </CCol>
                </CRow>
              </div>
            ))}
          </div>
        </CCard>
      </CContainer>
    </div>
  );
};

export default LinkWebinar;
