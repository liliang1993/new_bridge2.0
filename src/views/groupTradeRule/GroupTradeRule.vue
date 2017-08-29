<template>
    <div class='group_tradeRule_container'>
      <el-row class='actions-top'>     
          <el-col :span='21'>
                      <div class='default_bar'>
                            <b>Default quote mark +:</b>
                            <el-input v-model='default_slippage'>
                            </el-input>  
                              <el-button  type='primary' @click='revert_slippage_to_quote_default()'>{{$t('Revert Slippage to default')}}</el-button>
                      </div>
                      <div class="cancel_btn_bar">
                          <el-button class='l' type='primary' @click='onEditRules()'>{{$t('Edit Rules')}}</el-button>
                        
                          <el-button  class='l' type='primary' @click='onSubmitChanges()'>{{$t('Submit Changes')}}</el-button>
                          <el-button class='l' type='primary' @click='onInvertSelect()'>{{$t('Invert Select')}}</el-button>
                          <el-button class='l' type='danger'   @click='onBatchDelete()'>{{$t('Delete Selected Rules')}}</el-button>
                          <el-button class='l' type='primary' @click='addTradeRule()'>{{$t('Add Rule')}}</el-button>
                        </div>
                      </el-col>
          </el-row>
    <bel-table
      ref="table"    
      :configs="tableConfig"
      class = 'trade_rule'
      @selection-change = 'onSelectionChange '
      >
        <template slot="handler" scope="scope">
             <i class='icon icon_edit' @click='editTradeRule(scope.row)'></i>
              <el-popover
                ref="popover{{$index}}" 
                placement="top"
                width="160"
                v-model="scope.row.visible">
                <p>确定删除？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="scope.row.visible=false">取消</el-button>
                  <el-button type="primary" size="mini" @click="delete_symbol(scope.row,scope.$index)">确定</el-button>
                </div>
              </el-popover>   
              <i class="icon icon_delete" v-popover:popover{{$index}} ></i>
    </template>
        <template slot="route_type" scope="scope">
                <div  v-if = 'editFlag'>
                        <div class='route_type'>
                        <span>if size >=</span>
                        <el-input 
                            class='threshold_input'
                            v-model="scope.row.attributes.route_type.threshold"
                            >
                            </el-input> 
                        </div>
                        <div class='route_type'>
                            <span>then</span>
                            <el-select  v-model="scope.row.attributes.route_type.right">
                                <el-option value="best" label="best"></el-option>
                                <el-option value="bestright" label="bestright"></el-option>
                                <el-option value="second" label="second"></el-option> 
                                <el-option value="ratio" label="ratio"></el-option>             
                            </el-select> 
                       </div>
                       <div class='route_type'>
                            <span>else</span>
                            <el-select v-model="scope.row.attributes.route_type.left">
                                <el-option value="best" label="best"></el-option>
                                <el-option value="bestright" label="solid"></el-option>
                                <el-option value="second" label="second"></el-option> 
                                <el-option value="ratio" label="ratio"></el-option>             
                            </el-select>
                       </div>
                </div>
                <div v-if = '!editFlag'>
                          <div>{{$t('If Size >=')+scope.row.attributes.route_type.threshold}}</div>
                          <div>{{$t('then')+'&nbsp;'+$t(scope.row.attributes.route_type.right)}}</div>
                          <div>{{$t('else')+'&nbsp;'+$t(scope.row.attributes.route_type.left)}}</div>
                </div>
        </template>
        <template slot="limit_order_types" scope="scope">
               <div v-if = '!editFlag'
               v-for='item in scope.row.attributes.limit_order_types'>
               {{$store.state.global.limit_order_types[item.type]+' '+item.tol}}
               </div>
               <div v-if='editFlag'>
                  <div  v-for='item in scope.row.attributes.limit_order_types_res'>
                    <div><el-checkbox v-model="item.isChecked">{{$t(item.label)}}</el-checkbox></div>
                    <el-input v-model='item.value'></el-input>
                  </div>
               </div>
        </template>
    
        <template slot="coverage" scope="scope">
                <el-input
                            v-if='editFlag'  
                            type="input"
                            v-model="scope.row.attributes.coverage"
                            >
                </el-input>          
                <span v-if = '!editFlag'>{{scope.row.attributes.coverage}}</span>   
          </template>
          <template slot="better_fill" scope="scope">
              <el-input 
                            v-if='editFlag'
                            type="number"
                            v-model="scope.row.attributes.better_fill"
                            >
             </el-input>
            <span v-if = '!editFlag'>{{scope.row.attributes.better_fill}}</span>   
          </template>
          <template slot="slippages" scope="scope">
              <div v-if='!editFlag'>
                  <div v-for='group in scope.row.attributes.slippages'> 
                      {{group.join(",")}}
                  </div>
             </div>
             <div class='slippages' v-if='editFlag'>
                  <div class='slippages_group' v-for='(group,index) in scope.row.attributes.slippages_res'>
                         <el-input v-for='(item,key) in group' class='f' v-model='item.value' :placeholder='$t(item.desc)'></el-input><i class='f icon icon_delete' @click = 'deleteRow(scope.row,index)'></i>
                  </div>
                  <div>
                      <i class='icon icon_add' @click='addNewRow(scope.row)'></i>
                  </div>
             </div>
          </template>
          <template slot="open_partial" scope="scope">
                <el-select v-if='editFlag' v-model="scope.row.attributes.open_partial">
                    <el-option :value="true" label="true"></el-option>
                    <el-option :value="false" label="false"></el-option>             
                </el-select>
                <span v-if='!editFlag'>{{scope.row.attributes.open_partial}}</span>
          </template>       
        <template slot="bbook_exec_type" scope="scope">
                <el-select v-if='editFlag'  v-model="scope.row.attributes.bbook_exec_type">
                             <el-option value="vwap" label="vwap"></el-option>
                             <el-option value="worst" label="worst"></el-option>           
                </el-select>
                <span v-if='!editFlag'>{{scope.row.attributes.bbook_exec_type}}</span>
        </template>
        <template slot="lps" scope="scope">
                  <div v-if= 'editFlag'>
                    <div v-for='item in scope.row.attributes.lps_res'>
                      <el-checkbox v-model="item.value">{{item.label}}</el-checkbox>
                    </div>   
                  </div>
                   <div v-if= '!editFlag'>
                          <span >{{(scope.row.attributes.lps||[]).join(",")|| "ALL"}}</span>
                   </div>
        </template>
    </bel-table> 
  </div>
</template>
<script >
import GroupTradeRuleJs from './GroupTradeRule.js';
export default GroupTradeRuleJs;
</script>
<style  lang='less'>
  @import url(GroupTradeRule.less);
</style>