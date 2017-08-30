<template>
    <div class='quote_rule'>
        <el-row :gutter='40'>
              <el-col :span='8'>
                  <p>{{$t('Source')}}:</p>
                  <el-input :disabled='true' v-model='source'></el-input>
              </el-col>
              <el-col :span='8'>
                  <p>{{$t('MT4 Symbol')}}:</p>
                  <el-input :disabled='true' v-model='mt4_symbol'></el-input>
              </el-col>
              <el-col :span='8'>
                  <p>{{$t('STD Symbol')}}:</p>
                  <el-input :disabled='true' v-model='std_symbol'></el-input>
              </el-col>
          </el-row> 
          <el-col :span='24'>
              <p class='sub_title'>{{$t('RULE')}}</p>
              <div class=''></div>
          </el-col>  
          <el-row :gutter='40'>
              <el-col :span='12'>
                  <p>{{$t('Digits')}}:</p>
                  <el-input v-model='digits'></el-input>
              </el-col> 
               <el-col :span='12'>
                  <p>{{$t('Aggregator')}}:</p>
                   <el-select class='w100' v-model="aggregator" placeholder="请选择">
                    <el-option
                      v-for="item in $store.state.global.aggregator"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                    </el-select>
              </el-col> 
               <el-col :span='12'>
                  <p>{{$t('Min spread')}}:</p>
                  <el-input v-model='minimal_spread'></el-input>
              </el-col>
              <el-col :span='12'>
                  <p>{{$t('Max spread')}}:</p>
                  <el-input v-model='maximal_spread'></el-input>
              </el-col>
              <el-col :span='12'>
                  <p>{{$t('Adjust')}}:</p>
                  <el-input v-model='adjust'></el-input>
              </el-col>
              <el-col :span='12'>
                  <p>{{$t('Markup')}}:</p>
                  <el-input v-model='markup'></el-input>
              </el-col>
              <el-col :span='12' class='pr'>
                  <p>{{$t('Type')}}</p>
                   <el-select class='w100' v-model="type" placeholder="请选择">
                    <el-option
                      v-for="item in $store.state.global.quote_types"
                      :key="item"
                      :label="$t(item)"
                      :value="item">
                    </el-option>
                  </el-select>
                  <div class="type_wrap" v-if="type=='delta'"> 
                      <div class="type_content  fix">
                          <div class="type_item">
                            <p>{{$t('Bid_Delta')}}:</p>
                            <input type="text" v-model='bid_delta'>
                        </div>
                        <div class="type_item">
                            <p>{{$t('Ofr_Delta')}}:</p>
                            <input type="text" v-model='ofr_delta'>
                        </div>
                        <div class="type_item">
                            <p>{{$t('Random')}}:</p>
                            <input type="text" v-model='random'>
                        </div>
                      </div>
                  </div>
                  <div class="type_wrap" v-if="type=='asian'"> 
                      <div class="type_content  fix">
                          <div class="type_item">
                            <p>{{$t('Asian_Delta')}}:</p>
                            <input type="text" v-model='asian_delta'>
                        </div>
                        <div class="type_item">
                            <p>{{$t('Random')}}:</p>
                            <input type="text" v-model='random'>
                        </div>
                      </div>
                  </div>
                  <div class="type_wrap" v-if="type=='spread'"> 
                      <div class="type_content  fix">
                          <div class="type_item">
                            <p>{{$t('Spread')}}:</p>
                            <input type="text" v-model='spread'>
                        </div>
                        <div class="type_item">
                            <p>{{$t('Random')}}:</p>
                            <input type="text" v-model='random'>
                        </div>
                      </div>
                  </div>
              </el-col>  
          </el-row>  
          <el-col :span='24' class='confirm_btn'>
              <el-button type="primary" @click='submit()'>{{$t('Confirm')}}</el-button>
          </el-col>    
    </div>
</template>
  
<script >
import quoteRuleDialogJs from './quoteRuleDialog.js';
export default quoteRuleDialogJs;
</script>
<style lang='less'>
      @import url(./quoteRuleDialog.less);
</style>
