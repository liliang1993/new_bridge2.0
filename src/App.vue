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
</style>
