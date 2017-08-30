<template>
  <v-layout row wrap>
    <v-flex xs12>
    <v-card>
      <v-card-text>
        <chart :options="allUserTask()"></chart>
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
import 'echarts/lib/chart/graph';

import chart from '../../component/chart';

export default {
  props: ['params'],
  components: {
    chart
  },
  data() {
    return {
      seriesLable : {
        formatter: '{a}: {c}',
        show: true,
        position: 'inside'
      },
      yAxisData : [],
      seriesData : [ [], [], [] ]
    };
  },
  created:function () {
    for (let i in this.users){
      this.yAxisData.push(this.users[i].name);
      this.seriesData[0].push(this.tasks.filter(x => x.owner_id === this.users[i].id && x.status === 1).length);
      this.seriesData[1].push(this.tasks.filter(x => x.owner_id === this.users[i].id && x.status === 2).length);
      this.seriesData[2].push(this.tasks.filter(x => x.owner_id === this.users[i].id).length);
    }
    console.log(this.seriesData);
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
    allUserTask(){
      return {
        tooltip : {
          show:false,
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          show:false,
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis:  {
          type: 'value',
          axisLine:{
            lineStyle:{
              color:'#8e8e8e'
            }
          }
        },
        yAxis: {
          type: 'category',
          axisLine:{
            lineStyle:{
              color:'#8e8e8e'
            }
          },
          axisTick:{
            show:false
          },
          data: this.yAxisData
        },
        series: [
          {
            name: '未完成',
            type: 'bar',
            stack: '任务',
            itemStyle:{
              normal:{
                color: '#CC3333'
              }
            },
            label: {
              normal: this.seriesLable
            },
            data: this.seriesData[0]
          },
          {
            name: '已完成',
            type: 'bar',
            stack: '任务',
            itemStyle: {
              normal: {
                color: '#00CC99'
              }
            },
            label: {
              normal: this.seriesLable
            },
            data: this.seriesData[1]
          },
          {
            name: '已分配',
            type: 'bar',
            stack: '任务',
            itemStyle: {
              normal: {
                color: '#0099CC'
              }
            },
            label: {
              normal: this.seriesLable
            },
            data: this.seriesData[2]
          }
        ]
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
