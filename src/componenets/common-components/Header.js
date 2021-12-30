import { React } from "react";
import "./Header.css";
import {Hidden} from "@material-ui/core";
import NavBar from "./NavBar";
import AppBarMenu from "./AppBar";

export default function Header() {

  function ChangeHeader() {
    return(
      <>
      <Hidden mdUp>
        <AppBarMenu />
      </Hidden>
      <Hidden lgUp>
        <NavBar/>
      </Hidden>
      <Hidden mdDown>
        <NavBar />
      </Hidden>
      </>
    )
  }

  return <>{ChangeHeader()}</>;
}
