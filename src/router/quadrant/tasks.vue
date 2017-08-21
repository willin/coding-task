<template>
  <v-list two-line>
    <template v-for="task in tasks">
      <v-list-tile avatar v-bind:key="task.content">
        <v-list-tile-avatar>
          <img v-bind:src=" task.owner.avatar.startsWith('/') ? `https://coding.net${task.owner.avatar}` : task.owner.avatar" />
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>
            <span class='grey--text text--darken-2'>{{task.owner.name}} - </span>
            {{task.content}}
          </v-list-tile-title>
          <v-list-tile-sub-title>
            <v-chip small label>{{task.project.name}}</v-chip>
            <timetogo v-if="task.deadline" :time="task.deadline"></timetogo>
            <v-chip small label v-if="task.has_description || task.comments">
              <v-icon v-if="task.has_description">info_outline</v-icon>
              <span v-if="task.has_description">有描述 &nbsp;</span>
              <v-icon v-if="task.comments">chat_bubble_outline</v-icon>
              <span v-if="task.comments">{{task.comments}}</span>
            </v-chip>
            <template v-for="label in task.labels">
              <v-chip v-text="label.name" v-bind:style="{color: label.color, borderColor: label.color}" v-bind:key="label.id" outline small></v-chip>
            </template>
          </v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>#{{task.number}}</v-list-tile-action>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex';
import timetogo from '../../component/timetogo.vue';

export default {
  props: ['list'],
  name: 'tasks',
  components: {
    timetogo
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      'users',
      'projects',
      'labels',
      'tasklabels'
    ]),
    tasks() {
      return this.list.map((task) => {
        /* eslint-disable no-param-reassign */
        task.owner = this.users.find(x => x.id === task.owner_id);
        task.labels = this.tasklabels.filter(x => x.task_id === task.id).map(x => this.labels.find(y => y.id === x.label_id));
        task.project = this.projects.find(x => x.id === task.project_id);
        return task;
      });
    }
  }
};
</script>
