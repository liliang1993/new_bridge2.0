<template>
    <div class='add_position'>
      <el-row >
              <div class="search_bar">
                <p>MT4 logins:</p>
                <input type="text" placeholder="input"  v-model='logKeyword'  class='search_bar'>
                <el-button class='r' type='primary'@click='onSearch("MT4 logins")'>Search Logins</el-button>  
              </div>     
              <div class="search_bar">  
                <p>MT4 orders:</p>
                <input type="text" placeholder="input" v-model='ordKeyword' class='search_bar'>
                <el-button class='r' type='primary'  @click='onSearch("MT4 orders")''>Search Orders</el-button>  
              </div>   
      </el-row>
      <bel-table
      ref="table"
      class='dialog_table'
      :configs="tableConfig">
        <template v-for='(item,index) in tableConfig.columns'  :slot="item.attr.label" scope="scope">
              <input  :placeholder='item.attr.label.toLowerCase()' v-model='scope.row[item.attr.prop].value' class='table_input_wrap' :class='scope.row[item.attr.prop].class'></input>
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
             <!--  <el-button  class='icon'  icon="plus" @click='addNewRow()' ></el-button> -->
             <i class='icon icon_add' @click='addNewRow()'></i>
        </el-col>
         <!-- <el-col :span='2' >
                  <el-button  type='primary' @click='onSubmit' >Submit</el-button>
          </el-col>  -->
          <el-col :span='24' class='confirm_btn'>
              <el-button type="primary" @click='onSubmit'>Sumbit</el-button>
          </el-col> 
    </el-row>
   
  </div>
</template>

<script >
import AddPositionJs from './AddPosition.js';
export default AddPositionJs;
</script>
<style  lang='less'>
@import url(./AddPosition.less);
</style>
