<template>
  <div class='mt4_positions clearfix'>
        <div class="top_bar">
          <el-button>Reload</el-button>
          <el-button>Check MT4 Bridge Diff</el-button>
          </div> 
        <div class="container">
            <bel-table
              ref="table"
              :configs="tableConfig">
            </bel-table>
        </div>
     <!--    <drag-dialog>
          
        </drag-dialog> -->
  </div>
</template>
  
<script >
import Mt4PositionsJs from './mt4Positions.js';
export default Mt4PositionsJs;
</script>
<style scoped lang='less'>
  @import url(./mt4Positions.less);
</style>