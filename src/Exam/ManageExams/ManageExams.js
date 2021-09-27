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
import ExamService from "../ExamService/ExamService";
import { ExamTableHeaders } from "./Components/ExamsTableHeaders";
import { ExamScopedSlots } from "./Components/ScopedSlots";

const ManageExams = () => {
  const [tableData, setTableData] = useState([]);
  const [tableFields, setTableFields] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    updateData();
  }, []);

  const updateData = () => {
    ExamService.GetAllQuiz().then((res) => {
      setTableFields([
        ...ExamTableHeaders,
        ...[
          {
            key: "examDetail",
            label: "",
            _style: { width: "5%" },
            sorter: false,
            filter: false,
          },
          {
            key: "examEdit",
            label: "",
            _style: { width: "1%" },
            sorter: false,
            filter: false,
          },

          {
            key: "examDelete",
            label: "",
            _style: { width: "1%" },
            sorter: false,
            filter: false,
          },
        ],
      ]);
      setTableData(res.data);
    });
  };

  return (
    <>
      <CCard>
        <CCardHeader>مدیریت آزمون های برترها</CCardHeader>
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
            fields={tableFields}
            striped
            size="sm"
            sorter
            itemsPerPage={20}
            pagination
            scopedSlots={ExamScopedSlots(updateData)}
          />
        </CCardBody>
      </CCard>
    </>
  );
};

export default ManageExams;
