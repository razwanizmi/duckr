import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MainContainer, HomeContainer } from "containers";

const routes = (
  <BrowserRouter>
    <MainContainer>
      <Switch>
        <Route component={HomeContainer} />
      </Switch>
    </MainContainer>
  </BrowserRouter>
);

export default routes;
