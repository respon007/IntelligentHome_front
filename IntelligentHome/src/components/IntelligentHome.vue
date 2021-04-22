<template>
  <div class="word-container">
    <p>智能家居</p>
    <div class="chart_temp" id="main"></div>
    <div class="chart_humi" id="humi"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'IntelligentHome',
  data () {
    return {
      
    }
  },
  mounted() {
    
    window.setInterval(() => {
      setTimeout(this.getTempData(), 0)
    }, 3000)
  },
  methods:{

    getTempData() { // 初始化温度数据
      this.$axios.get('/api/board/temp').then(res => { 
        if (res.data) {
          console.log(res.data.data);
          let tempData = res.data.data.temper;
          let humiData = res.data.data.humi;
          //获取温度
          this.initTemp(tempData);
          //获取湿度
          this.initHumi(humiData);
        }
      }).catch(err => {
        console.log(err) 
      })
    },
    initTemp(tempData) { 
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);

      let option = {
          series: [{
                  type: 'gauge',
                  center: ["50%", "60%"],
                  startAngle: 200,
                  endAngle: -20,
                  min: -10,
                  max: 50,
                  splitNumber: 10,
                  itemStyle: {
                      color: '#FFAB91'
                  },
                  progress: {
                      show: true,
                      width: 30
                  },

                  pointer: {
                      show: false,
                  },
                  axisLine: {
                      lineStyle: {
                          width: 30
                      }
                  },
                  axisTick: {
                      distance: -45,
                      splitNumber: 5,
                      lineStyle: {
                          width: 2,
                          color: '#999'
                      }
                  },
                  splitLine: {
                      distance: -52,
                      length: 14,
                      lineStyle: {
                          width: 3,
                          color: '#999'
                      }
                  },
                  axisLabel: {
                      distance: -20,
                      color: '#999',
                      fontSize: 20
                  },
                  anchor: {
                      show: false
                  },
                  title: {
                      show: false
                  },
                  detail: {
                      valueAnimation: true,
                      width: '60%',
                      lineHeight: 40,
                      height: '15%',
                      borderRadius: 8,
                      offsetCenter: [0, '-15%'],
                      fontSize: 60,
                      fontWeight: 'bolder',
                      formatter: '{value} °C',
                      color: 'auto'
                  },
                  data: [{
                      value: 20
                  }]
              },

              {
                  type: 'gauge',
                  center: ["50%", "60%"],
                  startAngle: 200,
                  endAngle: -20,
                  min: 0,
                  max: 60,
                  itemStyle: {
                      color: '#FD7347',
                  },
                  progress: {
                      show: true,
                      width: 8
                  },

                  pointer: {
                      show: false
                  },
                  axisLine: {
                      show: false
                  },
                  axisTick: {
                      show: false
                  },
                  splitLine: {
                      show: false
                  },
                  axisLabel: {
                      show: false
                  },
                  detail: {
                      show: false
                  },
                  data: [{
                      value: 20,
                  }]

              }
          ],
      };

      setInterval(function() {
          let random = (Math.random() * 60).toFixed(2) - 0;
          option.series[0].data[0].value = tempData;
          option.series[1].data[0].value = tempData; 
          myChart.setOption(option, true);
      }, 3000);

    },
    initHumi(humiData) {
      var chartDom = document.getElementById('humi');
      var myChart = echarts.init(chartDom);

      let option = {
          series: [{
              detail:'室内湿度',
              type: 'gauge',
              startAngle: 180,
              endAngle: 0,
              min: 0,
              max: 100,
              splitNumber: 10,
              itemStyle: {
                  color: '#58D9F9',
                  shadowColor: 'rgba(0,138,255,0.45)',
                  shadowBlur: 10,
                  shadowOffsetX: 2,
                  shadowOffsetY: 2
              },
              progress: {
                  show: true,
                  roundCap: true,
                  width: 18
              },
              pointer: {
                  icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
                  length: '75%',
                  width: 16,
                  offsetCenter: [0, '5%']
              },
              axisLine: {
                  roundCap: true,
                  lineStyle: {
                      width: 18
                  }
              },
              axisTick: {
                  splitNumber: 2,
                  lineStyle: {
                      width: 2,
                      color: '#999'
                  }
              },
              splitLine: {
                  length: 12,
                  lineStyle: {
                      width: 3,
                      color: '#999'
                  }
              },
              axisLabel: {
                  distance: 30,
                  color: '#999',
                  fontSize: 20
              },
              title: {
                  show: false
              },
              detail: {
                  backgroundColor: '#fff',
                  borderColor: '#999',
                  borderWidth: 2,
                  width: '60%',
                  lineHeight: 40,
                  height: 40,
                  borderRadius: 8,
                  offsetCenter: [0, '35%'],
                  valueAnimation: true,
                  formatter: function (value) {
                      return '{value|' + value.toFixed(0) + '}{unit|%}';
                  },
                  rich: {
                      value: {
                          fontSize: 50,
                          fontWeight: 'bolder',
                          color: '#777'
                      },
                      unit: {
                          fontSize: 20,
                          color: '#999',
                          padding: [0, 0, -20, 10]
                      }
                  }
              },
              data: [{
                  value: humiData
              }]
          }]
      };

      setInterval(function() {
          option.series[0].data[0].value = humiData;
          myChart.setOption(option, true);
      }, 3000);

    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.word-container {
  .chart_temp {
    padding-left: 200px;
    float: left;
    width: 500px;
    height: 500px;
  }
  .chart_humi {
    padding-right: 200px;
    margin-top: 100px;
    float: left;
    width: 500px;
    height: 500px;
  }
}
</style>
