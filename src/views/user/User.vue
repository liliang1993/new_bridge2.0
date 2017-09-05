<template>
    <div class='user'>
          <div class='actions-top'>
            <el-button type='primary' @click='addUser'>{{$t('Add User')}}</el-button>
          </div>
    <el-col :span="24" class='table-wrap'>
          <bel-table
          ref="table"    
          :configs="tableConfig"
          class='user-table'
          >   
          
              <template slot="status" scope="scope">
              <span :style="scope.row.status== 0 ? 'color:black;' : 'color:red;' ">{{scope.row.status == 0 ? 'Enabled' : 'Disabled'}}</span>
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

      <el-dialog :title="$t('Add User')"  :visible.sync="addDialogTableVisible" top='40%'  >
           <bel-table
           v-if='addDialogTableVisible'
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
              <el-button type="primary" :loading='add_loading' @click='add_user_submit(add_tableData[0])'>Confirm</el-button>
          </el-col>    
      </el-dialog>
      <el-dialog :title="$t('Edit User')" :visible.sync="editDialogTableVisible" top='40%'
      >
           <bel-table
          ref="table"    
          :configs="edit_tableConfig"
          class='user-table'
          >   
              <template slot="username" scope="scope">
                <el-input :disabled='true'  v-model='scope.row.username'>
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
              <template slot="status" scope="scope">
                  <el-select v-model="scope.row.status" placeholder="请选择">
                      <el-option
                        label="Enabled"
                        :value="0"
                         >
                      </el-option>
                       <el-option
                        label="Disabled"
                        :value="1"
                         >
                      </el-option>
                  </el-select>
              </template>
              <template slot="desc" scope="scope">
                <el-input v-model='scope.row.desc'>
                </el-input> 
              </template>
          </bel-table> 
          <el-col :span='24' class='confirm_btn'>
              <el-button type="primary" :loading='edit_loading' @click='edit_user_submit(edit_tableData[0])'>Confirm</el-button>
          </el-col>    
      </el-dialog>
  </div>
</template>
  
<script >
import UserJs from './User.js';
export default UserJs;
</script>
<style lang='less'>
     @import url(User.less);
</style>