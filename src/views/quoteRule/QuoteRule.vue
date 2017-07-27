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
              <el-button
                  type="info"
                  icon='edit'
                  size="mini"
                  @click='onEditRule(scope.row)'></el-button>
              <el-button
                  v-if = 'scope.row.editFlag'
                  type="info"
                  icon='upload'
                  size="mini"
                  @click='edit_lpsymbol_submit(scope.row)'></el-button>
              <el-button
                  type="danger"
                  icon='delete'
                  size="mini"
                 @click='onDeleteQutoeRule(scope.row)' ></el-button>
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
              <span v-if='!scope.row.editFlag'>{{scope.row.type}}</span>

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
              <el-input class='db' v-if='scope.row.type== "delta" &&scope.row.editFlag' v-model='scope.row.bid_delta'></el-input> 
              <el-input class='db' v-if='scope.row.type== "delta"&&scope.row.editFlag' v-model='scope.row.ofr_delta'></el-input> 
              <el-input  class='db' v-if='scope.row.type== "asian"&&scope.row.editFlag' v-model='scope.row.asian_delta'></el-input> 
              <el-input class='db' v-if='scope.row.type== "spread"&&scope.row.editFlag' v-model='scope.row.spread'></el-input> 
              <el-input class='db' v-if='scope.row.type!== "raw"&&scope.row.editFlag' v-model='scope.row.random'></el-input> 
          </template>
    </bel-table> 
  </div>
</template>
  
<script >
import QuoteRuleJs from './QuoteRule.js';
export default QuoteRuleJs;
</script>
<style scoped lang='less'>
    .actions-top{
        margin-bottom: 10px;
    }
    .db{
      display:block;
    }
</style>