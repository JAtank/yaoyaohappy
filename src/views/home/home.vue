/**
* Created by Administrator on 2017/9/30.
*/
<template>
    <div class="home">
      <div class="peopleNum">
        <span>请输入提问的学生人数：</span>
        <input placeholder="输入希望挑选学生人数" v-model="num" type="number">
      </div>
      <div class="content" v-if="isFinish">
        <div class="stu-content"  v-for="(item,index) in stuList" :key="item.index">
          <p>{{item.name}}</p>
          <p>序号：{{item.index+1}}</p>
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
              isShowMd:false,
              num:0,
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
              let currentList = Array.from(this.stuList);
              this.shuffle(currentList);
              this.chanceStuList = currentList.slice(0, this.num);
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
              if(!this.stuList.length){
                return;
              }
              if(this.num<=0){
                alert("请先输入正确提问人数！！");
                return
              }
              if(this.num>this.stuList.length){
                alert("提问人数大于实际人数！！");
                return;
              }
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
      padding: 10px;
      background-color: wheat;
      .peopleNum{
        margin-left: 20px;
        color: #666;
        ::-webkit-input-placeholder {
          color: #BEBEBE;
          font-size: 14px;
        }
        :-moz-placeholder {
          color: #BEBEBE;
          font-size: 14px;
        }
        ::-moz-placeholder {
          color: #BEBEBE;
          font-size: 14px;
        }
        :-ms-input-placeholder {
          color: #BEBEBE;
          font-size: 14px;
        }
      }
      .content{
        width: 100%;
        max-height: 87%;
        overflow: auto;
        padding: 20px;
        background-color: white;
        border-radius: 10px;
        margin-top: 10px;
        color: #666;
        .stu-content{
          display: inline-block;
          width: 25%;
          height: 85px;
          text-align: center;
        }
      }
      .check-btn{
        width: 90px;
        height: 40px;
        margin: 10px auto ;
        padding-top: 8px;
        background-color: cornflowerblue;
        border-radius: 20px;
        text-align: center;
        color: white;
      }
    }
</style>

