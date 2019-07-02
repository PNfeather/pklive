<template>
  <div name='detail' class="fillcontain">
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
  </div>
</template>

<script type='text/babel'>
  import {pkDetail} from '@/api/pk';
  export default {
    name: 'detail',
    data () {
      return {
        groups: []
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
    }
  };
</script>
<style scoped lang="less">
  @import '~@/style/mixin';
  [name = 'detail']{
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
  }
</style>
