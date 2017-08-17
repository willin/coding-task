<template>
  <v-chip label small>
    {{timetogo}}
  </v-chip>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    time: Number
  },
  computed: {
    timetogo() {
      return moment(this.time).calendar(null, {
        sameDay: '[今天]',
        nextDay: '[明天]',
        nextWeek: '[下]dddd',
        lastDay: '[昨天]',
        lastWeek: '[上]dddd',
        sameElse: 'YYYY-MM-DD'
      });
    }
  }
};
</script>
