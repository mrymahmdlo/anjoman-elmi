import { CButton, CCallout, CCol, CContainer, CRow } from "@coreui/react";
import { useHistory } from "react-router-dom";
import * as React from "react";

const ExamDetails = ({ item, tableFields }) => {
  const history = useHistory();

  return (
    <CContainer>
      <CRow>
        <CCol sm={9}>
          <CCallout color="info" className={"bg-white"}>
            <small className="text-muted">نام آزمون</small>
            <br />
            <strong className="h4">{item.quizTitle}</strong>
          </CCallout>
        </CCol>
        <CCol className="d-flex align-items-center">
          <CButton
            onClick={() =>
              history.push("/Exams/EditExam/EditQuizInfo/" + item.quizId)
            }
            color="primary"
          >
            ویرایش اطلاعات
          </CButton>
        </CCol>
      </CRow>
      <CRow>
        {tableFields.map((e, index) => (
          <CCol col="12" sm="6" key={index}>
            <CCallout color="info" className={"bg-white"}>
              <small className="text-muted">{e.label}</small>
              <br />
              <strong className="h4">{item[e.key]}</strong>
            </CCallout>
          </CCol>
        ))}
      </CRow>
    </CContainer>
  );
};

export default ExamDetails;
