import {
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { WebinartModal } from "./Components/WebinartModal";
import { WebinartScopedSlots } from "./Components/WebinartScopedSlots";
import { TableHeader } from "./Components/TableHeader";
import { ChangeValues } from "./Utility/ChangeValues";
import ExamService from "../../Exam/ExamService/ExamService";
import { GetData } from "src/Service/APIWebinar";
const ManageWebinars = () => {
  const [tableData, setTableData] = useState([]);
  const [tableFields, setTableFields] = useState([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [filterData, setFilterData] = useState({
    asc: false,
    column: "quizId",
  });

  useEffect(() => {
    updateData();
  }, [search, filterData]);

  const updateData = () => {
      GetData("Webinar/GetAll").then((res) => {
        console.log(res);
        let data = ChangeValues(res.data);
        setTableData(data);
            // setTableFields([...res.data.headers, ...ExamTableHeaders]);
            // let data = res.data.rows;
            // ChangeValues(data);
            // setTableData(data);
      }); 

  };
  //  useEffect(() => {
  //    updateData();
  //  }, []);

  return (
    <>
      <CCard>
        <CCardHeader>مدیریت همایش های برترها</CCardHeader>
        <CCardBody>
          <CForm inline>
            <CFormGroup className=" pl-1">
              <CLabel className="pr-1">جستجو</CLabel>
              <CInput
                className="mr-2"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </CFormGroup>
          </CForm>
        </CCardBody>
        <CCardBody>
          <CDataTable
            items={tableData}
            fields={TableHeader}
            striped
            size="sm"
            sorter={{ external: true, resetable: false }}
            onSorterValueChange={setFilterData}
            itemsPerPage={15}
            pagination
            scopedSlots={WebinartScopedSlots()}
          />
        </CCardBody>
      </CCard>
      <WebinartModal
        name="مدیریت همایش"
        modal={modal}
        toggle={() => {
          setModal(!modal);
        }}
        modalContent={modalContent}
      />
    </>
  );
};

export default ManageWebinars;
