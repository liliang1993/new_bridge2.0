<template>
    <div class='clearfix'>
    <el-row>
        <div class='actions-top'>
            <el-button type='primary' @click='show_add_position'>{{$t('Add Position')}}</el-button>
            <el-button type='primary' @click='show_delete_position'>{{$t('Delete Position')}}</el-button>
        </div>
    </el-row>
    <el-row class='current_order_panel' style='height:30px;
      line-height: 30px;'>
           <em style="color:#969696;font-weight:bold;">ORDER POSITIONS - </em>
           <span class='table_update_at'>{{nowTime}}</span>
           <em class='next_refresh'>{{$t('NEXT REFRESH')}}: </em> 
            <span class='remain_sec'>{{remain_sec}}</span>
           <strong class='desc'>{{$t('ENABLE AUTO REFRESH')}}:</strong>
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
                 @click='showTradeLog(scope.row)' >{{$t('DETAIL')}}</a>
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
      <el-dialog
      title="TradeLog"
      class='trade_log_dialog'
      :visible.sync="tradeLogDialogVisible"
      top='10%'>
        <div class="log_wrap">
              <ul>
                <li v-for='(item,key) in log_dicts'>
                    <p>{{key.toUpperCase()}}</p>
                    <pre>{{item}}</pre>
                </li>
              </ul>
          </div>   
    </el-dialog>
  </div>
</template>
  
<script >
import  CurrentOrderJs from './CurrentOrder.js';
export default CurrentOrderJs;
</script>
<style scoped lang='less'>
@import url(./CurrentOrder.less);
</style>
