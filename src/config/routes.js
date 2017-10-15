import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  MainContainer,
  HomeContainer,
  AuthenticateContainer
} from "containers";

const routes = (
  <BrowserRouter>
    <MainContainer>
      <Switch>
        <Route path="/auth" component={AuthenticateContainer} />
        <Route component={HomeContainer} />
      </Switch>
    </MainContainer>
  </BrowserRouter>
);

export default routes;
