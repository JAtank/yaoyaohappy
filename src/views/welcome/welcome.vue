/**
* Created by zhoutengteng on 2017/9/28.
*/
<template>
    <div class="welcome">
      <div class="up">
        <div class="entering">手动录入</div>
        <div class="import">
          文件导入
          <input type="file" accept="application/vnd.ms-excel" @change="getFile()" ref="inputFile">
        </div>
      </div>
      <div class="down"></div>
    </div>
</template>

<script type="text/ecmascript-6">
  import XLSX from 'xlsx'; //引入依赖模块
    export default {
        name: 'welcome',
        components: {},
        created(){

        },
        props: {},
        data(){
            return {
              apiData: {},
              msg:''
            }
        },
        computed: {},
        methods: {
            getFile(){
                console.log("文件路径为："+this.$refs.inputFile.value);
                try {
                  var workbook = XLSX.readFile(this.$refs.inputFile.value); //读取文件
                  var workSheet = workbook.Sheets[workbook.SheetNames[0]]; //获取工作薄中的单个表（初期设定为第一个表）
                  var workData=XLSX.utils.sheet_to_json(workSheet,{header:1}); //获取第一列且转换为Json
                  console.log(workData);
                  //构建本地数据库
                }catch(err){
                    console.log("文件格式错误")
                }
            },
            creatDB(name){ //创建本地数据库
//                var request=window.indexedDB.open(name);


            }
        },
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

