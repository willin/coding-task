<template>
  <div>
    <vchart ratio="ct-major-second" :type="tasksPie.type" :data="tasksPie.data" :options="tasksPie.options"></vchart>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import vchart from 'vchart';

export default {
  components: {
    vchart
  },
  computed: {
    ...mapGetters([
      'tasks',
      'tasksDone',
      'tasksUndone'
    ]),
    tasksPie() {
      return {
        data: {
          labels: ['已完成', '未完成'],
          series: [this.tasksDone.length, this.tasksUndone.length]
        },
        type: 'Pie',
        options: {
          fullWidth: true,
          lineSmooth: false,
          labelInterpolationFnc: val => val
        }
      };
    }
  },
  data() {
    return {

    };
  }
};
</script>

<style lang="stylus">
@import '~chartist/dist/chartist.css'
</style>
