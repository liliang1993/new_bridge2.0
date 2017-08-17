<template>
    <div class='list'>
      <div class='search_bar'>
            <p>bridge orders：</p>
            <input type="text" class='input'>
            <el-button type='primary'>Search</el-button> 
      </div>
      <bel-table
      ref="table"
      class='dialog_table'
      :configs="tableConfig">
        <template slot="lp_positions" scope="scope">
            <span v-for="(value,key) in scope.row.lp_positions" v-if='value != 0 && value != undefined' >{{key}}:{{value}}</span>      
        </template>
        <template slot="delete" scope="scope">
              <el-button
                  type="danger"
                  icon='delete'
                  size="mini"
                  @click='onDeleteRow(scope.row)'></el-button>
          </template>
    </bel-table>
      <input class= 'del_reason' placeholder="the reason why you want to delete these orders" v-model="del_reason">       
      <el-col :span='24' class='confirm_btn'>
          <el-button  type='primary' :disabled='submit_disabled' @click='onSubmit' >Submit</el-button>
      </el-col> 
  </div>
</template>

<script >
import DeletePositionJs from './DeletePosition.js';
export default DeletePositionJs;
</script>
<style scoped lang='less'>
@import url(./DeletePosition.less);
</style>
