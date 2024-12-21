import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk } from "redux-thunk";

const initialUserState = {
  user: null,
  loading: true,
};
function userReducer(state = initialUserState, action) {
  switch (action.type) {
    case "USER_LOADING":
      return { ...state, loading: true };
    case "USER_LOADED":
      return { ...state, user: action.payload, loading: false };
    case "USER_LOGOUT":
      return { ...state, user: null, loading: false };
    default:
      return state;
  }
}

const initialNotesState = {
  notes: [],
  loading: true,
};
function notesReducer(state = initialNotesState, action) {
  switch (action.type) {
    case "NOTES_LOADING":
      return { ...state, loading: true };
    case "NOTES_LOADED":
      return { ...state, notes: action.payload, loading: false };
    case "NOTE_ADDED":
      return { ...state, notes: [...state.notes, action.payload] };
    case "NOTE_UPDATED":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        ),
      };
    case "NOTE_DELETED":
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user: userReducer,
  notes: notesReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
