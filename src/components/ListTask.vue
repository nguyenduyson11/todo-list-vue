<template lang="">
  <div>
    <Task v-for="task in tasks" :key="task.id" :task="task" :removeTask="removeTask" :editTask="editTask" :updateStatus="updateStatus" />
  </div>
</template>
<script>
import Task from "./Task.vue";
export default {
  name: "ListTask",
  props: {
    tasks: Array,
    handleRemoveTask: Function,
    handleEditTask: Function,
    handleUpdateStatus: Function,
  },
  components: {
    Task,
  },
  methods: {
    removeTask(task) {
      this.handleRemoveTask(task);
    },
    editTask(task) {
      this.handleEditTask(task);
    },
    updateStatus({ task, status }) {
      this.handleUpdateStatus({ taskChecked: task, status });
    },
  },
};
</script>
<style lang="scss">
</style>