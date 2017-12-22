/**
* Created by Administrator on 2017/9/30.
*/
<template>
    <div id="addStudent">
        <div class="addContent">
          <div class="content">
              <span class="item" v-for="(item,index) in stuList">
                <span>{{item.name}}</span>
                <br/>
                <span style="font-size: 12px;">序号：{{item.index+1}}</span>
              </span>
          </div>
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
      background: rgba(0, 0, 0, 0.6);
      .addContent{
        position: relative;
        width: 500px;
        height: 250px;
        background-color: white;
        border: 5px solid cornflowerblue;
        padding: 10px;
        .content{
          @include center;
          flex-wrap: wrap;
          font-size: 20px;
          width: 100%;
          height: 180px;
          padding: 5px;
          border: cornflowerblue 1px solid;
          border-radius: 10px;
          color: #666;
          overflow: auto;
          .item{
            margin-left: 10px;
            text-align: center;
          }
        }
        .btn{
          @include center;
          width: 90px;
          height: 40px;
          margin: 5px auto;
          border-radius: 20px;
          background-color: cornflowerblue;
          color: white;
        }
      }
    }

</style>

