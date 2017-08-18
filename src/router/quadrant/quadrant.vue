<template>
  <div class="flex">
    <div class="box">
      <v-card>
        <v-toolbar class="pink lighten-2" dark dense>
          <v-toolbar-title>重要且紧急</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-icon class="coding icon important"></v-icon>
          <v-icon class="coding icon important"></v-icon>
          <v-icon class="coding icon important"></v-icon>
        </v-toolbar>
        <tasks :list="tasksp3"></tasks>
      </v-card>
    </div>
    <div class="box">
      <v-card>
        <v-toolbar class="blue lighten-1" dark dense>
          <v-toolbar-title>重要不紧急</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-icon class="coding icon important"></v-icon>
          <v-icon class="coding icon important"></v-icon>
          <v-icon class="coding icon"></v-icon>
        </v-toolbar>
        <tasks :list="tasksp2"></tasks>
      </v-card>
    </div>
    <div class="box">
      <v-card>
        <v-toolbar class="yellow darken-2" dark dense>
          <v-toolbar-title>紧急不重要</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-icon class="coding icon important"></v-icon>
          <v-icon class="coding icon"></v-icon>
          <v-icon class="coding icon"></v-icon>
        </v-toolbar>
        <tasks :list="tasksp1"></tasks>
      </v-card>
    </div>
    <div class="box">
      <v-card>
        <v-toolbar class="light-green lighten-3" dark dense>
          <v-toolbar-title>不紧急不重要</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-icon class="coding icon"></v-icon>
          <v-icon class="coding icon"></v-icon>
          <v-icon class="coding icon"></v-icon>
        </v-toolbar>
        <tasks :list="tasksp0"></tasks>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import tasks from './tasks.vue';

export default {
  data() {
    return {

    };
  },
  components: {
    tasks
  },
  computed: {
    ...mapGetters([
      'tasksUndone'
    ]),
    tasksp3() {
      return this.tasksUndone.where({ priority: 3 });
    },
    tasksp2() {
      return this.tasksUndone.where({ priority: 2 });
    },
    tasksp1() {
      return this.tasksUndone.where({ priority: 1 });
    },
    tasksp0() {
      return this.tasksUndone.where({ priority: 0 });
    }
  }
};
</script>

<style lang="stylus" scoped>
.flex
  height calc(100vh - 74px)
  display flex
  flex-flow column wrap
  justify-content space-around
  align-content space-around
  align-items center

.box
  width 49%
  height 49%
  overflow-y hidden
  > div
    height 100% !important
    > ul
      height calc(100% - 48px)
      overflow-y scroll

@media only screen and (max-width: 768px)
  .flex
    height auto;
  .box
    height calc(100vh - 74px)
    width 100%
</style>
