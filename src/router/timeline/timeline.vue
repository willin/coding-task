<template>
  <div>
    <tasks :list="data"></tasks>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import tasks from './tasks.vue';

export default {
  data() {
    return {};
  },
  components: {
    tasks
  },
  computed: {
    ...mapGetters([
      'tasks'
    ]),
    data() {
      return this.tasks;
    }
  }
};
</script>
