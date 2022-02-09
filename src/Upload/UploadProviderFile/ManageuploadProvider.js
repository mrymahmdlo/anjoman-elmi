import { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CFormGroup,
  CSelect,
  CCol,
} from "@coreui/react";
import { TableHeadersUpload } from "./TableHeaders";
import { ChangeValueUpload } from "./ChangeValue";
import { APIProviderPost } from "src/Service/APIProvider";
import { ProviderScopedSlots } from "./ProviderScopedSlots";
import { ProviderModalUpload } from "./ProviderModal";
import {APICorePost} from "src/Service/APIBase";

const ManageuploadProvider = () => {
  const [tableData, setTableData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [filterData, setFilterData] = useState({
    asc: false,
    column: "quizId",
  });
  const [form, setForm] = useState({});
  const [providers, setProviders] = useState([]);

  const updateData = () => {
    APIProviderPost("Content/GetAll", {
      providerId: (form.providerId)
    })
    .then((res) => {
      setTableData(ChangeValueUpload(res.data));
    });
  };

  useEffect(() => {
    updateData();
  }, [modal, form.providerId]);

  useEffect(() => {
    APICorePost("Provider/Tutoring").then((res) => {
      setProviders(res.data);
    });
  }, []);

  return (
    <>
      <CCard>
        <CCardHeader> مشاهده فایل های بارگزاری شده </CCardHeader>
        <CCardBody>
          <CFormGroup>
            <CCol sm={6}>
              <CSelect
                value={form.providerId}
                onChange={(e) =>
                  setForm({ ...form, providerId: e.target.value })
                }
              >
                <option value={-1}>پشتیبان را انتخاب کنید</option>
                {providers.length > 0 ? (
                  providers?.map((item) => (
                    <option value={item.providerId} key={item.providerId}>
                      {item.name + " " + item.lastName}{" "}
                    </option>
                  ))
                ) : (
                  <option>پشتیبانی وجود ندارد</option>
                )}
              </CSelect>
            </CCol>
          </CFormGroup>
          <CDataTable
            items={tableData}
            fields={TableHeadersUpload}
            striped
            size="sm"
            sorter
            onSorterValueChange={setFilterData}
            itemsPerPage={15}
            pagination
            scopedSlots={ProviderScopedSlots(
              updateData,
              setModal,
              modal,
              setModalContent
            )}
          />
        </CCardBody>
      </CCard>
      <ProviderModalUpload
        name="مدیریت محتواهای عمومی"
        modal={modal}
        toggle={() => {
          setModal(!modal);
        }}
        modalContent={modalContent}
      />
    </>
  );
};

export default ManageuploadProvider;
