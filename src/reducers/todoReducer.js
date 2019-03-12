import initialState from "./initialState";
import {
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  COMPLETE_TODO,
} from "../actions/actionTypes";

export default function todos(state = initialState.todos, action) {
  let todos;
  switch (action.type) {
    case ADD_TODO:
      console.log("ADD_TODO action");
      const id = state.length ? state[state.length - 1].id + 1 : 1;

      return [...state, { id, text: action.text, completed: false }];

    case EDIT_TODO:
      console.log("EDIT_TODO action");
      todos = state.map(todo => {
        if (todo.id === action.id) todo.text = action.text;
        return todo;
      });

      return [...todos];

    case DELETE_TODO:
      console.log("DELETE_TODO action", action.id);

      todos = state.filter(todo => todo.id !== action.id);

      return [...todos];

    case COMPLETE_TODO:
      console.log("COMPLETE_TODO action");

      todos = state.map(todo => {
        if (todo.id === action.id) todo.completed = !todo.completed;
        return todo;
      });

      return [...todos];

    default:
      return state;
  }
}
