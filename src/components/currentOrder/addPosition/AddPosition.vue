<template>
    <div class='add_position'>
      <el-row >
              <div class="search_bar">
                <p>{{$t('MT4 Logins')}}:</p>
                <input type="text" :placeholder='$t("Input logins(must be numbers) separated by a comma(eg\",\")")'  v-model='logKeyword'  class='search_bar'>
                <el-button class='r' :loading='search_login_loading' type='primary'  @click='search_login_mt4_orders'>{{search_login_loading? $t('Loading'):$t('Search Logins')}}</el-button>  
              </div>     
              <div class="search_bar">  
                <p>{{$t('MT4 Orders')}}:</p>
                <input type="text" :placeholder='$t("Input orders separated by a comma(eg:\",\")")' v-model='ordKeyword' class='search_bar'>
                <el-button class='r' type='primary' :loading='search_orders_loading' @click='search_mt4_orders'>{{search_orders_loading?$t('loading'):$t('Search Orders')}}</el-button>  
              </div>   
      </el-row>
      <bel-table
      ref="table"
      class='dialog_table'
      :configs="tableConfig">
        <template v-for='(item,index) in tableConfig.columns'  :slot="item.attr.scopedSlot" scope="scope">
              <input  :placeholder='$t(item.attr.label.toLowerCase())' v-model='scope.row[item.attr.prop].value' class='table_input_wrap' :class='scope.row[item.attr.prop].class'></input>
        </template>
        <template slot="delete" scope="scope">
              <!-- <el-button
                  type="danger"
                  icon='delete'
                  size="mini"
                  @click='onDeleteRow(scope.row)'></el-button> -->
                  <i class='icon icon_delete'  @click='onDeleteRow(scope.row)'></i>
          </template>
    </bel-table>
    <el-row>
        <el-col :span='24' class='btm-action'>
             <i class='icon icon_add' @click='addNewRow()'></i>
        </el-col>
          <el-col :span='24' class='confirm_btn'>
              <el-button type="primary" :loading='submit_loading' @click='onSubmit'>{{$t('Submit')}}</el-button>
          </el-col> 
    </el-row>
    <el-col :span='24' >
          <p>Result：</p>
          <div class='show_area'>
              <prev>{{addPositionResult}}</prev>  
          </div>
    </el-col> 
  </div>
</template>

<script >
import AddPositionJs from './AddPosition.js';
export default AddPositionJs;
</script>
<style  lang='less'>
@import url(./AddPosition.less);
</style>
