<template>
  <div name='underway' class="fillcontain">
    <header class="header">PK</header>
    <section class="groups">
      <div class="group" v-for="(group, groupIndex) in groups" :key="groupIndex">
        <div class="item" v-for="(item, itemIndex) in group" :key="itemIndex">
          <div class="name">{{item.name1}}</div>
          <div class="icon">
            <i class="iconfont iconvs"></i>
          </div>
          <div class="name">{{item.name2}}</div>
        </div>
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
  // import APP from '@APP';
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
    created () {
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
                      {value: this.finishedList[i].pre, name: '完成'},
                      {value: 100 - this.finishedList[i].pre, name: '未完成'}
                    ],
                    color: ['#7ACAFB', '#f0f0f0']
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
    mounted () {
      // APP.loadData = (data) => {
      //   this.info = data;
      // };
    }
  };
</script>
<style scoped lang="less">
  @import '~@/style/mixin';
  [name = 'underway']{
    display: flex;
    flex-direction: column;
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
      .group:last-child{
        border: none!important;
      }
      .group{
        flex: 1;
        box-sizing: border-box;
        border-right: 1px solid #BBBBBB;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        .item{
          width: 100%;
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
            text-align: center;
            display: inline-block;
            flex: 1;
          }
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
