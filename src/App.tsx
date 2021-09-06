import React, { useReducer } from "react";
import {
  createMuiTheme,
  Theme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import Router from "./routes";
import { Helmet } from "react-helmet";
import { LocationProvider } from "@reach/router";

// theme
import { lightTheme, darkTheme } from "./theme/appTheme";

// constants
import { APP_TITLE } from "./utils/constants";
import RootProvider from "./contexts/RootProvider";

// define app context
const AppContext = React.createContext(null);

function App() {
  const [useDefaultTheme] = useReducer((theme) => !theme, true);

  // define custom theme
  let theme: Theme = createMuiTheme(useDefaultTheme ? lightTheme : darkTheme);
  theme = responsiveFontSizes(theme);

  return (
    <LocationProvider>
      <Helmet>
        <title>{APP_TITLE}</title>
      </Helmet>
      <AppContext.Provider value={null}>
        <ThemeProvider theme={theme}>
          <RootProvider>
            <Router />
          </RootProvider>
        </ThemeProvider>
      </AppContext.Provider>
    </LocationProvider>
  );
}

export default App;