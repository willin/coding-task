<template>
  <v-app light>
    <v-toolbar :show="show" v-if="show.header" fixed>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="goRoute('/quadrant')">
        <v-icon>pages</v-icon>
      </v-btn>
      <v-btn icon @click="goRoute('/timeline')">
        <v-icon>format_list_numbered</v-icon>
      </v-btn>
      <v-btn icon @click="goRoute('/statistics')">
        <v-icon>poll</v-icon>
      </v-btn>
    </v-toolbar>
    <main>
      <router-view transition="slide-y-transition"></router-view>
    </main>
    <v-progress-linear value="45" height="10" info>
    </v-progress-linear>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      inited: false,
      title: this.$route.name
    };
  },
  computed: {
    show() {
      const show = this.$route.path !== '/login';
      return {
        header: show
      };
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
      fetch: 'getAllData'
    })
  },
  watch: {
    $route() {
      this.title = this.$route.name;
    }
  },
  beforeUpdate() {
    if (this.$route.path !== '/login' && this.inited === false) {
      this.init();
    }
  }
};
</script>

<style lang="stylus">
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

.coding
  font-family Coding
  &:before
    content: '\c612'
  &.important:before
    content: '\c611'
</style>
