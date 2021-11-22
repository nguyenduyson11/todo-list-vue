<template lang="">
  <div class="progress" :style="`width: ${cacularProgressBar}px`">
  </div>
</template>
<script>
export default {
  name: 'ProgressBar',
  props: {
    progress: Object
  },
  computed: {
    cacularProgressBar(){
      return (500 / this.progress.countTask) * this.progress.countTaskCompleted;
    }
  }
}
</script>
<style >
  .progress{
  height: 10px;
  background-color: green;
  margin-bottom: 15px;
  }
</style>