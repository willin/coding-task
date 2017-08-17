<template>
  <div>
    <h1>
      Hello
    </h1>
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
        if (['team', 'project', 'user'].indexOf(params[0]) !== -1 && params.length > 1) {
          this.currentView = params[0];
          this.params = params;
          return;
        }
        this.currentView = 'index';
      }
    }
  },
  beforeRouteEnter(to, from, next) {
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
