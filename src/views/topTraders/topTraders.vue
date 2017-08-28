<template>
    <div class='top_traders'>
        <div class="top-action">
            <label>{{$t('Date')}}:</label>
            <el-date-picker class='date_picker' v-model="keywords.time_range.value" type="daterange" align="right" picker-options="pickerOptions"></el-date-picker>
            <label>{{$t('Top')}}:</label>
            <el-input v-model='keywords.top.value'  class="top_value" placeholder='Top'></el-input>
            <el-button type='primary'  @click='onSearch()'>{{$t('Search')}}</el-button>
        </div>

    <bel-table
      ref="table"
      :configs="tableConfig">
    </bel-table>
  </div>
</template>

<script >
import TopTradersJs from './topTraders.js';
export default TopTradersJs;
</script>
<style lang='less'>
.top_traders{
  padding-top:20px;
  .top-action{
    font-size:14px;
    margin-bottom:20px;
    .date_picker{
      .el-input__icon{
        right:8px;
      }
      .el-input__inner{
        border-radius: 20px;
        width:210px;
        padding-right:25px; 
      }
    }
  }
  .top_value {
    display:inline-block;
    width:110px;
    .el-input__inner{
      border-radius: 20px;
      /*padding-left: 20px;*/
    }
  }
  .el-button{
    margin-left: 15px;
    border-radius: 20px;
    padding-left:20px;
    padding-right:20px;
  }
}
</style>