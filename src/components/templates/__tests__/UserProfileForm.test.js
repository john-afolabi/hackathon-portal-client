import React from "react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { render, cleanup } from "@testing-library/react";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom/extend-expect";
import UserProfileForm from "../UserProfileForm";
import { initialState } from "../../../utils/mockData";

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
        <UserProfileForm initialState={initialState} />
      </Provider>
    </Router>
  );
});


describe("Renders Without Crashing", () => {
  it("Renders Without Crashing.", () => {
    expect(jestFeatures).toMatchSnapshot();
  });
  it("should be displaying the label text node for the Heading Edit Profile", () => {
    let mainHeader = () => jestFeatures.getByText("Edit Profile");
    expect(mainHeader()).toBeInTheDocument();
  });
});