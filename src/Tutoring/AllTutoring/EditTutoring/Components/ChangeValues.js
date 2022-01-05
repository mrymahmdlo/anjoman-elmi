export const ChangeValues = (obj) => {
  let newobj = {
    title: obj.title,
    maxProviderRank: obj.maxProviderRank,
    minProviderRank: obj.minProviderRank,
    price: obj.price,
    tutorialId: obj.tutorialId,
    productId: obj.productId,
    groupId: obj?.groupId ? obj.groupId : 0,
    courseId: obj?.courseId ? obj.courseId : 0,
    totalMinute: "" + obj.totalMinute,
  };

  return newobj;
};
