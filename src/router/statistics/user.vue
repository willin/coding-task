<template>
  <v-layout row wrap>
    <template v-for="user in users">
      <v-flex xs12 :key="user.id">
        <v-card>
          <v-card-title class="primary white--text">
            {{ user.name }}
            <v-card-sub-title v-if="user.slogan">&nbsp; - {{ user.slogan }}</v-card-sub-title>
          </v-card-title>

          <v-card-text>
            <ul>
              <li>
                创建任务数: {{ tasks.filter(x=>x.creator_id===user.id).length }}
              </li>
              <li>
                分配任务数: {{ tasks.filter(x=>x.owner_id === user.id).length }}
              </li>
              <li>
                已完成任务数: {{ tasks.filter(x=>x.owner_id === user.id && x.status === 2).length }}
              </li>
              <li>
                未完成任务数: {{ tasks.filter(x=>x.owner_id === user.id && x.status === 1).length }}
              </li>
              <li>
                剩余重要且紧急任务: {{ tasks.filter(x=>x.owner_id === user.id && x.status === 1 && x.priority === 3).length }}
              </li>
              <li>
                剩余重要不紧急任务: {{ tasks.filter(x=>x.owner_id === user.id && x.status === 1 && x.priority === 2).length }}
              </li>
              <li>
                剩余紧急不重要任务: {{ tasks.filter(x=>x.owner_id === user.id && x.status === 1 && x.priority === 1).length }}
              </li>
              <li>
                剩余不紧急不重要任务: {{ tasks.filter(x=>x.owner_id === user.id && x.status === 1 && x.priority === 0).length }}
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
      'users',
      'tasks'
    ])
  }
};
</script>
