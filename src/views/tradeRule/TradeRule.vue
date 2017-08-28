<template>
  <div class='list'>
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
    <!-- <drag-dialog
                v-if = 'create_new_group_dialog.show'
                :title="create_new_group_dialog.title"
                :isModal = 'create_new_group_dialog.isModal'
                @close="onCloseDialog('create_new_group_dialog')"
      >
                <form-data1
                style = 'padding: 10px;'
                ref='form-data'
                :FieldList='fieldlist'
                :DefaultValue='create_new_group_dialog.default_value'
                @onSubmit= "create_new_group_submit"
                >  
                </form-data1>
      </drag-dialog>  -->
      <!-- <traderule-dialog></traderule-dialog>  -->
     <!-- <drag-dialog
                v-if = 'edit.show'
                :title="create_new_group_dialog.title"
                :isModal = 'create_new_group_dialog.isModal'
                @close="onCloseDialog('create_new_group_dialog')"
      >
                <form-data1
                style = 'padding: 10px;'
                ref='form-data'
                :FieldList='fieldlist'
                :DefaultValue='create_new_group_dialog.default_value'
                @onSubmit= "create_new_group_submit"
                >  
                </form-data1>
      </drag-dialog>  -->
      <el-dialog :visible.sync="dialogTableVisible" top='40%' class='copy_group_dialog'>   
          <h2>{{'Copy '+copy_group_dialog.source+'-'+copy_group_dialog.group+' to new group'}}</h2> 
          <form-data
                ref='form-data'
                :FieldList='copy_to_new_group.fields'
                :DefaultValue='copy_to_new_group.default_value'
                @onSubmit= "copyGroupSumbit"
                >  
          </form-data>
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