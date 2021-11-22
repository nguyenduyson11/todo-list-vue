<template>
  <div id="app">
    <h1 class="title">TODOS</h1>
    <label v-if="errors.length > 0" >{{errors[0]}}</label>
    <div class="input-task">
      <input @keyup.enter="addTask" v-model.trim="inputTask" required />
    </div>
    <div class="container">
      <ProgressBar :progress="getProgress()" />
      <div class="task-header">
        <span class="task-header-left">{{ countTask }}</span>
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
        <ListTask
          :tasks="filterTaskByStatus()"
          :handleRemoveTask="handleRemoveTask"
          :handleEditTask="handleEditTask"
          :handleUpdateStatus="handleUpdateStatus"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ListTask from "./components/ListTask.vue";
import ProgressBar from "./components/ProgressBar.vue";
import { taskStatus } from "./commons/constants.js";
export default {
  name: "App",
  data() {
    return {
      selectTask: null,
      errors:[],
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
  },
  methods: {
    addTask() {
      if(!this.inputTask){
        this.errors.push('Vui lòng nhập giá trị')
        return;
      }
      if (this.selectTask) {
        this.editTask();
      } else {
        this.tasks = [
          ...this.tasks,
          {
            id: this.tasks.length + 1,
            name: this.inputTask,
            status: "active",
          },
        ];
        this.inputTask = "";
      }
    },
    getProgress() {
      const countTask = this.tasks.length;
      const TasksCompleted = this.tasks.filter(
        (task) => task.status === taskStatus.completed
      );
      return {
        countTask,
        countTaskCompleted: TasksCompleted.length,
      };
    },
    handleRemoveTask({ id }) {
      const listTasks = this.tasks;
      const isExistTask = listTasks.findIndex((task) => task.id === id);
      listTasks.splice(isExistTask, 1);
    },
    handleEditTask(task) {
      this.selectTask = task;
      this.inputTask = task.name;
    },
    editTask() {
      const tasks = this.tasks
      const isExistTask = tasks.findIndex((task) => task.id === this.selectTask.id);
      tasks.splice(isExistTask, 1, {...this.selectTask, name: this.inputTask});
      this.selectTask = null;
      this.inputTask= '';
    },
    filterTaskByStatus() {
      if (!this.filter) {
        return this.tasks;
      }
      return this.tasks.filter((task) => task.status === this.filter);
    },
    setFilter(event) {
      this.filter = event.target.getAttribute("value");
    },
    handleUpdateStatus({taskChecked, status}){
       const listTasks = this.tasks;
      const isExistTask = listTasks.findIndex((task) => task.id === taskChecked.id);
      console.log(isExistTask)
      listTasks.splice(isExistTask, 1, {...taskChecked, status});
    }
  },
  computed: {
    countTask() {
      return `${this.tasks.length} item left`;
    },
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
