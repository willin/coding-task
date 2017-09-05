<template>
  <v-layout row wrap>
    <template v-for="team in teams">
      <v-flex xs12 :key="team.id">
        <v-card>
          <v-card-title class="primary white--text">
            {{ team.name }}
          </v-card-title>
          <v-card-text>
            <chart :options="teamTask(team)"></chart>
          </v-card-text>
        </v-card>
      </v-flex>
    </template>
  </v-layout>
</template>

<style>
.echarts {
  width: 100%!important;
  height: 600px!important;
}
</style>

<script>
import { mapGetters } from 'vuex';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/polar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/graph';

import chart from '../../component/chart';

export default {
  props: ['params'],
  components: {
    chart
  },
  data() {
    return {};
  },
  methods: {
    teamTask(team) {
      return {
        title: {
          show: false
        },
        tooltip: {
          show: false
        },
        silent: true,
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'none',
            legendHoverLink: false,
            symbolSize: 100,
            roam: false,
            label: {
              normal: {
                show: true,
                fontSize: 12
              }
            },
            edgeSymbol: ['none', 'none'],
            edgeSymbolSize: [4, 10],
            data: [
              {
                name: `成员数\n${team.member_count}`,
                x: 200,
                y: 300,
                itemStyle: {
                  normal: {
                    color: '#f4ab0f'
                  }
                }
              },
              {
                name: `项目数\n${team.project_count}`,
                x: 0,
                y: 300,
                itemStyle: {
                  normal: {
                    color: '#42a5f5'
                  }
                }
              },
              {
                name: `任务数\n${this.tasks.filter(y => this.projects
                  .filter(x => x.owner_user_name === team.global_key)
                  .map(x => x.id)
                  .includes(y.project_id)).length}`,
                x: 400,
                y: 300,
                itemStyle: {
                  normal: {
                    color: '#ff5c1b'
                  }
                }
              },
              {
                name: `已完成任务数\n${this.tasks.filter(y => this.projects
                  .filter(x => x.owner_user_name === team.global_key)
                  .map(x => x.id).includes(y.project_id) && y.status === 2).length}`,
                x: 500,
                y: 150,
                itemStyle: {
                  normal: {
                    color: '#25cc3d'
                  }
                }
              },
              {
                name: `未完成任务数\n${this.tasks.filter(y =>
                  this.projects.filter(x => x.owner_user_name === team.global_key)
                    .map(x => x.id)
                    .includes(y.project_id) && y.status === 1).length}`,
                x: 600,
                y: 340,
                itemStyle: {
                  normal: {
                    color: '#ff8786'
                  }
                }
              },
              {
                name: `重要且紧急任务\n${this.tasks.filter(y =>
                  this.projects.filter(x => x.owner_user_name === team.global_key)
                    .map(x => x.id)
                    .includes(y.project_id)
                  && y.status === 1 && y.priority === 3).length}`,
                x: 640,
                y: 230,
                itemStyle: {
                  normal: {
                    color: '#ff0f07'
                  }
                }
              },
              {
                name: `重要不紧急任务\n${this.tasks.filter(y =>
                  this.projects.filter(x => x.owner_user_name === team.global_key)
                    .map(x => x.id)
                    .includes(y.project_id)
                  && y.status === 1 && y.priority === 2).length}`,
                x: 740,
                y: 310,
                itemStyle: {
                  normal: {
                    color: '#f540ed'
                  }
                }
              },
              {
                name: `紧急不重要任务\n${this.tasks.filter(y =>
                  this.projects.filter(x => x.owner_user_name === team.global_key)
                    .map(x => x.id)
                    .includes(y.project_id)
                  && y.status === 1 && y.priority === 1).length}`,
                x: 750,
                y: 430,
                itemStyle: {
                  normal: {
                    color: '#fb3ca3'
                  }
                }
              },
              {
                name: `不紧急不重要任务\n${this.tasks.filter(y =>
                  this.projects.filter(x => x.owner_user_name === team.global_key)
                    .map(x => x.id)
                    .includes(y.project_id)
                  && y.status === 1 && y.priority === 0).length}`,
                x: 640,
                y: 500,
                itemStyle: {
                  normal: {
                    color: '#aba3e1'
                  }
                }
              }
            ],
            links: [
              {
                source: 0,
                target: 1
              },
              {
                source: 0,
                target: 2
              },
              {
                source: 2,
                target: 3
              },
              {
                source: 2,
                target: 4
              },
              {
                source: 4,
                target: 5
              },
              {
                source: 4,
                target: 6
              },
              {
                source: 4,
                target: 7
              },
              {
                source: 4,
                target: 8
              }
            ],
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 2,
                curveness: 0
              }
            }
          }
        ]
      };
    }
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
