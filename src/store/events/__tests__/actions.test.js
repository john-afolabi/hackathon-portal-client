import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import * as actions from "../actions";
import * as types from "../actions";
import { initialState } from "../../../utils/mockData";

afterEach(cleanup);

describe("Ensures that the action creators functions are working properly", () => {
  it("should create an action to fetch all events", () => {
    const expectedAction = {
      type: types.EventsTypes.FETCH_ALL_EVENTS
    };

    expect(actions.fetchAllEvents()).toEqual(expectedAction);
  });

  it("should create an action for createEvent", () => {
    let history = "/dashboard/new";
    const expectedAction = {
      payload: initialState.events.data[1],
      history: history,
      type: types.EventsTypes.CREATE_EVENT
    };

    expect(actions.createEvent(initialState.events.data[1], history)).toEqual(
      expectedAction
    );
  });
  it("should create an action for updateEvent", () => {
    let history = "/dashboard/event/1/edit";
    const expectedAction = {
      payload: initialState.events.data[0],
      history: history,
      type: types.EventsTypes.UPDATE_EVENT
    };

    expect(actions.updateEvent(initialState.events.data[0], history)).toEqual(
      expectedAction
    );
  });
  it("should create an action for deleteEvent", () => {
    const expectedAction = {
      payload: initialState.events.data[0].id,
      type: types.EventsTypes.DELETE_EVENT
    };
    expect(actions.deleteEvent(initialState.events.data[0].id)).toEqual(
      expectedAction
    );
  });
  it("should create an action for fetchEventCategories", () => {
    const expectedAction = {
      type: types.EventsTypes.FETCH_EVENT_CATEGORIES
    };
    expect(actions.fetchEventCategories()).toEqual(expectedAction);
  });
  it("should create an action for setEvents", () => {
    let events = initialState.events.data;
    const expectedAction = {
      payload: events,
      type: types.EventsTypes.SET_EVENTS
    };
    expect(actions.setEvents(events)).toEqual(expectedAction);
  });
  it("should create an action for setEventCategories", () => {
    let categories = initialState.events.categories;
    const expectedAction = {
      payload: categories,
      type: types.EventsTypes.SET_EVENT_CATEGORIES
    };
    expect(actions.setEventCategories(categories)).toEqual(expectedAction);
  });
  it("should create an action for addTeamMember", () => {
    let data = initialState.currentUser;
    let history = "/dashboard/event/1/team/";
    const expectedAction = {
      payload: data,
      type: types.EventsTypes.ADD_TEAM_MEMBER,
      history
    };
    expect(actions.addTeamMember(data, history)).toEqual(expectedAction);
  });
  it("should create an action for fetchEventSubmissions", () => {
    let eventId = initialState.events.data[0].id;
    let history = "/dashboard/event/1/projects";
    const expectedAction = {
      payload: eventId,
      type: types.EventsTypes.FETCH_EVENT_SUBMISSIONS,
      history
    };
    expect(actions.fetchEventSubmissions(eventId, history)).toEqual(
      expectedAction
    );
  });
  it("should create an action for sendEventTeamInvite", () => {
    let data = "please join me in this hackathon";
    let history = "/dashboard/event/1/team";
    const expectedAction = {
      payload: data,
      type: types.EventsTypes.SEND_EVENT_TEAM_INVITE,
      history
    };
    expect(actions.sendEventTeamInvite(data, history)).toEqual(expectedAction);
  });
});
