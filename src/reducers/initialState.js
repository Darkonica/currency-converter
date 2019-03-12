import { VisibilityFilters } from "../actions/actionTypes";

export default {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: [
    {
      id: 1,
      text: "buy some milk",
      completed: false,
    },
    {
      id: 2,
      text: "buy some bread",
      completed: false,
    },
  ],
};
