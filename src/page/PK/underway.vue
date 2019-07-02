<template>
  <div name='underway'>
    pk中{{info}}
  </div>
</template>

<script type='text/babel'>
  import APP from '@APP';
  export default {
    name: 'underway',
    data () {
      return {
        info: null
      };
    },
    mounted () {
      APP.loadData = (data) => {
        this.info = data;
      };
    }
  };
</script>
<style scoped lang="less">
  [name = 'underway']{}
</style>
