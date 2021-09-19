import { CButton, CListGroup, CListGroupItem } from "@coreui/react";
import { useState } from "react";

export const EditableQuestionList = () => {
  const [newQ, setNewQ] = useState(0);
  return (
    <CListGroup className="w-100">
      <CListGroupItem active>
        <div className="d-flex align-items-center">
          <dt className="col-sm-9">سوالات آزمون</dt>
          <dd style={{ textOverflow: 'ellipsis "[..]"' }}>
            <CButton
              className="m-1"
              color="info"
              onClick={() => setNewQ(newQ + 1)}
            >
              افزودن سوال
            </CButton>
            <CButton className="m-1" color="light">
              ویرایش
            </CButton>
            <CButton className="m-1" color="danger">
              حذف
            </CButton>
          </dd>
        </div>
      </CListGroupItem>
      {[...Array(newQ)].map((e, i) => (
        <CListGroupItem key={i}>
          <div className="d-flex align-items-center">
            <dt className="col-sm-1">{i + 1 + " - "}</dt>
            <dd
              className="col-sm-8"
              style={{ textOverflow: 'ellipsis "[..]"' }}
            >
              متن تستی برای تست آزمون تستی {i + 1} این تست نمایش کامل یک تست
              میباشد و کامل متن را نمایش میدهد .
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
  );
};
