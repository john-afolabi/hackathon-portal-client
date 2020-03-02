import React from "react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { render, fireEvent, cleanup } from "@testing-library/react";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom/extend-expect";
import HackathonSingleProject from "../HackathonSingleProject";
import { initialState } from "../../../utils/mockData";

const history = createMemoryHistory();

afterEach(cleanup);

let mockStore;
let store;
let component;

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

  component = render(
    <Router history={history}>
      <Provider store={store}>
        <HackathonSingleProject />
      </Provider>
    </Router>
  );
});

describe("Component HackathonSingleProject.js renders properly", () => {
  it("asserts that the component renders properly", () => {
    expect(component).toMatchSnapshot();
  });

  it("asserts the project writeup is rendered", () => {
    expect(component.queryByText(/Project writeup/i)).toBeInTheDocument();
  });

  it("asserts the a feedback is rendered", () => {
    expect(component.queryByText(/Feedback/i)).toBeInTheDocument();
  });
});