<template>
    <div class='list'>
    <div class='top-action'>
            <b>{{$t('Source')}}:</b>
            <el-select class='round_select' v-model="current_source" :placeholder="$t('select source')" @change = 'changeSelect'>
                <el-option
                  v-for="item in options"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
         <b style='margin-left:10px;'>Status:</b>
         <span class='ws_status'  :style="{backgroundColor: ws_status_bgcolor}">{{current_time}}</span>
         <b style='margin-left:10px;'>Description:</b>
         <span :style="{color: load_desc_color}">{{load_desc}}</span>
    </div>

    <bel-table
      v-if = 'mt4_panel_show'
      ref="table"
      :configs="tableConfig">
      <template slot="expand" scope="scope">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item v-for='(item,key) in scope.row.attributes' :label="key.toUpperCase()+'：'">
            <span>{{item? item :'null'}}</span>
          </el-form-item>
        </el-form>
      </template>
      <template slot="adjust_enabled" scope="scope">
             <i class='icon icon_edit' @click='enterEdit(scope.row)' v-if='!scope.row.editFlag'></i>
             <i class='icon icon_back' v-if='scope.row.editFlag' @click='exitEdit(scope.row)'></i>
      </template>
      <template slot="rule_type" scope="scope">
            <el-popover
                    class='type_attr_popover'
                    placement="bottom-start"
                    v-if='scope.row.hoverContent'
                    width="160"
                    trigger='hover'
                    >
                    <table class='w100'>
                      <tbody>
                          <tr v-for=' obj in scope.row.hoverContent'>
                              <td v-for ='(item,key) in obj'>
                                {{$t(item)}}
                              </td>
                          </tr>
                      </tbody>
                    </table>
                     <span class='text_link' slot="reference">
                     {{$t(scope.row.type)}}</span>
              </el-popover> 
              <span v-if='!scope.row.hoverContent'>{{$t(scope.row.type)}} </span> 
      </template>
      <template slot="edit_adjust" scope="scope">
          <span v-if='!scope.row.editFlag'>{{scope.row.adjust_step}}</span>
          <div v-if='scope.row.editFlag'>
            <i class="round" @click="controlAdjust('reduce',scope.row)">-</i>
            <input type="text" class='adjust_step' v-model='scope.row.adjust_step'>
            <i class="round" @click="controlAdjust('add',scope.row)">+</i>
          </div>    
      </template>
      <template slot="adjust" scope="scope">
            <span :style="scope.row.attributes.adjust > 0 ? 'color:rgb(93,205,11);':(scope.row.attributes.adjust < 0 ?'color:red;' : 'color:black;')">{{scope.row.attributes.adjust > 0 ? '+'+scope.row.attributes.adjust : scope.row.attributes.adjust}}</span>
      </template>
      <template slot="std_symbol" scope="scope">
            <a href = "JavaScript:void(0)" class='text_link' type="text" @click = 'showLpQuoteTable(scope.row)'>{{scope.row.std_symbol}}</a>
      </template>
      <template   slot="bid_change" scope="scope">
            <span class='arrow' :style="scope.row.bid_change== '&darr;' ?'color : red;' : ' color: green;' " v-html ='scope.row.bid_change'></span>
      </template>
      <template   slot="ask_change" scope="scope">
            <span class='arrow' :style="scope.row.ask_change== '&darr;' ?'color : red;' : ' color: green;' " v-html ='scope.row.ask_change'></span>
      </template>
    </bel-table>
      <el-dialog  :visible.sync="dialogTableVisible" top='10%'>
          <lp-quote 
          :digits = 'lp_quote_dialog.digits'
          :stdSymbol = 'lp_quote_dialog.stdSymbol'
          >
            
          </lp-quote>
      </el-dialog>
  </div>
</template>
<script >
  import QuoteAdjustJs from './QuoteAdjust.js';
  export default QuoteAdjustJs;
</script>
<style scoped lang='less'>

@import url(./QuoteAdjust.less);
</style>
