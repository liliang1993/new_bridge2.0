<template>
    <div>
      <el-row class='actions-top'>     
          <el-col :span='21'>
                      <el-button type='primary' @click='onEditRules()'>{{$t('Edit rules')}}</el-button>
                      <el-button type='primary' @click='ondefaultSplippage()'>{{$t('Revert splippage to default')}}</el-button>
                      <el-button type='primary' @click='onSubmitChanges()'>{{$t('Submit Changes')}}</el-button>
                      <el-button type='primary' @click='onInvertSelect()'>{{$t('Invert select')}}</el-button>
                      <el-button type='danger'   @click='onBatchDelete()'>{{$t('Delete selected rules')}}</el-button>
                      <el-button type='primary' @click='onAddRule()'>{{$t('Add rule')}}</el-button>
                      </el-col>
          </el-row>
    <bel-table
      ref="table"    
      :configs="tableConfig"
      class = 'trade_rule'
      @selection-change = 'onSelectionChange '
      >
        <template slot="handler" scope="scope">
              <!-- <el-button
                  type="info"
                  icon='edit'
                  size="mini"
                  @click='onEditRowRule(scope.row)'></el-button>
              <el-button
                  type="danger"
                  icon='delete'
                  size="mini"
                 @click='onSingleDelete(scope.row)' ></el-button> -->
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
              <i class="icon icon_delete" v-popover:popover{{$index}} v-if='!scope.row.editFlag' ></i>
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
                          &gt;=&nbsp;{{scope.row.attributes.route_type.threshold}}&nbsp;then&nbsp;{{scope.row.attributes.route_type.right}}&nbsp;else&nbsp;{{scope.row.attributes.route_type.left}}
                </div>
        </template>
        <template slot="limit_order_types" scope="scope">
               <div v-if = '!editFlag'
               v-for='item in scope.row.attributes.limit_order_types'>
               {{$store.state.global.limit_order_types[item.type]+' '+item.tol}}
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

          <template slot="open_partial" scope="scope">
                <el-select v-if='editFlag' v-model="scope.row.attributes.open_partial ">
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
                 <el-checkbox-group v-if='editFlag'  v-model="scope.row.attributes.lps">
                    <el-checkbox v-for='item in $store.state.global.lps' :label='item'></el-checkbox>
                  </el-checkbox-group>
                   <div v-if= '!editFlag'>
                          <span v-for ='lp in scope.row.attributes.lps'>{{lp}}&nbsp;</span>
                   </div>
        </template>
    </bel-table> 
  </div>
</template>
<script >
import GroupTradeRuleJs from './GroupTradeRule.js';
export default GroupTradeRuleJs;
</script>
<style scoped lang='less'>
  @import url(GroupTradeRule.less);
</style>