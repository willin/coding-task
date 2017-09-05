<template>
  <v-chip label small :class="{pink: this.exceed, 'white--text': this.exceed}">
    {{timetogo}}
  </v-chip>
</template>

<script>
import moment from './moment';

export default {
  props: {
    time: Number
  },
  computed: {
    exceed() {
      return new Date().getTime() > this.time;
    },
    timetogo() {
      const time = moment(this.time);
      const diff = Math.floor(time.diff(moment(), 'days', true));
      switch (diff) {
        case -1: return '昨天';
        case 0: return '今天';
        case 1: return '明天';
        case 2: return '后天';
        default: {
          const startOfPrevWeek = moment().startOf('week').subtract(1, 'w');
          const endOfPrevWeek = moment().startOf('week');
          const startOfNextWeek = moment().endOf('week');
          const endOfNextWeek = moment().endOf('week').add(1, 'w');
          if (time.isBetween(startOfPrevWeek, endOfPrevWeek)) {
            return time.format('上ddd');
          }
          if (time.isBetween(endOfPrevWeek, startOfNextWeek)) {
            return time.format('ddd');
          }
          if (time.isBetween(startOfNextWeek, endOfNextWeek)) {
            return time.format('下ddd');
          }
          return time.format('YYYY-MM-DD');
        }
      }
    }
  }
};
</script>
