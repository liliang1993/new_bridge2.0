<template v-loading.fullscreen.lock="$store.state.global.ajax_loading">
    <div class="home">
       
        <left-menu></left-menu>
        <head-nav></head-nav>       
        <div class="content" :style="{marginLeft:$store.state.leftmenu.width+'px',height:(win_size.height-100)+'px'}">
                    <!-- <bread></bread> -->
                    <router-view></router-view>
        </div>
        <drag-dialog class='add_traderule_dialog' 
        :title = "{text:$t('Add Trade Rule')}"
        v-if='$store.state.traderule.add_trade_group'
        @close = 'close_add_trade_group'
        >
            <traderule-dia
            @submit = 'add_trade_group_submit'
            ></traderule-dia>
        </drag-dialog>

        <drag-dialog class='add_traderule_dialog' 
        v-if='$store.state.traderule.add_trade_rule'
        :title = "{text:$t('Add Trade Rule')}"
        @close = 'close_add_trade_rule'
        >
            <traderule-dia
            :Common = 'add_tradeRule_common'
            ></traderule-dia>
        </drag-dialog>
        <drag-dialog class='add_traderule_dialog' 
        v-if='$store.state.traderule.edit_trade_rule'
        :title = "{text:$t('Edit Trade Rule')}"
        @close = 'close_edit_trade_rule'
        >
            <traderule-dia
            :Common = '$store.state.traderule.edit_rules_dict.common'
            :Attributes = '$store.state.traderule.edit_rules_dict.attributes'
            ></traderule-dia>
        </drag-dialog>
        <!-- currentorder lp_order -->
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
            <!-- clienttradelog lp_order -->
            <drag-dialog  
        v-for='(item,key) in $store.state.clienttradelog.lp_order_dicts'
        @close = 'close_tlog_lp_order_table(key)'
        :key = key
        >
            <lp-order
            :LPOrder ='item'
            >  
            </lp-order>
        </drag-dialog>
        <!-- addPosition -->
        <drag-dialog
            v-if = '$store.state.global.add_position'
            @close= 'close_addPosition_Dialog'
        >
                 <add-position></add-position>
      </drag-dialog>
      <!-- deletePosition -->
      <drag-dialog
            v-if = '$store.state.global.delete_position'

            @close= 'close_deletePosition_Dialog'
        >
                 <delete-position></delete-position>
      </drag-dialog>
        <!-- MT4 Position -->
        <drag-dialog 
                v-if='$store.state.mt4position.isShow'
              class='mt4_position_dialog'
              title="MT4 POSITION"
              @close = "close_mt4_position()"
            >
                <mt4-position></mt4-position> 
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
                },
                add_tradeRule_common:{
                        source:this.$route.query.source,
                        group:this.$route.query.group
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
            add_trade_group_submit(args){
                this.$$api_common_ajax({
                  data: {
                    func_name: 'router_api.trade_add_rule',
                    args,
                    kwargs: {}
                  },
                  fn: data => {
                    // this.find_page_user();
                    this.close_add_trade_group();
                  },
                  errFn: (err) => {}
                });
            },
            close_edit_trade_rule(){
                this.$store.dispatch('hide_edit_trade_rule');
            },
            close_add_trade_rule(){
                this.$store.dispatch('hide_trade_rule');
            },
            close_lp_order_table(key){
                this.$store.dispatch('delete_lp_order_dicts',key);
            },
            close_tlog_lp_order_table(key){
                this.$store.dispatch('delete_tlog_lp_order_dicts',key);
            },
            close_mt4_position(){
                this.$store.dispatch('hide_mt4_positions');
            },
            close_addPosition_Dialog(){
                this.$store.dispatch('hide_add_position');
            },
            close_deletePosition_Dialog(){
                this.$store.dispatch('hide_delete_position');
            }
        },
        created(){
            this.setSize();
            this.$$lib_$(window).resize(() => {
                this.setSize();
            });
        },
        mounted(){
            console.log('123router',this.$route.query);
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
