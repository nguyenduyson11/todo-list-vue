<template lang="">
  <div>
    <Task v-for="task in tasks" :key="task.id" :task="task"  :editTask="editTask"  />
  </div>
</template>
<script>
import Task from "./Task.vue";
export default {
  name: "ListTask",
  props: {
    tasks: Array,
    handleEditTask: Function,
  },
  components: {
    Task,
  },
  methods: {
    editTask(task) {
      this.handleEditTask(task);
    },
  },
};
</script>
<style lang="scss">
</style>