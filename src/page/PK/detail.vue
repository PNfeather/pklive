<template>
  <div name='detail' class="fillcontain">
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
  </div>
</template>

<script type='text/babel'>
  import APP from '@APP';
  // import {pkDetail} from '@/api/pk';
  export default {
    name: 'detail',
    data () {
      return {
        groups: []
      };
    },
    created () {
      // pkDetail().then(res => {
      //   let data = res.data;
      //   if (data.code == 0) {
      //     let reData = data.data;
      //     this.groups = [...reData];
      //   } else {
      //     this.$message.error(data.message);
      //   }
      // });
    },
    mounted () {
      APP.loadData = (data) => {
        this.groups = data.groups;
      };
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
  }
</style>
