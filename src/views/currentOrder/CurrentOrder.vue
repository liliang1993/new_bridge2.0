<template>
    <div class='clearfix'>
    <el-row>
        <div class='actions-top'>
            <el-button type='primary' @click='addPositionDialogVisible=true;'>{{$t('Add Position')}}</el-button>
            <el-button type='primary' @click='deletePositionDialogVisible=true;'>{{$t('Delete Position')}}</el-button>
        </div>
    </el-row>
    <el-row class='current_order_panel' style='height:30px;
      line-height: 30px;'>
           <em style="color:#969696;font-weight:bold;">ORDER POSITIONS - </em>
           <span class='table_update_at'>{{nowTime}}</span>
           <em class='next_refresh'>NEXT REFRESH: </em> 
            <span class='remain_sec'>{{remain_sec}}</span>
           <strong class='desc'>ENABLE AUTO REFRESH:</strong>
            <i class='icon icon_refresh_enable' :class="{active: isActive}" @click='auto_refresh_control()'></i>
    </el-row>
    <bel-table
      ref="table"
      :configs="tableConfig">
           <template slot="lp_exec_orders" scope="scope">
              <a
                  href = "JavaScript:void(0)" 
                 @click='showLpOrdersTable(scope.row)' >LP Order</a>
          </template>
          <template slot="detail" scope="scope">
              <a
                  href = "JavaScript:void(0)" 
                 @click='showTradeLog(scope.row)' >{{$t('Detail')}}</a>
          </template>
    </bel-table>
    <el-col :span="24" class='btm-action'>
            <el-pagination
                class='pagination'
                :page-sizes="pagination.page_sizes"
                :page-size="pagination.page_size"
                :layout="pagination.layout"
                :total="pagination.total"
                :current-page='pagination.current_page'
                @current-change='onChangeCurrentPage'
                @size-change='onChangePageSize'>
            </el-pagination>
      </el-col>
      <el-dialog class='add_position_dialog' title="Add Position" :visible.sync="addPositionDialogVisible" top='10%'>
           <add-position></add-position>   
      </el-dialog>
      <el-dialog class='delete_position_dialog' title="Delete Position" :visible.sync="deletePositionDialogVisible" top='10%'>
           <delete-position></delete-position>   
      </el-dialog>
            
  
      <el-dialog class='trade_log_dialog' title="Trade Log" :visible.sync="tradeLogDialogVisible" top='10%'>
          <div class="log_wrap">
              <ul>
                <li v-for='(item,key) in log_dicts'>
                    <p>{{key.toUpperCase()}}</p>
                    <pre>{{item}}</pre>
                </li>
              </ul>
          </div>   
      </el-dialog>

   <!--  <drag-dialog 
        v-for = "(lp_order,index) in lp_orders"
        class='drag_dialog'
        :key="lp_order"
        :title="lp_order.title"
        @close = "onCloseLpOrder(index)"
      >
      <lp-order :LPOrder ='lp_order.config'></lp-order>
    </drag-dialog>

      <drag-dialog
        v-for = "(trade_log,index) in trade_logs"
        :key="trade_log"
        class='drag_dialog'
        :title="trade_log.title"
        @close = "onCloseTradeLog(index)"
      >
      <trade-log :TradeLog='trade_log.config'> </trade-log>
    </drag-dialog>
    <drag-dialog 
        v-if = 'add_position.show'
        class='drag_dialog'
        :title="add_position.title"
        @close = "onCloseOnlyDialog('add_position')"
      >
      <add-position></add-position>
    </drag-dialog>
    <drag-dialog 
        v-if = 'del_position.show'
        class='drag_dialog'
        :title="del_position.title"
        @onRestTableData = 'onRestTableData'
        @close = "onCloseOnlyDialog('del_position')"
      >
      <del-position></del-position>
    </drag-dialog>   -->
  </div>
</template>
  
<script >
import  CurrentOrderJs from './CurrentOrder.js';
export default CurrentOrderJs;
</script>
<style scoped lang='less'>
@import url(./CurrentOrder.less);
</style>
