import React from "react";
import ReactDOMServer from 'react-dom/server';
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import "../public/css/tailwind.css";
import "../public/css/index.css";


export function render() {
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>

  );
}
