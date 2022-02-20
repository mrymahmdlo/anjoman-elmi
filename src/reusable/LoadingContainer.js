import React from "react";
import { CSpinner } from "@coreui/react";
import { useSelector } from "react-redux";
import { LoadingSelector } from "./LoadingSelector";

export const LoadingContainer = () => {
  const {isLoading} = useSelector(LoadingSelector);
  return (
    <>
      <div
        className="text-center"
        style={{
          display: isLoading ? "inline" : "none",
          zIndex: 10000,
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "#f5f5f5",
          paddingBlock: "20%",
          position: "fixed",
          marginTop: "-30px",
          width: "100%",
          height: "200%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3>لطفا صبر کنید...</h3>
        <h6>در حال بارگذاری داده ها</h6>
        <CSpinner style={{ width: "3rem", height: "3rem" }} color="primary" />
      </div>
    </>
  );
};
