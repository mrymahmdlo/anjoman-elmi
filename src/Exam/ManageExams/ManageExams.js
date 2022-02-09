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
import { ExamModalContainer } from "../CreateNewExam/Components/ExamModalContainer";
import ExamService from "../ExamService/ExamService";
import { ExamTableHeaders } from "./Components/ExamsTableHeaders";
import { ExamScopedSlots } from "./Components/ScopedSlots";
import { ChangeValuesManageExams } from "./Utility/ChangeValues";
import * as React from "react";

const ManageExams = () => {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      ChangeValuesManageExams(data);
      setTableData(data);
    }).catch((err) => {
      setModalContent(err.error);
      setModal(true);
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
            columnFilter
            size="sm"
            sorter={{ external: true, resetable: false }}
            onSorterValueChange={setFilterData}
            itemsPerPage={15}
            pagination
            scopedSlots={ExamScopedSlots(
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
      <ExamModalContainer
        name="مدیریت آزمون"
        modal={modal}
        toggle={() => {
          setModal(!modal);
        }}
        modalContent={modalContent}
      />
    </>
  );
};

export default ManageExams;
