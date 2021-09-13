import React, { useEffect, useState } from "react";
import {
  CButton,
  CCardBody,
  CCardFooter,
  CCollapse,
  CListGroup,
  CListGroupItem,
  CRow,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { GetData } from "src/Service/APIEngine";

const QuizDetailsForm = ({ setShowError, setErrorContent }) => {
  const [collapse, setCollapse] = useState(false);
  const [form, setForm] = useState({});
  const [btnActice, setBtnActive] = useState(false);
  const [groupIds, setGroupIds] = useState([]);
  useEffect(() => {
    GetData("BasicInfo/Groups").then((res) => setGroupIds(res));
  }, []);
  const toggle = (e) => {
    setCollapse(!collapse);
    e.preventDefault();
  };
  const handleSubmit = () => {
    setShowError(false);
    setBtnActive(true);
  };
  return (
    <>
      <CCardBody>
        <CRow>
          <CButton color="primary" onClick={toggle} className={"mb-1"}>
            افزودن زیردرس
          </CButton>

          <CCollapse show={collapse}>
            <CCardBody>
              <p>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. Nihil anim keffiyeh
                helvetica, craft beer labore wes anderson cred nesciunt sapiente
                ea proident.
              </p>
            </CCardBody>
          </CCollapse>
        </CRow>
        <CRow>
          <CListGroup className="w-100">
            <CListGroupItem active>
              <div className="d-flex align-items-center" s>
                <dt className="col-sm-9">زیست شناسی پایه یازدهم - فصل دوم</dt>
                <dd
                  className="col-sm-2"
                  style={{ textOverflow: 'ellipsis "[..]"' }}
                >
                  <CButton color="info">افزودن سوال</CButton>
                </dd>
                <dd
                  className="col-sm-1"
                  style={{ textOverflow: 'ellipsis "[..]"' }}
                >
                  <CButton color="danger">حذف</CButton>
                </dd>
              </div>
            </CListGroupItem>
            {[...Array(5)].map((e, i) => (
              <CListGroupItem>
                <div className="d-flex align-items-center">
                  <dt className="col-sm-1">{i + 1 + " - "}</dt>
                  <dd
                    className="col-sm-8"
                    style={{ textOverflow: 'ellipsis "[..]"' }}
                  >
                    متن تستی برای تست آزمون تستی {i + 1} این تست نمایش کامل یک
                    تست میباشد و کامل متن را نمایش میدهد .
                  </dd>
                  <dd
                    className="col-sm-1"
                    style={{ textOverflow: 'ellipsis "[..]"' }}
                  >
                    <CButton color="primary">ویرایش </CButton>
                  </dd>
                  <dd
                    className="col-sm-1"
                    style={{ textOverflow: 'ellipsis "[..]"' }}
                  >
                    <CButton color="success">بازبینی</CButton>
                  </dd>
                  <dd
                    className="col-sm-1"
                    style={{ textOverflow: 'ellipsis "[..]"' }}
                  >
                    <CButton color="danger">حذف</CButton>
                  </dd>
                </div>
              </CListGroupItem>
            ))}
          </CListGroup>
        </CRow>
      </CCardBody>
      <CCardFooter>
        {!btnActice ? (
          <CButton
            type="submit"
            size="sm"
            color="primary"
            onClick={handleSubmit}
          >
            <CIcon name="cil-scrubber" /> اتمام ایجاد آزمون
          </CButton>
        ) : (
          <CSpinner
            style={{ width: "2rem", height: "2rem" }}
            color="primary"
            variant="grow"
          />
        )}
      </CCardFooter>
    </>
  );
};

export default QuizDetailsForm;
