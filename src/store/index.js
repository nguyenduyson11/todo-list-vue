import Vuex from "vuex";
import Vue from "vue";
import index from "./modules/todos/index";

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    todos: index,
  },
});
