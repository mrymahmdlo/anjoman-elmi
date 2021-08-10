import React, { useEffect, useState } from "react";
import {
  CButton,
  CButtonGroup,
  CCollapse,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
} from "@coreui/react";
import { PostData } from "src/service/APIConfig";
import { FilterSection } from "../Utility/FilterSection";

export const EditForm = () => {
  const [collapse, setCollapse] = useState(false);
  const [providers, setProviders] = useState([]);
  const [groupId, setGroupId] = useState(null);
  const [status, setStatus] = useState(null);
  const [rank, setRank] = useState(null);

  useEffect(() => {
    PostData("Provider/Consultation", {}).then((res) => {
      setProviders(res.data);
    });
  }, []);
  useEffect(() => {
    PostData("Provider/Consultation", {
      GroupIds: groupId ? [groupId] : [],
      statusIds: status ? [status] : [],
      RankRangeIds: rank ? [rank] : [],
    }).then((res) => {
      setProviders(res.data);
    });
  }, [groupId, status, rank]);

  return (
    <CForm action="" method="post">
      <CFormGroup>
        <CCollapse show={collapse}>
          <FilterSection
            setGroupId={setGroupId}
            setRank={setRank}
            setStatus={setStatus}
          />
        </CCollapse>
        <CDropdown className="m-1 d-inline-block">
          <CFormText className="help-block"> پشتیبان را انتخاب کنید</CFormText>
          <CDropdownToggle color="secondary">
            اسم پشتیبان جدید را انتخاب کنید
          </CDropdownToggle>
          <CButtonGroup className="mr-2"></CButtonGroup>
          <CDropdownMenu
            placement="bottom"
            modifiers={[{ name: "flip", enabled: false }]}
          >
            {providers.length > 0 ? (
              providers.map((item) => (
                <CDropdownItem value={item.providerId}>
                  {item.name + " " + item.lastName}
                </CDropdownItem>
              ))
            ) : (
              <CDropdownItem>پشتیبانی وجود ندارد</CDropdownItem>
            )}
          </CDropdownMenu>
        </CDropdown>
        <CButton
          color="primary"
          onClick={(e) => {
            setCollapse(!collapse);
            e.preventDefault();
          }}
          className={"mb-1"}
        >
          فیلتر کردن پشتیبان
        </CButton>
      </CFormGroup>
      <CFormGroup>
        <CLabel htmlFor="nf-time">تاریخ سفارش</CLabel>
        <CInput type="time" id="nf-time" />
        <CFormText className="help-block">
          ساعت جدید سفارش را وارد کنید
        </CFormText>
        <CInput id="nf-date" placeholder="1400/5/18" />
        <CFormText className="help-block">
          تاریخ جدید سفارش را وارد کنید
        </CFormText>
        <CInput id="nf-description" placeholder="توضیحات" />
        <CFormText className="help-block">توضیحات افزوده شود</CFormText>
      </CFormGroup>
    </CForm>
  );
};
