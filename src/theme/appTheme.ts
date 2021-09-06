import { createMuiTheme, Theme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import { green } from "@material-ui/core/colors";

// define light theme colors
export const lightTheme: Theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      light: "#002884",
      main: "#002884",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

// define dark theme colors
export const darkTheme: Theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: green[900],
    },
    secondary: {
      main: blue[900],
    },
  },
});
