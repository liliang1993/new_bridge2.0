<template>
    <section class="chart">
        <div class='auto_refresh_panel'>
            <b>{{$t("Current")}}:</b>
            <span class='current_symbol'>{{current_std_symbol}}</span>
            <b>{{$t('NEXT REFRESH')}}:</b>
             <span class='remain_sec' >{{remain_sec}}</span>
            <b>{{$t('STATUS')}}:</b>
            <span :style='{color:load_text_color}'>{{load_status}}</span>
        </div>
        <div class="wrap">
                <div class="select_panel">
                    <a  v-for=' (item,key) in std_symbols' class='select_btn' href='javascript:void(0);' @click='select_std_symbol_chart(key)'>
                    {{key}}
                    </a>
                </div>
            <div class='chart_show_panel' v-if='show_lp_symbols'>
                    <div class='tip_bar fix'>
                        <div class="total_div">
                             {{$t("Total Qty")}}:
                            <span :style="{color:total_qty_color}">
                            {{total_qty}}</span>
                        </div>  
                    </div>
                    <div class="pos_chart">
                        <div class="symbol_chart " v-for='(item,key) in  current_lp_symbols'>
                              <div class="lp_symbol_item">
                                  <div class="lp_weight" :style="{width: item.weight_width+'%'}">
                                    </div>
                                    <div class="lp_text">
                                        <div>
                                                <a href="javascript:void(0)" @click='showEditLpSymbol(item)'>
                                                    <span class="lp_status"  :style="{'color': item.lp_symbol.trade_enable?'green' :'red'}">
                                                        {{item.lp_symbol.trade_enable? $t('Enabled') : $t('Disabled' )}}
                                                    </span>
                                                    S:
                                                    <span>
                                                        {{item.lp_symbol.lp_symbol}}
                                                    </span>
                                                    
                                                </a>
                                        </div>
                                        </div>
                                    <div class="lp_position" :style="{width: item.position_width+'%', backgroundColor: item.position_bgcolor}">
                                  </div>
                                    <div class="lp_qty">
                                            <div style="margin-left: 10px;">
                                                <span>
                                                {{key.toUpperCase()+' Q:'}}
                                                </span>
                                                <span :style="{color: item.quantity_color}">
                                                {{item.quantity}}
                                                </span>
                                                &nbsp;&nbsp;
                                                W:
                                                <span>
                                                    {{item.lp_symbol.weight}}
                                                </span>
                                            </div>
                                    </div>
                                 </div>
                                <div style="height:20px; width:100%;">
                                </div>
                        </div>
                    </div>
            </div>  
       </div>
        <el-dialog title="Edit LP symbol" :visible.sync="editLpSymbolDialogTableVisible" top='30%'>
            <el-row :gutter='20'>
                <el-col :span='12'>
                    <p>STD Symbol:</p>
                    <el-input v-model='dialog.std_symbol'></el-input>  
                </el-col>
                <el-col :span='12'>
                    <p>Quote Enable:</p>
                     <el-select class='w100' v-model="dialog.quote_enable" placeholder="请选择">
                        <el-option
                          key="true"
                          label="true"
                          value="true">
                        </el-option>
                        <el-option
                          key="false"
                          label="false"
                          value="false">
                        </el-option>
                      </el-select>  
                </el-col>
                <el-col :span='12'>
                    <label>LP:</label>
                    <el-input v-model='dialog.lp'></el-input>  
                </el-col>
                <el-col :span='12'>
                    <label>Trade Enable:</label>
                    <el-select class='w100' v-model="dialog.trade_enable" placeholder="请选择">
                        <el-option
                          key="true"
                          label="true"
                          value="true">
                        </el-option>
                        <el-option
                          key="false"
                          label="false"
                          value="false">
                        </el-option>
                    </el-select>  
                </el-col>
                <el-col :span='12'>
                    <label>LP Symbol:</label>
                    <el-input v-model='dialog.lp_symbol'></el-input>  
                </el-col>
                <el-col :span='12'>
                    <label>Weight:</label>
                    <el-input v-model='dialog.weight'></el-input>  
                </el-col> 
                <el-col :span='24' class='confirm_btn'>
                    <el-button type="primary" >Confirm</el-button>
                </el-col>  
            </el-row>
        </el-table>
</el-dialog>
    </section>    
</template>

<script>
    import StdSymbolPositionJs from './StdSymbolPosition.js';
    export default StdSymbolPositionJs;
</script>
<style scoped lang='less'>
  @import url(./StdSymbolPosition.less);
</style>
