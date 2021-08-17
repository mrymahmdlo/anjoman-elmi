import React, { useEffect, useState } from "react";
import {
  CButton,
  CCollapse,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CSelect,
} from "@coreui/react";
import { GetData, PostData } from "src/Service/APIConfig";
import { FilterSection } from "../Utility/FilterSection";
import { DateTimePicker } from "src/reusable/DateTimePicekr";
import {
  DotNetGeorgianToHejri,
  HejriToDotNetGeorgian,
} from "src/Utility/DateTime";

const subcategories = [
  { name: "MinuteConsultation", label: "آنلاین" },
  { name: "OfflineMinuteConsultation", label: "آفلاین" },
];

export const EditForm = ({ orderDetailId, onSubmit }) => {
  const [collapse, setCollapse] = useState(false);
  const [providers, setProviders] = useState([]);
  const [groupId, setGroupId] = useState(null);
  const [status, setStatus] = useState(null);
  const [rank, setRank] = useState(null);
  const [form, setForm] = useState({});
  const [subcategory, setSubcategory] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    PostData("Provider/Consultation", {}).then((res) => {
      setProviders(res.data);
    });
    GetData("Order/Detail/" + orderDetailId)
      .then((d) => {
        setSubcategory(d.data.productSubCategoryId);
        setForm({
          ...d.data,
          reserveDate: DotNetGeorgianToHejri(d.data.startDateTime),
        });
      })
      .catch();
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
        .then((d) => setProducts(d?.data?.items ?? []))
        .catch();
  }, [form.providerId, subcategory]);

  const handleSumbit = () => {
    console.log(HejriToDotNetGeorgian(form.reserveDate));
    console.log(HejriToDotNetGeorgian("1379/8/25 18:32"));
    PostData("Order/Change", {
      orderDetailId: form.orderDetailId,
      productProvider: {
        providerId: form.providerId,
        productId: form.productId,
      },
      description: form.description,
      reserveDate: HejriToDotNetGeorgian(form.reserveDate),
    })
      .then(onSubmit)
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
              <option value={item.providerId}>
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
        <CSelect
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
        >
          {subcategories.map((item) => (
            <option value={item.name}>{item.label}</option>
          ))}
        </CSelect>
      </CFormGroup>
      <CFormGroup>
        <label>محصول</label>
        <CSelect
          value={form.productId}
          onChange={(e) => setForm({ ...form, productId: +e.target.value })}
        >
          {products.length > 0 ? (
            products.map((item) => (
              <option value={item.productId}>
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
      <CFormGroup>
        <CButton color="primary" onClick={handleSumbit}>
          ثبت
        </CButton>
      </CFormGroup>
    </CForm>
  );
};
