import { React, useState } from "react";
import "./Header.css";
import Logo from "../../assets/images/khayerin-logo.png";
import Button from "@material-ui/core/Button";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function NavBar() {
  const StyledMenu = withStyles({
    paper: {
      borderTop: "5px solid #961f1f",
      borderRadius: 0,
      backgroundColor: "rgba(0,0,0,0.6)",
      margin: 0,
      padding: 0,
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...props}
    />
  ));

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl1, setAnchorEl1] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const StyledMenuItem = withStyles(() => ({}))(MenuItem);

  return (
    <>
      <div className="header">
        <div className="content">
          <button className="btn1">
            <span> حساب کاربری </span>
          </button>

          <Link to={`/Philanthropists`} className="link Button">
            <Button style={{ padding: "0 2vw" }} className="button-on-hover">
              <div className="button-overlay" />
              تماس با ما
            </Button>
          </Link>

          <Link to={`/Attend`} className="link Button">
            <Button style={{ padding: "0 2vw" }} className="button-on-hover">
              <div className="button-overlay" />
               عضویت 
            </Button>
          </Link>

         

          <Link to={`/Philanthropists`} className="link Button">
            <Button style={{ padding: "0 2vw" }} className="button-on-hover">
              <div className="button-overlay" />
              فرصت های شغلی
            </Button>
          </Link>

          <StyledMenu
            id="customized-menu1"
            anchorEl={anchorEl1}
            open={Boolean(anchorEl1)}
            onClose={handleClose1}
            style={{ direction: "rtl" }}
          >
            <StyledMenuItem>
              <Link to="/About">
                <ListItemText
                  primary="تاریخچه موسسه"
                  style={{ textAlign: "right", color: "#fff" }}
                />
              </Link>
            </StyledMenuItem>
            <StyledMenuItem>
              <Link to="/Appreciations">
                <ListItemText
                  primary="تقدیرنامه ها"
                  style={{ textAlign: "right", color: "#fff" }}
                />
              </Link>
            </StyledMenuItem>
          </StyledMenu>

          <div className="link Button">
            <Button
              style={{ padding: "0 2vw" }}
              className="button-on-hover"
              aria-controls="customized-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <div className="button-overlay" />
              کنگره ها و کارگاه ها
            </Button>
          </div>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link to="/Projects/half-built">
              <StyledMenuItem>
                <ListItemText
                  primary="مقالات"
                  style={{ textAlign: "right", color: "#fff" }}
                />
              </StyledMenuItem>
            </Link>
            <Link to="/Projects/overhauled">
              <StyledMenuItem>
                <ListItemText
                  primary="اطلاعیه ها"
                  style={{ textAlign: "right", color: "#fff" }}
                />
              </StyledMenuItem>
            </Link>
            <Link to="/Projects/completed">
              <StyledMenuItem>
                <ListItemText
                  primary="بایگانی"
                  style={{ textAlign: "right", color: "#fff" }}
                />
              </StyledMenuItem>
            </Link>
           
          </StyledMenu>

          <div className="link Button">
            <Button
              style={{ padding: "0 2vw" }}
              className="button-on-hover"
              aria-controls="customized-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <div className="button-overlay" />
              اخبار
            </Button>
          </div>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link to="/Projects/half-built">
              <StyledMenuItem>
                <ListItemText
                  primary="مقالات"
                  style={{ textAlign: "right", color: "#fff" }}
                />
              </StyledMenuItem>
            </Link>
            <Link to="/Projects/overhauled">
              <StyledMenuItem>
                <ListItemText
                  primary="اطلاعیه ها"
                  style={{ textAlign: "right", color: "#fff" }}
                />
              </StyledMenuItem>
            </Link>
            <Link to="/Projects/completed">
              <StyledMenuItem>
                <ListItemText
                  primary="بایگانی"
                  style={{ textAlign: "right", color: "#fff" }}
                />
              </StyledMenuItem>
            </Link>
           
          </StyledMenu>

          <div className="link Button">
            <Button style={{ padding: "0 2vw" }} className="button-on-hover">
              <div
                className="button-overlay"
                onClick={handleClick1}
                aria-controls="customized-menu1"
                aria-haspopup="true"
              />
              آشنایی با انجمن
            </Button>
          </div>

          <Link to={`/`} className="link Button">
            <Button style={{ padding: "0 2vw" }} className="button-on-hover">
              <div className="button-overlay" />
              صفحه اصلی
            </Button>
          </Link>
          <Link to={`/`}>
            <img className="media" src={Logo} alt="anjoman logo" />
          </Link>
        </div>
      </div>
    </>
  );
}
