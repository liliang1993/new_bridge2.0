<template>
    <div id="app">
        <transition name="bounce">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import Vue from 'vue';
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
 @import url(App.less);
</style>
