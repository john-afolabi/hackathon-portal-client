import React from "react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { render, cleanup } from "@testing-library/react";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom/extend-expect";
import { initialState } from "../../../utils/mockData";
import { ParticipantInviteWidget, TeamRoleWidget } from "../widgets";

const history = createMemoryHistory();

afterEach(cleanup);

let jestFeatures;
let mockStore;
let store;

beforeEach(() => {
  mockStore = configureStore();
  store = mockStore(initialState);
  jestFeatures = render(
    <Router history={history}>
      <Provider store={store}>
        <ParticipantInviteWidget />
        <TeamRoleWidget />
      </Provider>
    </Router>
  );
});

describe("Component participantinvitewidget renders the text correctly", () => {
  it("the h6 tag within the component is rendering properly", () => {
    expect(jestFeatures.queryByText(/This user/i)).toBeInTheDocument();
  });
  it("renders without crashing ", () => {
    expect(jestFeatures).toMatchSnapshot();
  });
});

describe("Component TeamRoleWidget renders the text correctly", () => {
  it("the button within the component is rendering properly", () => {
    expect(jestFeatures.queryByText(/Back/i)).toBeInTheDocument();
  });
});