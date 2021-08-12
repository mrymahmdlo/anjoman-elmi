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
  const history = useHistory();

  const SubmitLogin = () => {
    PostData("Identity/LogIn", {
      UserName,
      Password,
      RememberMe: false,
    }).then((res) => {
      SetToken(res.token);
      SetFullName(res.user.fullName);
    });
  };

  const [position, setPosition] = useState("top-right");
  const [autohide, setAutohide] = useState(true);
  const [autohideValue, setAutohideValue] = useState(5000);
  const [closeButton, setCloseButton] = useState(true);
  const [fade, setFade] = useState(true);

  const [toasts, setToasts] = useState([
    { position: "static" },
    { position: "static" },
    { position: "top-right", autohide: 3000 },
  ]);

  const addToast = () => {
    setToasts([
      ...toasts,
      { position, autohide: autohide && autohideValue, closeButton, fade },
    ]);
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CToaster position={"top-right"} key={"toaster"}>
          <CToast key={"toast"} show={true} autohide={3000} fade={true}>
            <CToastHeader closeButton={true}>Toast title</CToastHeader>
            <CToastBody>{`This is a toast in positioned toaster .`}</CToastBody>
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
