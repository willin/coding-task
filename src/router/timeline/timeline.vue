<template>
  <div>
    <v-container>
      <tasks :list="filter()"></tasks>
      <v-btn @click.stop="drawer = !drawer" class="pink" dark small fixed top right fab style="z-index:99999;top: 20em" v-if="!drawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-container>
    <v-navigation-drawer v-model="drawer" class="grey lighten-4 pb-0" fixed light right clipped enable-resize-watcher persistent>
      <v-toolbar>
        <v-text-field label="搜索..." single-line append-icon="search" hide-details v-model="search"></v-text-field>
        <v-toolbar-title>
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        </v-toolbar-title>
      </v-toolbar>
      <v-card>
        <v-switch label="显示已完成" v-model="showDone"></v-switch>
      </v-card>
      <v-card>
        <v-select label="截止日期" v-bind:items="deadlines" v-model="selectedDeadline"></v-select>
      </v-card>
      <v-card>
        <v-select label="执行者" v-bind:items="users" item-text="name" item-value="id" v-model="selectedOwners" multiple chips></v-select>
      </v-card>
      <v-card>
        <v-select label="创建者" v-bind:items="[{id:0,name:'全部'},...users]" item-text="name" item-value="id" v-model="selectedCreator"></v-select>
      </v-card>
      <v-card>
        <v-menu lazy :close-on-content-click="false" v-model="menuStart" transition="scale-transition" offset-y full-width :nudge-left="40" max-width="290px">
          <v-text-field slot="activator" label="日期从_开始" v-model="dateStart" prepend-icon="event" readonly></v-text-field>
          <v-date-picker v-model="dateStart" no-title scrollable locale="zh-cn" autosave></v-date-picker>
        </v-menu>
      </v-card>
      <v-card>
        <v-menu lazy :close-on-content-click="false" v-model="menuEnd" transition="scale-transition" offset-y full-width :nudge-left="40" max-width="290px">
          <v-text-field slot="activator" label="日期到_结束" v-model="dateEnd" prepend-icon="event" readonly></v-text-field>
          <v-date-picker v-model="dateEnd" no-title scrollable locale="zh-cn" autosave></v-date-picker>
        </v-menu>
      </v-card>
      <v-card>
        <v-btn @click.native="reset" class="blue-grey white--text">
          清除日期选择
          <v-icon right dark>remove_circle_outline</v-icon>
        </v-btn>
      </v-card>
      <v-card>
        <v-select label="紧急程度" v-bind:items="priorities" v-model="selectedPriority"></v-select>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import tasks from './tasks.vue';

export default {
  data() {
    return {
      drawer: false,
      search: '',
      showDone: false,
      menuStart: false,
      menuEnd: false,
      dateStart: null,
      dateEnd: null,
      selectedOwners: [],
      selectedCreator: 0,
      selectedPriority: -1,
      selectedDeadline: 1,
      deadlines: [
        { text: '全部', value: -1 },
        { text: '未设置', value: 0 },
        { text: '已设置', value: 1 }
      ],
      priorities: [
        { text: '全部', value: -1 },
        { text: '重要且紧急', value: 3 },
        { text: '重要不紧急', value: 2 },
        { text: '紧急不重要', value: 1 },
        { text: '不重要不紧急', value: 0 }
      ]
    };
  },
  components: {
    tasks
  },
  methods: {
    filter() {
      let result;
      if (this.showDone) {
        result = this.tasks;
      } else {
        result = this.tasksUndone;
      }
      if (this.selectedDeadline !== -1) {
        if (this.selectedDeadline === 0) {
          result = result.filter(x => x.deadline === 0);
        } else {
          result = result.filter(x => x.deadline !== 0);
        }
      }
      if (this.selectedOwners.length > 0) {
        result = result.filter(x => this.selectedOwners.includes(x.owner_id));
      }
      if (this.selectedCreator !== 0) {
        result = result.filter(x => this.selectedCreator === x.creator_id);
      }
      if (this.selectedPriority !== -1) {
        result = result.filter(x => this.selectedPriority === x.priority);
      }
      if (this.search.length !== 0) {
        result = result.filter(x => x.content.includes(this.search.trim()));
      }
      if (this.dateStart !== null) {
        result = result.filter(x => x.deadline > new Date(`${this.dateStart} 00:00:00`).getTime());
      }
      if (this.dateEnd !== null) {
        result = result.filter(x => x.deadline < new Date(`${this.dateEnd} 00:00:00`).getTime());
      }
      return result;
    },
    reset() {
      this.dateStart = null;
      this.dateEnd = null;
    },
    ...mapActions({
      setProgress: 'setProgress'
    })
  },
  computed: {
    ...mapGetters([
      'tasks',
      'tasksUndone',
      'users'
    ])
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.setProgress(100);
    });
  },
  beforeRouteLeave(to, from, next) {
    next(
      this.setProgress(0)
    );
  },
  beforeRouteUpdate(to, from, next) {
    next(
      this.setProgress(0)
    );
  }
};
</script>
