import React, { useEffect, useState } from "react";
import {
  CButton,
  CCollapse,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
} from "@coreui/react";
import { GetData, PostData } from "src/Service/APIConfig";
import { FilterSection } from "../Utility/FilterSection";

export const EditForm = ({ orderDetailId }) => {
  const [collapse, setCollapse] = useState(false);
  const [providers, setProviders] = useState([]);
  const [groupId, setGroupId] = useState(null);
  const [status, setStatus] = useState(null);
  const [rank, setRank] = useState(null);
  const [form, setForm] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    PostData("Provider/Consultation", {}).then((res) => {
      setProviders(res.data);
    });
    GetData("Order/Detail/" + orderDetailId)
      .then((d) =>
        setForm({
          orderDetailId: d.orderDetailId,
          productProvider: {
            productId: d.productId,
            providerId: d.providerId,
          },
          description: "",
          reserveDate: d.startDateTime,
        })
      )
      .catch();
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

  useEffect(() => {
    debugger;
    GetData(`Service/MinuteConsultation/${form.productProvider?.providerId}`)
      .then((d) => setProducts(d?.data?.items ?? []))
      .catch();
  }, [form.productProvider?.providerId]);

  return (
    <CForm action="" method="post">
      <CCollapse show={collapse}>
        <FilterSection
          setGroupId={setGroupId}
          setRank={setRank}
          setStatus={setStatus}
        />
      </CCollapse>
      <CFormGroup>
        <label>ارایه دهنده</label>
        <select
          class="form-select"
          value={form.productProvider?.providerId}
          onChange={(e) => setForm({ ...form, providerId: +e.target.value })}
        >
          {providers.length > 0 ? (
            providers.map((item) => (
              <option value={item.providerId}>
                {item.name + " " + item.lastName}
              </option>
            ))
          ) : (
            <option>پشتیبانی وجود ندارد</option>
          )}
        </select>
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
        <label>محصول</label>
        <select
          class="form-select"
          value={form.productProvider?.productId}
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
        </select>
      </CFormGroup>
      <CFormGroup>
        <CInput id="nf-description" placeholder="توضیحات" />
        <CFormText className="help-block">توضیحات افزوده شود</CFormText>
      </CFormGroup>
    </CForm>
  );
};
