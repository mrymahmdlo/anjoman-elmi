import { CButton, CBadge } from "@coreui/react";
import EditAllTutoring from "../AllTutoring/EditTutoring/EditTutoring";
import SetSponsor from "./SetSponsor/SetSponsor";
import CIcon from "@coreui/icons-react";
import React from "react";

export const AllTutoringScopedSlots = ({ setModal, setModalTutoring }) => {
  return {
    edit: (tableData) => (
      <>
        <td className="py-2 pl-2" key={tableData.tutoringId}>
          <CButton
            className="mr-1"
            color="primary"
            onClick={() => {
              setModalTutoring(
                <EditAllTutoring
                  obj={tableData}
                  setModal={setModal}
                  tutoringId={tableData.tutoringId}
                />
              );
              setModal(true);
            }}
          >
            <CIcon name="cil-pencil" />
          </CButton>
        </td>
      </>
    ),

    setSponser: (tableData) => (
      <>
        <td className="py-2 pl-2" key={tableData.tutoringId}>
          <CButton
            className="mr-1"
            color="info"
            onClick={() => {
              setModalTutoring(
                <SetSponsor
                  obj={tableData}
                  setModal={setModal}
                  tutoringId={tableData.tutoringId}
                />
              );
              setModal(true);
            }}
          >
            <CIcon name="cil-user-follow" />
          </CButton>
        </td>
      </>
    ),

    status: (item) => {
      return (
        <td className="py-2 pl-2">
          <CBadge style={{ direction: "ltr" }}>{item.status}</CBadge>
        </td>
      );
    },
    isOnline: (item) => {
      return (
        <td className="py-2 pl-2">
          <CBadge
            style={{ direction: "ltr" }}
            color={
              item.isOnline === false
                ? "dark"
                : item.isOnline === true
                ? "light"
                : "primary"
            }
          >
            {item.isOnline}
          </CBadge>
        </td>
      );
    },
  };
};
