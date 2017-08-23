<template>
  <div>
    <v-container>
      <tasks :list="data"></tasks>
    </v-container>
    <v-navigation-drawer class="grey lighten-4 pb-0" permanent fixed height="100%" light clipped right>
      <v-card>
        <v-switch label="显示已完成" v-model="showDone"></v-switch>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import tasks from './tasks.vue';

export default {
  data() {
    return {
      showDone: true
    };
  },
  components: {
    tasks
  },
  computed: {
    ...mapGetters([
      'tasks',
      'tasksUndone'
    ]),
    data() {
      if (this.showDone) {
        return this.tasks;
      }
      return this.tasksUndone;
    }
  }
};
</script>
