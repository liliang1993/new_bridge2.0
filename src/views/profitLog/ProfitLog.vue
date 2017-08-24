<template>
    <div class='list'>
    <el-col :span="24" class='table-wrap'>
      <bel-table
        ref="table"    
        :configs="tableConfig">
      </bel-table> 
    </el-col>
  </div>
</template>
  
<script >
import ProfitLogJs from './ProfitLog.js';
export default ProfitLogJs;
</script>
<style scoped lang='less'>
    @import url(ProfitLog.less);
</style>