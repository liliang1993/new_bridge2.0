<template>
    <div class='list'>
        <el-row :gutter="10">
            <el-col :span='6'>
                <label>{{$t('Source')}}:</label>
                <el-select v-model='source' class='w100'>
                 <el-option
                    v-for="item in $store.state.global.sources"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>   
              </el-select>
            </el-col>  
            <el-col :span='6'>
                <label>{{$t('Group')}}:</label>
                <el-input  v-model='group'></el-input>
            </el-col>  
            <el-col :span='6'>
                <label >{{$t('MT4 Symbol')}}:</label>
                <el-input  v-model='mt4_symbol'></el-input>
            </el-col>  
            <el-col :span='6'>
                <label>{{$t('STD Symbol')}}:</label>
                <el-select v-model='std_symbol' class='w100'>
                 <el-option
                    v-for="item in $store.state.global.std_symbols"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>   
              </el-select>
            </el-col>  
        </el-row>
        <el-col :span='24'>
          <h2 class='sub_title'>TradeRule</h2>
        </el-col>
        <el-col :span='24'>     
          <label>{{$t('Route_type')}}:</label>
        </el-col>
      <el-row :gutter='10'>
        <el-col :span='8'>
            {{$t('If Size')}} >=
            <el-input class='dib w60'  v-model='route_type.threshold'>
            </el-input> 
        </el-col>
        <el-col :span='6'>
           {{$t('Then')}}
          <el-select class='w70' v-model="route_type.left" placeholder="请选择">
           <el-option
              v-for="item in route_type_select_options"
              :key="item"
              :label="item"
              :value="item">
            </el-option>   
          </el-select> 
        </el-col>
        <el-col :span='6'>
          {{$t('Else')}}
          <el-select v-model="route_type.right"  class='w70'>
              <el-option
                v-for="item in route_type_select_options"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter='10'>
          <el-col :span='6'>
                <label>{{$t('Coverage')}}:</label>
                <el-input v-model='coverage'></el-input>
            </el-col>  
            <el-col :span='6'>
                <label>{{$t('Better_fill')}}:</label>
                <el-input v-model='better_fill'></el-input>
            </el-col>  
            <el-col :span='6'>
                <label>{{$t('Open_partial')}}:</label>
                <el-select v-model="open_partial"  class='w100'>
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
                <label>{{$t("Open_lp_rejected_retry")}}:</label>
                <el-select v-model="open_lp_rejected_retry"  class='w100'>
                     <el-option
                    :label="$t('true')"
                    value="true">
                  </el-option>
                  <el-option
                    :label="$t('false')"
                    value="false">
                  </el-option>
                </el-select>
            </el-col>  
      </el-row>
      <el-row :gutter='10'>
        <el-col :span='12'>
          <label>{{$t('open_threshold')}}</label>
          <el-input v-model='open_threshold'></el-input>  
        </el-col>
        <el-col :span='12'>
          <label>{{$t('open_probe')}}</label>
          <el-input  v-model='open_probe'></el-input>  
        </el-col>
        <el-col :span='12'>
          <label>{{$t('close_threshold')}}</label>
          <el-input v-model='close_threshold'></el-input>  
        </el-col>
        <el-col :span='12'>
          <label>{{$t('close_probe')}}</label>
          <el-input v-model='close_probe'></el-input>  
        </el-col>
        <el-col :span='12'>
          <label>{{$t('Markup')}}</label>
          <el-input v-model = 'markup'></el-input>  
        </el-col>
        <el-col :span='12'>
              <label class='db'>{{$t('BBook_exec_type')}}:</label>
              <el-select v-model='bbook_exec_type' class='w100'>
                 <el-option
                    v-for="item in bbook_exec_type_options"
                    :key="item"
                    :label="$t(item)"
                    :value="item">
                  </el-option>   
              </el-select>
          </el-col>
      </el-row>  
       <el-row :gutter='10'>
       <el-col :span='24'>
         <label> 
             {{$t('Limit_order_types')}}:
          </label>
       </el-col>
          
          <el-col :span='8' v-for='item in limit_order_types_options'>
              <el-checkbox v-model="item.isChecked">{{$t(item.label)}}</el-checkbox>
              <el-input v-model='item.value'></el-input>
          </el-col>
      </el-row>
      <el-row>
        <el-col>{{$t('LPS')}}:</el-col>
        <el-col :span='3' v-for='item in lps_options'>
          <el-checkbox v-model="item.value">{{item.label}}</el-checkbox>
        </el-col>
      </el-row>
      <el-row>
          <el-col :span='24'>
              <label>  
              {{$t('Slippages')}}:
              <i class='icon icon_add' @click='addNewRow'></i>
              </label>
              <el-row :gutter='15' class='lh35' v-for='(group,index) in slippages_options'>
                    <el-col :span='7' v-for='(item ,key) in group '>
                      <el-input v-model='item.value' :placeholder='$t(item.desc)'></el-input>  
                    </el-col>
                    <i class='icon icon_delete' @click = 'deleteRow(index)'></i>
              </el-row>
          </el-col>
      </el-row> 
      <el-col :span='24' class='confirm_btn'>
              <el-button type="primary" @click='submit'>{{$t('Confirm')}}</el-button>
      </el-col> 
    </div>
</template>
  
<script >
import TradeRuleDiaJs from './tradeRuleDia.js';
export default TradeRuleDiaJs;
</script>
<style scoped lang='less'>
    label{
      height:20px;
      line-height: 20px;
    }
</style>
