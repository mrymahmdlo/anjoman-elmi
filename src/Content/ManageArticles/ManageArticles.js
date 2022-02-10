import { CCard, CCardBody, CCardHeader, CDataTable } from "@coreui/react";
import { useEffect, useState } from "react";
import { APICorePost } from "src/Service/APIBase";
import { ChangeValuesManageArticles } from "./Components/ChangeValue";
import { ContentModal } from "./Components/ContentModal";
import { ContentScopedSlots } from "./Components/ContentScopedSlots";
import { TableHeadersArticles } from "./Components/TableHeaders";
import * as React from "react";

const ManaeArticles = () => {
  const [tableData, setTableData] = useState([]);
  const tableFields = TableHeadersArticles;
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const updateData = () => {
    APICorePost("FreeContent/GetFreeContentByFilter").then((res) => {
      let data = ChangeValuesManageArticles(res.data);
      setTableData(data);
    });
  };

  useEffect(() => {
    updateData();
  }, []);

  return (
    <>
      <CCard>
        <CCardHeader>مدیریت مقاله های برترها</CCardHeader>
        <CCardBody>
          <CDataTable
            items={tableData}
            fields={tableFields}
            striped
            columnFilter
            size="sm"
            sorter
            itemsPerPage={15}
            pagination
            scopedSlots={ContentScopedSlots(
              updateData,
              setModal,
              modal,
              setModalContent
            )}
          />
        </CCardBody>
      </CCard>
      <ContentModal
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

export default ManaeArticles;
