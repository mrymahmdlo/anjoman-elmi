import React, { useState, useEffect } from "react";
import {
  Typography,
  withStyles,
  createStyles,
  InputBase,
  Button,
  ThemeProvider,
  createTheme,
  jssPreset,
  StylesProvider,
  Hidden,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import { create } from "jss";
import rtl from "jss-rtl";
import ToFarsiNumber from "../componenets/common-components/Converter";
import NumberCreator from "../componenets/common-components/NumberCreator";
import PersonIcon from "@material-ui/icons/Person";
import { useParams } from "react-router";
import SearchIcon from "@material-ui/icons/Search";
import './ProjectsPage.css';

const base = "http://charity.mykanoon.ir/api";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const StyledInput = withStyles(() =>
  createStyles({
    root: {},
    input: {
      borderRadius: 0,
      position: "relative",
      backgroundColor: "#fff",
      border: "1px solid #fff",
      fontSize: 12,
      padding: "12px 17px",
      "&:focus": {
        backgroundColor: "#fff",
        border: `1px solid #fff !important`,
      },
    },
  })
)(InputBase);

const ProjectComponent = ({
  imgSrc,
  title,
  philanthropist,
  cityName,
  fund,
  id,
  typeId,
}) => {

  return (
    <div className='project-item'>
      <div
        style={{
          backgroundColor: "#f6f6f6",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={imgSrc}
          alt="projectPic"
          style={{
            height: 260,
            maxHeight: "60%",
            minHeight: "60%",
            maxWidth: "100%",
          }}
        />
      </div>
      <div className="description">
        <Link
          to={
            typeId === 1
              ? `/HalfBuilt/${id}`
              : typeId === 2
              ? `/Overhauled/${id}`
              : typeId === 3
              ? `/Completed/${id}`
              : `/UnderConstruction/${id}`
          }
        >
          <Typography className="title">{title}</Typography>
        </Link>

        <div className="text">{cityName}</div>

        <div className="text">
          <span>بودجه : </span>
          {ToFarsiNumber(NumberCreator(fund))}
          <span> تومان</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
          className="text"
        >
          {`${philanthropist.firstName} ${
            philanthropist.lastName ? philanthropist.lastName : ""
          }`}
          <PersonIcon style={{ color: "#000" }} fontSize="small" />
        </div>
      </div>
    </div>
  );
};

export default function AllProjects() {
  const [data, setData] = useState();
  useEffect(() => {
    fetch(base + "/Tehran/ProjectGroup")
      .then((response) =>
        response.json().then((response) => setData(response.projects))
      )
      .catch((err) => console.log(err));
  }, []);

  const theme = createTheme({
    direction: "rtl",
  });

  const { status } = useParams();
  let temp = data;
  let type;
  status === "half-built"
    ? (type = 1)
    : status === "overhauled"
    ? (type = 2)
    : status === "under-construction"
    ? (type = 3)
    : (type = 4);
  temp = temp?.filter((item) => item?.typeId === type);
  let projectsCount = [0, 0, 0, 0];
  data?.map((item) =>
    item.typeId === 1
      ? (projectsCount[0] += 1)
      : item.typeId === 2
      ? (projectsCount[1] += 1)
      : item.typeId === 4
      ? (projectsCount[2] += 1)
      : (projectsCount[3] += 1)
  );

  const pageTitles=['مقالات','اطلاعیه ها','بایگانی'];
  const title=pageTitles[type-1];

  return (
    <>
      <h1 className='appr-topic'>{title}</h1>
      {data ? (
        <div>
          <Grid
            className='projects-content'
            container
            justifyContent="space-between"
          >
            <Grid item container xs={12} md={7}>
              {temp?.map((item) => (
                <Grid key={item.id} xs={12} item>
                
                </Grid>
              ))}
            </Grid>

            <Hidden mdDown>
              <Grid md={4} item container direction="column">
                <div
                  style={{
                    padding: "30px",
                    backgroundColor: "#f6f6f6",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                      direction: "rtl",
                    }}
                  >
                    <Button
                      style={{
                        backgroundColor: "#6e1010",
                      }}
                    >
                      <SearchIcon style={{ color: "#fff" }} />
                    </Button>
                    <ThemeProvider theme={theme}>
                      <StylesProvider jss={jss}>
                        <StyledInput
                          placeholder="جست و جو"
                          style={{
                            width: "100%",
                          }}
                        />
                      </StylesProvider>
                    </ThemeProvider>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      marginTop: "15px",
                    }}
                  >
                    <Button
                      style={{
                        backgroundColor: "#6e1010",
                        width: "100%",
                        color: "#fff",
                        padding: "10px",
                      }}
                    >
                      جست و جو
                    </Button>
                  </div>
                </div>

                <div className='category'>
                  <Typography className="title">دسته بندی  </Typography>
                  <div className="divider"></div>

                  <Link to="/Projects/half-built" className="item">
                    <Typography>
                       مقالات   ({projectsCount[0]})
                    </Typography>
                    <div className="divider"></div>
                  </Link>
                  <Link to="/Projects/overhauled" className="item">
                    <Typography>
                      اطلاعیه ها    ({projectsCount[1]})
                    </Typography>
                    <div className="divider"></div>
                  </Link>
                  <Link to="/Projects/completed" className="item">
                    <Typography>
                      بایگانی ({projectsCount[2]})
                    </Typography>
                    <div className="divider"></div>
                  </Link>
                 
                </div>
                <div style={{ marginBottom: "2em" }}></div>
              </Grid>
            </Hidden>
          </Grid>
        </div>
      ) : (
        <CircularProgress style={{ marginTop: "10vh" }} />
      )}
    </>
  );
}
