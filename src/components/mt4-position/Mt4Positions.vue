<template>
  <div class='mt4_positions clearfix'>
        <div class="container">
            <bel-table
              ref="table"
              :configs="tableConfig">
            </bel-table>
        </div>
  </div>
</template>
  
<script >
import Mt4PositionsJs from './Mt4Positions.js';
export default Mt4PositionsJs;
</script>
<style scoped lang='less'>
</style>