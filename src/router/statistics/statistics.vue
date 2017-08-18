<template>
  <div>
    <v-toolbar>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat @click="goRoute('/statistics')">统计首页</v-btn>
        <v-btn flat @click="goRoute('/statistics/team')">团队统计</v-btn>
        <v-btn flat @click="goRoute('/statistics/project')">项目统计</v-btn>
        <v-btn flat @click="goRoute('/statistics/user')">用户统计</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <component v-bind:is="currentView" :params="params"> </component>
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
      params: []
    };
  },
  computed: {
    view: {
      get() {
        return this.currentView;
      },
      set(param) {
        let params = param[0];
        if (params === undefined) {
          this.currentView = 'index';
          return;
        }
        params = params.split('/');
        if (['team', 'project', 'user'].indexOf(params[0]) !== -1) {
          this.currentView = params[0];
          this.params = params;
          return;
        }
        this.currentView = 'index';
      }
    }
  },
  methods: {
    goRoute(route) {
      this.$router.push(route);
    }
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
