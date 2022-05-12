import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#0ad9e5",
      darker: "#053e85",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SnackbarProvider
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </SnackbarProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
