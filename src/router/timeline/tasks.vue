<template>
  <ul class="timeline">
    <template v-for="(task, index) in tasks">
      <li v-if="index===0 || (task.deadline !== 0 && (moment(tasks[index - 1].deadline).format('YYYY') !== moment(task.deadline).format('YYYY')))" class="year" :key="index">
        <p class="timeline-date"></p>
        <div class="timeline-content">
          <h4>{{ task.deadline === 0 ? '未设置截止日期' : moment(task.deadline).format('YYYY年') }}</h4>
        </div>
      </li>
      <li v-else-if="tasks[index - 1].deadline !== 0 && task.deadline === 0" class="year" :key="index">
        <p class="timeline-date"></p>
        <div class="timeline-content">
          <h5>未设置截止日期</h5>
        </div>
      </li>
      <!--  -->
      <li :key="task.task_id" :class="{done: task.status===2}">
        <p class="timeline-date" v-if="index === 0 || moment(task.deadline).format('MMMD日') !== moment(tasks[index-1].deadline).format('MMMD日')">
          {{ task.deadline === 0 ? ' ' : moment(task.deadline).format('MMMD日') }}
        </p>
        <p class="timeline-date" v-else>&nbsp;</p>
        <div class="timeline-content">
          <h6>
            <span>
              <img v-bind:src="(task.owner.avatar && task.owner.avatar.startsWith('/')) ? `https://coding.net${task.owner.avatar}` : task.owner.avatar" />
            </span>
            <span class='grey--text text--darken-2'>{{ task.owner.name }} - </span>
            <a :href="'https://coding.net/' + task.project.project_path + '/task/' + task.id " target="_blank">
              <del v-if="task.status===2">{{task.content}}</del>
              <span v-else>{{task.content}}</span>
            </a>
          </h6>
          <p>
            <v-chip :class="priorityClass(task.priority)" class="white--text" small label>
              {{ displayPriority(task.priority) }}
            </v-chip>
            <v-chip small label>{{task.project.name}} #{{task.number}}</v-chip>
            <v-chip small label v-if="task.has_description || task.comments">
              <v-icon v-if="task.has_description">info_outline</v-icon>
              <span v-if="task.has_description">有描述 &nbsp;</span>
              <v-icon v-if="task.comments">chat_bubble_outline</v-icon>
              <span v-if="task.comments">{{task.comments}}</span>
            </v-chip>
            <template v-for="label in task.labels">
              <v-chip v-text="label.name" v-bind:style="{color: label.color, borderColor: label.color}" v-bind:key="label.id" outline small></v-chip>
            </template>
          </p>
        </div>
      </li>
    </template>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';
import timetogo from '../../component/timetogo.vue';
import moment from '../../component/moment';

export default {
  props: ['list'],
  name: 'tasks',
  components: {
    timetogo
  },
  data() {
    return {};
  },
  methods: {
    moment,
    displayPriority(i) {
      switch (i) {
        case 0:
          return '不重要不紧急';
        case 1:
          return '紧急不重要';
        case 2:
          return '重要不紧急';
        default:
          return '重要且紧急';
      }
    },
    priorityClass(i) {
      return {
        pink: i === 3,
        'lighten-2': i === 2,
        blue: i === 2,
        'lighten-1': i === 2,
        yellow: i === 1,
        'darken-2': i === 1,
        'light-green': i === 0,
        'lighten-3': i === 0
      };
    }
  },
  computed: {
    ...mapGetters([
      'users',
      'projects',
      'labels',
      'tasklabels'
    ]),
    tasks() {
      return this.list.sort((x, y) => y.deadline - x.deadline).map((task) => {
        /* eslint-disable no-param-reassign */
        task.owner = this.users.find(x => x.id === task.owner_id);
        task.labels = this.tasklabels.filter(x => x.task_id === task.id).map(x => this.labels.find(y => y.id === x.label_id));
        task.project = this.projects.find(x => x.id === task.project_id);
        return task;
      });
    }
  }
};
</script>


<style lang="stylus" scoped>
a {
  text-decoration: none;
}
.timeline {
  list-style: none;
  margin-top: 1em;
}
.timeline > li {
  margin-bottom: 60px;
}
.timeline-content img {
  width: 1em;
  height: 1em;
  float: left;
  margin-right: 0.5em;
  border-radius: 50%;
  border: 1px solid transparent;
}
/* for Desktop */
@media ( min-width : 640px ){
  .timeline > li {
    overflow: hidden;
    margin: 0;
    position: relative;
  }
  .timeline-date {
    width: 110px;
    float: left;
    margin-top: 20px;
  }
  .timeline-content {
    width: 75%;
    float: left;
    border-left: 3px #e5e5d1 solid;
    padding-left: 30px;
  }
  .timeline-content:before {
    content: '';
    width: 12px;
    height: 12px;
    background: #f06;
    position: absolute;
    left: 106px;
    top: 24px;
    border-radius: 100%;
  }
  .year .timeline-content:before {
    background: #69f;
  }
  .done .timeline-content:before {
    background: #6fc173;
  }
}
</style>
