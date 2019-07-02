<template>
  <div name='detail'>
    <header>PK</header>
    <section class="groups">
      <div class="item">a <i class="iconfont iconvs"></i> b</div>
    </section>
  </div>
</template>

<script type='text/babel'>
  import {pkDetail} from '@/api/pk';
  export default {
    name: 'detail',
    data () {
      return {
      };
    },
    created () {
      pkDetail().then(res => {
        console.log(res);
        let data = res.data;
        if (data.code == 0) {
          let reData = data.data;
          console.log(reData);
        } else {
          this.$message.error(data.message);
        }
      });
    },
    mounted () {},
    computed: {},
    watch: {},
    methods: {},
    components: {}
  };
</script>
<style scoped lang="less">
  @import '~@/style/mixin';
  [name = 'detail']{}
</style>
