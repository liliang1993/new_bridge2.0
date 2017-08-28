<template>
    <div class="list">
        <el-button :plain="true" type="info" @click='onGetErrLog()'>{{$t('Error Log')}}</el-button>
        <el-button :plain="true" type="info" @click='onGetInfoLog()'>{{$t('Info Log')}}</el-button>
        <el-button :plain="true" type="info" @click='onGetCurrentshopper()'>{{$t('Current Shopper')}}</el-button>
        <el-input class="info_show" v-model="log_value" readonly></el-input>
        <el-button type="primary" @click='onGetBridgeStatus()'>{{$t('Bridge Status')}}</el-button>
        <el-button type="danger" @click= 'onSetMaxConcurrency()'>{{$t('Set Max Bridge Concurrency')}}</el-button>
        <p class='status_info'>{{$t('Bridge Status')}}:<span>{{bridge_status}}</span></p>
        <div class='code-container'>
                <pre class='bridge-code'>{{bridge_value}}</pre>
        </div>
        <P class='warn_info'>{{$t('WARNING: DO NOT CLICK BELOW BUTTONS IF YOU KNOW NOTHING!')}}</P>
        <el-button type="danger" @click='onStopBridge()'>{{$t('Stop Bridge')}}</el-button>
        <el-button type="primary" @click='onOpenBridge()'>{{$t('Start Bridge')}}</el-button>
    </div>
</template>

<script>
    import DialognosisJs from './Dialognosis.js';
    export default DialognosisJs;
</script>
<style scoped lang='less'>
    .info_show{
      margin:10px 0;
    }
    .warn_info{
      color: red;
      margin-bottom: 10px;
      font-size:20px;
    }
    .status_info{
      font-size: 15px;
    line-height: 15px;
    font-weight:bold;
    margin:10px 0;
    }
    .code-container{
        
       margin-top: 10px;
    }
.bridge-code{
    border:1px solid black;
    border-radius:  5px;
    min-height: 80px;
}
</style>
