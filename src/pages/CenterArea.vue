<template>
  <div style="background: #ecf0f1; width: auto;display: flex;flex-direction: column;padding:20px;box-sizing: border-box;height:100%;">
    <el-row :gutter="28">
      <el-col :span="6">
        <div class="mini-stat clearfix bx-shadow bg-info1">
          <span class="mini-stat-icon"><i class="el-icon-message"></i></span>
          <div class="mini-stat-info text-right">
            <span class="counter">{{ this.totals.courses }}</span>Courses
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="mini-stat clearfix bx-shadow bg-info2">
          <span class="mini-stat-icon"><i class="el-icon-message"></i></span>
          <div class="mini-stat-info text-right">
            <span class="counter">{{ this.totals.classes }}</span>Classes
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="mini-stat clearfix bx-shadow bg-info3">
          <span class="mini-stat-icon"><i class="el-icon-message"></i></span>
          <div class="mini-stat-info text-right">
            <span class="counter">{{ this.totals.students }}</span>Students
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="mini-stat clearfix bx-shadow bg-info4">
          <span class="mini-stat-icon"><i class="el-icon-message"></i></span>
          <div class="mini-stat-info text-right">
            <span class="counter">{{ this.totals.teachers }}</span>Teachers
          </div>
        </div>
      </el-col>
    </el-row>
    <div style="display:flex;flex-grow:1;padding-top:20px">
      <div style="width:60%;bottom: 0;padding-right:20px;">
        <div id="myChart1" style="width: 100%;height:100%;background: white;"></div>
      </div>
      <div style="width:40%;bottom: 0;padding-right:20px;">
        <div id="myChart2" style="width: 100%;height:100%;background: white;"></div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "centerarea",
  mounted() {
    this.drawLine1();
    this.drawLine2();
    this.getTotals();
  },
  data() {
    return {
      totals: {}
    }
  },
  methods: {
    getTotals() {
      this.$axios.get('/getTotals').then(res => {
        this.totals = res;
      });
    },
    drawLine1() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart1'))
      let options = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Java 从入门到放弃', 'Java 从入门到放弃', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,
              rotate: 45//角度顺时针计算的
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      };
      // 绘制图表
      myChart.setOption(options);
    },
    drawLine2() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart2'))
      let options = {
        legend: {
          left: 'center',
          top: 'bottom',
        },
        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [30, 150],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: [
              {value: 40, name: 'rose 1'},
              {value: 38, name: 'rose 2'},
              {value: 32, name: 'rose 3'},
              {value: 30, name: 'rose 4'},
              {value: 28, name: 'rose 5'},
              {value: 26, name: 'rose 6'},
              {value: 22, name: 'rose 7'},
              {value: 18, name: 'rose 8'}
            ]
          }
        ]
      };
      // 绘制图表
      myChart.setOption(options);
    }
  }
}
</script>

<style scoped>
.bg-info1 {
  background-color: #2b9ac9 !important;
}

.bg-info2 {
  background-color: #7e57c2 !important;
}

.bg-info3 {
  background-color: #26cdcb !important;
}

.bg-info4 {
  background-color: #2b4049 !important;
}


.text-right {
  text-align: right;
}

.mini-stat {
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  /*margin-bottom: 20px;*/
  padding: 20px;
  color: #ffffff;
  height: 70px;
}

.mini-stat-icon {
  -moz-border-radius: 100%;
  -webkit-border-radius: 100%;
  border-radius: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  display: inline-block;
  float: left;
  font-size: 30px;
  height: 60px;
  line-height: 60px;
  margin-right: 10px;
  text-align: center;
  width: 60px;
}

.mini-stat-info {
  padding-top: 2px;
  color: #eeeeee;
}

.mini-stat-info span {
  color: #ffffff;
  display: block;
  font-size: 24px;
  font-weight: 600;
}

</style>
