import * as React from "react";
// todo
import { CSpinner } from "@coreui/react";
import { CIcon } from "@coreui/icons-react";
const status = {
    LOADING: 0,
    UPLOADED: 1,
    FAILED: -1,
    EMPTY: 2,
  };

  
const UploadFileStatusMark = (statusFile) => {
        switch (statusFile) {
          case status.LOADING:
            return (
              <CSpinner
                style={{ width: "2rem", height: "2rem" }}
                color="primary"
                variant="grow"
              />
            );
          case status.UPLOADED:
            return (
              <CIcon
                name="cil-check-circle"
                style={{ width: "2rem", height: "2rem" }}
              />
            );
          case status.FAILED:
            return (
              <CIcon
                name="cil-x-circle"
                style={{ width: "2rem", height: "2rem" }}
              />
            );
          case status.EMPTY:
            return (
              <CIcon name="cil-file" style={{ width: "1.7rem", height: "2rem" }} />
            );
          default:
            return "";
        }
};
export {status,UploadFileStatusMark}