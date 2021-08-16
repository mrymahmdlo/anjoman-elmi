import CIcon from "@coreui/icons-react";
import { CButton, CFormGroup, CInput } from "@coreui/react";

export const DateTimePicker = ({ value, onChange }) => {
  return <CFormGroup>
    <CInput value={value}/>
    <CButton><CIcon value=""></CButton>
  </CFormGroup>;
};
