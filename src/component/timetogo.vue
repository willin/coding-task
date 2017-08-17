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
      return moment(this.time).calendar(null, {
        sameDay: '[今天]',
        nextDay: '[明天]',
        nextWeek: '[下]ddd',
        lastDay: '[昨天]',
        lastWeek: '[上]ddd',
        sameElse: 'YYYY-MM-DD'
      });
    }
  }
};
</script>
