import React, { useEffect, useState } from "react";
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
  CToast,
  CToastBody,
  CToaster,
  CToastHeader,
} from "@coreui/react";
import { TokenManager } from "./Service/TokenManager";
import CIcon from "@coreui/icons-react";
import { PostData } from "src/Service/APIConfig";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const { SetFullName, SetToken } = TokenManager();
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const history = useHistory();

  const SubmitLogin = () => {
    setShowError(false);
    PostData("Identity/LogIn", {
      UserName,
      Password,
      RememberMe: false,
    })
      .then((res) => {
        SetToken(res.token);
        SetFullName(res.user.fullName);
        history.push("/");
      })
      .catch((err) => {
        setShowError(true);
        setErrorContent(err.errors[0]);
      });
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CToaster position={"top-right"} key={"toaster"}>
          <CToast key={"toast"} show={showError} autohide={3000} fade={true}>
            <CToastHeader closeButton={true}>خطا در ورود</CToastHeader>
            <CToastBody>{errorContent}</CToastBody>
          </CToast>
        </CToaster>
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
                          <CButton
                            size="sm"
                            onClick={SubmitLogin}
                            className="btn-github btn-brand mr-1 mb-1"
                          >
                            ورود
                          </CButton>
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
                      <p>فعلا در دسترس نمیباشد </p>
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
