import { CButton, CListGroup, CListGroupItem } from "@coreui/react";
import { useState } from "react";

export const EditableQuizDetailsLists = () => {
  const [newQ, setNewQ] = useState(0);
  return (
    <CListGroup className="w-100">
      <CListGroupItem active>
        <div className="d-flex align-items-center" s>
          <dt className="col-sm-9">زیرآزمون ها</dt>
          <dd style={{ textOverflow: 'ellipsis "[..]"' }}>
            <CButton
              className="m-1"
              color="info"
              onClick={() => setNewQ(newQ + 1)}
            >
              افزودن زیرآزمون
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
              className="col-sm-9"
              style={{ textOverflow: 'ellipsis "[..]"' }}
            >
              زیست شناسی دهم - فصل {i + 1}
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
              <CButton color="danger">حذف</CButton>
            </dd>
          </div>
        </CListGroupItem>
      ))}
    </CListGroup>
  );
};
