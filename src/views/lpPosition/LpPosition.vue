<template>
    <div class="list">
        <div class='lp_position_panel'>
                <span class="green">{{$t('Green:Positive')}}</span>
                <span class="red">{{$t('Red:Negative')}}</span>
                <span class='title_b'>{{$t('NEXT REFRESH')}}:</span>
                <span class='remain_sec' >{{remain_sec}}</span>
                <span  class='title_b'>{{$t('STATUS')}}:</span>
                <span :style="{color : load_text_color}">{{load_status}}</span>
        </div> 
        <div class="table-wrap">
           <bel-table
                ref="table"    
                :configs="tableConfig">
                <template v-for='item in  lp_names'  :slot="item" scope="scope">
                      <span :style="{'color' : scope.row[item]< 0 ? 'red' : 'green' }">{{scope.row[item]!==undefined ? Math.abs(scope.row[item]): ''}}</span>
                </template> 
                <template slot="total" scope="scope">
                      <span :style="{'color' : scope.row.total< 0 ? 'red' : 'green' }">{{Math.abs(scope.row.total)}}</span>
                </template> 
           </bel-table>
         </div>
    </div>
</template>

<script>
    import LpPositionJs from './LpPosition.js';
    export default LpPositionJs;
</script>
<style scoped lang='less'>
    .green{
        color: #90da59;
    }
    .red{
        color: red;
    }
    .lp_position_panel{
       height:57px;
       line-height:22px;
       padding-bottom: 15px;
       padding-top: 20px;
       font-size: 14px;
       span{
        display: inline-block;
        height:22px;
       }
      .title_b{
             margin-left: 10px;
             
             font-weight: bold; 
      }
      .remain_sec{
        width:22px;
        height:22px;
        text-align:center;
        border:2px solid #ccc;
       
      }
    }
    
</style>
