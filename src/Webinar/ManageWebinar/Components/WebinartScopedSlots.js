import CIcon from "@coreui/icons-react";
import { CButton } from "@coreui/react";
import EditWebinar from "src/Webinar/EditWebinar/EditWebinar";
import { PostDataBroad } from "src/Service/APIBroadCast";
import moment from "jalali-moment";
import LinkWebinar from "./LinkWebinar";
import { freeSet } from '@coreui/icons';

const { CSwitch } = require("@coreui/react");
const DateTimeFormat = "YYYY/MM/DD HH:mm";
const DotNetDateTimeFormat = "YYYY-MM-DDTHH:mm";
export const WebinartScopedSlots = (setModalContent, setModal) => {
  return {
    startDateTime: (item) => (
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
    endDateTime: (item) => (
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
    active: (item) => (
      <td>
        <CSwitch
          className="mt-2"
          color="info"
          onClick={(e) => {
            PostDataBroad(
              `Webinar/SetActivation?webinarId=${item.webinarId}`,
              e.target.checked
            );
          }}
          defaultChecked={item.isActive}
        />
      </td>
    ),
    productProvider: (item) => (
      <>
        {
          <td className="py-2 pl-2" >
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

    edit: (item) => (
      <>
        <td className="py-2 pl-2" key={item.webinarId}>
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
    link: (item) => (
      <>
        <td className="py-2 pl-2" key={item.webinarId}>
          <CButton
            className="mr-1"
            color="primary"
            onClick={() => {
              setModalContent(<LinkWebinar obj={item} setModal={setModal} />);
              setModal(true);
            }}
          >
            <CIcon content={freeSet.cilLink}/>
          </CButton>
        </td>
      </>
    ),
  };
};
