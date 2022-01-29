import CIcon from "@coreui/icons-react";
import { CButton } from "@coreui/react";
import EditSubscriptions from "src/Webinar/EditSubscriptions/EditSubscriptions";
import moment from "jalali-moment";
const DateTimeFormat = "YYYY/MM/DD HH:mm";
const DotNetDateTimeFormat = "YYYY-MM-DDTHH:mm";
export const SubscriptionsScopedSlots = (setModalContent, setModal, modal) => {
  return {
    buyDateTime: (item, index) => (
      <>
        {
          <td className="py-2 pl-2">
            {item.length > 0 ? (
              <>
                {moment(
                  item.buyDateTime,
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
    joinDatetime: (item, index) => (
      <>
        {
          <td className="py-2 pl-2">
            {item.length > 0 ? (
              <>
                {moment(
                  item.joinDatetime,
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
    cancelDatetime: (item, index) => (
      <>
        {
          <td className="py-2 pl-2">
            {item.length > 0 ? (
              <>
                {moment(
                  item.cancelDatetime,
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
              setModalContent(
                <EditSubscriptions obj={item} setModal={setModal} />
              );
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
