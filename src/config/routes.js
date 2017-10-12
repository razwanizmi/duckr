import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { MainContainer } from "../containers";

const routes = (
  <BrowserRouter>
    <Route path="/" component={MainContainer} />
  </BrowserRouter>
);

export default routes;
