/**
* Created by Administrator on 2017/9/30.
*/
<template>
    <div class="home">
      <div class="content" v-if="isFinish"><!--v-show="isFinish" v-for="item in stuList"-->
        <!--<p>item.name</p>-->
        <!--<p>item.index</p>-->
      </div>
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
            isFinish:false,
            }
        },
        computed: {},
        methods: {
            getData(){
              let list=[];
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
//                        vue.$data.isFinish = true;
//                        vue.$data.stuList = list;
                    }
                  }
              };
//              console.log(this);
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
        height: 100%;
      }
    }
</style>

