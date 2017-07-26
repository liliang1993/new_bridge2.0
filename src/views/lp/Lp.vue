<template>
    <div class='list'>
    <bel-table
      ref="table"    
      :configs="tableConfig">
    </bel-table> 
  </div>
</template>
  
<script >
import LpJs from './Lp.js';
export default LpJs;
</script>
<style scoped lang='less'>
    @import url(Lp.less);
</style>