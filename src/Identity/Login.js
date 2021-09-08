import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CSpinner,
} from "@coreui/react";
import { TokenManager } from "./Service/TokenManager";
import CIcon from "@coreui/icons-react";
import { PostData } from "src/Service/APIEngine";
import { useHistory } from "react-router-dom";
import { Toast } from "src/Utility/Toast";

const Login = () => {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const { SetFullName, SetToken, SetUserId } = TokenManager();
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const history = useHistory();
  const [btnActice, setBtnActive] = useState(false);

  const SubmitLogin = () => {
    setShowError(false);
    setBtnActive(true);
    PostData("Identity/LogIn", {
      UserName,
      Password,
      RememberMe: false,
    })
      .then((res) => {
        SetToken(res.token);
        SetFullName(res.user.fullName);
        SetUserId(res.user.id);
        history.push("/");
        setBtnActive(false);
      })
      .catch((err) => {
        setShowError(true);
        setErrorContent(err.errors[0]);
        setBtnActive(false);
      });
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <Toast errorContent={errorContent} showError={showError} />
        <form method="post">
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>ورود</h1>
                      <p className="text-muted">با حساب خود وارد شوید.</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="text"
                          placeholder="نام کاربری"
                          autoComplete="username"
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="password"
                          placeholder="رمز عبور"
                          autoComplete="current-password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          {!btnActice ? (
                            <CButton
                              size="sm"
                              onClick={SubmitLogin}
                              className="btn-github btn-brand mr-1 mb-1"
                            >
                              ورود
                            </CButton>
                          ) : (
                            <CSpinner
                              style={{ width: "2rem", height: "2rem" }}
                              color="primary"
                              variant="grow"
                            />
                          )}
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: "44%" }}
                >
                  <CCardBody className="text-center">
                    <div>
                      <h2>ثبت نام</h2>
                      <p> در دسترس نمیباشد </p>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </form>
      </CContainer>
    </div>
  );
};

export default Login;
