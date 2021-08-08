import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CProgress,
} from "@coreui/react";
import { EditForm } from "./ModalContent/EditForm";
import { Activity } from "./ModalContent/Activity";
import { ModalContainer } from "./ModalContent/MocalContainer";
import { PostData } from "src/service/APIConfig";
import { ChangeValues } from "./Utility/ChangeValues";

const Tables = () => {
  const [tableData, setTableData] = useState([]);
  const [tableFields, setTableFields] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const fields = [
    {
      key: "orderEdit",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
    {
      key: "orderDetail",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];
  useEffect(() => {
    PostData("MinuteConsultation/Order", {
      filterModel: {
        fromDateTime: "1390/06/10",
        toDateTime: "1500/07/10",
      },
      dataTableModel: {
        orderCol: "ContactDuration",
        searchTerm: "",
        orderAscending: true,
        page: 2,
        length: 10,
      },
    }).then((res) => {
      setTableFields([...res.data.headers, ...fields]);
      setTableData(res.data.rows);
    });
  }, []);
  ChangeValues(tableData, tableFields);
  const toggle = () => {
    setModal(!modal);
  };
  return (
    <>
      <CCard>
        <CCardHeader>مشاوره های دقیقه ای پشتیبان ها</CCardHeader>
        <CCardBody>
          <CDataTable
            items={tableData}
            fields={tableFields}
            striped
            size="sm"
            sorter={{ external: true, resetable: false }}
            onSorterValueChange={console.log}
            itemsPerPage={20}
            pagination
            scopedSlots={{
              progressPercent: (item) => {
                return (
                  <td className="py-2 pl-2">
                    <CProgress
                      showPercentage
                      value={item.progressPercent}
                      className="bg-dark mt-2"
                      color={
                        item.progressPercent < 40
                          ? "danger"
                          : item.progressPercent < 70
                          ? "warning"
                          : "success"
                      }
                      animated
                    />
                  </td>
                );
              },
              orderDetail: (item, index) => {
                return (
                  <>
                    <td className="py-2 pl-2">
                      <CButton
                        onClick={() => {
                          setModal(!modal);
                          setModalContent(Activity(item));
                        }}
                        className="mr-1"
                        color="danger"
                      >
                        پیگیری
                      </CButton>
                    </td>
                  </>
                );
              },
              orderEdit: (item, index) => {
                return (
                  <>
                    <td className="py-2 pl-2">
                      <CButton
                        onClick={() => {
                          setModal(!modal);
                          setModalContent(<EditForm />);
                        }}
                        className="mr-1"
                        color="primary"
                      >
                        ویرایش
                      </CButton>
                    </td>
                  </>
                );
              },
            }}
          />
        </CCardBody>
      </CCard>
      <ModalContainer
        modal={modal}
        toggle={toggle}
        modalContent={modalContent}
      />
    </>
  );
};

export default Tables;
