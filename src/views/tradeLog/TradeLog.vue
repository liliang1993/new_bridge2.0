<template>
    <div class='clearfix tradelog_container'>
    <el-row class='actions-top fix'>
            <div class="search_item">
              <label>{{$t('CLIENT')}}</label>
              <el-input class='search_input' v-model='keywords.client.value'></el-input>
            </div>
            <div class="search_item">
              <label>{{$t('ORD ID')}}</label>  
            <el-input class='search_input' v-model='keywords.ord_id.value'></el-input> 
            </div>
            <div class="search_item">
             <label>{{$t('GROUP')}}</label>  
            <el-input class='search_input' v-model='keywords.group.value'></el-input>  
            </div>
            <div class="search_item">
              <label>{{$t('SYMBOL')}}</label>
            <el-input class='search_input' v-model='keywords.symbol.value'></el-input>
            </div>
            <div class="search_item">
              <label>{{$t('SIZE')}}</label>  
              <el-input class='search_input' v-model='keywords.size.value'></el-input>
            </div>
            <div class="search_item">
              <label>{{$t('STATUS')}}</label>
              <el-select class='search_select' v-model="keywords.status.value" placeholder="请选择">
                  <el-option
                    v-for="item in $store.state.global.ord_status"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
              </el-select>
            </div>
            <div class="search_item">
              <label>{{$t('TIME')}}</label>
            <el-date-picker class='search_date_picker' v-model="keywords.time_range.value" type="daterange" align="right" placeholder="选择日期范围"  format="yyyy/MM/dd"></el-date-picker>
            </div>
            <div class="button_bar">
              <el-button  type='primary' @click='onSearchKeyWord'>{{$t('Search')}}</el-button>
              <el-button  type='primary' @click='onDownLoad'>{{$t('Download Detailed Excel')}}</el-button>   
              <el-button type='primary' @click='onShowProfit'>{{$t('Show Profit')}}</el-button>
            </div>
            
    </el-row>
    <el-row class='current_order_panel' style='height:30px;
      line-height: 30px;'>
           <em style="color:#969696;font-weight:bold;">TRADE LOG - </em>
           <span class='table_update_at'>{{nowTime}}</span>
           <em class='next_refresh'>{{$t("NEXT REFRESH")}}: </em> 
            <span class='remain_sec'>{{remain_sec}}</span>
           <strong class='desc'>{{$t('ENABLE AUTO REFRESH')}}:</strong>
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
  <el-dialog
      title="TradeLog"
      class='trade_log_dialog'
      :visible.sync="tradeLog_dialogVisible"
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
      <form ref = 'download_file'  action='/ajax/api?post_type=form' method='post' > <input class='value' name='json' type='hidden'  v-model='download_file_body'  /> </form>
  </div>
</template>
  
<script >
import TradeLogJs from './TradeLog.js';
export default TradeLogJs;
</script>
<style lang='less'>
    @import url(./TradeLog.less);
</style>