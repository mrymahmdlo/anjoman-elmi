import React from "react";
import {
  CButton,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { TokenManager } from "src/Identity/Service/TokenManager";
import { useHistory } from "react-router-dom";

const TheHeaderDropdown = () => {
  const { ResetToken, GetName } = TokenManager();
  const history = useHistory();

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={"avatars/bamislogo.png"}
            className="c-avatar-img"
            alt="avatar"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong> {GetName()} </strong>
        </CDropdownItem>
        <CDropdownItem>
          <CButton
            onClick={() => {
              ResetToken();
              history.push("/Login");
            }}
          >
            <CIcon name="cil-lock-locked" className="mfe-2" />
            خروج
          </CButton>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
