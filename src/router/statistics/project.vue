<template>
  <v-layout row wrap>
    <template v-for="project in projects">
      <v-flex xs6 :key="project.id">
        <v-card>
          <v-card-title class="primary white--text">{{ project.name }}</v-card-title>
          <v-card-text>
            <ul>
              <li>
                任务数: {{ tasks.filter(x=>x.project_id === project.id).length }}
              </li>
              <li>
                已完成任务数: {{ tasks.filter(x=>x.project_id === project.id && x.status === 2).length }}
              </li>
              <li>
                未完成任务数: {{ tasks.filter(x=>x.project_id === project.id && x.status === 1).length }}
              </li>
              <li>
                剩余重要且紧急任务: {{ tasks.filter(x=>x.project_id === project.id && x.status === 1 && x.priority === 3).length }}
              </li>
              <li>
                剩余重要不紧急任务: {{ tasks.filter(x=>x.project_id === project.id && x.status === 1 && x.priority === 2).length }}
              </li>
              <li>
                剩余紧急不重要任务: {{ tasks.filter(x=>x.project_id === project.id && x.status === 1 && x.priority === 1).length }}
              </li>
              <li>
                剩余不紧急不重要任务: {{ tasks.filter(x=>x.project_id === project.id && x.status === 1 && x.priority === 0).length }}
              </li>
              <li>
                标签数: {{ labels.filter(x=>x.project_id === project.id).length }}
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-flex>
    </template>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['params'],
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'projects',
      'tasks',
      'labels'
    ])
  }
};
</script>
