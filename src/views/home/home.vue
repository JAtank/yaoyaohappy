/**
* Created by Administrator on 2017/9/30.
*/
<template>
    <div class="home">
      <div class="content" v-if="isFinish">
        <div class="stu-content"  v-for="(item,index) in stuList" :key="item.index">
          <p>{{item.name}}</p>
          <p>{{item.index}}</p>
        </div>
      </div>
      <div class="check-btn" v-if="isFinish" @click="toShowMd">开始选择</div>
      <mdShowStu :stuList="chanceStuList" v-if="isShowMd" @sure="isShowMd=false"></mdShowStu>
    </div>
</template>

<script type="text/ecmascript-6">
  import mdShowStu from "../home/md/md_show_stu.vue"
    export default {
        name: 'home',
        components: {mdShowStu},
        created(){
            this.getData();
        },
        props: {},
        data(){
            return {
              stuList:[],
              chanceStuList:[],
              isFinish:false,
              isShowMd:false
            }
        },
        computed: {},
        methods: {
            getData(){
              let list=[];
              let that = this;
              let version = window.localStorage.getItem('version');
              window.indexedDB.open('stuName',version).onsuccess=function (e) {
                  e.target.result.transaction('student','readwrite')
                                 .objectStore('student')
                                 .openCursor()
                                 .onsuccess = function (e) {
                    let cursor = e.target.result;
                    if(cursor){
                        list.push(cursor.value);
                        cursor.continue();
                    }else {
                        console.log(list);
                        that.isFinish = true;
                        that.stuList = list;
                    }
                  }
              };
            },
            randomStu(){
              let currentList = this.stuList;
              this.shuffle(currentList);
              if(!currentList.length){
                  return;
              }
              if(currentList.length<=3){
                this.chanceStuList = currentList.slice(0,1);
              }else if(currentList.length<=10){
                this.chanceStuList = currentList.slice(0,2);
              }else if(currentList.length<=30){
                this.chanceStuList = currentList.slice(0,3);
              }else {
                this.chanceStuList = currentList.slice(0,5);
              }

            },
            shuffle(a) { //数组乱序
              var len = a.length;
              for (var i = 0; i < len - 1; i++) {
              var index = parseInt(Math.random() * (len - i));
              var temp = a[index];
              a[index] = a[len - i - 1];
              a[len - i - 1] = temp;
              }
            },
            toShowMd(){
              this.randomStu();
              this.isShowMd = true;
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "~SCSS/index";
    .home{
      width: 100%;
      height: 100%;
      .content{
        width: 100%;
        max-height: 95%;
        overflow: auto;
        .stu-content{
          display: inline-block;
          width: 25%;
          height: 85px;
        }
      }
      .check-btn{
        width: 70px;
        margin: 0 auto ;
      }
    }
</style>

