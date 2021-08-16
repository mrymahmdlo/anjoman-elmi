import CIcon from "@coreui/icons-react";
import { useEffect, useState } from "react";
import { Timeline, TimelineEvent } from "react-event-timeline";
import { GetData } from "src/service/APIConfig";
import { ConvertDates } from "../Utility/ConvertDates";

export const Activity = ({ item }) => {
  const [timelines, setTimeline] = useState([]);
  useEffect(() => {
    GetData("MinuteConsultation/Activity/" + item.orderDetailId)
      .then((res) => {
        let data = res.data;
        ConvertDates(data);
        let arry = data.map((report) => {
          let times = [];
          if (report.startDateTime) {
            times.push(
              <TimelineEvent
                title={`فعال شدن تماس به مدت ${report.expectedDuration} برای ${report.executorName}`}
                createdAt={report.startDateTime}
                icon={<CIcon name="cil-bell" />}
              ></TimelineEvent>
            );
          }
          if (report.doneDateTime) {
            times.push(
              <TimelineEvent
                title={`برقراری ${report.contactDuration} تماس توسط ${report.executorName}`}
                createdAt={report.doneDateTime}
                icon={<CIcon name="cil-bell" />}
              ></TimelineEvent>
            );
          }
          return times;
        });
        setTimeline(arry);
      })
      .catch();
  }, [item.orderDetailId]);

  return (
    <>
      <p>شماره تماس مشتری : {item.customerPhoneNumber}</p>
      <p>شماره تماس پشتیبان : {item.providerPhoneNumber}</p>
      <p>فعالیت های سفارش:</p>

      <Timeline>
        <TimelineEvent
          title={` ثبت تماس ${
            item.expectedDuration.split(":")[1]
          } دقیقه ای پشتیبان ${item.providerName} برای مشتری ${
            item.customerName
          }`}
          createdAt={item.createDateTime}
          icon={<CIcon name="cil-bell" />}
        ></TimelineEvent>
        {timelines.map((i) => i)}
      </Timeline>
    </>
  );
};
