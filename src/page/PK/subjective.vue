<template>
  <div name='subjective' class="fillcontain">
    <section class="tableArea">
      <div class="title">
        考试统计-第2题 主观题
      </div>
      <div class="body">
        <div class="table" ref="table">
          <div class="item" v-for="(item, index) in tableData" :key="index">
            <div>
              <span class="name">{{item.name}}</span> <span class="score">{{item.score.toFixed(1)}}分</span>
            </div>
            <div>
              <span class="checker">批阅人 {{item.checker}}</span>
            </div>
          </div>
          <div class="item" v-show="!!(tableData.length % 2)"></div>
        </div>
      </div>
    </section>
    <section class="chartArea">
      <div class="title">错题反思</div>
      <div class="body">
        <div class="chart" id="chart"></div>
      </div>
    </section>
  </div>
</template>

<script type='text/babel'>
  import APP from '@APP';
  // import {subjectiveTable, subjectiveChart} from '@/api/pk';
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  // 引入各类图组件
  require('echarts/lib/chart/pie');
  export default {
    name: 'subjective',
    data () {
      return {
        tableData: []
      };
    },
    created () {
      // subjectiveTable().then(res => {
      //   let data = res.data;
      //   if (data.code == 0) {
      //     let reData = data.data;
      //     this.tableData = [...reData];
      //   } else {
      //     this.$message.error(data.message);
      //   }
      // });
      // subjectiveChart().then(res => {
      //   let data = res.data;
      //   if (data.code == 0) {
      //     let reData = data.data;
      //     this.$nextTick(() => {
      //       let chart = echarts.init(document.getElementById('chart'));
      //       let option = {
      //         tooltip: { // 提示框，可以在全局也可以在
      //           formatter: '{a} <br/>{b}: {c} ({d}%)',
      //           color: '#000', // 提示框的背景色
      //           textStyle: { // 提示的字体样式
      //             color: 'black'
      //           }
      //         },
      //         series: [
      //           {
      //             type: 'pie',
      //             radius: ['38%', '70%'],
      //             clockWise: false,
      //             itemStyle: {
      //               normal: {
      //                 borderWidth: 2,
      //                 borderColor: '#fff',
      //                 label: {
      //                   show: true,
      //                   formatter: '{b}: {c}',
      //                   fontSize: '24',
      //                   color: '#333333',
      //                   padding: [-40, -130, 0, -130]
      //                 },
      //                 labelLine: {
      //                   show: true,
      //                   length: 30,
      //                   length2: 130,
      //                   lineStyle: {
      //                     color: '#999'
      //                   }
      //                 }
      //               }
      //             },
      //             data: reData,
      //             color: ['#FFC04F', '#8FDA45', '#FE8989', '#4E97FA']
      //           }
      //         ]
      //       };
      //       chart.setOption(option);
      //     });
      //   } else {
      //     this.$message.error(data.message);
      //   }
      // });
    },
    mounted () {
      APP.loadData = (data) => {
        this.tableData = data.tableData;
        this.$nextTick(() => {
          let chart = echarts.init(document.getElementById('chart'));
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
                      fontSize: '24',
                      color: '#333333',
                      padding: [-40, -130, 0, -130]
                    },
                    labelLine: {
                      show: true,
                      length: 30,
                      length2: 130,
                      lineStyle: {
                        color: '#999'
                      }
                    }
                  }
                },
                data: data.chartData,
                color: ['#FFC04F', '#8FDA45', '#FE8989', '#4E97FA']
              }
            ]
          };
          chart.setOption(option);
        });
      };
    },
    computed: {},
    watch: {},
    methods: {},
    components: {}
  };
</script>
<style scoped lang="less">
  [name = 'subjective']{
    padding: 29px 0;
    display: flex;
    overflow: hidden;
    .tableArea, .chartArea{
      display: flex;
      flex-direction: column;
      padding: 0 40px;
      .title{
        height: 90px;
        min-height: 90px;
        font-size: 36px;
        color: #333;
        border-bottom: 1px solid #BBBBBB;
      }
    }
    .tableArea {
      flex: 52% 0 0;
      box-sizing: border-box;
      border-right: 1px solid #BBBBBB;
      .body{
        padding: 60px 0;
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
            font-size: 24px;
            color: #666;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            height: 116px;
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
        .chart{
          width: 100%;
          height: 450px;
        }
      }
    }
  }
</style>
