<template>
  <div>
    <v-toolbar>
      <v-spacer v-text="miniTitle"></v-spacer>
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
      params: [],
      miniTitle: '',
    };
  },
  created: function () {
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
          this.miniTitle = '统计首页';
          return;
        }
        params = params.split('/');
        if (['team', 'project', 'user'].indexOf(params[0]) !== -1) {
          this.currentView = params[0];
          this.params = params;
          if(this.currentView == 'team'){
            this.miniTitle = '团队统计';
          }
          if(this.currentView == 'project'){
            this.miniTitle = '项目统计';
          }
          if(this.currentView == 'user'){
            this.miniTitle = '用户统计';
          }
          return;
        }
        this.currentView = 'index';
        this.miniTitle = '统计首页';
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
