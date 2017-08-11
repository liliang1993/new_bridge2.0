<template>
    <div id="app">
        <transition name="bounce">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
	export default {
		name      : 'app',
		components: {},
		data(){
			return {

            }
		},
        methods:{
			init(){

            },
        },
        mounted(){
			this.init();
        },
        watch:{
        	$route(to,from){

            }
        }
	}
</script>

<style lang="less">
    *{
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin:0px;
        padding:0px;
    }
    body{line-height:1.4;color:#666;font-family:"微软雅黑";font-size: 14px;}
    input,textarea,select{font-family:inherit;font-size:100%;}
    input{padding:0;border:0px;outline:0;}
    body,h1,h2,h3,h4,h5,h6,p,ul,ol,dl,dt,dd,li,form{ margin:0;}
    h4,h5,h6{font-size:12px;}
    ul,ol,dl,li{padding-left:0; list-style-type:none;}
    /*image with no-border*/
    img{border:0;display: block;}
    table { 
        border-collapse: collapse; 
        border-spacing: 0; 
    }
    tr,td,th{
      padding:0;
    }
    em,i{ font-style:normal;}
    a{ text-decoration:none;color: #666}
    a:hover{color: #fed735}
    /*a:hover{ color:#eac171;}*/

    .bounce-enter-active {
        animation: bounce-in .5s;
        -webkit-animation:bounce-in .5s;
    }

    .bounce-leave-active {
        animation: bounce-out .2s;
        -webkit-animation: bounce-out .2s;
    }

    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes bounce-out {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(0.95);
        }
        100% {
            transform: scale(0);
        }
    }
    .vm{
        vertical-align:middle;
    }
    .mr15{
        margin-right:15px;
    }
    .icon{
        display:inline-block;
        vertical-align:middle;
        background:url(./assets/icon.png) no-repeat center;
    }

    //table
     .table-wrap{
        padding:20px;
        padding-top:0px;
        background-color: #fff;
    }
    .el-table td, .el-table th.is-leaf {
    border-bottom: none;
    }
    .el-table{
        border:0;
    }
    .el-table__header-wrapper thead div{
        background-color: #fff;
    }
    .el-table th{
        background-color: #fff;
        height:50px;
        line-height: 50px;
        font-size:14px;
        
    }
    .el-table .el-table__body tr:nth-child(2n+1){
        background-color: #f5f5f5;
    }
    .el-table::after, .el-table::before{
        width:0px;
    }
    .auditLog_table{
    .el-table__body{
        tr{
          height:120px;
          td{
            padding:0;
          }
        }
    }
}
</style>
