import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CForm,
  CFormGroup,
  CLabel,
  CSelect,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PreviewQuestion from "../CreateNewExam/Components/CreateQuestions/PreviewQuestion";
import { ExamModalContainer } from "../CreateNewExam/Components/ExamModalContainer";
import ExamService from "../ExamService/ExamService";
import { AddQuestionFromBank } from "./Component/AddQuestionFromBank";
import { ChangeValuesExamQuestionBank } from "./Component/ChangeValue";
import { TableHeaderExam } from "./Component/TableHeader";
import ImportQuestion from "./Service/ImportQuestion";

const ExamQuestionBank = () => {
  const { id } = useParams();
  const [filters, setFilters] = useState({
    groupCodes: [],
    courseIds: [],
  });
  const [data, setData] = useState([]);
  const [filterOptions, setFilterOptions] = useState();
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const popUpPreview = (item) => {
    var question = window.open(
      "",
      "wildebeast",
      "width=1000,height=500,scrollbars=1,resizable=1"
    );

    var html = PreviewQuestion(item);

    question.document.open();
    question.document.write(html);
    question.document.close();
  };

  useEffect(() => {
    if (modal === false) setModalContent("");
  }, [modal]);
  useEffect(() => {
    ExamService.GetDropDowns().then((res) => setFilterOptions(res.data));
  }, []);
  useEffect(() => {
    if (filterOptions !== null) {
      ImportQuestion.GetQuestion(filters).then((res) =>
        setData(ChangeValuesExamQuestionBank(res.data, filterOptions?.course.options))
      );
    }
  }, [filters, filterOptions]);
  return (
    <CCard>
      <CCardHeader>مشاوره های دقیقه ای پشتیبان ها</CCardHeader>
      <CCardBody>
        <CForm inline>
          <CFormGroup className=" p-2">
            <CLabel className="pr-1">انتخاب گروه آزمایشی</CLabel>
            <CSelect
              className="mr-3"
              value={filters.groupCodes[0]}
              onChange={(e) => {
                setFilters({ ...filters, groupCodes: [+e.target.value] });
              }}
            >
              {filterOptions?.groupCode?.options.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </CSelect>
          </CFormGroup>
          <CFormGroup className=" p-2">
            <CLabel className="pr-1">انتخاب درس</CLabel>
            <CSelect
              className="mr-3"
              value={filters.courseIds[0]}
              onChange={(e) => {
                setFilters({ ...filters, courseIds: [+e.target.value] });
              }}
            >
              {filterOptions?.course?.options.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </CSelect>
          </CFormGroup>
        </CForm>
      </CCardBody>
      <CCardBody>
        <CDataTable
          items={data}
          fields={TableHeaderExam}
          striped
          itemsPerPage={15}
          pagination
          scopedSlots={{
            questionText: (item) => (
              <td className="py-2 pl-2" key={item.contentId}>
                <p
                  className="ck-content"
                  dangerouslySetInnerHTML={{ __html: item.questionText }}
                ></p>
              </td>
            ),
            add: (item) => (
              <td className="py-2 pl-2" key={item.contentId}>
                <CButton
                  className="m-1"
                  color="success"
                  onClick={() => {
                    setModalContent(
                      <AddQuestionFromBank quizId={id} item={item} />
                    );
                    setModal(!modal);
                  }}
                >
                  <CIcon name="cil-cursor" />
                </CButton>
              </td>
            ),
            preview: (item) => (
              <td className="py-2 pl-2" key={item.contentId}>
                <CButton
                  className="m-1"
                  color="dark"
                  onClick={() => popUpPreview(item)}
                >
                  <CIcon name="cil-laptop" />
                </CButton>
              </td>
            ),
          }}
        />
      </CCardBody>
      <ExamModalContainer
        name="مدیریت آزمون"
        modal={modal}
        toggle={() => {
          setModal(!modal);
        }}
        modalContent={modalContent}
      />
    </CCard>
  );
};

export default ExamQuestionBank;
