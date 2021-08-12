import { Route } from "react-router-dom";
import Login from "../Login";
import { TokenManager } from "./TokenManager";

export const PrivateRoute = ({ path, Component }) => {
  const { TokenExists } = TokenManager();
  return TokenExists() === true ? (
    <Route exact path={path} render={(props) => <Component {...props} />} />
  ) : (
    <Route
      exact
      path="/Login"
      name="Login Page"
      render={(props) => <Login {...props} />}
    />
  );
};
