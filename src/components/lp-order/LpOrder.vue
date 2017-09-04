<template>
    <div class='list'>
    <bel-table
      ref="table"  
      :configs="tableConfig">
        <template slot="bid_size" scope="scope">
              <span :class='{buySide: scope.row.buyFlag}'>{{scope.row.bid_size}}</span>
        </template>
         <template slot="bid_price" scope="scope">
              <span :class='{buySide: scope.row.buyFlag}' :style="{color:'green'}">{{scope.row.bid_price}}</span>
        </template>
         <template slot="ofr_size" scope="scope">
              <span :class='{buySide: !scope.row.buyFlag}'>{{scope.row.ofr_size}}</span>
        </template>
         <template slot="ofr_price" scope="scope">
              <span :class='{buySide: !scope.row.buyFlag}' :style="{color:'red'}">{{scope.row.ofr_price}}</span>
        </template>
         <template slot="client_slippage" scope="scope">
              <span :style="scope.row.client_slippage>0?{color:'red'}:{color:'green'}">{{scope.row.statusFlag?scope.row.client_slippage:'-'}}</span>
        </template>
         <template slot="status" scope="scope">
              <span :style="scope.row.statusFlag?{color:'green'}:{color:'red'}">{{scope.row.status}}</span>
        </template>
    </bel-table> 
  </div>
</template>
  
<script >
import LpOrderJs from './LpOrder.js';
export default LpOrderJs;
</script>
<style scoped lang='less'>
</style>