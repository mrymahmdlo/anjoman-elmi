import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { ThemeProvider } from "styled-components";

export default function Project({ id, path, theme, project }) {

  return (
    <ThemeProvider theme={theme}>
      <Card className='project-root'>
        <Link to={`/${path}/${id}`} style={{ width: "100%" }}>
          <img
            className='project-media'
            alt={project.title}
            src={"http://charity.mykanoon.ir/File/Get/" + project.imageIds[0]}
          />
          <Typography component="h6" variant="h6">
            {project.title}
          </Typography>
        </Link>
      </Card>
    </ThemeProvider>
  );
}
