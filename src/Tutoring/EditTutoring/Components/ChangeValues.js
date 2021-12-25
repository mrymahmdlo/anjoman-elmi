export const ChangeValues = (obj) => {

  let newobj = {
    // title: obj.title,
    tutorialId: obj.tutorialId,
    productId: obj.productId,
    groupId: obj?.groupId ? obj.groupId : 0,
    courseId: obj?.courseId ? obj.courseId : 0,
    totalMinute: "" + obj.timeToStudy,
  };

  return newobj;
};
