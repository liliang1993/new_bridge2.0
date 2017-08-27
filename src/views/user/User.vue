<template>
    <div class='clearfix'>
          <div class='actions-top'>
            <el-button type='primary' @click='addDialogTableVisible = true'>{{$t('Add user')}}</el-button>
          </div>
    <el-col :span="24" class='table-wrap'>
          <bel-table
          ref="table"    
          :configs="tableConfig"
          class='user-table'
          >   
          
              <template slot="password" scope="scope">
                <span v-if='!scope.row.editFlag'></span>
                <el-input v-if='scope.row.editFlag' type='password' placeholder='Input nothing means no change' v-model='scope.row.password'>
                </el-input> 
              </template>
              <template slot="handler" scope="scope">
                  <div class='tc'>
                    <i class='icon icon_edit' @click='editUser(scope.row)' v-if='!scope.row.editFlag'></i>
                  </div> 
              </template>
          </bel-table> 
    </el-col>  
    
    <el-col :span="24" class='btm-action'>
            <el-pagination
                class='pagination'
                :page-sizes="pagination.page_sizes"
                :page-size="pagination.page_size"
                :layout="pagination.layout"
                :total="pagination.total"
                :current-page='pagination.current_page'
                @current-change='onChangeCurrentPage'
                @size-change='onChangePageSize'
             >
            </el-pagination>
      </el-col>

      <el-dialog title="Add User" :visible.sync="addDialogTableVisible" top='40%'>
           <bel-table
          ref="table"    
          :configs="add_tableConfig"
          class='user-table'
          >   
              <template slot="username" scope="scope">
                <el-input v-model='scope.row.username'>
                </el-input> 
              </template>
              <template slot="password" scope="scope">
                <el-input v-model='scope.row.password'>
                </el-input>
              </template>
              <template slot="roles" scope="scope">
                  <el-select v-model="scope.row.role" placeholder="请选择">
                      <el-option
                        v-for="item in $store.state.global.roles"
                        :key="item"
                        :label="item"
                        :value="item">
                      </el-option>
                  </el-select>
              </template>
              <template slot="lps" scope="scope">
                <el-input  v-model='scope.row.lps'>
                </el-input> 
              </template>
              <template slot="groups" scope="scope">
                <el-input  v-model='scope.row.groups'>
                </el-input> 
              </template>
              <template slot="symbols" scope="scope">
                <el-input v-model='scope.row.symbols'>
                </el-input> 
              </template>
              <template slot="desc" scope="scope">
                <el-input v-model='scope.row.desc'>
                </el-input> 
              </template>
          </bel-table> 
          <el-col :span='24' class='confirm_btn'>
              <el-button type="primary" @click='add_user_submit(add_tableData[0])'>Confirm</el-button>
          </el-col>    
      </el-dialog>
      <el-dialog title="Edit User" :visible.sync="editDialogTableVisible" top='40%'>
           <bel-table
          ref="table"    
          :configs="edit_tableConfig"
          class='user-table'
          >   
              <template slot="username" scope="scope">
                <el-input v-model='scope.row.username'>
                </el-input> 
              </template>
              <template slot="password" scope="scope">
                <el-input v-model='scope.row.password'>
                </el-input>
              </template>
              <template slot="roles" scope="scope">
                  <el-select v-model="scope.row.role" placeholder="请选择">
                      <el-option
                        v-for="item in $store.state.global.roles"
                        :key="item"
                        :label="item"
                        :value="item">
                      </el-option>
                  </el-select>
              </template>
              <template slot="lps" scope="scope">
                <el-input  v-model='scope.row.lps'>
                </el-input> 
              </template>
              <template slot="groups" scope="scope">
                <el-input  v-model='scope.row.groups'>
                </el-input> 
              </template>
              <template slot="symbols" scope="scope">
                <el-input v-model='scope.row.symbols'>
                </el-input> 
              </template>
              <template slot="desc" scope="scope">
                <el-input v-model='scope.row.desc'>
                </el-input> 
              </template>
          </bel-table> 
          <el-col :span='24' class='confirm_btn'>
              <el-button type="primary" @click='edit_user_submit(edit_tableData[0])'>Confirm</el-button>
          </el-col>    
      </el-dialog>
        <!-- <drag-dialog
                v-if = 'add_user_dialog.show'
                :title="add_user_dialog.title"
                :isModal = 'add_user_dialog.isModal'
                @close="onCloseDialog('add_user_dialog')"
          >
                <form-data
                 ref='add_user_form'
                  :DefaultValue='add_user_dialog.default_value'
                  :FieldList='add_user_dialog.fields'
                  @onSubmit='add_user_submit'

                  >
                  </form-data>
        </drag-dialog> -->

         <!-- <drag-dialog
                v-if='edit_user_dialog.show'
                :title="edit_user_dialog.title"
                :isModal = 'edit_user_dialog.isModal'
                @close="onCloseDialog('edit_user_dialog')"
          >
                <form-data
                 ref='edit_user_form'
                  :DefaultValue='edit_user_dialog.default_value'
                  :FieldList='edit_user_dialog.fields'
                  @onSubmit='edit_user_submit'
                  >
                  </form-data>
        </drag-dialog> -->
  </div>
</template>
  
<script >
import UserJs from './User.js';
export default UserJs;
</script>
<style scoped lang='less'>
     @import url(User.less);
</style>