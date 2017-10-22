import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  MainContainer,
  HomeContainer,
  AuthenticateContainer,
  FeedContainer,
  LogoutContainer,
  UserContainer,
  DuckDetailsContainer
} from "containers";

const getRoutes = checkAuth => (
  <BrowserRouter>
    <MainContainer>
      <Switch>
        <Route path="/auth" component={checkAuth(AuthenticateContainer)} />
        <Route path="/feed" component={checkAuth(FeedContainer)} />
        <Route path="/logout" component={LogoutContainer} />
        <Route
          path="/duckDetail/:duckId"
          component={checkAuth(DuckDetailsContainer)}
        />
        <Route path="/:uid" component={checkAuth(UserContainer)} />
        <Route component={checkAuth(HomeContainer)} />
      </Switch>
    </MainContainer>
  </BrowserRouter>
);

export default getRoutes;
