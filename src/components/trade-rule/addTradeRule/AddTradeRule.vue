<template>
    <div class='list'>
        <el-row :gutter="10">
            <el-col :span='6'>
                <label>Source:</label>
                <el-input v-model='dialog.source'></el-input>
            </el-col>  
            <el-col :span='6'>
                <label>Group:</label>
                <el-input  v-model='dialog.source'></el-input>
            </el-col>  
            <el-col :span='6'>
                <label >MT4 Symbol:</label>
                <el-input  v-model='dialog.mt4_symbol'></el-input>
            </el-col>  
            <el-col :span='6'>
                <label>STD Symbol:</label>
                <el-input  v-model='dialog.std_symbol'></el-input>
            </el-col>  
        </el-row>
        <el-col :span='24'>
          <h2>TradeRule</h2>
        </el-col>
        <el-col :span='24'>     
          <label>route_type:</label>
        </el-col>
      <el-row :gutter='10'>
        <el-col :span='8'>
            if size >=
            <el-input class='dib w70'  v-model='dialog.attributes.route_type.threshold'>
            </el-input> 
        </el-col>
        <el-col :span='8'>
          then
          <el-select class='w80' v-model="dialog.attributes.route_type.left" placeholder="请选择">
           <el-option
              v-for="item in route_type_options"
              :key="item"
              :label="item"
              :value="item">
            </el-option>   
          </el-select> 
        </el-col>
        <el-col :span='8'>
          else
          <el-select v-model="dialog.attributes.route_type.right"  class='w80'>
              <el-option
                v-for="item in route_type_options"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter='10'>
          <el-col :span='6'>
                <label>coverage:</label>
                <el-input></el-input>
            </el-col>  
            <el-col :span='6'>
                <label>better_fill:</label>
                <el-input></el-input>
            </el-col>  
            <el-col :span='6'>
                <label>open_partial:</label>
                <el-select v-model="dialog.attributes.open_partial"  class='w100'>
                   <el-option
                    label="true"
                    value="true">
                  </el-option>
                  <el-option
                    label="false"
                    value="false">
                  </el-option>
              </el-select>
            </el-col>  
            <el-col :span='6'>
                <label>open_lp_rejected_retry:</label>
                <el-select v-model="dialog.attributes.open_lp_rejected_retry"  class='w100'>
                     <el-option
                    label="true"
                    value="true">
                  </el-option>
                  <el-option
                    label="false"
                    value="false">
                  </el-option>
                </el-select>
            </el-col>  
      </el-row>
      <el-row :gutter='10'>
        <el-col :span='12'>
          <label>open_threshold</label>
          <el-input v-model='open_threshold'></el-input>  
        </el-col>
        <el-col :span='12'>
          <label>open_probe</label>
          <el-input  v-model='open_probe'></el-input>  
        </el-col>
        <el-col :span='12'>
          <label>close_threshold</label>
          <el-input v-model='close_threshold'></el-input>  
        </el-col>
        <el-col :span='12'>
          <label>close_probe</label>
          <el-input v-model='close_threshold'></el-input>  
        </el-col>
        <el-col :span='12'>
          <label>markup</label>
          <el-input></el-input>  
        </el-col>
        <el-col :span='12'>
              <label class='db'>bbook_exec_type:</label>
              <el-select v-model='dialog.attributes.bbook_exec_type' class='w100'>
                 <el-option
                    v-for="item in bbook_exec_type_options"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>   
              </el-select>
          </el-col>
      </el-row>  
       <el-row :gutter='10'>
          <label>  
              limit_order_types
          </label>
          <el-col :span='8' v-for='item in limit_order_types_options'>
              <el-checkbox v-model="item.isChecked">{{item.label}}</el-checkbox>
              <el-input v-model='item.value'></el-input>
          </el-col>
      </el-row>
      <el-row>
        <el-col>lps</el-col>
        <!-- <el-col :span='3'>
          <el-checkbox v-model=""></el-checkbox>
        </el-col> -->
      </el-row>
      <el-row>
          <el-col :span='24'>
              <label>  
              slippages:
              </label>
              <!-- <el-row :gutter='15' class='lh35'>
                  <el-col :span='2' >
                  <i class='icon icon_add' @click='addNewRow'></i>
                  </el-col>
                  <el-col :span>
                    <el-col :span='6'>
                      <el-input></el-input>  
                    </el-col>
                    <el-col :span='7'>
                        <el-input></el-input>  
                    </el-col>
                    <el-col :span='7'>
                        <el-input></el-input>  
                    </el-col>
                    <i class='icon icon_delete' @click = 'deleteRow'></i>
                  </el-col>  
              </el-row> -->
          </el-col>
      </el-row> 
    </div>
</template>
  
<script >
import AddTradeRuleJs from './AddTradeRule.js';
export default AddTradeRuleJs;
</script>
<style scoped lang='less'>
    label{
      height:20px;
      line-height: 20px;
    }
</style>
