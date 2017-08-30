<template>
  <div>
    <v-toolbar>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <router-link to="/statistics">
          <v-btn flat>统计首页</v-btn>
        </router-link>
        <router-link to="/statistics/team">
          <v-btn flat>团队统计</v-btn>
        </router-link>
        <router-link to="/statistics/project">
          <v-btn flat>项目统计</v-btn>
        </router-link>
        <router-link to="/statistics/user">
          <v-btn flat>用户统计</v-btn>
        </router-link>
      </v-toolbar-items>
    </v-toolbar>
    <router-view></router-view>
  </div>
</template>

<script>
import index from './default.vue';
import team from './team.vue';
import project from './project.vue';
import user from './user.vue';

export default {
  components: {
    index,
    team,
    project,
    user
  },
  data() {
    return {
      currentView: '',
      params: [],
      miniTitle: '',
    };
  },
  created: function () {
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // eslint-disable-next-line no-param-reassign
      vm.view = to.params;
    });
  },
  beforeRouteUpdate(to, from, next) {
    next((vm) => {
      // eslint-disable-next-line no-param-reassign
      vm.view = to.params;
    });
  },
  watch: {
    $route() {
      this.view = this.$route.params;
    }
  }
};
</script>
