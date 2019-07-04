<template>
  <div name='underway' class="fillcontain">
    <header class="header">PK</header>
    <section class="cup">
      <span>pk</span>
      <img src="~@IMG/cup.png" alt="">
      <span>胜利</span>
    </section>
    <section class="groups">
      <div class="item" v-for="(item, index) in groups" :key="index">
        <div class="name">{{item.name1}}</div>
      </div>
    </section>
    <footer class="footer">
      <div class="item" v-for="(item, index) in finishedList" :key="index">
        <span class="sort">{{index + 1}}、</span>
        <div class="chart" :id="'chart-' + index"></div>
        <div class="num">{{item.pre}}%</div>
        <div class="text">正确率</div>
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
        groups: [],
        finishedList: []
      };
    },
    methods: {
      putData (data) {
        this.groups = data.groups;
        this.finishedList = data.finishedList;
        this.$nextTick(() => {
          for (let i = 0; i < this.finishedList.length; i++) {
            let pre = this.finishedList[i].pre;
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
            result.groups = [...reData];
          } else {
            this.$message.error(data1.message);
          }
          if (data2.code == 0) {
            let reData = data2.data;
            result.finishedList = [...reData];
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
      .ft(0.36rem, 1.2rem);
      padding-left: 0.7rem;
      border-bottom: 1px solid #BBBBBB;
    }
    .cup{
      flex: 2.2rem 0 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-size:90% 1.26rem;
      background-image: linear-gradient(-90deg, rgba(255,199,0,0.00) 0%, rgba(254, 209, 35, 0.4) 50%, rgba(253,218,68,0.00) 100%);
      background-repeat: no-repeat;
      background-position: center;
      span{
        font-size: 0.56rem;
        color: #FFB600;
        padding: 0 0.56rem;
      }
      img{
        width: 1.76rem;
        height: auto;
      }
    }
    .groups{
      padding: 0 0.29rem;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      align-content:flex-start;
      flex: 1;
      .item{
        flex: 11% 0 0;
        font-size: 0.31rem;
        display: flex;
        line-height: .6rem;
        .name{
          font-size: 0.31rem;
          text-align: center;
          display: inline-block;
          flex: 1;
        }
      }
    }
    .footer{
      margin-top: .5rem;
      width: 100%;
      flex: 2.8rem 0 0;
      display: flex;
      justify-content: flex-start;
      padding: 0 0.3rem;
      flex-wrap: wrap;
      .item{
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin-right: 0.45rem;
        flex: 1.5rem 0 0;
        .sort{
          position: absolute;
          top: 0;
          left: 0;
          .sc(0.24rem, #333);
        }
        .chart{
          .wh(1.5rem, 1.5rem)
        }
        .num{
          .sc(0.3rem, #333);
        }
        .text{
          .sc(0.3rem, #666);
        }
      }
    }
  }
</style>
