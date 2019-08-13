<template>
  <div name='subjective' class="fillcontain">
    <section class="tableArea">
      <div class="title">
        考试统计-第2题 主观题
      </div>
      <div class="body">
        <div class="table" ref="table" v-show="subjectiveQuestionList.length">
          <div class="item" v-for="(item, index) in subjectiveQuestionList" :key="index">
            <div>
              <span class="name">{{item.name}}</span> <span class="score">{{(item.score || 0).toFixed(1)}}分</span>
            </div>
            <div>
              <span class="checker">批阅人 {{item.markerName}}</span>
            </div>
          </div>
          <div class="item" v-show="!!(subjectiveQuestionList.length % 2)"></div>
        </div>
      </div>
    </section>
    <section class="chartArea">
      <div class="title">错题反思</div>
      <div class="body">
        <div class="grayCircle" v-show="noChart">
          <div class="whiteCircle"></div>
        </div>
        <div v-show="!noChart" class="chart" id="chart"></div>
      </div>
    </section>
  </div>
</template>

<script type='text/babel'>
  import APP from '@APP';
  import {subjectiveTable, subjectiveChart} from '@/api/pk';
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  // 引入各类图组件
  require('echarts/lib/chart/pie');
  export default {
    name: 'subjective',
    data () {
      return {
        subjectiveQuestionList: [],
        noChart: true
      };
    },
    methods: {
      setOption (chart, data, type = false) {
        let unit = document.body.clientWidth * 100 / 1450;
        let dataList = [];
        let colorList = [];
        data.forEach((item) => {
          let cell = {
            value: item.count,
            name: item.name
          };
          dataList.push(cell);
          colorList.push(item.color);
        });
        let option = {
          tooltip: { // 提示框，可以在全局也可以在
            formatter: '{a} <br/>{b}: {c} ({d}%)',
            color: '#000', // 提示框的背景色
            textStyle: { // 提示的字体样式
              color: 'black'
            }
          },
          series: [
            {
              type: 'pie',
              radius: ['38%', '70%'],
              clockWise: false,
              itemStyle: {
                normal: {
                  borderWidth: 2,
                  borderColor: '#fff',
                  label: {
                    show: true,
                    formatter: '{b}: {c}',
                    fontSize: 0.18 * unit,
                    color: '#333333',
                    padding: [-(0.4 * unit), -(1.1 * unit), 0, -(1.1 * unit)]
                  },
                  labelLine: {
                    show: true,
                    length: 0.3 * unit,
                    length2: 1.1 * unit,
                    lineStyle: {
                      color: '#999'
                    }
                  }
                }
              },
              data: dataList,
              color: colorList
            }
          ]
        };
        chart.setOption(option, type);
      },
      putData (data) {
        console.log(data);
        this.subjectiveQuestionList = data.subjectiveQuestionList;
        if (!data.rethinkAbilityList || (data.rethinkAbilityList && !data.rethinkAbilityList.length)) { // 无图表数据显示灰色圈
          this.noChart = true;
        } else {
          this.noChart = false;
        }
        this.$nextTick(() => {
          let chart = echarts.init(document.getElementById('chart'));
          this.setOption(chart, data.rethinkAbilityList);
          window.addEventListener('load', () => {
            this.setOption(chart, data.rethinkAbilityList, true);
            chart.resize();
          });
          window.addEventListener('resize', () => {
            this.setOption(chart, data.rethinkAbilityList, true);
            chart.resize();
          });
        });
      },
      mockInit () {
        Promise.all([subjectiveTable(), subjectiveChart()]).then(res => {
          let result = {};
          let data1 = res[0].data;
          let data2 = res[1].data;
          if (data1.code == 0) {
            let reData = data1.data;
            result.subjectiveQuestionList = [...reData];
          } else {
            this.$message.error(data1.message);
          }
          if (data2.code == 0) {
            let reData = data2.data;
            result.rethinkAbilityList = [...reData];
          } else {
            this.$message.error(data2.message);
          }
          this.putData(result);
        });
      },
      appInit () {
        APP.loadData = (data) => {
          this.putData(data);
        };
      },
      dataInit () {
        let data;
        window.cpa && (data = window.cpa.getData());
        if (data) {
          this.putData(JSON.parse(data));
        }
      }
    },
    mounted () {
      this.dataInit();
      this.appInit();
      // this.mockInit(); // todo 待修改或完善
    }
  };
</script>
<style scoped lang="less">
  [name = 'subjective']{
    padding: 0.29rem 0;
    display: flex;
    overflow: hidden;
    .tableArea, .chartArea{
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding: 0 .4rem;
      .title{
        height: .9rem;
        min-height: .9rem;
        font-size: .36rem;
        color: #333;
        border-bottom: 1px solid #BBBBBB;
      }
    }
    .tableArea {
      flex: 52% 0 0;
      box-sizing: border-box;
      border-right: 1px solid #BBBBBB;
      .body{
        padding: .6rem 0;
        .table{
          border: 1px solid #E0E0E0;
          display: flex;
          flex-wrap: wrap;
          .item:nth-child(2n - 1){
            border-right: 1px solid #E0E0E0;
          }
          .item:nth-child(4n + 1),.item:nth-child(4n + 2){
            background: #F5F7FF;
          }
          .item{
            font-size: .24rem;
            color: #666;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            height: 1.16rem;
            flex: 50% 0 0;
          }
        }
      }
    }
    .chartArea{
      flex: 48% 0 0;
      .body{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        .grayCircle{
          width: 3rem;
          height: 3rem;
          border-radius: 100%;
          background: #999;
          display: flex;
          justify-content: center;
          align-items: center;
          .whiteCircle{
            width: 2rem;
            height: 2rem;
            border-radius: 100%;
            background: #fff;
            position: relative;
            z-index: 3;
          }
        }
        .chart{
          width: 100%;
          height: 4.5rem;
        }
      }
    }
  }
</style>
