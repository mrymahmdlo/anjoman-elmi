export const Activity = (item) => {
  return (
    <>
      <p>
        {" "}
        شماره تماس مشتری :{" "}
        {item.customerPhoneNumber ? item.customerPhoneNumber : " ندارد "}
      </p>
      <p>
        {" "}
        شماره تماس پشتیبان :{" "}
        {item.providerPhoneNumber ? item.providerPhoneNumber : " ندارد "}
      </p>
    </>
  );
};
