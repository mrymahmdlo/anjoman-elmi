import { GeorgianToHejri } from "src/Utility/DateTime";
export const ChangeValuesEditWebinar = (obj) => {
  let newobj = {
    capacity: obj.capacity,
    countOfSession: obj.countOfSession,
    courseId: obj.courseId,
    courseName: obj.courseName,
    description: obj.description,
    duration: obj.duration,
    groupId: obj.groupId,
    poster: obj.poster,
    priceAfterHolding: obj.price >= 0 ? obj.price : "0",
    providerIds: obj.productProvider,
    schedules: [
      {
        startDateTime: GeorgianToHejri(obj.webinarSchedules[0].startDateTime),
        endDateTime: GeorgianToHejri(obj.webinarSchedules[0].endDateTime),
      },
    ],
    title: obj.title,
    webinarId: obj.webinarId,
  };

  return newobj;
};
