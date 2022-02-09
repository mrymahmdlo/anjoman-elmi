import CIcon from "@coreui/icons-react";
import { CButton, CInput, CInputGroup } from "@coreui/react";
import { DatePicker } from "jalali-react-datepicker";
import { useRef, useState } from "react";
import moment from "jalali-moment";

export const DateTimePicker = ({ value, onChange }) => {
  const [isValid, setValid] = useState(true);

  const handleChange = (e) => {
    const valid = moment(e.target.value, "YYYY/MM/DD HH:mm").isValid();
    onChange(e.target.value);
    console.log(e.target.value);
    setValid(valid);
  };

  const picker = useRef();
  return (
    <CInputGroup>
      <CButton
        className="btn-primary"
        onClick={picker.current?.toggleModalOpen}
      >
        <CIcon name="cil-calendar" />
      </CButton>
      <CInput
        valid={isValid}
        invalid={!isValid}
        value={value}
        dir="ltr"
        onChange={handleChange}
      />
      <DatePicker
        ref={picker}
        timePicker
        className="d-none"
        onClickSubmitButton={(e) =>
          onChange(e.value.locale("fa").format("YYYY/MM/DD HH:mm"))
        }
      />
    </CInputGroup>
  );
};
