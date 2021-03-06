import React from "react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { render, fireEvent, cleanup } from "@testing-library/react";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom/extend-expect";
import AddParticipantTeam from "../AddParticipantTeams";
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

beforeEach(() => {
  mockStore = configureStore();
  store = mockStore(initialState);
  component = render(
    <Router history={history}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AddParticipantTeam />
        </ThemeProvider>
      </Provider>
    </Router>
  );
});

describe("Shows all the text nodes on AddParticipantTeam.js that are contained on the making an event form", () => {
  it("should be displaying the <H3>", () => {
    let mainHeader = () => component.getByText("Add Teammates");
    expect(mainHeader()).toBeInTheDocument();
  });
  it("The text node 'Back to event' is rendering", () => {
    expect(component.getByText(/Back to event/i)).toBeInTheDocument();
  });
  it("asserts that the component renders properly", () => {
    expect(component).toMatchSnapshot();
  });
});
