import { taskStatus } from "../../commons/constants";
const state = {
  selectTask: null,
  errors: [],
  inputTask: "",
  filter: "",
  tasks: [
    { id: 1, name: "Learn Javascript", status: "active" },
    {
      id: 2,
      name: "Learn Vuejs",
      status: "active",
    },
    {
      id: 3,
      name: "Learn Vuejs",
      status: "completed",
    },
  ],
};

const getters = {
  getAllTasks: (state) => state.tasks,
  getProgressTasks: (state) => {
    const countTask = state.tasks.length;
    const TasksCompleted = state.tasks.filter(
      (task) => task.status === taskStatus.completed
    );
    return {
      countTask,
      countTaskCompleted: TasksCompleted.length,
    };
  },
  getCountTasks: (state) => state.tasks.length,
  getSelectTask: (state) => state.selectTask,
};
const actions = {
  addTask({ commit, state }, newTask) {
    commit("newTask", { ...newTask, id: state.tasks.length + 1 });
  },
  deleteTask({ commit }, id) {
    commit("removeTask", id);
  },
  updateTask({ commit }, updateTask) {
    commit("updateTask", updateTask);
  },
  selectTask({ commit }, task) {
    commit("selectTask", task);
  },
};

const mutations = {
  newTask: (state, task) => state.tasks.unshift(task),
  removeTask: (state, id) =>
    (state.tasks = state.tasks.filter((task) => task.id !== id)),
  updateTask: (state, newTask) => {
    const index = state.tasks.findIndex((task) => task.id === newTask.id);
    if (index !== -1) {
      state.tasks.splice(index, 1, newTask);
    }
    state.selectTask = null;
  },
  selectTask: (state, task) => (state.selectTask = task),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
