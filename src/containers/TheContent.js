import React, { Suspense, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";
import { Toast } from "src/Utility/Toast";

// routes config
import routes from "../routes";
import { TokenManager } from "src/Identity/Service/TokenManager";

export const ToastContext = React.createContext();

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const TheContent = () => {
  const { TokenExists } = TokenManager();
  const [showError, setShowError] = useState(false);
  const [showContent, setShowContent] = useState("");
  return (
    <main className="c-main">
      <CContainer fluid>
        <ToastContext.Provider
          value={{
            setShowContent,
            setShowError
          }}
        >
          <Suspense fallback={loading}>
            <Switch>
              {routes.map((route, idx) => {
                return (
                  route.component &&
                  TokenExists() === true && (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(props) => (
                        <CFade>
                          <route.component {...props} />
                        </CFade>
                      )}
                    />
                  )
                );
              })}
              <Redirect to="/Login" />
            </Switch>
          </Suspense>
        </ToastContext.Provider>
      </CContainer>
      <Toast showError={showError} showContent={showContent} />
    </main>
  );
};

export default React.memo(TheContent);
