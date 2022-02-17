import React, { Component,useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { LoadingContainer } from "./reusable/LoadingContainer";
import { CSpinner } from "@coreui/react";
import "./scss/style.scss";

export const LoadingContext = React.createContext();

const loading = (
  <div className="pt-3 text-center">
   
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./Identity/Login"));

class App extends Component {
  render() {
    return (
      <>
      <LoadingContainer />
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/Login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <Route
              path="/"
              name="Home"
              render={(props) => <TheLayout {...props} />}
            />
          </Switch>
        </React.Suspense>
      </HashRouter>
      </>
    );
  }
}

export default App;
