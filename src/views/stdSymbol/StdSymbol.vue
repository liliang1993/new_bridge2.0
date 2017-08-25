<template>
  <div class='list'>
    <el-row>
        <el-col :span='24' class='actions-top'>
            <el-button type='primary' @click='addDialogTableVisible=true'>{{this.$t('Add symbol')}}</el-button>
        </el-col> 
    </el-row>
    <el-col :span="24" class='table-wrap'>
        <bel-table
          ref="table"    
          :configs="tableConfig">
              <template slot="handler" scope="scope">
                  <i class='icon icon_edit' @click='editSymbol(scope.row)' v-if='!scope.row.editFlag'></i>
                  <el-popover
                    ref="popover{{$index}}" 
                    placement="top"
                    width="160"
                    v-model="scope.row.visible">
                    <p>确定删除？</p>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="scope.row.visible=false">取消</el-button>
                      <el-button type="primary" size="mini" @click="delete_symbol(scope.row,scope.$index)">确定</el-button>
                    </div>
                  </el-popover>   
                  <i class="icon icon_delete" v-popover:popover{{$index}} v-if='!scope.row.editFlag' ></i>
                  
              </template>
              <template slot="weight_attr" scope="scope">
                  <span v-if='!scope.row.editFlag' >{{scope.row.weight}}</span>
                  <el-input v-if='scope.row.editFlag' v-model='scope.row.weight'></el-input>  
              </template>
              <template slot="min_qty_attr" scope="scope">
                  <span v-if='!scope.row.editFlag' >{{scope.row.min_qty}}</span>
                  <el-input v-if='scope.row.editFlag' v-model='scope.row.min_qty'></el-input>  
              </template>
               <template slot="contract_size_attr" scope="scope">
                  <span v-if='!scope.row.editFlag' >{{scope.row.contract_size}}</span>
                  <el-input v-if='scope.row.editFlag' v-model='scope.row.contract_size'></el-input>  
              </template>
              <template slot="quote_attr" scope="scope">
                  <span v-if='!scope.row.editFlag' :style="scope.row.quote_enable== 'true' ? 'color:green;' : 'color:red;' ">{{scope.row.quote_enable == "true" ? 'O' : 'X'}}</span>
                  <el-switch
                    v-if='scope.row.editFlag'
                    v-model="scope.row.quote_enable"
                    on-color="#13ce66"
                    off-color="#ff4949"
                    on-value="true"
                    off-value="false">
                  </el-switch>
              </template>
              <template slot="trade_attr" scope="scope">
                  <span v-if='!scope.row.editFlag' :style="scope.row.trade_enable== 'true' ? 'color:green;' : 'color:red;' ">{{scope.row.trade_enable == "true" ? 'O' : 'X'}}</span>
                  <el-switch
                    v-if='scope.row.editFlag'
                    v-model="scope.row.trade_enable"
                    on-color="#13ce66"
                    off-color="#ff4949"
                    on-value='true'
                    off-value='false'>
                  </el-switch>
              </template>
        </bel-table> 
    </el-col>

    <el-dialog title="Add LP Symbols" :visible.sync="addDialogTableVisible" top='40%'>
           <bel-table
          ref="table"    
          :configs="new_tableConfig"
          class='user-table'
          >   
              <template slot="std_symbol" scope="scope">
                <el-input v-model='scope.row.std_symbol'>
                </el-input> 
              </template>
              <template slot="lp" scope="scope">
                <el-select v-model="scope.row.lp" placeholder="请选择">
                      <el-option
                        v-for="item in $store.state.global.lps"
                        :key="item"
                        :label="item"
                        :value="item">
                      </el-option>
                </el-select>
              </template>
              <template slot="lp_symbol" scope="scope">
                 <el-input v-model='scope.row.lp_symbol'>
                </el-input>
              </template>
              <template slot="weight" scope="scope">
                <el-input  v-model='scope.row.weight'>
                </el-input> 
              </template>
              <template slot="min_qty" scope="scope">
                <el-input  v-model='scope.row.min_qty'>
                </el-input> 
              </template>
              <template slot="contract_size" scope="scope">
                <el-input v-model='scope.row.contract_size'>
                </el-input> 
              </template>
              <template slot="quote_enable" scope="scope">
                 <el-switch
                    v-model="scope.row.quote_enable"
                    on-color="#13ce66"
                    off-color="#ff4949"
                    on-value="true"
                    off-value="false">
                  </el-switch> 
              </template>
              <template slot="trade_enable" scope="scope">
                 <el-switch
                    v-model="scope.row.trade_enable"
                    on-color="#13ce66"
                    off-color="#ff4949"
                    on-value="true"
                    off-value="false">
                  </el-switch> 
              </template>
          </bel-table> 
          <el-col :span='24' class='confirm_btn'>
              <el-button type="primary" @click='add_symbol_submit(new_tableData[0])'>Submit</el-button>
          </el-col>    
      </el-dialog>

      <el-dialog title="Edit LP Symbols" :visible.sync="editDialogTableVisible" top='40%'>
           <bel-table
          ref="table"    
          :configs="edit_tableConfig"
          class='user-table'
          >   
              <template slot="std_symbol" scope="scope">
                <el-input v-model='scope.row.std_symbol'>
                </el-input> 
              </template>
              <template slot="lp" scope="scope">
                <el-select v-model="scope.row.lp" placeholder="请选择">
                      <el-option
                        v-for="item in $store.state.global.lps"
                        :key="item"
                        :label="item"
                        :value="item">
                      </el-option>
                </el-select>
              </template>
              <template slot="lp_symbol" scope="scope">
                 <el-input v-model='scope.row.lp_symbol'>
                </el-input>
              </template>
              <template slot="weight" scope="scope">
                <el-input  v-model='scope.row.weight'>
                </el-input> 
              </template>
              <template slot="min_qty" scope="scope">
                <el-input  v-model='scope.row.min_qty'>
                </el-input> 
              </template>
              <template slot="contract_size" scope="scope">
                <el-input v-model='scope.row.contract_size'>
                </el-input> 
              </template>
              <template slot="quote_enable" scope="scope">
                 <el-switch
                    v-model="scope.row.quote_enable"
                    on-color="#13ce66"
                    off-color="#ff4949"
                    on-value="true"
                    off-value="false">
                  </el-switch> 
              </template>
              <template slot="trade_enable" scope="scope">
                 <el-switch
                    v-model="scope.row.trade_enable"
                    on-color="#13ce66"
                    off-color="#ff4949"
                    on-value="true"
                    off-value="false">
                  </el-switch> 
              </template>
          </bel-table> 
          <el-col :span='24' class='confirm_btn'>
              <el-button type="primary" @click='edit_symbol_submit(edit_tableData[0])'>Submit</el-button>
          </el-col>    
      </el-dialog>
  </div>
</template>
  
<script >
import StdSymbolJs from './StdSymbol.js';
export default StdSymbolJs;
</script>
<style scoped lang='less'>
    @import url(StdSymbol.less);
</style>