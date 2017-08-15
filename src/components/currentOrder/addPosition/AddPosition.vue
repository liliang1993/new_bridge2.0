<template>
    <div class='list'>
      <!-- <el-row   class="top-action">
          <el-col  :span='6' >
                  <el-input placeholder="请输入内容" v-model="keyword">
                  <el-select  v-model='search_header'  slot="prepend" placeholder="请选择">
                        <el-option label="MT4 logins" value="MT4 logins"></el-option>
                        <el-option label="MT4 orders" value="MT4 orders"></el-option>
                  </el-select>
                  <el-button slot="append" icon="search"  @click='onSearch'></el-button>
                </el-input>
          </el-col> 
      </el-row> -->
      <el-row >
              <div class="search_bar">
                <p>MT4 logins:</p>
                <input type="text" placeholder="input" class='search_bar'>
                <el-button class='r' type='primary'>Search Logins</el-button>  
              </div>     
              <div class="search_bar">  
                <p>MT4 orders:</p>
                <input type="text" placeholder="input" class='search_bar'>
                <el-button class='r' type='primary'>Search Orders</el-button>  
              </div>   
      </el-row>
      <bel-table
      ref="table"
      :configs="tableConfig">
        <template v-for='(item,index) in tableConfig.columns'  :slot="item.attr.label" scope="scope">
              <el-input  :placeholder='item.attr.label' v-model='scope.row[item.attr.prop].value'  :class='scope.row[item.attr.prop].class'></el-input>
        </template>
        <template slot="delete" scope="scope">
              <el-button
                  type="danger"
                  icon='delete'
                  size="mini"
                  @click='onDeleteRow(scope.row)'></el-button>
          </template>
    </bel-table>
    <el-row>
        <el-col :span='24' class='btm-action'>
              <el-button  class='icon'  icon="plus" @click='addNewRow()' ></el-button>
        </el-col>
         <el-col :span='2' >
                  <el-button  type='primary' @click='onSubmit' >Submit</el-button>
          </el-col> 
    </el-row>
   
  </div>
</template>

<script >
import AddPositionJs from './AddPosition.js';
export default AddPositionJs;
</script>
<style scoped lang='less'>
@import url(./AddPosition.less);
</style>
