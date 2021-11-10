export const ChangeValues = (obj) => {
  let newobj = {
    contentId: obj.contentId,
    title: obj.title,
    description: obj.description,
    timeToStudy: "" + obj.timeToStudy,
    writerProviderId: obj.provider?.providerId,
    isImportant: false,
    image: obj.imageLink,
    groupId: obj?.group?.groupId ? obj.group.groupId : 0,
    courseId: obj?.course?.courseId ? obj.course.courseId : 0,
    createdDateTime: obj.createdDateTime,
  };

  return newobj;
};
