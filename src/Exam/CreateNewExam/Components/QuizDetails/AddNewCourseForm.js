import { useState } from "react";
import { TextField } from "src/Utility/InputGroup";
import { QuizDetailsFormItems } from "./QuizDetailsFormItems";

const {
  CCardBody,
  CRow,
  CCardFooter,
  CCard,
  CButton,
} = require("@coreui/react");

const AddNewCourseForm = ({ quizId }) => {
  const [form, setForm] = useState({ QuizId: quizId });

  const items = QuizDetailsFormItems(form, setForm).map((item) =>
    TextField(item)
  );
  return (
    <CCard className="m-2">
      <CCardBody>
        <CRow>{items.slice(0, 4)}</CRow>
        <CRow>{items.slice(4, 8)}</CRow>
        <CCardFooter>
          <CButton type="submit" size="sm" color="primary" onClick={""}>
            ثبت زیردرس
          </CButton>
        </CCardFooter>
      </CCardBody>
    </CCard>
  );
};

export default AddNewCourseForm;
