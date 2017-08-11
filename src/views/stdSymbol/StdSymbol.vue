<template>
  <div class='list'>
    <el-row>
        <el-col :span='24' class='actions-top'>
            <el-button type='primary'>{{this.$t('Add symbol')}}</el-button>
        </el-col> 
    </el-row>
    <el-col :span="24" class='table-wrap'>
        <bel-table
          ref="table"    
          :configs="tableConfig">
              <template slot="handler" scope="scope">
                  <el-button
                    v-if ='!scope.row.editFlag'
                      type="info"
                      icon='edit'
                      size="mini"
                      @click='onEditSymbol(scope.row)'></el-button>
                      <el-button
                      v-if = 'scope.row.editFlag'
                      type="info"
                      icon='upload'
                      size="mini"
                      @click='edit_lpsymbol_submit(scope.row)'></el-button>
                       <el-button
                      type="info"
                      icon='plus'
                      size="mini"
                     @click='' ></el-button>
                  <el-button
                      type="danger"
                      icon='delete'
                      size="mini"
                     @click='onDeleteSymbol(scope.row,scope.$index)' ></el-button>
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
  </div>
</template>
  
<script >
import StdSymbolJs from './StdSymbol.js';
export default StdSymbolJs;
</script>
<style scoped lang='less'>
    @import url(StdSymbol.less);
</style>