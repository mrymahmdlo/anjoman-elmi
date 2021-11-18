import CIcon from "@coreui/icons-react";
import { CButton } from "@coreui/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { GetData } from "src/Service/APIEngine";
import { Toast } from "src/Utility/Toast";
import JDate from "jalali-date";
import { DateFormatter } from "../../../Utility/DateFormatter";
import EditWebinar from "src/Webinar/EditWebinar/EditWebinar";
import moment from "jalali-moment";
const DateTimeFormat = "YYYY/MM/DD HH:mm";
const DotNetDateTimeFormat = "YYYY-MM-DDTHH:mm";
export const WebinartScopedSlots = (setModalContent, setModal, modal) => {
  const history = useHistory();

  return {
    startDateTime: (item, index) => (
      <>
        <td className="py-2 pl-2">
          {moment(item.schedules[0].startDateTime, DotNetDateTimeFormat)
            .locale("fa")
            .format(DateTimeFormat)}
        </td>
      </>
    ),
    endDateTime: (item, index) => (
      <>
        <td className="py-2 pl-2">
          {moment(item.schedules[0].endDateTime, DotNetDateTimeFormat)
            .locale("fa")
            .format(DateTimeFormat)}
        </td>
      </>
    ),
    edit: (item, index) => (
      <>
        <td className="py-2 pl-2" key={item.quizId}>
          <CButton
            className="mr-1"
            color="primary"
            onClick={() => {
              setModalContent(<EditWebinar obj={item} />);
              setModal(true);
            }}
          >
            <CIcon name="cil-pencil" />
          </CButton>
        </td>
      </>
    ),
  };
};
