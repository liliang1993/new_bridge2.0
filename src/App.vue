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

                var CancelToken = Vue.axios.CancelToken;
                var source = CancelToken.source();
                console.log('thisll',this);
                this.$store.dispatch('update_global_ajax_source',source);
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
