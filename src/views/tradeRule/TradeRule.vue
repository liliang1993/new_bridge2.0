<template>
  <div class='trade_rule'>
    <el-row>
        <el-col :span='24' class='actions-top'>
            <el-button type='primary' @click = 'open_create_new_group_dialog'>{{$t('Add Group')}}</el-button>
        </el-col> 
    </el-row>
    <bel-table
      ref="table"    
      :configs="tableConfig">
          <template slot="rulesdetail" scope="scope">
               <router-link :to="{ path:'/home/trade_rule/group_trade_rule', query: {source: scope.row.source,group: scope.row.group} }">  
              <a
                  href="javascript:void(0);"
                  > {{$t('VIEW RULES')}}</a>
              </router-link>
          </template>
          <template slot="copygroup" scope="scope">
             <a
                  href="javascript:void(0);"
                  @click = 'copy_new_group(scope.row)'
                  > {{$t("Copy to new group")}}</a>
          </template>
          <template slot="remark" scope="scope">
              <a
                    href="javascript:void(0);"
                     @click = "onEditRemark(scope.row)"
                  >{{scope.row.remark}}</a>
          </template>
    </bel-table> 

      <el-dialog :visible.sync="dialogTableVisible" top='40%' class='copy_group_dialog'>   
          <h2>{{'Copy '+copyNewGroup_dict.source+'-'+copyNewGroup_dict.group+' to new group'}}</h2> 
          <!-- <form-data
                ref='form-data'
                :FieldList='copy_to_new_group.fields'
                :DefaultValue='copy_to_new_group.default_value'
                @onSubmit= "copyGroupSumbit"
                >  
          </form-data> -->
          <div class="form_item">
              <p>{{$t("Source")}}:</p>
               <el-select v-model='copyNewGroup_dict.source' class='w100'>
                 <el-option
                    v-for="item in $store.state.global.sources"
                    :key="item"
                    :label="$t(item)"
                    :value="item">
                  </el-option>   
              </el-select>
          </div>
           <div class="form_item">
              <p>{{$t("NewGroup")}}:</p>
               <el-input v-model='copyNewGroup_dict.new_group'></el-input> 
          </div>
          <el-col :span='24' class='confirm_btn'>
              <el-button type="primary" @click='copyGroupSumbit'>{{$t('Confirm')}}</el-button>
          </el-col>
      </el-dialog>
        <el-dialog :visible.sync="remarkDialogTableVisible" top='40%' class='copy_group_dialog'>   
          <h2>{{'Edit '+remarkDialog_dict.group+' Remark'}}</h2> 
          <div class="form_item">
              <p>{{$t("Remark")}}:</p>
               <el-input
                v-model="remarkDialog_dict.remark"
                type='textarea'
                autosize
               >
               </el-input> 
          </div>
          <el-col :span='24' class='confirm_btn'>
              <el-button type="primary" @click='remarkSumbit'>{{$t('Confirm')}}</el-button>
          </el-col>
      </el-dialog>
  </div>
</template>

<script >
import TradeRuleJs from './TradeRule.js';
export default TradeRuleJs;
</script>
<style scoped lang='less'>
  @import url(TradeRule.less);
</style>