<template>
  <div class='list'>
    <el-row>
        <el-col :span='24' class='actions-top'>
            <el-button type='primary' @click='onAddRule()'>{{$t('Add rule')}}</el-button>
        </el-col> 
    </el-row>
    <bel-table
      ref="table"    
      :configs="tableConfig">
          <template slot="handler" scope="scope">
                  <i class='icon icon_edit' @click='edit_quote_rule(scope.row)' v-if='!scope.row.editFlag'></i>
                  <i class='icon icon_back' v-if='scope.row.editFlag' @click='backOrigin(scope.row)'></i>
                  <span class='btn_submit' v-if='scope.row.editFlag' @click=' edit_quoteRule_submit(scope.row)'>Submit</span>
                   <el-popover
                    ref="popover{{$index}}" 
                    placement="top"
                    width="160"
                    v-model="scope.row.visible">
                    <p>确定删除？</p>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="scope.row.visible=false">取消</el-button>
                      <el-button type="primary" size="mini" @click="delete_quote_rule(scope.row,scope.$index)">确定</el-button>
                    </div>
                  </el-popover>  
                  <i class='icon icon_delete' v-popover:popover{{$index}}  v-if='!scope.row.editFlag' ></i>
          </template>
          <template slot="digits_attr" scope="scope">
              <span v-if='!scope.row.editFlag'>{{scope.row.attributes.digits}}</span>
              <el-input v-if='scope.row.editFlag' v-model='scope.row.attributes.digits'></el-input>  
          </template>
          <template slot="min_spread_attr" scope="scope">
              <span v-if='!scope.row.editFlag'>{{scope.row.attributes.minimal_spread}}</span>
              <el-input v-if='scope.row.editFlag' v-model='scope.row.attributes.minimal_spread'></el-input>  
          </template>
          <template slot="max_spread_attr" scope="scope">
              <span v-if='!scope.row.editFlag'>{{scope.row.attributes.maximal_spread}}</span>
              <el-input v-if='scope.row.editFlag' v-model='scope.row.attributes.maximal_spread'>
              </el-input>  
          </template>
          <template slot="aggregator_attr" scope="scope">
             
              <span v-if='!scope.row.editFlag'>{{scope.row.attributes.aggregator}}</span>
              <el-select v-if='scope.row.editFlag' v-model='scope.row.attributes.aggregator'>
                <el-option
                  key="median"
                  label="median"
                  value="median">
                </el-option>
                <el-option
                  key="bestright"
                  label="bestright"
                  value="bestright">
                </el-option>
                <el-option
                  key="bestright_option"
                  label="bestright_option"
                  value="bestright_option">
                </el-option>
              </el-select>  
          </template>
          <template slot="adjust_attr" scope="scope">
              <span v-if='!scope.row.editFlag'>{{scope.row.attributes.adjust}}</span>
              <el-input v-if='scope.row.editFlag' v-model='scope.row.attributes.adjust'></el-input>  
          </template>
          <template slot="type_attr" scope="scope">
              <el-popover
                    ref="popover{{$index}}" 
                    placement="bottom-start"
                    v-if='!scope.row.editFlag || scope.row.attributes.type =="raw"'
                    width="160"
                    trigger='hover'
                    >
                    <p>确定删除？</p>
                  </el-popover> 
              <span v-if='!scope.row.editFlag' v-popover:popover{{$index}}>{{scope.row.type}}</span>
              <el-select class='db' v-if='scope.row.editFlag' v-model='scope.row.type'>
                <el-option 
                  key="raw"
                  label="raw"
                  value="raw">
                </el-option>
                <el-option
                  key="delta"
                  label="delta"
                  value="delta">
                </el-option>
                <el-option
                  key="asian"
                  label="asian"
                  value="asian">
                </el-option>
                <el-option
                  key="spread"
                  label="spread"
                  value="spread">
                </el-option>
              </el-select>  
              <el-input class='db' v-if='scope.row.type== "delta" &&scope.row.editFlag' v-model='scope.row.attributes.bid_delta'></el-input> 
              <el-input class='db' v-if='scope.row.type== "delta"&&scope.row.editFlag' v-model='scope.row.attributes.ofr_delta'></el-input> 
              <el-input  class='db' v-if='scope.row.type== "asian"&&scope.row.editFlag' v-model='scope.row.attributes.asian_delta'></el-input> 
              <el-input class='db' v-if='scope.row.type== "spread"&&scope.row.editFlag' v-model='scope.row.attributes.spread'></el-input> 
              <el-input class='db' v-if='scope.row.type!== "raw"&&scope.row.editFlag' v-model='scope.row.attributes.random'></el-input> 
          </template>
    </bel-table> 
    
  </div>
</template>
  
<script >
import QuoteRuleJs from './QuoteRule.js';
export default QuoteRuleJs;
</script>
<style scoped lang='less'>
    @import url(QuoteRule.less);
</style>