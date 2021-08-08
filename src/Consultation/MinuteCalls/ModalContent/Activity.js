export const Activity = (item) => {
    return(
        <>
            <p> شماره تماس مشتری : {item.customerPhoneNumber}</p>
            <p> شماره تماس پشتیبان :{item.providePhoneNumber ? item.providePhoneNumber : " ندارد "}</p>
        </>
    );
}