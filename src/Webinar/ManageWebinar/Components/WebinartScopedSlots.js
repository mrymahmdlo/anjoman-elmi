import CIcon from "@coreui/icons-react";
import { CButton } from "@coreui/react";
import EditWebinar from "src/Webinar/EditWebinar/EditWebinar";
import moment from "jalali-moment";
const DateTimeFormat = "YYYY/MM/DD HH:mm";
const DotNetDateTimeFormat = "YYYY-MM-DDTHH:mm";
export const WebinartScopedSlots = (setModalContent, setModal, modal) => {

  return {
    startDateTime: (item, index) => (
      <>
        {
          <td className="py-2 pl-2">
            {item.webinarSchedules?.length > 0 ? (
              <>
                {moment(
                  item.webinarSchedules[0].startDateTime,
                  DotNetDateTimeFormat
                )
                  .locale("fa")
                  .format(DateTimeFormat)}
              </>
            ) : null}
          </td>
        }
      </>
    ),
    endDateTime: (item, index) => (
      <>
        {
          <td className="py-2 pl-2">
            {item.webinarSchedules?.length > 0 ? (
              <>
                {moment(
                  item.webinarSchedules[0].endDateTime,
                  DotNetDateTimeFormat
                )
                  .locale("fa")
                  .format(DateTimeFormat)}
              </>
            ) : null}
          </td>
        }
      </>
    ),
    edit: (item, index) => (
      <>
        <td className="py-2 pl-2" key={item.quizId}>
          <CButton
            className="mr-1"
            color="primary"
            onClick={() => {
              setModalContent(<EditWebinar obj={item} setModal={setModal} />);
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
