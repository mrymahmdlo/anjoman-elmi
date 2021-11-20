export const ChangeValues = (obj) => {
  let newobj = {
    capacity: obj.capacity,
    countOfSession: obj.countOfSession,
    courseId: obj.courseId,
    courseName: obj.courseName,
    description: obj.description,
    duration: obj.duration,
    groupId: obj.groupId,
    groupName: obj.groupName,
    poster: obj.poster,
    priceAfterHolding: obj.priceAfterHolding,
    providerId: obj.providerId,
    schedules: [
      {
        startDateTime: obj.schedules[0].startDateTime,
        endDateTime: obj.schedules[0].endDateTime,
      },
    ],
    title: obj.title,
    webinarId: obj.webinarId,
  };

  return newobj;
};
