<template>
    <div class='clearfix'>
    <el-row class='actions-top'>
            <label>CLIENT</label>
            <el-input class='search_input' v-model='keywords.client.value'></el-input>
            <label>ORD ID</label>  
            <el-input class='search_input' v-model='keywords.ord_id.value'></el-input> 
            <label>GROUP</label>  
            <el-input class='search_input' v-model='keywords.group.value'></el-input>  
            <label>SYMBOL</label>
            <el-input class='search_input' v-model='keywords.symbol.value'></el-input>
            <label>SIZE</label>  
            <!-- <el-input class='search_input' v-model='keywords.size.value'></el-input><label>STATUS</label> -->

            <el-input class='search_input' v-model='keywords.status.value'></el-input> 
            <label>TIME</label>
            <el-date-picker v-model="keywords.time_range.value" type="daterange" align="right" placeholder="选择日期范围" picker-options="pickerOptions" format="yyyy/MM//dd"></el-date-picker>
            <el-button type='primary' @click='onSearchKeyWord'>Search</el-button>
            <el-button type='primary' @click='onDownLoad'>Download Detailed Execel</el-button>
             <el-button type='primary' @click='onShowProfit'>Show Profit</el-button>
    </el-row>
    <el-row class='current_order_panel' style='height:30px;
      line-height: 30px;'>
           <em style="color:#969696;font-weight:bold;">TRADE LOG - </em>
           <span class='table_update_at'>{{nowTime}}</span>
           <em class='next_refresh'>NEXT REFRESH: </em> 
            <span class='remain_sec'>{{remain_sec}}</span>
           <strong class='desc'>ENABLE AUTO REFRESH:</strong>
            <i class='icon icon_refresh_enable' :class="{active: isActive}" @click='auto_refresh_control()'></i>
    </el-row>
    <bel-table
      ref="table"    
      :configs="tableConfig">
          <template slot="handler" scope="scope">
              <el-button
                  type="info"
                  icon='edit'
                  size="mini"
                  @click='onEditUser(scope.row)'></el-button>
          </template>
          <template slot="status" scope="scope">
              <span
                  :class='status[scope.$index].class'
                  > {{status[scope.$index].text}}</span>
          </template>
          <template slot="ord_id" scope="scope">
              <a
                  href="JavaScript:void(0)"
                  @click = "show_trade_log(scope.row)"
                  >{{get_order_id(scope.row)}}</a>
          </template>
          <template slot="lp_orders" scope="scope">
              <a
                  href="JavaScript:void(0)"
                  @click = "show_lp_orders(scope.row)"
                  > LP Orders</a>
          </template>
          <template slot="expand_content" scope="scope">
              
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
      
     <!--  <drag-dialog
          :title='trade_profit.title'
          class='drag_dialog'
          v-if = 'trade_profit.show'
          @close='onCloseProfit'
      >
            <trade-profit :ProfitConfig = 'trade_profit.config'></trade-profit>
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
        v-for = "(lp_order,index) in lp_orders"
        class='drag_dialog'
        :key="lp_order"
        :title="lp_order.title"
        @close = "onCloseLpOrder(index)"
      >
      <lp-order :LPOrder ='lp_order.config'></lp-order>
    </drag-dialog> -->
      <form ref = 'download_file'  action='/ajax/api?post_type=form' method='post' > <input class='value' name='json' type='hidden'  v-model='download_file_body'  /> </form>
  </div>
</template>
  
<script >
import TradeLogJs from './TradeLog.js';
export default TradeLogJs;
</script>
<style scoped lang='less'>
    .actions-top{
        min-width:1300px;
        margin-bottom: 10px;
        .search_input{
          display:inline-block;
          width:70px;
        }
    }
    .button-list{
      margin-left: -20px;
    }
    .btm-action{
        margin-top: 20px;
        text-align: center;
    }
     .pagination{
        display: inline-block;
    }
  .current_order_panel{    
      margin-bottom:10px;
        .table_update_at{
          color:rgb(50,50,50);
          font-weight:bold;
        }
        .next_refresh{
          color:rgb(50,50,50);
          font-weight:bold;
        }
        .remain_sec{
          display:inline-block;
          width: 29px;
          height: 29px;
          border:1px solid #ccc;
          text-align:center;
          line-height: 29px;
          color:#0287f9;
        }
        .desc{
          color:rgb(50,50,50);
          font-weight:bold;
        }
    }
  .success{
      color:green;
  }
  .error{
    color: red;
  }
</style>