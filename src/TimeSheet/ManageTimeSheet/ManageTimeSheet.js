import { CCard, CCardBody, CCardHeader, CDataTable } from "@coreui/react";
import { useEffect, useState } from "react";
import { PostDataProvider } from "src/Service/APIProvider";
import {ChangeValues} from "./Components/ChangeValue";
// import { ContentModal } from "./Components/ContentModal";
import { TimeSheetScopedSlots } from "./Components/TimeSheetScopedSlots";
import { TableHeaders } from "./Components/TableHeaders";

const ManageTimeSheet = () => {
  const [tableData, setTableData] = useState([]);
  const tableFields = TableHeaders;
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const updateData = () => {
    PostDataProvider("TimeSheet/GetTimeSheets", {}).then((res) => {
      let data=ChangeValues(res.data)
      setTableData(data);
    });
  };

  useEffect(() => {
    updateData();
  }, []);

  return (
    <>
      <CCard>
        <CCardHeader>مدیریت زمان بندی</CCardHeader>
        <CCardBody>
          <CDataTable
            items={tableData}
            fields={tableFields}
            striped
            size="sm"
            sorter
            itemsPerPage={15}
            pagination
            scopedSlots={TimeSheetScopedSlots(
              updateData,
              setModal,
              modal,
              setModalContent
            )}
          />
        </CCardBody>
      </CCard>
      {/* <ContentModal
        name="مدیریت محتواهای عمومی"
        modal={modal}
        toggle={() => {
          setModal(!modal);
        }}
        modalContent={modalContent}
      /> */}
    </>
  );
};

export default ManageTimeSheet;
