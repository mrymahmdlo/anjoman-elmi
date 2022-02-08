import { FormNumberInput } from "src/reusable/FormInput";
import {CSelect} from "@coreui/react";
import React from "react";
import {DateTimePickerToGeorgian} from "../../../reusable/DateTimePickerToGeorgian";

export const FormItemsManuallyCreateTutoring = (form, setForm, tutorials, providers) => {
  return [
    {
      name: "",
      text: "",
      input: (
        <CSelect
          value={form.groupId}
          onChange={(e) => setForm({ ...form, productId: e.target.value })}
        >
          <option value={-1}>جلسه را انتخاب کنید</option>
          {tutorials.length > 0 ? (
            tutorials?.map((item) => (
              <option value={item.productId} key={item.productId}>
                {item.title}
              </option>
            ))
          ) : (
            <option>جلسه ای وجود ندارد</option>
          )}
        </CSelect>
      ),
      size: 6,
    },
    {
      name: "",
      text: "",
      input: (
        <CSelect
          value={form.providerId}
          onChange={(e) => setForm({ ...form, providerId: e.target.value })}
        >
          <option value={-1}>ارائه دهنده را انتخاب کنید</option>
          {providers.length > 0 ? (
            providers.map((item) => (
              <option value={item.providerId} key={item.providerId}>
                {item.name + " " + item.lastName}
              </option>
            ))
          ) : (
            <option>پشتیبانی وجود ندارد</option>
          )}
        </CSelect>
      ),
      size: 6,
    },
    {
      name: "",
      text: "",
      input: FormNumberInput(
        form,
        setForm,
        "userPhoneNumber",
        "شماره ی دانش آموز",
        0,
        null,
        () => form.userPhoneNumber >= "0",
        () => form.userPhoneNumber?.length >= "11"
      ),
      size: 3,
    },
    {
      name: "وضعیت درس",
      text: "وضعیت درس را انتخاب کنید",
      input: (
        <CSelect
          custom
          name="isOffline"
          style={{ width: "100%" }}
          onChange={(e) => setForm({ ...form, isOnline: +e.target.value })}
        >
          <option value={-1}>وضعیت درس</option>
          <option value={1}>آنلاین</option>
          <option value={0}>آفلاین</option>
        </CSelect>
      ),
      size: 6,
    },
    {
      name: "تاریخ و ساعت برگزاری",
      text: "تاریخ و ساعت برگزاری جلسه را وارد کنید",
      input: (
        <DateTimePickerToGeorgian
          className="form-control"
          name="startDate"
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e })}
        />
      ),
      size: 6,
    },
  ];
};
