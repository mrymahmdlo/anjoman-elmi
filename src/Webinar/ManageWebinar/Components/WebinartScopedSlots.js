import CIcon from "@coreui/icons-react";
import { CButton } from "@coreui/react";
import EditWebinar from "src/Webinar/EditWebinar/EditWebinar";
import LinkWebinar from './LinkWebinar';
import { PostDataBroad } from "src/Service/APIBroadCast";
import moment from "jalali-moment";
const { CSwitch } = require("@coreui/react");

const DateTimeFormat = "YYYY/MM/DD HH:mm";
const DotNetDateTimeFormat = "YYYY-MM-DDTHH:mm";
export const WebinartScopedSlots = (setModalContent, setModal, modal) => {
const toggle=(item)=>{}
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
    active: (item, index) => (
      <td>
      <CSwitch
      className="mt-2"
      color="info"
      onClick={(e) => {
        PostDataBroad(`Webinar/SetActivation?webinarId=${item.webinarId}`, e.target.checked)
      }}
      defaultChecked={item.isActive}
       />
      </td>
    ),
    productProvider: (item, index) => (
      <>
        {
          <td className="py-2 pl-2">
            {item.productProvider?.length > 0 ? (
              <>
                {item.productProvider.map((items) => (
                  <>
                    <p>{items.name + " " + items.lastName}</p>
                  </>
                ))}
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
