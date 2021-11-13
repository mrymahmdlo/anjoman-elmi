import { CCard, CCardBody, CCardHeader, CDataTable } from "@coreui/react";
import { useEffect, useState } from "react";
import { PostData } from "src/Service/APIEngine";
import { ChangeValues } from "./Components/ChangeValue";
import { ContentModal } from "./Components/ContentModal";
import { ContentScopedSlots } from "./Components/ContentScopedSlots";
import { TableHeaders } from "./Components/TableHeaders";

const ManaeArticles = () => {
  const [tableData, setTableData] = useState([]);
  const tableFields = TableHeaders;
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const updateData = () => {
    PostData("FreeContent/GetFreeContentByFilter", {}).then((res) => {
      let data = ChangeValues(res.data);
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
