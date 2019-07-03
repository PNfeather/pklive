<template>
  <div name='underway' class="fillcontain">
    <header class="header">PK</header>
    <section class="groups">
      <div class="item" v-for="(item, index) in groups" :key="index">
        <div class="name">{{item.name1}}</div>
        <div class="icon">
          <i class="iconfont iconvs"></i>
        </div>
        <div class="name">{{item.name2}}</div>
        </div>
    </section>
    <footer class="footer">
      <div class="item" v-for="(item, index) in finishedList" :key="index">
        <span class="sort">{{index + 1}}、</span>
        <div class="chart" :id="'chart-' + index"></div>
        <div class="num">{{item.pre}}%</div>
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
          }
        });
      },
      mockInit () {
        pkDetail().then(res => {
          let data = res.data;
          if (data.code == 0) {
            let reData = data.data;
            this.groups = [...reData];
          } else {
            this.$message.error(data.message);
          }
        });
        pkFinishedPre().then(res => {
          let data = res.data;
          if (data.code == 0) {
            let reData = data.data;
            this.finishedList = reData;
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
              }
            });
          } else {
            this.$message.error(data.message);
          }
        });
      },
      appInit () {
        APP.loadData = (data) => {
          this.putData(data);
        };
      },
      dataInit () {
        if (this.$store.getters.data) {
          this.putData(this.$store.getters.data);
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
      .wh(100%, 120px);
      .ft(36px, 120px);
      padding-left: 70px;
      border-bottom: 1px solid #BBBBBB;
    }
    .groups{
      padding: 29px;
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      .item:nth-child(4n){
        border: none!important;
      }
      .item{
        border-right: 1px solid #BBBBBB;
        box-sizing: border-box;
        width: 25%;
        font-size: 31px;
        display: flex;
        .icon{
          flex: 47px 0 0;
          .fac();
          .iconfont{
            font-size: 27px;
            color: #FCCC60;
          }
        }
        .name{
          display: inline-block;
          flex: 1;
          .fac();
        }
      }
    }
    .footer{
      width: 100%;
      flex: 280px 0 0;
      display: flex;
      justify-content: flex-start;
      padding: 0 30px;
      .item{
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin-right: 45px;
        .sort{
          position: absolute;
          top: 0;
          left: 0;
          .sc(24px, #333);
        }
        .chart{
          .wh(150px, 150px)
        }
        .num{
          .sc(30px, #333);
        }
        .text{
          .sc(30px, #666);
        }
      }
    }
  }
</style>
