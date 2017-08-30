<template>
  <div class='quote_rule_container'>
    <el-row>
        <el-col :span='24' class='actions-top'>
            <el-button type='primary' @click='showAddQuoteRule'>{{$t('Add Rule')}}</el-button>
        </el-col> 
    </el-row>
    <bel-table
      ref="table"  
      class='quote_rule_table'  
      :configs="tableConfig">
          <template slot="handler" scope="scope">
                  <i class='icon icon_edit' @click='edit_quote_rule(scope.row)'></i>
                   <el-popover
                    placement="top"
                    width="160"
                    v-model="scope.row.visible">
                    <p>确定删除？</p>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="scope.row.visible=false">取消</el-button>
                      <el-button type="primary" size="mini" @click="delete_quote_rule(scope.row,scope.$index)">确定</el-button>
                    </div>
                    <i class='icon icon_delete' slot="reference"  v-if='!scope.row.editFlag' ></i>
                  </el-popover>  
                  
          </template>
          <template slot="digits_attr" scope="scope">
              <span v-if='!scope.row.editFlag'>{{scope.row.attributes.digits}}</span>
              <el-input v-if='scope.row.editFlag' v-model='scope.row.attributes.digits'></el-input>  
          </template>
          <template slot="min_spread_attr" scope="scope">
              <span v-if='!scope.row.editFlag'>{{scope.row.attributes.minimal_spread}}</span>
                <el-input  v-if='scope.row.editFlag' v-model='scope.row.attributes.minimal_spread'></el-input>  

              
          </template>
          <template slot="max_spread_attr" scope="scope">
              <span v-if='!scope.row.editFlag'>{{scope.row.attributes.maximal_spread}}</span>
              <el-input v-if='scope.row.editFlag' v-model='scope.row.attributes.maximal_spread'>
              </el-input>  
          </template>
          <template slot="aggregator_attr" scope="scope">
             
              <span v-if='!scope.row.editFlag'>{{scope.row.attributes.aggregator}}</span>
              <el-select v-if='scope.row.editFlag' v-model='scope.row.attributes.aggregator'>
                <el-option
                  key="median"
                  label="median"
                  value="median">
                </el-option>
                <el-option
                  key="bestright"
                  label="bestright"
                  value="bestright">
                </el-option>
                <el-option
                  key="bestright_option"
                  label="bestright_option"
                  value="bestright_option">
                </el-option>
              </el-select>  
          </template>
          <template slot="adjust_attr" scope="scope">
              <span v-if='!scope.row.editFlag'>{{scope.row.attributes.adjust}}</span>
              <el-input v-if='scope.row.editFlag' v-model='scope.row.attributes.adjust'></el-input>  
          </template>
          <template slot="type_attr" scope="scope">
              <el-popover
                    class='type_attr_popover'
                    placement="bottom-start"
                    v-if='scope.row.hoverContent'
                    width="160"
                    trigger='hover'
                    >
                    <table class='w100'>
                      <tbody>
                          <tr v-for=' obj in scope.row.hoverContent'>
                              <td v-for ='(item,key) in obj'>
                                {{$t(item)}}
                              </td>
                          </tr>
                      </tbody>
                    </table>
                     <span class='type_formore' slot="reference">
                     {{$t(scope.row.type)}}</span>
              </el-popover> 
              <span v-if='!scope.row.hoverContent'>{{$t(scope.row.type)}} </span>  
              <el-select class='db' v-if='scope.row.editFlag' v-model='scope.row.type'>
                <el-option 
                  key="raw"
                  label="raw"
                  value="raw">
                </el-option>
                <el-option
                  key="delta"
                  label="delta"
                  value="delta">
                </el-option>
                <el-option
                  key="asian"
                  label="asian"
                  value="asian">
                </el-option>
                <el-option
                  key="spread"
                  label="spread"
                  value="spread">
                </el-option>
              </el-select>
              <div  v-if='scope.row.type== "delta" &&scope.row.editFlag'> 
                <label class='type_label'>bid_delta(pips)</label>
                <el-input class='db'  v-model='scope.row.attributes.bid_delta'></el-input>
                <label class='type_label'>ofr_delta(pips)</label>
                <el-input class='db'  v-model='scope.row.attributes.ofr_delta'>
                </el-input> 
                <label class='type_label'>random</label>
                <el-input class='db' v-model='scope.row.attributes.random'></el-input>
              </div>
              <div v-if='scope.row.type== "asian"&&scope.row.editFlag'>
                <label class='type_label'>asian_delta(pips)</label>
                <el-input class='db'  v-model='scope.row.attributes.asian_delta'></el-input> 
                <label class='type_label'>random</label>
                <el-input class='db' v-model='scope.row.attributes.random'></el-input>
              </div>
              <div  v-if='scope.row.type== "spread"&&scope.row.editFlag'>
                <label class='type_label'>spread</label>
                <el-input class='db' v-model='scope.row.attributes.spread'></el-input> 
                <label class='type_label'>random(pips)</label>
                <el-input class='db' v-model='scope.row.attributes.random'></el-input>
              </div>
          </template>
    </bel-table> 
    <el-dialog class='quoteRule_dialog' :title="$t('Edit Quote Rule')" :visible.sync="editDialogTableVisible" top='20%'>
          <el-row :gutter='40'>
              <el-col :span='8'>
                  <p>{{$t('Source')}}:</p>
                  <el-input :disabled='true' v-model='editDialog.source'></el-input>
              </el-col>
              <el-col :span='8'>
                  <p>{{$t('MT4 Symbol')}}:</p>
                  <el-input :disabled='true' v-model='editDialog.mt4_symbol'></el-input>
              </el-col>
              <el-col :span='8'>
                  <p>{{$t('STD Symbol')}}:</p>
                  <el-input :disabled='true' v-model='editDialog.std_symbol'></el-input>
              </el-col>
          </el-row> 
          <el-col :span='24'>
              <p class='sub_title'>{{$t('RULE')}}</p>
              <div class=''></div>
          </el-col>  
          <el-row :gutter='40'>
              <el-col :span='12'>
                  <p>{{$t('Digits')}}:</p>
                  <el-input v-model='editDialog.attributes.digits'></el-input>
              </el-col> 
               <el-col :span='12'>
                  <p>{{$t('Aggregator')}}:</p>
                   <el-select class='w100' v-model="editDialog.attributes.aggregator" placeholder="请选择">
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
                  <el-input v-model='editDialog.attributes.minimal_spread'></el-input>
              </el-col>
              <el-col :span='12'>
                  <p>{{$t('Max spread')}}:</p>
                  <el-input v-model='editDialog.attributes.maximal_spread'></el-input>
              </el-col>
              <el-col :span='12'>
                  <p>{{$t('Adjust')}}:</p>
                  <el-input v-model='editDialog.attributes.adjust'></el-input>
              </el-col>
              <el-col :span='12'>
                  <p>{{$t('Markup')}}:</p>
                  <el-input v-model='editDialog.attributes.markup'></el-input>
              </el-col>
              <el-col :span='12' class='pr'>
                  <p>{{$t('Type')}}</p>
                   <el-select class='w100' v-model="editDialog.type" placeholder="请选择">
                    <el-option
                      v-for="item in $store.state.global.quote_types"
                      :key="item"
                      :label="$t(item)"
                      :value="item">
                    </el-option>
                  </el-select>
                  <div class="type_wrap" v-if="editDialog.type=='delta'"> 
                      <div class="type_content  fix">
                          <div class="type_item">
                            <p>{{$t('Bid_Delta')}}:</p>
                            <input type="text" v-model='editDialog.attributes.bid_delta'>
                        </div>
                        <div class="type_item">
                            <p>{{$t('Ofr_Delta')}}:</p>
                            <input type="text" v-model='editDialog.attributes.ofr_delta'>
                        </div>
                        <div class="type_item">
                            <p>{{$t('Random')}}:</p>
                            <input type="text" v-model='editDialog.attributes.random'>
                        </div>
                      </div>
                  </div>
                  <div class="type_wrap" v-if="editDialog.type=='asian'"> 
                      <div class="type_content  fix">
                          <div class="type_item">
                            <p>{{$t('Asian_Delta')}}:</p>
                            <input type="text" v-model='editDialog.attributes.asian_delta'>
                        </div>
                        <div class="type_item">
                            <p>{{$t('Random')}}:</p>
                            <input type="text" v-model='editDialog.attributes.random'>
                        </div>
                      </div>
                  </div>
                  <div class="type_wrap" v-if="editDialog.type=='spread'"> 
                      <div class="type_content  fix">
                          <div class="type_item">
                            <p>{{$t('Spread')}}:</p>
                            <input type="text" v-model='editDialog.attributes.spread'>
                        </div>
                        <div class="type_item">
                            <p>{{$t('Random')}}:</p>
                            <input type="text" v-model='editDialog.attributes.random'>
                        </div>
                      </div>
                  </div>
              </el-col>  
          </el-row>  
          <el-col :span='24' class='confirm_btn'>
              <el-button type="primary" @click='edit_quoteRule_submit()'>{{$t('Confirm')}}</el-button>
          </el-col>    
      </el-dialog>
    <!-- <el-dialog class='add_dialog' title="Add quote rule" :visible.sync="addDialogTableVisible" top='20%'>
          <bel-table
      ref="table"  
      class='quote_rule_table'  
      :configs="add_tableConfig">
          <template slot="source" scope="scope">
              <el-input v-model='scope.row.source'></el-input>  
          </template>
          <template slot="source" scope="scope">
              <el-input v-model='scope.row.source'></el-input>  
          </template>
          <template slot="mt4_symbol" scope="scope">
              <el-input v-model='scope.row.mt4_symbol'></el-input>  
          </template>
          <template slot="std_symbol" scope="scope">
              <el-input v-model='scope.row.std_symbol'></el-input>  
          </template>
          <template slot="digits_attr" scope="scope">
              <el-input v-model='scope.row.attributes.digits'></el-input>  
          </template>
          <template slot="min_spread_attr" scope="scope">
                <el-input v-model='scope.row.attributes.minimal_spread'></el-input>          
          </template>
          <template slot="max_spread_attr" scope="scope">
              <el-input v-model='scope.row.attributes.maximal_spread'>
              </el-input>  
          </template>
          <template slot="aggregator_attr" scope="scope">
              <el-select v-model='scope.row.attributes.aggregator'>
                <el-option
                  key="median"
                  label="median"
                  value="median">
                </el-option>
                <el-option
                  key="bestright"
                  label="bestright"
                  value="bestright">
                </el-option>
                <el-option
                  key="bestright_option"
                  label="bestright_option"
                  value="bestright_option">
                </el-option>
              </el-select>  
          </template>
          <template slot="adjust_attr" scope="scope">
              <el-input  v-model='scope.row.attributes.adjust'></el-input>  
          </template>
          <template slot="type_attr" scope="scope" >
              <el-select class='db' @change=changeType($event,scope.row) v-model='scope.row.type'>
                <el-option 
                  key="raw"
                  label="raw"
                  value="raw">
                </el-option>
                <el-option
                  key="delta"
                  label="delta"
                  value="delta">
                </el-option>
                <el-option
                  key="asian"
                  label="asian"
                  value="asian">
                </el-option>
                <el-option
                  key="spread"
                  label="spread"
                  value="spread">
                </el-option>
              </el-select>
                <div class="type_wrap" v-if="scope.row.type=='delta'"> 
                        <div class="type_content  fix">
                            <div class="type_item">
                              <p>Bid_delta:</p>
                              <input type="text" v-model='scope.row.attributes.bid_delta'>
                          </div>
                          <div class="type_item">
                              <p>Ofr_delta</p>
                              <input type="text" v-model='scope.row.attributes.ofr_delta'>
                          </div>
                          <div class="type_item">
                              <p>Random</p>
                              <input type="text" v-model='scope.row.attributes.random'>
                          </div>
                        </div>
                    </div>
                  <div class="type_wrap" v-if="scope.row.type=='asian'"> 
                      <div class="type_content  fix">
                          <div class="type_item">
                            <p>Asian_delta:</p>
                            <input type="text" v-model='scope.row.attributes.asian_delta'>
                        </div>
                        <div class="type_item">
                            <p>Random</p>
                            <input type="text" v-model='scope.row.attributes.random'>
                        </div>
                      </div>
                  </div>
                  <div class="type_wrap" v-if="scope.row.type=='spread'"> 
                      <div class="type_content  fix">
                          <div class="type_item">
                            <p>Spread:</p>
                            <input type="text" v-model='scope.row.attributes.spread'>
                        </div>
                        <div class="type_item">
                            <p>Random</p>
                            <input type="text" v-model='scope.row.attributes.random'>
                        </div>
                      </div>
                  </div>
          </template>
    </bel-table>  
          <el-col :span='24' class='confirm_btn'>
              <el-button type="primary" @click='add_user_submit(add_tableData[0])'>Confirm</el-button>
          </el-col>    
      </el-dialog> -->
      <el-dialog class='quoteRule_dialog' :title="$t('Add Quote Rule')" :visible.sync="addDialogTableVisible" top='20%'>
          <el-row :gutter='40'>
              <el-col :span='8'>
                  <p>{{$t('Source')+':'}}</p>
                  <el-select class='w100' v-model="addDialog.source" placeholder="请选择">
                    <el-option
                      v-for="item in $store.state.global.sources"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                    </el-select>
              </el-col>
              <el-col :span='8'>
                  <p>{{$t('MT4 Symbol')+':'}}</p>
                  <el-input v-model='addDialog.mt4_symbol'></el-input>
              </el-col>
              <el-col :span='8'>
                  <p>{{$t('STD Symbol')+':'}}</p>
                 <el-select class='w100' v-model="addDialog.std_symbol" placeholder="请选择">
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
              <p class='sub_title'>{{$t('RULE')}}</p>
              <div class=''></div>
          </el-col>  
          <el-row :gutter='40'>
              <el-col :span='12'>
                  <p>{{$t('Digits')+':'}}</p>
                  <el-input v-model='addDialog.attributes.digits'></el-input>
              </el-col> 
               <el-col :span='12'>
                  <p>{{$t('Aggregator')+':'}}</p>
                  <el-select class='w100' v-model="addDialog.attributes.aggregator" placeholder="请选择">
                    <el-option
                      v-for="item in $store.state.global.aggregator"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                    </el-select>
              </el-col> 
               <el-col :span='12'>
                  <p>{{$t('Min spread')+':'}}</p>
                  <el-input v-model='addDialog.attributes.minimal_spread'></el-input>
              </el-col>
              <el-col :span='12'>
                  <p>{{$t('Max spread')+':'}}</p>
                  <el-input v-model='addDialog.attributes.maximal_spread'></el-input>
              </el-col>
              <el-col :span='12'>
                  <p>{{$t('Adjust')+':'}}</p>
                  <el-input v-model='addDialog.attributes.adjust'></el-input>
              </el-col>
              <el-col :span='12'>
                  <p>{{$t('Markup')+':'}}</p>
                  <el-input v-model='addDialog.attributes.markup'></el-input>
              </el-col>
              <el-col :span='12' class='pr'>
                  <p>{{$t('Type')+':'}}</p>
                   <el-select class='w100' v-model="addDialog.type" placeholder="请选择">
                    <el-option
                      v-for="item in $store.state.global.quote_types"
                      :key="item"
                      :label="$t(item)"
                      :value="item">
                    </el-option>
                  </el-select>
                  <div class="type_wrap" v-if="addDialog.type=='delta'"> 
                      <div class="type_content  fix">
                          <div class="type_item">
                            <p>{{$t('BID_DELTA')}}:</p>
                            <input type="text" v-model='addDialog.attributes.bid_delta'>
                        </div>
                        <div class="type_item">
                            <p>{{$t('OFR_DELTA')}}:</p>
                            <input type="text" v-model='addDialog.attributes.ofr_delta'>
                        </div>
                        <div class="type_item">
                            <p>{{$t('Random')}}:</p>
                            <input type="text" v-model='addDialog.attributes.random'>
                        </div>
                      </div>
                  </div>
                  <div class="type_wrap" v-if="addDialog.type=='asian'"> 
                      <div class="type_content  fix">
                          <div class="type_item">
                            <p>{{$t('ASIAN_DELTA')}}:</p>
                            <input type="text" v-model='addDialog.attributes.asian_delta'>
                        </div>
                        <div class="type_item">
                            <p>{{$t('Random')}}:</p>
                            <input type="text" v-model='addDialog.attributes.random'>
                        </div>
                      </div>
                  </div>
                  <div class="type_wrap" v-if="addDialog.type=='spread'"> 
                      <div class="type_content  fix">
                          <div class="type_item">
                            <p>{{$t('Spread')}}:</p>
                            <input type="text" v-model='addDialog.attributes.spread'>
                        </div>
                        <div class="type_item">
                            <p>{{$t('Random')}}:</p>
                            <input type="text" v-model='addDialog.attributes.random'>
                        </div>
                      </div>
                  </div>
              </el-col>  
          </el-row>  
          <el-col :span='24' class='confirm_btn'>
              <el-button type="primary" @click='add_quoteRule_submit()'>{{$t('Confirm')}}</el-button>
          </el-col>    
      </el-dialog>
  </div>
</template>
  
<script >
import QuoteRuleJs from './QuoteRule.js';
export default QuoteRuleJs;
</script>
<style lang='less'>
    @import url(QuoteRule.less);
</style>