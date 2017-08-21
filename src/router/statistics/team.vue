<template>
  <v-layout row wrap>
    <template v-for="team in teams">
      <v-flex xs12 :key="team.id">
        <v-card>
          <v-card-title class="primary white--text">{{ team.name }}</v-card-title>
          <v-card-text>
            <ul>
              <li>
                项目数: {{ team.project_count }}
              </li>
              <li>
                成员数: {{ team.member_count }}
              </li>
              <li>
                任务数: {{ tasks.filter(y=>projects.filter(x=>x.owner_user_name===team.global_key).map(x=>x.id).includes(y.project_id)).length }}
              </li>
              <li>
                已完成任务数: {{ tasks.filter(y=>projects.filter(x=>x.owner_user_name===team.global_key).map(x=>x.id).includes(y.project_id) && y.status===2 ).length }}
              </li>
              <li>
                未完成任务数: {{ tasks.filter(y=>projects.filter(x=>x.owner_user_name===team.global_key).map(x=>x.id).includes(y.project_id) && y.status===1 ).length }}
              </li>
              <li>
                剩余重要且紧急任务: {{ tasks.filter(y=>projects.filter(x=>x.owner_user_name===team.global_key).map(x=>x.id).includes(y.project_id) && y.status===1 && y.priority===3 ).length }}
              </li>
              <li>
                剩余重要不紧急任务: {{ tasks.filter(y=>projects.filter(x=>x.owner_user_name===team.global_key).map(x=>x.id).includes(y.project_id) && y.status===1 && y.priority===2 ).length }}
              </li>
              <li>
                剩余紧急不重要任务: {{ tasks.filter(y=>projects.filter(x=>x.owner_user_name===team.global_key).map(x=>x.id).includes(y.project_id) && y.status===1 && y.priority===1 ).length }}
              </li>
              <li>
                剩余不紧急不重要任务: {{ tasks.filter(y=>projects.filter(x=>x.owner_user_name===team.global_key).map(x=>x.id).includes(y.project_id) && y.status===1 && y.priority===0 ).length }}
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
      'teams',
      'projects',
      'tasks'
    ])
  }
};
</script>
