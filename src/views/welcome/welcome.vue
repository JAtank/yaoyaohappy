/**
* Created by zhoutengteng on 2017/9/28.
*/
<template>
    <div class="welcome">
      <div class="up">
        <div class="entering">手动录入</div>
        <div class="import">
          文件导入
          <input type="file"></input>
        </div>
      </div>
      <div class="down"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: '',
        components: {},
        created(){

        },
        props: {},
        data(){
            return {
                apiData: {}
            }
        },
        computed: {},
        methods: {}
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "~SCSS/index";
    .welcome{
      width: 100%;
      height: 100%;
      .up{
        @include center;
        width: 100%;
        height: 50%;
        background-color: #0F8DBD;
        color: white;
        .entering{
          width: 80px;
          border: 1px solid white;
          border-radius: 15px;
          text-align: center;
        }
        .import{
          position: relative;
          width: 80px;
          border: 1px solid white;
          border-radius: 15px;
          text-align: center;
          margin-left: 60px;
          input{
            width: 100%;
            height: 100%;
            overflow: hidden;
            position: absolute;
            left: 0;
            opacity: 0;
          }
        }
      }
      .down{
        width: 100%;
        height: 50%;
        background-color: #7480E2;
      }
    }
</style>

