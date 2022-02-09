import React, { useState } from "react";
import {
  CCard,
  CCardHeader,
  CContainer,
  CInput,
  CButton,
  CCol,
  CRow,
} from "@coreui/react";
import { APIBoardcastPost } from "src/Service/APIBroadCast";
import CIcon from "@coreui/icons-react";
import { freeSet } from "@coreui/icons";

const LinkWebinar = ({ obj, setModal }) => {
  const [data, setData] = useState();
  const [index, setIndex] = useState();

  const showLink = (item) => {
    APIBoardcastPost("Webinar/GetStatus", {
      webinarId: obj.webinarId,
      userId: item.userId,
      userFullName: item.name,
      isProvider: true,
    }).then((res) => setData(res.data));
  };

  const copyToClipboard = () => {
    if (typeof navigator.clipboard == "undefined") {
      let textArea = document.createElement("textarea");
      textArea.value = data?.webinarLink;
      textArea.style.position = "fixed"; //avoid scrolling to bottom
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        let successful = document.execCommand("copy");
      } catch (err) {
      }

      document.body.removeChild(textArea);
      return;
    }
    navigator.clipboard.writeText(data?.webinarLink).then(
      function () {
      },
      function (err) {
      }
    );
  };

  return (
    <div className="App">
      <CContainer fluid>
        <CCard>
          <CCardHeader>لینک همایش</CCardHeader>
          <div style={{ margin: "0.5em" }}>
            {obj?.productProvider.map((item, i) => (
              <div style={{ margin: "0.5em" }}>
                <CRow>
                  <CCol sm={3}>{`${item.name}  ${item.lastName}`}</CCol>
                  <CCol sm={2}>
                    <CButton
                      className="mr-1"
                      color="primary"
                      onClick={() => {
                        showLink(item);
                        setIndex(i);
                      }}
                    >
                      <CIcon content={freeSet.cilLink} />
                    </CButton>
                  </CCol>
                  <CCol sm={7}>
                    {data && index === i ? (
                      <CRow>
                        <CCol sm={9}>
                          <CInput disabled value={`${data?.webinarLink}`} />
                        </CCol>
                        <CCol sm={3}>
                          <CButton
                            color="primary"
                            onClick={() => copyToClipboard()}
                          >
                            <CIcon content={freeSet.cilCopy} title="کپی لینک" />
                          </CButton>
                        </CCol>
                      </CRow>
                    ) : null}
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
