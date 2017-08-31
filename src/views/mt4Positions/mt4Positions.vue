<template>
  <div class='mt4_positions clearfix'>
        <div class="top_bar">
          <el-button type='primary' :loading='reload_loading' @click = 'reload_data'>Reload</el-button>
          <el-button type='primary' :loading='check_loading' @click='check_bridge_mt4_diff' >{{check_loading ?procsess_text :'Check MT4 Bridge Diff'}} </el-button>
          </div> 
        <div class="container">
            <bel-table
              ref="table"
              :configs="tableConfig">
            </bel-table>
        </div>
  </div>
</template>
  
<script >
import Mt4PositionsJs from './mt4Positions.js';
export default Mt4PositionsJs;
</script>
<style scoped lang='less'>
  @import url(./mt4Positions.less);
</style>