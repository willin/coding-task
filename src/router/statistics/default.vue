
<template>
  <div>
    <h3>任务统计</h3>
    <chart :options="tasks"></chart>
    <h3>任务详情统计</h3>
    <chart :options="details"></chart>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
/* eslint-disable import/no-unresolved,import/extensions */
import 'echarts/chart/pie';
import 'echarts/chart/bar';
import 'echarts/component/polar';
import 'echarts/component/tooltip';
import 'echarts/component/title';
import chart from '../../component/chart';

export default {
  components: {
    chart
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      'tasksDone',
      'tasksUndone'
    ]),
    tasks() {
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        series: [
          {
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              {
                value: this.tasksDone.length,
                name: `已完成: ${this.tasksDone.length}`,
                itemStyle: {
                  normal: {
                    color: '#6699ff',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              },
              {
                value: this.tasksUndone.length,
                name: `未完成: ${this.tasksUndone.length}`,
                itemStyle: {
                  normal: {
                    color: '#ff0066',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ],
            // roseType: 'radius',
            label: {
              normal: {
                textStyle: {
                  color: 'rgba(0, 0, 0, 0.9)'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'rgba(0, 0, 0, 0.9)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay() {
              return Math.random() * 200;
            }
          }
        ]
      };
    },
    details() {
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{b} <br> {a} : {c}'
        },
        angleAxis: {
          type: 'category',
          data: ['重要且紧急', '重要不紧急', '紧急不重要', '不重要不紧急'],
          z: 10
        },
        radiusAxis: {
        },
        polar: {
        },
        series: [{
          type: 'bar',
          data: [
            this.tasksDone.where({ priority: 3 }).length,
            this.tasksDone.where({ priority: 2 }).length,
            this.tasksDone.where({ priority: 1 }).length,
            this.tasksDone.where({ priority: 0 }).length
          ],
          coordinateSystem: 'polar',
          name: '已完成',
          stack: 'a',
          itemStyle: {
            normal: {
              color: '#6699ff',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }, {
          type: 'bar',
          data: [
            this.tasksUndone.where({ priority: 3 }).length,
            this.tasksUndone.where({ priority: 2 }).length,
            this.tasksUndone.where({ priority: 1 }).length,
            this.tasksUndone.where({ priority: 0 }).length
          ],
          coordinateSystem: 'polar',
          name: '未完成',
          stack: 'a',
          itemStyle: {
            normal: {
              color: '#ff0066',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }],
        legend: {
          show: true,
          data: ['已完成', '未完成'],
          bottom: 'bottom'
        }
      };
    }
  }
};
</script>
