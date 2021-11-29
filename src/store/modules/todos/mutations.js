import { mulation_types } from "./mutation_types";
export const mutations = {
  [mulation_types.NEW_TASK]: (state, task) => state.tasks.unshift(task),
  [mulation_types.REMOVE_TASK]: (state, id) =>
    (state.tasks = state.tasks.filter((task) => task.id !== id)),
  [mulation_types.UPDATE_TASK]: (state, newTask) => {
    const index = state.tasks.findIndex((task) => task.id === newTask.id);
    if (index !== -1) {
      state.tasks.splice(index, 1, newTask);
    }
    state.selectTask = null;
  },
  [mulation_types.SELECT_TASK]: (state, task) => (state.selectTask = task),
};
