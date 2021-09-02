const tokenCookieName = "SPWM";
const userNameCookieName = "EPSL";
const userIdCookieName = "CNDS";

export const TokenManager = () => {
  const SetToken = (token) => sessionStorage.setItem(tokenCookieName, token);
  const SetUserId = (id) => sessionStorage.setItem(userIdCookieName, id);
  const SetFullName = (fullName) =>
    sessionStorage.setItem(userNameCookieName, fullName);
  const ResetToken = () => sessionStorage.removeItem(tokenCookieName);
  const GetToken = () => sessionStorage.getItem(tokenCookieName);
  const GetUserId = () => sessionStorage.getItem(userIdCookieName);
  const GetName = () => sessionStorage.getItem(userNameCookieName);
  const TokenExists = () => sessionStorage.getItem(tokenCookieName) !== null;
  return {
    SetToken,
    SetFullName,
    ResetToken,
    GetToken,
    TokenExists,
    GetName,
    GetUserId,
    SetUserId,
  };
};
