/**
* Created by Administrator on 2017/9/30.
*/
<template>
    <div id="addStudent">
        <div class="addContent">
          <span class="content" v-for="(item,index) in stuList">
            {{item.name}}
          </span>
          <div class="btn" @click="toSure()">确定</div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: '',
        components: {},
        created(){
        },
        props: {
            stuList:{
                type:Array,
            }
        },
        data(){
            return {}
        },
        computed: {},
        methods: {
            toSure(){
              this.$emit('sure');
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "~SCSS/index";
    #addStudent{
      @include center;
      position: fixed;
      width: 100%;
      height: 100%;
      top:0;
      left: 0;
      z-index: 9999;
      .addContent{
        width: 500px;
        height: 250px;
        background-color: white;
        border: 10px solid seagreen;
        .title{
          font-size: 24px;
        }
        .btn{
          @include center;
          width: 90px;
          height: 40px;
          margin: 170px auto 10px;
          background-color: #4BC6FF;
        }
      }
    }

</style>

