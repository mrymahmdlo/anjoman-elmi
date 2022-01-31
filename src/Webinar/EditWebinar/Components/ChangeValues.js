export const ChangeValues = (obj) => {
  let newobj = {
    capacity: obj.capacity,
    countOfSession: obj.countOfSession,
    courseId: obj.courseId,
    courseName: obj.courseName,
    description: obj.description,
    duration: obj.duration,
    groupId: obj.groupId,
    // groupName: obj.groupName,
    poster: obj.poster,
    priceAfterHolding: obj.price>=0?obj.price:'0',
    providerIds: [obj.productProvider[0].userId],
    schedules: [
      {
        startDateTime: obj.webinarSchedules[0].startDateTime,
        endDateTime: obj.webinarSchedules[0].endDateTime,
      },
    ],
    title: obj.title,
    webinarId: obj.webinarId,
  };

  return newobj;
};
