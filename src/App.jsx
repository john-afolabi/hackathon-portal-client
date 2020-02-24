import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import styled, { ThemeProvider } from 'styled-components';

import { GlobalStyles } from "./assets/styles/GlobalStyles";
import { theme } from './assets/styles/Theme';
import { media } from './assets/styles/variables/media';

import UserHeader from './components/organisms/UserHeader';
import { Footer } from './components/organisms/index';
import SideBar from './components/molecules/SideBar';
import SignupPage from "./components/views/SignupPage";
import LoginPage from "./components/views/LoginPage";
import Dashboard from "./components/views/Dashboard";
import HackathonFormPage from "./components/views/HackathonFormPage";
import HackathonSinglePage from "./components/views/HackathonSinglePage";
import HackathonProjectsPage from "./components/views/HackathonProjectsPage";
import HackathonProjectPage from "./components/views/HackathonProjectPage";
import PrivateRoute from "./components/organisms/PrivateRoute";
import EditHackathon from "./components/templates/EditHackathon";
import AddTeammates from "./components/templates/AddTeammates";
import ParticipantSubmissionPage from "./components/views/ParticipantSubmissionPage";
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from "./components/views/PageNotFound";
import UserProfileFormPage from "./components/views/UserProfileFormPage";
import UserProfilePage from "./components/views/UserProfilePage";
import CreateTeam from "./components/templates/CreateTeam";
import AddParticipantTeam from "./components/templates/AddParticipantTeams";
import ResetPassword from './components/views/resetPassword/ResetPassword';
import ResetPasswordConfirmation from './components/views/resetPassword/ResetPasswordConfirmation';
import NewPassword from './components/views/resetPassword/NewPassword';

function App() {
 const renderPrivateRoutesHandler = () => {
   return (
     <>
        {/* <PrivateRoute exact path="/" component={Dashboard} /> */}
        <PrivateRoute
          exact
          path="/dashboard/new"
          component={HackathonFormPage}
        />
        <PrivateRoute
          exact
          path="/dashboard/event/:id/participant_submission"
          component={ParticipantSubmissionPage}
        />
        <PrivateRoute
          exact
          path="/dashboard/event/:id"
          component={HackathonSinglePage}
        />
        <PrivateRoute
          exact
          path="/dashboard/event/:id/edit"
          component={EditHackathon}
        />
        <PrivateRoute
          exact
          path="/dashboard/event/:id/team"
          component={AddTeammates}
        />
        <PrivateRoute
          exact
          path="/dashboard/profile"
          component={UserProfilePage}
        />
        <PrivateRoute
          exact
          path="/dashboard/profile/edit"
          component={UserProfileFormPage}
        />
        <PrivateRoute
          path="/dashboard/event/:id/projects"
          component={HackathonProjectsPage}
        />
        <PrivateRoute
          exact
          path="/dashboard/event/:id/project/:projectId"
          component={HackathonProjectPage}
        />
        <PrivateRoute
          exact
          path="/dashboard/event/:eventId/participant-teams/:teamId"
          component={AddParticipantTeam}
        />
        <PrivateRoute
          exact
          path="/dashboard/event/:id/participant-teams"
          component={CreateTeam}
        />
      </>
   );
 };

  return (
    <>  
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AppContainer>
          <MainContent>
            <UserHeader />
            <RoutesContainer>
              <Switch>
                  <Route exact path="/" component={Dashboard} />
                  <Route exact path="/not-found" component={PageNotFound} />
                  <Route path="/register" component={SignupPage} />
                  <Route exact path="/login" component={LoginPage} />
                  <Route exact path="/forgotpassword" component={ResetPassword} />
                  <Route exact path="/resetPasswordConfirmation" component={ResetPasswordConfirmation} />
                  <Route exact path="/resetpassword" component={NewPassword} />
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                  { renderPrivateRoutesHandler() }
                <Redirect to="/not-found" />
              </Switch>
            </RoutesContainer>
            <Footer />
          </MainContent>
          <SideBar />
        </AppContainer>
        <ToastContainer />
      </ThemeProvider>
    </>
  );
}

export default App;

const AppContainer = styled.main`
  display: flex;
  width: 100vw; height: 100vh;
  overflow: hidden;
`;

const MainContent = styled.div`
  ${props => props.theme.flex.column};
  width: calc(100vw - 300px);

  @media ${media.tablet} {
    width: calc(100vw - 50px);
  }
`;

const RoutesContainer = styled.div`
  ${props => props.theme.shadow.box};
  width: calc(100% - 20px); height: 100%;
  background-color: ${props => props.theme.color.white.regular};
  margin-left: 20px; 
  border-radius: 5px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0px; height: 0;
  }
`;