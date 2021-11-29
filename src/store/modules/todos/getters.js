import { taskStatus } from "../../../commons/constants";
export const getters = {
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
