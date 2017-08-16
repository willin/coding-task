<template>
  <div>
    <vchart ratio="ct-major-second" :type="type" :data="data" :options="options"></vchart>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import vchart from 'vchart';

export default {
  components: {
    vchart
  },
  data() {
    return {
      data: {
        labels: ['周一', '周二', '周三', '周四', '周五'],
        series: [[4, 3.8, 3, 5, 4.1]]
      },
      type: 'Line',
      options: {
        fullWidth: true,
        lineSmooth: false
      }
    };
  },
  computed: {
    ...mapGetters([
      'tasksDone',
      'tasksUndone'
    ])
  }
};
</script>

<style lang="stylus">
@import '~chartist/dist/chartist.css'
</style>
