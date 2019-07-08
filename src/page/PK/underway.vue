<template>
  <div name='underway' class="fillcontain">
    <header class="header">PK</header>
    <section class="pkTableDetail">
      <div class="item" v-for="(item, index) in pkTableDetail" :key="index">
        <div class="name" :class="{finished: item.pkPlayerList[0].pkStatus == 'PK_STATUS_SUBMITTED'}">{{item.pkPlayerList[0].studentName}}</div>
        <div class="icon">
          <i class="iconfont iconvs"></i>
        </div>
        <div class="name" :class="{finished: item.pkPlayerList[1].pkStatus == 'PK_STATUS_SUBMITTED'}">{{item.pkPlayerList[1].studentName}}</div>
        </div>
    </section>
    <footer class="footer">
      <div class="item" v-for="(item, index) in pkProblemReachRate" :key="index">
        <span class="sort">{{item.number}}、</span>
        <div class="chart" :id="'chart-' + index"></div>
        <div class="num">{{item.finishRate}}%</div>
        <div class="text">完成率</div>
      </div>
    </footer>
  </div>
</template>

<script type='text/babel'>
  import APP from '@APP';
  import {pkDetail, pkFinishedPre} from '@/api/pk';
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  // 引入各类图组件
  require('echarts/lib/chart/pie');
  export default {
    name: 'underway',
    data () {
      return {
        pkTableDetail: [],
        pkProblemReachRate: []
      };
    },
    methods: {
      putData (data) {
        this.pkTableDetail = data.pkTableDetail;
        this.pkProblemReachRate = data.pkProblemReachRate;
        this.$nextTick(() => {
          for (let i = 0; i < this.pkProblemReachRate.length; i++) {
            let pre = this.pkProblemReachRate[i].finishRate;
            let color = pre > 50 ? '#7ACAFB' : '#FFB600';
            let chart = echarts.init(document.getElementById('chart-' + i));
            let option = {
              series: [
                {
                  type: 'pie',
                  radius: ['38%', '70%'],
                  clockWise: false,
                  itemStyle: {
                    normal: {
                      label: {
                        show: false
                      },
                      labelLine: {
                        show: false
                      }
                    }
                  },
                  data: [
                    {value: pre, name: '完成'},
                    {value: 100 - pre, name: '未完成'}
                  ],
                  color: [color, '#f0f0f0']
                }
              ]
            };
            chart.setOption(option);
            window.addEventListener('load', () => {
              chart.resize();
            });
            window.addEventListener('resize', () => {
              chart.resize();
            });
          }
        });
      },
      mockInit () {
        Promise.all([pkDetail(), pkFinishedPre()]).then(res => {
          let result = {};
          let data1 = res[0].data;
          let data2 = res[1].data;
          if (data1.code == 0) {
            let reData = data1.data;
            result.pkTableDetail = [...reData];
          } else {
            this.$message.error(data1.message);
          }
          if (data2.code == 0) {
            let reData = data2.data;
            result.pkProblemReachRate = [...reData];
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
  @import '~@/style/mixin';
  [name = 'underway']{
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .header{
      .wh(100%, 1.2rem);
      .ft(.36rem, 1.2rem);
      padding-left: .7rem;
      border-bottom: 1px solid #BBBBBB;
    }
    .pkTableDetail{
      padding: .29rem;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      flex: 1;
      .item:nth-child(4n){
        border: none!important;
      }
      .item{
        border-right: 1px solid #BBBBBB;
        box-sizing: border-box;
        width: 25%;
        font-size: .31rem;
        display: flex;
        line-height: .5rem;
        .icon{
          flex: .47rem 0 0;
          .fac();
          .iconfont{
            font-size: .27rem;
            color: #FCCC60;
          }
        }
        .name{
          display: inline-block;
          flex: 1;
          .fac();
        }
        .finished{
          color: #5EB9F6;
        }
      }
    }
    .footer{
      width: 100%;
      flex: 2.8rem 0 0;
      display: flex;
      justify-content: flex-start;
      padding: 0 .3rem;
      .item{
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin-right: .45rem;
        .sort{
          position: absolute;
          top: 0;
          left: 0;
          .sc(.24rem, #333);
        }
        .chart{
          .wh(1.5rem, 1.5rem)
        }
        .num{
          .sc(.3rem, #333);
        }
        .text{
          .sc(.3rem, #666);
        }
      }
    }
  }
</style>
