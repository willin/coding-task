<template>
  <v-app light>
    <v-toolbar :show="show" v-if="show.header" fixed>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>

      <router-link to="/">
        <v-btn icon>
          <v-icon>pages</v-icon>
        </v-btn>
      </router-link>

      <router-link to="/timeline">
        <v-btn icon>
          <v-icon>format_list_numbered</v-icon>
        </v-btn>
      </router-link>

      <router-link to="/statistics">
        <v-btn icon>
          <v-icon>poll</v-icon>
        </v-btn>
      </router-link>

    </v-toolbar>
    <main>
      <transition name="slide-fade">
        <router-view v-if="post"></router-view>
      </transition>
    </main>
    <v-progress-linear :value="progress" v-model="progress" height="10" info></v-progress-linear>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      inited: false,
      title: this.$route.name,
      post: false
    };
  },
  computed: {
    ...mapGetters([
      'progress'
    ]),
    show() {
      const show = this.$route.path !== '/login';
      return {
        header: show
      };
    }
  },
  watch: {
    $route() {
      this.title = this.$route.name;
      this.fetchData();
    }
  },
  methods: {
    async init() {
      await this.fetch();
      this.inited = true;
    },
    goRoute(route) {
      this.$router.push(route);
    },
    ...mapActions({
      fetch: 'getAllData',
      setProgress: 'setProgress'
    }),
    fetchData() {
      this.post = false;
      let p = 0;
      const timer = setInterval(() => {
        if (p === 100) {
          this.post = true;
          p = 100;
          this.setProgress(p);
          return clearInterval(timer);
        }
        p += 25;
        this.setProgress(p);
      }, 500);
    }
  },
  beforeUpdate() {
    if (this.$route.path !== '/login' && this.inited === false) {
      this.init();
    }
  },
  mounted() { }
};
</script>

<style lang="stylus">
a{
  color transparent
  text-decoration none
}

@import '../node_modules/vuetify/src/stylus/main'

@font-face
  font-family Coding
  src url(https://dn-coding-net-production-static.qbox.me/static/f43a2f65f95e657abcdf212491ef50b8.eot)
  src url(https://dn-coding-net-production-static.qbox.me/static/f43a2f65f95e657abcdf212491ef50b8.eot?#iefix) format('embedded-opentype'), url(https://dn-coding-net-production-static.qbox.me/static/5d0570de997f2f1207461e0dbf4c233e.woff) format('woff'), url(https://dn-coding-net-production-static.qbox.me/static/ad5ab4f799151646c2b217191693c451.ttf) format('truetype'), url(https://dn-coding-net-production-static.qbox.me/static/d3e5447f1f2a77fb3e59d454e5a76178.svg) format('svg')
  font-weight 400
  font-style normal

.progress-linear{
  margin 0 !important
  position fixed
  bottom 0
  left 0
}
main
  padding-bottom 10px

html
  overflow-x hidden
  overflow-y auto

.coding
  font-family Coding
  &:before
    content: '\c612'
  &.important:before
    content: '\c611'

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
