const tokenCookieName = "SPWM";
const userNameCookieName = "EPSL";

export const TokenManager = () => {
  const SetToken = (token) => sessionStorage.setItem(tokenCookieName, token);
  const SetFullName = (fullName) =>
    sessionStorage.setItem(userNameCookieName, fullName);
  const ResetToken = () => sessionStorage.removeItem(tokenCookieName);
  const GetToken = () => sessionStorage.getItem(tokenCookieName);
  return {
    SetToken,
    SetFullName,
    ResetToken,
    GetToken,
  };
};
