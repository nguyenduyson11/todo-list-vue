<template>
  <div id="app">
    <h1 class="title">TODOS</h1>
    <label v-if="errors.length > 0">{{ errors[0] }}</label>
    <div class="input-task">
      <input @keyup.enter="addNewTask" v-model.trim="inputTask" />
    </div>
    <div class="container">
      <ProgressBar :progress="getProgressTasks" />
      <div class="task-header">
        <span class="task-header-left">{{ getCountTasks }}</span>
        <div class="task-header-right">
          <span
            @click="setFilter"
            value=""
            :class="`filter-item ${filter === '' && 'active-item'}`"
            >ALL</span
          >
          <span
            @click="setFilter"
            value="active"
            :class="`filter-item ${filter === 'active' && 'active-item'}`"
            >ACTIVE</span
          >
          <span
            @click="setFilter"
            value="completed"
            :class="`filter-item ${filter === 'completed' && 'active-item'}`"
            >COMPLETED</span
          >
        </div>
      </div>
      <div class="task-body">
        <ListTask :tasks="filterTask()" :handleEditTask="handleEditTask" />
      </div>
    </div>
  </div>
</template>

<script>
import ListTask from "./components/ListTask.vue";
import ProgressBar from "./components/ProgressBar.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "App",
  data() {
    return {
      errors: [],
      inputTask: "",
      filter: "",
    };
  },
  methods: {
    ...mapActions(["addTask", "updateTask", "selectTask"]),
    addNewTask() {
      if (!this.inputTask) {
        this.errors.push("Vui lòng nhập giá trị");
        return;
      }
      if (this.getSelectTask) {
        this.updateTask({
          ...this.getSelectTask,
          name: this.inputTask,
        });
      } else {
        this.addTask({
          name: this.inputTask,
          status: "active",
        });
      }
      this.inputTask = "";
      this.selectTask(null);
      this.errors = [];
    },
    setFilter(event) {
      const status = event.target.getAttribute("value");
      if (status === this.filter) {
        this.filter = "";
      } else {
        this.filter = status;
      }
    },
    filterTask() {
      const tasks = this.getAllTasks;
      if (!this.filter) {
        return tasks;
      }
      return tasks.filter((task) => task.status === this.filter);
    },
    handleEditTask() {
      this.inputTask = this.getSelectTask.name;
    },
  },
  computed: {
    ...mapGetters([
      "getAllTasks",
      "getProgressTasks",
      "getCountTasks",
      "getSelectTask",
    ]),
  },
  components: {
    ListTask,
    ProgressBar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 500px;
  margin: auto;
  background-color: #f1f1f1;
  padding: 15px;
}
.container {
  background-color: white;
}
.title {
  color: green;
  margin-bottom: 20px;
}
.input-task {
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
}
.input-task > input {
  padding: 10px 20px;
  width: 100%;
  display: block;
  border: 1px solid #f1f1f1;
}
.task-header {
  display: flex;
  padding: 5px 10px;
  border-bottom: 1px solid #f1f1;
}
.task-body {
  padding: 5px 10px;
}
.task-header-left {
  flex: 0.3;
  text-align: left;
}
.task-header-right {
  flex: 0.7;
  text-align: right;
}
.filter-item {
  color: green;
  margin-right: 10px;
  opacity: 0.2;
  padding: 5px;
  cursor: pointer;
}
.active-item {
  opacity: 1;
  background-color: #e2fff1;
}
</style>
