<template xmlns:>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'app',
    components: {},
    created(){
        this.toPage();
    },
    props: {},
    data(){
      return {
        apiData: {}
      }
    },
    computed: {},
    methods: {
        toPage(){
            this.$router.replace('/welcome');
        }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~SCSS/index";

</style>
