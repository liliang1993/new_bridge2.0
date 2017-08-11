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
import LpJs from './Lp.js';
export default LpJs;
</script>
<style scoped lang='less'>
    @import url(Lp.less);
</style>