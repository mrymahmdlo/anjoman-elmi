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
import { ExamTableHeaders } from "./Components/TableHeader";
import { ChangeValues } from "./Utility/ChangeValues";
import ExamService from "../../Exam/ExamService/ExamService";

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
    ExamService.GetAllQuiz({
      orderCol: filterData.column,
      searchTerm: search,
      orderAscending: filterData.asc,
      page: 1,
      length: 100000,
    }).then((res) => {
      setTableFields([...res.data.headers, ...ExamTableHeaders]);
      let data = res.data.rows;
      ChangeValues(data);
      setTableData(data);
    });
  };

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
            fields={tableFields.filter(
              (field) =>
                field.key !== "quizDescription" &&
                field.key !== "questionCount" &&
                field.key !== "resultDate" &&
                field.key !== "totalTimeMinutes" &&
                field.key !== "questionFileName" &&
                field.key !== "answerVideoFileName" &&
                field.key !== "questionFileReady" &&
                field.key !== "answerFileReady" &&
                field.key !== "answerFileName" &&
                field.key !== "groupCodes"
            )}
            striped
            size="sm"
            sorter={{ external: true, resetable: false }}
            onSorterValueChange={setFilterData}
            itemsPerPage={15}
            pagination
            scopedSlots={WebinartScopedSlots(
              updateData,
              setModal,
              modal,
              setModalContent,
              tableFields.filter(
                (field) =>
                  field.key === "questionCount" ||
                  field.key === "resultDate" ||
                  field.key === "totalTimeMinutes" ||
                  field.key === "questionFileName" ||
                  field.key === "answerVideoFileName" ||
                  field.key === "questionFileReady" ||
                  field.key === "answerFileReady" ||
                  field.key === "answerFileName" ||
                  field.key === "groupCodes"
              )
            )}
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
