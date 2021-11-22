<template lang="">
  <div class="task">
    <div class="task-left">
      <input type="checkbox" :checked="isChecked" v-model="checkedTask" @change="handleUpdateStatusTask" />
      <label :class="isChecked && 'task-completed-color'" @click="handleEditTask"> {{task.name}}</label>
    </div>
    <div class="task-right">
      <span @click="handleRemoveTask">xóa</span>
    </div>
  </div>
</template>
<script>
import {taskStatus} from '../commons/constants.js'
export default {
  name: "Task",
  data(){
    return {
      checkedTask: this.task.status === taskStatus.completed,
    }
  },
  props: {
    task: Object,
    removeTask: Function,
    editTask: Function,
    updateStatus: Function
  },
  methods: {
    handleRemoveTask(){
      this.removeTask(this.task)
    },
    handleEditTask(){
      this.editTask(this.task)
    },
    handleUpdateStatusTask(){
      this.updateStatus({task: this.task, status: this.checkedTask ? taskStatus.completed : taskStatus.active})
    }
  }
  ,computed:{
    isChecked(){
      return this.task.status === taskStatus.completed
    }
  }
};
</script>
<style>
.task {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f1f1f1;
  padding: 10px 0; 
}
.task-left {
  flex: 0.7;
  text-align: left;
}
.task-completed-color{
  color: green;
}
.task-right {
  flex: 0.3;
  text-align: right;
}
.task-right > span{
  padding: 5px;
  cursor: pointer;
  color: red;
}
</style>
