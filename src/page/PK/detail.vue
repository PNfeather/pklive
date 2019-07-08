<template>
  <div name='detail' class="fillcontain">
    <header class="header">PK</header>
    <section class="pkTableDetail">
      <div class="item" v-for="(item, index) in pkTableDetail" :key="index">
        <div class="name" :class="{winner: item.pkPlayerList[0].pkResult == 'PK_RESULT_VICTORY'}">{{item.pkPlayerList[0].studentName}}</div>
        <div class="icon">
          <i class="iconfont iconvs"></i>
        </div>
        <div class="name" :class="{winner: item.pkPlayerList[1].pkResult == 'PK_RESULT_VICTORY'}">{{item.pkPlayerList[1].studentName}}</div>
      </div>
    </section>
  </div>
</template>

<script type='text/babel'>
  import APP from '@APP';
  import {pkDetail} from '@/api/pk';
  export default {
    name: 'detail',
    data () {
      return {
        pkTableDetail: []
      };
    },
    methods: {
      putData (data) {
        this.pkTableDetail = data.pkTableDetail;
      },
      mockInit () {
        pkDetail().then(res => {
          let data = res.data;
          if (data.code == 0) {
            let reData = data.data;
            this.pkTableDetail = [...reData];
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
        let data;
        window.cpa && (data = window.cpa.getData());
        if (data) {
          this.putData(JSON.parse(data));
        }
      }
    },
    mounted () {
      // this.dataInit();
      // this.appInit();
      this.mockInit(); // todo 待修改或完善
    }
  };
</script>
<style scoped lang="less">
  @import '~@/style/mixin';
  [name = 'detail']{
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .header{
      .wh(100%, 1.2rem);
      .ft(0.36rem, 1.2rem);
      padding-left: 0.7rem;
      border-bottom: 1px solid #BBBBBB;
    }
    .pkTableDetail{
      padding: 0.29rem;
      display: flex;
      flex-wrap: wrap;
      .item:nth-child(4n){
        border: none!important;
      }
      .item{
        border-right: 1px solid #BBBBBB;
        box-sizing: border-box;
        width: 25%;
        font-size: 0.31rem;
        line-height: .6rem;
        display: flex;
        .icon{
          flex: 0.47rem 0 0;
          .fac();
          .iconfont{
            font-size: 0.27rem;
            color: #FCCC60;
          }
        }
        .name{
          display: inline-block;
          flex: 1;
          .fac();
        }
        .winner{
          color: #30BF6C;
        }
      }
    }
  }
</style>
