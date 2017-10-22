import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  MainContainer,
  HomeContainer,
  AuthenticateContainer,
  FeedContainer,
  LogoutContainer,
  UserContainer
} from "containers";

const getRoutes = checkAuth => (
  <BrowserRouter>
    <MainContainer>
      <Switch>
        <Route exact path="/" component={checkAuth(HomeContainer)} />
        <Route path="/auth" component={checkAuth(AuthenticateContainer)} />
        <Route path="/feed" component={checkAuth(FeedContainer)} />
        <Route path="/logout" component={LogoutContainer} />
        <Route path="/:uid" component={UserContainer} />
      </Switch>
    </MainContainer>
  </BrowserRouter>
);

export default getRoutes;
