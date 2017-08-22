<template>
  <div class='clearfix'>
    <el-col :span="24" class='table-wrap'>
    <bel-table
      ref="table" 
      class='auditLog_table'
      @row-click='openDetailDialog'   
      :configs="tableConfig">
          <template slot="status" scope="scope">
              <span :style="scope.row.status== 0 ? 'color:black;' : 'color:red;' ">{{scope.row.status == 1 ? 'Error' : 'OK'}}</span>
          </template>
          <template slot="request" scope="scope">
              <div class='request_wrap' >{{scope.row.request}}</div>
          </template>
    </bel-table> 
    </el-col>
    <el-col :span="24" class='btm-action'>
            <el-pagination
                class='pagination'
                :page-sizes="pagination.page_sizes"
                :page-size="pagination.page_size"
                :layout="pagination.layout"
                :total="pagination.total"
                :current-page='pagination.current_page'
                @current-change='onChangeCurrentPage'
                @size-change='onChangePageSize'>
            </el-pagination>
    </el-col>
    <el-dialog  class='dialog' :visible.sync="dialogTableVisible">
      <div class="title">
        <span><i>LOG_ID:</i>{{dialog.log_id}}</span>
        <span><i>USERNAME:</i>{{dialog.username}}</span>
        <span><i>API:</i>{{dialog.api}}</span>
      </div>
      <div class="log_wrap">
        <ul>
          <li>
            <p>REQUEST</p>
            <div class="code">
                <pre>{{dialog.request}}</pre>
            </div>
          </li>
          <li>
            <p>RESULT</p>
            <div class="code">
                <pre>{{dialog.result}}</pre>
            </div>
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>
  
<script >
import AuditLogJs from './AuditLog.js';
export default AuditLogJs;
</script>
<style  scoped lang='less'>
     @import url(AuditLog.less);
</style>