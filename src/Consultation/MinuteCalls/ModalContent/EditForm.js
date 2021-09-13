import React, { useEffect, useState } from "react";
import {
  CButton,
  CCollapse,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CSelect,
  CSpinner,
} from "@coreui/react";
import { GetData, PostData } from "src/Service/APIEngine";
import { FilterSection } from "../Utility/FilterSection";
import { DateTimePicker } from "src/reusable/DateTimePicker";
import {
  DotNetGeorgianToHejri,
  HejriToDotNetGeorgian,
} from "src/Utility/DateTime";
import { Schedule } from "../Utility/Schedule";

const subcategories = [
  { name: "MinuteConsultation", label: "آنلاین" },
  { name: "OfflineMinuteConsultation", label: "آفلاین" },
];

export const EditForm = ({ orderDetailId, onSubmit }) => {
  const [collapse, setCollapse] = useState(false);
  const [collapseS, setCollapseS] = useState(false);
  const [providers, setProviders] = useState([]);
  const [groupId, setGroupId] = useState(null);
  const [status, setStatus] = useState(null);
  const [rank, setRank] = useState(null);
  const [form, setForm] = useState({});
  const [subcategory, setSubcategory] = useState("");
  const [products, setProducts] = useState([]);
  const [btnActice, setBtnActive] = useState(false);
  const [providerId, setProviderId] = useState();

  useEffect(() => {
    PostData("Provider/Consultation", {}).then((res) => {
      setProviders(res.data);
    });
  }, []);

  useEffect(() => {
    GetData("Order/Detail/" + orderDetailId)
      .then((d) => {
        setProviderId(d.data.providerId);
        setForm({
          ...d.data,
          reserveDate: DotNetGeorgianToHejri(d.data.startDateTime),
        });
        setSubcategory(d.data.productSubCategoryId);
      })
      .catch();
    setCollapseS(false);
    setCollapse(false);
  }, [orderDetailId]);

  useEffect(() => {
    PostData("Provider/Consultation", {
      GroupIds: groupId ? [groupId] : [],
      statusIds: status ? [status] : [],
      RankRangeIds: rank ? [rank] : [],
    }).then((res) => {
      setProviders(res.data);
    });
  }, [groupId, status, rank]);

  useEffect(() => {
    if (form.providerId)
      GetData(`Service/${subcategory}/${form.providerId}`)
        .then((d) => {
          const data = d?.data?.items;
          if (
            data &&
            data.length > 0 &&
            !data.find((i) => i.productId == form.productId)
          ) {
            setForm({ ...form, productId: data[0].productId });
          }
          setProducts(data ?? []);
        })
        .catch();
  }, [form.providerId, subcategory]);

  const handleSumbit = () => {
    setBtnActive(true);
    PostData("Order/Change", {
      orderDetailId: form.orderDetailId,
      productProvider: {
        providerId: form.providerId,
        productId: form.productId,
        reserveDate: HejriToDotNetGeorgian(form.reserveDate),
      },
      description: form.description,
    })
      .then(() => {
        setBtnActive(false);
        onSubmit();
      })
      .catch();
  };
  return (
    <CForm action="" method="post">
      <CCollapse show={collapse}>
        <FilterSection
          setGroupId={setGroupId}
          setRank={setRank}
          setStatus={setStatus}
        />
      </CCollapse>
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
      <CFormGroup>
        <label>ارایه دهنده</label>
        <CSelect
          value={form.providerId}
          onChange={(e) => setForm({ ...form, providerId: +e.target.value })}
        >
          {providers.length > 0 ? (
            providers.map((item) => (
              <option value={item.providerId} key={item.providerId}>
                {item.name + " " + item.lastName}{" "}
                {item.isOnline ? "online" : "offline"}
              </option>
            ))
          ) : (
            <option>پشتیبانی وجود ندارد</option>
          )}
        </CSelect>
      </CFormGroup>
      <CFormGroup>
        <label>دسته بندی</label>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <CSelect
            value={subcategory}
            style={{ width: "65%" }}
            onChange={(e) => {
              setSubcategory(e.target.value);
              if (collapseS) setCollapseS(false);
            }}
          >
            {subcategories.map((item, index) => (
              <option key={index} value={item.name}>
                {item.label}
              </option>
            ))}
          </CSelect>
          {subcategory === "OfflineMinuteConsultation" ? (
            <>
              <CButton
                className="mr-1 btn btn-primary"
                style={{ width: "30%" }}
                onClick={(e) => {
                  setCollapseS(!collapseS);
                  e.preventDefault();
                }}
              >
                دیدن برنامه مشاور
              </CButton>
            </>
          ) : null}
        </div>
        <CCollapse show={collapseS}>
          <Schedule providerId={providerId} setForm={setForm} form={form} />
        </CCollapse>
      </CFormGroup>
      <CFormGroup>
        <label>محصول</label>
        <CSelect
          value={form.productId}
          onChange={(e) => setForm({ ...form, productId: +e.target.value })}
        >
          {products.length > 0 ? (
            products.map((item) => (
              <option value={item.productId} key={item.productId}>
                {item.product.title} {item.product.price} ریال
              </option>
            ))
          ) : (
            <option>محصولی وجود ندارد</option>
          )}
        </CSelect>
      </CFormGroup>
      {subcategory === subcategories[0].name ? null : (
        <CFormGroup>
          <DateTimePicker
            value={form.reserveDate}
            onChange={(date) => setForm({ ...form, reserveDate: date })}
          />
        </CFormGroup>
      )}
      <CFormGroup>
        <CInput
          id="nf-description"
          placeholder="توضیحات"
          value={form.description}
        />
        <CFormText
          className="help-block"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        >
          توضیحات افزوده شود
        </CFormText>
      </CFormGroup>
      <CFormGroup
        display="grid"
        style={{ display: "grid", placeItems: "center", witdh: "100%" }}
      >
        {!btnActice ? (
          <CButton
            color={"primary"}
            onClick={handleSumbit}
            disabled={btnActice}
          >
            ثبت
          </CButton>
        ) : (
          <CSpinner
            style={{ width: "4rem", height: "4rem" }}
            color="danger"
            variant="grow"
          />
        )}
      </CFormGroup>
    </CForm>
  );
};
