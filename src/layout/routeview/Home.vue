<template v-loading.fullscreen.lock="$store.state.global.ajax_loading">
    <div class="home">
       
        <left-menu></left-menu>
        <head-nav></head-nav>       
        <div class="content" :style="{marginLeft:$store.state.leftmenu.width+'px',height:(win_size.height-100)+'px'}">
                    <!-- <bread></bread> -->
                    <router-view></router-view>
        </div>
        <drag-dialog class='add_traderule_dialog' 
        v-if='$store.state.traderule.add_trade_group'
        @close = 'close_add_trade_group'
        >
            <traderule-dia></traderule-dia>
        </drag-dialog>

        <drag-dialog class='add_traderule_dialog' 
        v-if='$store.state.traderule.edit_trade_rule'
        
        @close = 'close_edit_trade_rule'
        >
            <traderule-dia></traderule-dia>
        </drag-dialog>
        <drag-dialog class='add_traderule_dialog' 
        v-if='$store.state.traderule.add_trade_rule'
        
        @close = 'close_add_trade_rule'
        >
            <traderule-dia></traderule-dia>
        </drag-dialog>

        <drag-dialog  
        v-for='(item,key) in $store.state.currentorder.lp_order_dicts'
        @close = 'close_lp_order_table(key)'
        :key = key
        >
            <lp-order
            :LPOrder ='item'
            >  
            </lp-order>
        </drag-dialog>
    </div>
</template>
<script>
    import HeadNav from '../head-nav/HeadNav.vue';
	import LeftMenu from '../left-menu/LeftMenu.vue';
	import Bread from '../bread/Bread.vue';

    export default {
        name: 'home',
        components:{
            HeadNav,LeftMenu,Bread
        },
        data () {
            return {
                win_size: {
                    height: '',
                }
            }
        },
        methods:{
              setSize() {
                this.win_size.height = this.$$lib_$(window).height();
            },
            close_add_trade_group(){
                this.$store.dispatch('hide_trade_group');
            },
            close_edit_trade_rule(){
                this.$store.dispatch('hide_edit_trade_rule');
            },
            close_add_trade_rule(){
                this.$store.dispatch('hide_trade_rule');
            },
            close_lp_order_table(key){
                this.$store.dispatch('delete_lp_order_dicts',key);
            }
        },
        created(){
            this.setSize();
            this.$$lib_$(window).resize(() => {
                this.setSize();
            });
        },
        mounted(){

        }
    }
</script>
<style scoped lang='less'>
    .content{
        margin-top: 100px;
        background-color: #f5f5f5;
        padding: 0 16px;
    }
    
    .right-content{
        margin-bottom: 60px;
    }
    .right-auto{
        position:relative;
    }
</style>
