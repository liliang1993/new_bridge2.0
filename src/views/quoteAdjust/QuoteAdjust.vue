<template>
    <div class='list'>
    <el-row :gutter='20' class='top-action'>
            <span>Source:</span>
            <el-select v-model="current_source" placeholder="请选择" @change = 'changeSelect'>
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
    </el-row>

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
            <a 
            href = "JavaScript:void(0)"
            type="text" 
            @click='show_json_table(scope.row)'>
            {{scope.row.type}}
            </a>
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
            <a href = "JavaScript:void(0)" class='lp_quote_link' type="text" @click = 'showLpQuotes(scope.row)'>{{scope.row.std_symbol}}</a>
      </template>
      <template   slot="bid_change" scope="scope">
            <span class='arrow' :style="scope.row.bid_change== '&darr;' ?'color : red;' : ' color: green;' " v-html ='scope.row.bid_change'></span>
      </template>
      <template   slot="ask_change" scope="scope">
            <span class='arrow' :style="scope.row.ask_change== '&darr;' ?'color : red;' : ' color: green;' " v-html ='scope.row.ask_change'></span>
      </template>
    </bel-table>
<!--     <drag-dialog
                v-for="(rule_table,index) in rule_tables"
                :key = 'rule_table'
                :title="rule_table.title"
                @close="onCloseRowDialog('rule_tables',index)"
          >
               <rule-detail :Config='rule_table.config'></rule-detail> 
    </drag-dialog>
     <drag-dialog
            v-for="(lp_quote,index) in lp_quotes"
            :key = 'lp_quote'
            :title="lp_quote.title"
            @close="onCloseRowDialog('lp_quotes',index)"
      >
           <lp-quote :Config='lp_quote.config'></lp-quote> 
    </drag-dialog> -->
      <el-dialog title="" :visible.sync="dialogTableVisible" top='40%'>
          <lp-quote :Config='lp_quote_config'></lp-quote>
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
