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
      <div class="check-btn" v-if="isFinish">开始选择</div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'home',
        components: {},
        created(){
            this.getData();
        },
        props: {},
        data(){
            return {
              stuList:[],
              chanceStuList:[],
              isFinish:false,
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
                        console.log("++++++++++++++++");
                        that.isFinish = true;
                        that.stuList = list;
                    }
                  }
              };
            },
            randomStu(){
              this.shuffle(this.stuList);
              this.chanceStuList = this.stuList.slice(0,5);
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
        height: 95%;
        .stu-content{
          display: inline-block;
          width: 25%;
          height: 85px;
        }
      }
      .check-btn{

      }
    }
</style>

