import React from "react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { render, cleanup } from "@testing-library/react";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom/extend-expect";
import TeamView from "../TeamView";
import { initialState } from "../../../utils/mockData";
import { theme } from "../../../assets/styles/ThemeStyling";
import { ThemeProvider } from "styled-components";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas, far, fab);


const history = createMemoryHistory();

afterEach(cleanup);

let component;
let mockStore;
let store;
let teamData;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => ({
    id: 1
  }),
  useRouteMatch: () => ({ url: "/dashboard/event/:id" })
}));

beforeEach(() => {
  mockStore = configureStore();
  store = mockStore(initialState);
  teamData = initialState.teams[0];
  component = render(
    <Router history={history}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <TeamView team={teamData} />
        </ThemeProvider>
      </Provider>
    </Router>
  );
});

describe("TeamView.js", () => {
  it("renders the component correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("the span subtitle within the component is rendering properly", () => {
    expect(component.queryByText(/Your Team/i)).toBeInTheDocument();
  });

  it("the component renders the correct event title", () => {
    expect(component.queryByText(/The A team/i)).toBeInTheDocument();
  });

  it("the component render the right conditional - team members", () => {
    expect(
      component.queryByText(/This team has no members/i)
    ).toBeInTheDocument();
  });
  
  it("the component render the correct text node -> team members", () => {
    expect(
      component.queryByText(/Team Members:/i)
    ).toBeInTheDocument();
  });
});
