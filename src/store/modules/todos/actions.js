import { mulation_types } from "./mutation_types";
export const actions = {
  addTask({ commit, state }, newTask) {
    commit(mulation_types.NEW_TASK, { ...newTask, id: state.tasks.length + 1 });
  },
  deleteTask({ commit }, id) {
    commit(mulation_types.REMOVE_TASK, id);
  },
  updateTask({ commit }, updateTask) {
    commit(mulation_types.UPDATE_TASK, updateTask);
  },
  selectTask({ commit }, task) {
    commit(mulation_types.SELECT_TASK, task);
  },
};
