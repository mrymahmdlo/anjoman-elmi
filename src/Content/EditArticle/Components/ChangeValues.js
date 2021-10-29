export const ChangeValues = (obj) => {
  let newobj = {
    contentId: obj.contentId,
    title: obj.title,
    description: obj.description,
    timeToStudy: "" + obj.timeToStudy,
    writerProviderId: obj.provider?.providerId,
    isImportant: false,
    image: obj.imageLink,
    groupId: obj.group?.groupId,
    courseId: obj.course?.courseId,
    createdDateTime: obj.createdDateTime,
  };

  return newobj;
};
