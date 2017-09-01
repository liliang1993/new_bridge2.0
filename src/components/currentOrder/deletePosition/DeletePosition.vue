<template>
    <div class='list'>
      <div class='search_bar'>
            <p>{{$t('Bridge Orders')}}:</p>
            <input type="text" :placeholder='$t("Input orders separated by a comma(eg:\",\")")' class='input' v-model='orders_value'>
            <el-button type='primary' :loading='search_orders_loading'  @click ='onSearch'>{{$t('Search')}}</el-button> 
      </div>
      <bel-table
      ref="table"
      class='dialog_table'
      :configs="tableConfig">
        <template slot="lp_positions" scope="scope">
  <!--           <el-popover
                    class='type_attr_popover'
                    placement="bottom-start"
                    width="160"
                    trigger='click'
                    >
                    <bel-table
                      ref="table"
                      class='dialog_table'
                      :configs="lpPositionConfig">
                           <template slot="value" scope="scope">
                                <div>{{scope.row.value}}</div>
                                <el-input v-model='scope.row.value'></el-button>
                            </template>  
                      </bel-table>
                     <a href='javascript:void(0);' click='openLpPositionTable()' class='type_formore' slot="reference">
                    click</a>
              </el-popover>  -->
            <!-- <span v-for="(value,key) in scope.row.lp_positions" v-if='value != 0 && value != undefined' >{{key}}:{{value}}</span>       -->
        </template>
        <template slot="delete" scope="scope">
               <el-button
                  type="primary"
                  icon='edit'
                  size="mini"
                  @click='editPosition(scope.row,scope.$index)'></el-button>
              <el-button
                  type="danger"
                  icon='delete'
                  size="mini"
                  @click='onDeleteRow(scope.row)'></el-button>
          </template>
    </bel-table>
      <input class= 'del_reason' :placeholder='$t("the reason why you want to delete these orders")' v-model="del_reason">       
      <el-col :span='24' class='confirm_btn'>
          <el-button  type='primary' :loading='submit_loading'  @click='onSubmit' >{{$t('Submit')}}</el-button>
      </el-col> 
      <!--  <drag-dialog  
        v-if='editDialogTableVisible'
        @close='closeLpPosition'
        >
         <bel-table
          ref="table"    
          :configs="edit_tableConfig"
          class='edit-table'
          >   
              <template slot="qty" scope="scope">
                <el-input v-model='scope.row.qty'>
                </el-input> 
              </template>
          </bel-table> 
          <el-col :span='24' class='confirm_btn'>
              <el-button type="primary"  @click='edit_position_submit()'>Confirm</el-button>
          </el-col>    
      </drag-dialog> -->
       <el-dialog title="Edit Position" :visible.sync="editDialogTableVisible" top='40%'>
           <bel-table
          ref="table"    
          :configs="edit_tableConfig"
          class='edit-table'
          >   
              <template slot="qty" scope="scope">
                <el-input v-model='scope.row.qty'>
                </el-input> 
              </template>
          </bel-table> 
          <el-col :span='24' class='confirm_btn'>
              <el-button type="primary" @click='edit_position_submit()'>Confirm</el-button>
          </el-col>    
      </el-dialog>
  </div>
</template>

<script >
import DeletePositionJs from './DeletePosition.js';
export default DeletePositionJs;
</script>
<style lang='less'>
@import url(./DeletePosition.less);
</style>
