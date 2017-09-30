/**
* Created by zhoutengteng on 2017/9/28.
*/
<template>
    <div class="welcome">
      <div class="up">
        <div class="entering" @click="toShowMdAdd()">手动录入</div>
        <div class="import">
          文件导入
          <input type="file" accept="application/vnd.ms-excel" @change="getFile()" ref="inputFile">
        </div>
      </div>
      <div class="down">
        <div class="down-btn" @click="toNext()">已经拥有数据，继续操作</div>
      </div>
      <md_add_student v-if="isShowMdAddStu" @sure="toSure"></md_add_student>
    </div>
</template>

<script type="text/ecmascript-6">
  import XLSX from 'xlsx'; //引入依赖模块
  import md_add_student from './md/md_add_stu.vue'
    export default {
        name: 'welcome',
        components: {md_add_student},
        created(){},
        props: {},
        data(){
            return {
              request:{},
              isShowMdAddStu:false,
            }
        },
        computed: {},
        methods: {
            getFile(){
                try {
                  var workbook = XLSX.readFile(this.$refs.inputFile.value); //读取文件
                  var workSheet = workbook.Sheets[workbook.SheetNames[0]]; //获取工作薄中的单个表（初期设定为第一个表）
                  var workData=XLSX.utils.sheet_to_json(workSheet,{header:1}); //获取第一列且转换为Json
                  //构建本地数据库
                  let stuList=[];
                  for(let i=0;i<workData.length;i++){
                      let stuObj={
                          index:i,
                          name:workData[i][0]
                      }
                      stuList.push(stuObj);
                  }
                  this.createdDB(stuList);
                }catch(err){
                  console.log("文件格式错误");
                }
            },
            createdDB(list){ //创建本地数据库
                let db;
                let version = window.localStorage.getItem('version');
                if(version){
                    version++;
                }else {
                    version = 1;
                }
                this.request = window.indexedDB.open('stuName',version);
                window.localStorage.setItem('version',version);
                this.request.onerror=function(event){
                  alert("Why didn't you allow my web app to use IndexedDB?!");
                };
                this.request.onsuccess=function(event){
                  db=event.target.result;
                  setTimeout(() => {
                      db.close();
                  },500);
                };
                this.request.onupgradeneeded=function(event){
                  db=event.target.result;
                  if(db.objectStoreNames.contains('student')){
                    db.deleteObjectStore('student');
                  }
                  let student = db.createObjectStore('student',{keyPath: "index"});
                  for(let i in list){
                    student.add(list[i]);
                  }
                  alert("导入成功");
                };
            },
            toShowMdAdd(){
                this.isShowMdAddStu = true;
            },
            toSure(msg){
                this.isShowMdAddStu = false;
                if(!msg){
                  alert('输入内容为空！！');
                  return;
                }else if(msg.indexOf('；')==-1){
                  alert('输入姓名的格式错误！！');
                  return;
                }
                let msgList=msg.split('；');
                let db;
                let version = window.localStorage.getItem('version');
                this.request = window.indexedDB.open('stuName',version);
                this.request.onerror=function(event){
                  alert("Why didn't you allow my web app to use IndexedDB?!");
                };
                this.request.onsuccess=function(event){
                  db=event.target.result;
                  let transaction=db.transaction('student','readwrite');
                  let store=transaction.objectStore('student');
                  let cursorObj=store.openCursor();//db为IDBDatabase对象
                  let num = 0;
                  cursorObj.onsuccess=function (e) {
                      let cursor = e.target.result;
                      if(cursor){
                         num++;
                         cursor.continue();
                      }else {
                        for(let i=0;i<msgList.length-1;i++){
                          let stuObj={
                            index:num+i,
                            name:msgList[i]
                          }
                          store.add(stuObj);
                        }
                        alert('录入成功！！');
                        setTimeout(() => {
                            db.close();
                        },500)
                      }
                  }
                }
            },
            toNext(){
              this.$router.push('/home')
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
        @include center;
        width: 100%;
        height: 50%;
        background-color: #7480E2;
        .down-btn{
          font-size: 18px;
          background-color: white;
          padding: 10px;
          border-radius: 20px;
        }
      }
    }
</style>

