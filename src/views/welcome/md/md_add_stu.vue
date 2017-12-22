/**
* Created by Administrator on 2017/9/30.
*/
<template>
    <div id="addStudent">
        <div class="addContent">
          <p class="title">请添加学生姓名（姓名以'；'结尾）</p>
          <textarea class="addName" v-model="msg"></textarea>
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
        props: {},
        data(){
            return {
                msg:''
            }
        },
        computed: {},
        methods: {
            toSure(){
              this.$emit('sure',this.msg);
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
      background: rgba(0, 0, 0, 0.6);
      .addContent{
        width: 500px;
        height: 250px;
        background-color: white;
        border: 5px solid cornflowerblue;
        padding: 10px;
        .title{
          font-size: 16px;
          color: cornflowerblue;
        }
        .addName{
          width: 90%;
          height: 60%;
          margin: 10px 25px;
          overflow: auto;
        }
        .btn{
          @include center;
          width: 90px;
          height: 40px;
          margin: 0 auto;
          border-radius: 20px;
          background-color: cornflowerblue;
          color: white;
        }
      }
    }

</style>

