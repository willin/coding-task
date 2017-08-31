<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-text>
          <chart :options="allUserTask(users,tasks)"></chart>
        </v-card-text>
      </v-card>
    </v-flex>
    <template v-for="user in users">
      <v-flex xs6 :key="user.id">
        <v-card>
          <v-card-title class="primary white--text">
            {{ user.name }}
            <span v-if="user.slogan">&nbsp; - {{ user.slogan }}</span>
          </v-card-title>
          <v-card-text>
            <chart :options="userTask(user)"></chart>
          </v-card-text>
        </v-card>
      </v-flex>
    </template>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import 'echarts/lib/component/legend';
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
  created() {
  },
  methods: {
    userTask(user) {
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
                name: `分配任务数\n${this.tasks.filter(x => x.owner_id === user.id).length}`,
                x: 200,
                y: 300,
                itemStyle: {
                  normal: {
                    color: '#f4ab0f'
                  }
                }
              },
              {
                name: `创建任务数\n${this.tasks.filter(x => x.creator_id === user.id).length}`,
                x: 0,
                y: 300,
                itemStyle: {
                  normal: {
                    color: '#42a5f5'
                  }
                }
              },
              {
                name: `已完成任务数\n${this.tasks.filter(x => x.owner_id === user.id && x.status === 2).length}`,
                x: 400,
                y: 120,
                itemStyle: {
                  normal: {
                    color: '#25cc3d'
                  }
                }
              },
              {
                name: `未完成任务数\n${this.tasks.filter(x => x.owner_id === user.id && x.status === 1).length}`,
                x: 450,
                y: 380,
                itemStyle: {
                  normal: {
                    color: '#ff8786'
                  }
                }
              },
              {
                name: `重要且紧急任务\n${this.tasks.filter(x => x.owner_id === user.id && x.status === 1 && x.priority === 3).length}`,
                x: 640,
                y: 200,
                itemStyle: {
                  normal: {
                    color: '#ff0f07'
                  }
                }
              },
              {
                name: `重要不紧急任务\n${this.tasks.filter(x => x.owner_id === user.id && x.status === 1 && x.priority === 2).length}`,
                x: 740,
                y: 310,
                itemStyle: {
                  normal: {
                    color: '#f540ed'
                  }
                }
              },
              {
                name: `紧急不重要任务\n${this.tasks.filter(x => x.owner_id === user.id && x.status === 1 && x.priority === 1).length}`,
                x: 700,
                y: 420,
                itemStyle: {
                  normal: {
                    color: '#fb3ca3'
                  }
                }
              },
              {
                name: `不紧急不重要任务\n${this.tasks.filter(x => x.owner_id === user.id && x.status === 1 && x.priority === 0).length}`,
                x: 600,
                y: 520,
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
                source: 0,
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
    allUserTask(users, tasks) {
      const chartData = [];
      for (let i = 0; i < users.length; i += 1) {
        chartData.push(
          {
            name: users[i].name,
            done: tasks.filter(x => x.owner_id === users[i].id && x.status === 2).length,
            undone: tasks.filter(x => x.owner_id === users[i].id && x.status === 1).length
          }
        );
      }
      chartData.sort((x, y) => y.done - x.done);
      return {
        legend: {
          data: ['未完成', '已完成'],
          top: 35,
          itemGap: 120
        },
        grid: [{
          show: false,
          left: 0,
          containLabel: false,
          width: '46%'
        }, {
          show: false,
          left: '51%',
          containLabel: false,
          width: '8%'
        }, {
          show: false,
          right: 0,
          containLabel: false,
          width: '48%'
        }],
        xAxis: [{
          show: false,
          type: 'value',
          inverse: true,
          axisLine: { show: false },
          axisTick: { show: false },
          position: 'bottom',
          axisLabel: { show: false },
          splitLine: { show: false }
        }, {
          gridIndex: 1,
          show: false
        }, {
          gridIndex: 2,
          show: true,
          type: 'value',
          axisLine: { show: false },
          axisTick: { show: false },
          position: 'bottom',
          axisLabel: { show: false },
          splitLine: { show: false }
        }],
        yAxis: [{
          type: 'category',
          inverse: true,
          position: 'right',
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
          data: []
        }, {
          gridIndex: 1,
          type: 'category',
          inverse: true,
          position: 'left',
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: true },
          data: chartData.map(x => x.name)
        }, {
          gridIndex: 2,
          type: 'category',
          inverse: true,
          position: 'left',
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
          data: []
        }],
        series: [{
          name: '未完成',
          type: 'bar',
          barWidth: 20,
          label: {
            normal: {
              show: true,
              position: 'insideLeft',
              textStyle: { color: '#ffffff' }
            }
          },
          itemStyle: {
            normal: {
              color: '#ff5d5d',
              barBorderRadius: [5, 0, 0, 5]
            }
          },
          data: chartData.map(x => x.undone)
        }, {
          name: '已完成',
          type: 'bar',
          barWidth: 20,
          xAxisIndex: 2,
          yAxisIndex: 2,
          label: {
            normal: {
              show: true,
              position: 'insideRight',
              textStyle: { color: '#ffffff' }
            }
          },
          itemStyle: {
            normal: {
              color: '#00cc99',
              barBorderRadius: [0, 5, 5, 0]
            }
          },
          data: chartData.map(x => x.done)
        }]
      };
    }
  },
  computed: {
    ...mapGetters([
      'users',
      'tasks'
    ])
  }
};
</script>
