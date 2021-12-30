import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import { create } from "jss";
import rtl from "jss-rtl";

import {
  withStyles,
  createStyles,
  InputBase,
  Hidden,
  createTheme,
  StylesProvider,
  ThemeProvider,
  jssPreset,
  Grid,
} from "@material-ui/core";
const theme = createTheme({
  direction: "rtl",
});
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const StyledInput = withStyles((theme) =>
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

export default function Searchbar() {
  return (
    <Grid md={4} item container direction="column">
      <Hidden mdDown>
        <div
          style={{
            padding: "30px",
            backgroundColor: "#f6f6f6",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            marginTop: "3em",
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
              disabled
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
      </Hidden>
    </Grid>
  );
}
