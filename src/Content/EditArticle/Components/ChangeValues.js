export const ChangeValues = (obj) => {
  let newobj = {
    contentId: obj.contentId,
    title: obj.title,
    description: obj.description,
    timeToStudy: "" + obj.timeToStudy,
    writerProviderId: obj.provider ? obj.provider.providerId : null,
    isImportant: false,
    image: obj.imageHash,
    imageLink: obj.imageLink,
    groupId: obj?.groupId ? obj.groupId : 0,
    courseId: obj?.courseId ? obj.courseId : 0,
    createdDateTime: obj.createdDateTime,
  };

  return newobj;
};
