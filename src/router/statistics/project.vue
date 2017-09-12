<template>
  <v-layout row wrap>
    <template v-for="project in projects">
      <v-flex xs6 :key="project.id">
        <v-card>
          <v-card-title class="primary white--text">
            {{ project.name }}
          </v-card-title>
          <v-card-text>
            <chart :options="projectTask(project)"></chart>
          </v-card-text>
        </v-card>
      </v-flex>
    </template>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import 'echarts/lib/chart/graph';

import chart from '../../component/chart';

export default {
  props: ['params'],
  components: {
    chart
  },
  data() {
    return {
    };
  },
  methods: {
    projectTask(project) {
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
                name: `标签数\n${this.labels.filter(x => x.project_id === project.id).length}`,
                x: 0,
                y: 300,
                itemStyle: {
                  normal: {
                    color: '#42a5f5'
                  }
                }
              },
              {
                name: `任务数\n${this.tasks.filter(x => x.project_id === project.id).length}`,
                x: 200,
                y: 300,
                itemStyle: {
                  normal: {
                    color: '#ff5c1b'
                  }
                }
              },
              {
                name: `已完成任务数\n${this.tasks.filter(x => x.project_id === project.id && x.status === 2).length}`,
                x: 350,
                y: 200,
                itemStyle: {
                  normal: {
                    color: '#25cc3d'
                  }
                }
              },
              {
                name: `未完成任务数\n${this.tasks.filter(x => x.project_id === project.id && x.status === 1).length}`,
                x: 420,
                y: 340,
                itemStyle: {
                  normal: {
                    color: '#ff8786'
                  }
                }
              },
              {
                name: `重要且紧急任务\n${this.tasks.filter(x => x.project_id === project.id && x.status === 1 && x.priority === 3).length}`,
                x: 540,
                y: 230,
                itemStyle: {
                  normal: {
                    color: '#ff0f07'
                  }
                }
              },
              {
                name: `重要不紧急任务\n${this.tasks.filter(x => x.project_id === project.id && x.status === 1 && x.priority === 2).length}`,
                x: 640,
                y: 310,
                itemStyle: {
                  normal: {
                    color: '#f540ed'
                  }
                }
              },
              {
                name: `紧急不重要任务\n${this.tasks.filter(x => x.project_id === project.id && x.status === 1 && x.priority === 1).length}`,
                x: 650,
                y: 430,
                itemStyle: {
                  normal: {
                    color: '#fb3ca3'
                  }
                }
              },
              {
                name: `不紧急不重要任务\n${this.tasks.filter(x => x.project_id === project.id && x.status === 1 && x.priority === 0).length}`,
                x: 540,
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
                source: 1,
                target: 2
              },
              {
                source: 1,
                target: 3
              },
              {
                source: 3,
                target: 4
              },
              {
                source: 3,
                target: 5
              },
              {
                source: 3,
                target: 6
              },
              {
                source: 3,
                target: 7
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
    },
    ...mapActions({
      setProgress: 'setProgress'
    })
  },
  computed: {
    ...mapGetters([
      'projects',
      'tasks',
      'labels'
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
