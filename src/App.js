import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import "./assets/style/Fonts.css";
require("dotenv").config();

const App = () => (
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);

export default App;
