export const CheckForm = (form) => {
    if(form.title && form.title !== null && form.title !== undefined )
        return true;
    return false;
}